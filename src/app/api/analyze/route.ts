import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FinancialItem } from '@/lib/types';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface AnalysisResult {
  profitability: string;
  growth: string;
  stability: string;
  summary: string;
}

async function analyzeWithPrompt(
  genAI: GoogleGenerativeAI,
  prompt: string,
  retryCount = 0,
  maxRetries = 2
): Promise<string> {
  // 사용 가능한 모델들을 순차적으로 시도
  const modelNames = [
    'gemini-2.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
  ];

  for (const modelName of modelNames) {
    try {
      console.log(
        `🔄 Trying model: ${modelName}${retryCount > 0 ? ` (Retry ${retryCount}/${maxRetries})` : ''}`
      );
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      console.log(`✅ Success with model: ${modelName}`);
      return result.response.text();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Failed with model ${modelName}: ${errorMsg}`);

      // Rate limit 에러이면 대기 후 재시도
      if (
        errorMsg.includes('429') ||
        errorMsg.includes('RESOURCE_EXHAUSTED') ||
        errorMsg.includes('rate limit')
      ) {
        console.warn(`⏳ Rate limit hit, waiting before next attempt...`);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기
      }

      // 다음 모델 시도
      continue;
    }
  }

  // 재시도 로직
  if (retryCount < maxRetries) {
    console.log(`⏳ All models failed, retrying in 3 seconds (Attempt ${retryCount + 1}/${maxRetries})...`);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3초 대기
    return analyzeWithPrompt(genAI, prompt, retryCount + 1, maxRetries);
  }

  // 모든 모델과 재시도 실패
  throw new Error('사용 가능한 AI 모델이 없습니다. 잠시 후 다시 시도해주세요.');
}

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: '서버 설정 오류: Gemini API 키가 없습니다' },
      { status: 500 }
    );
  }

  try {
    const { companyName, data } = await request.json();

    // 데이터 유효성 검사
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No financial data for company: ${companyName}`);
      return NextResponse.json(
        {
          error: `${companyName}의 재무 데이터가 없습니다. 다른 연도나 보고서 타입을 선택해주세요.`,
        },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // 재무 데이터 정리
    const bsData = data
      .filter((item: FinancialItem) => item.sj_div === 'BS')
      .slice(0, 15);

    const isData = data
      .filter((item: FinancialItem) => item.sj_div === 'IS')
      .slice(0, 15);

    // BS 또는 IS 데이터가 모두 없는 경우
    if (bsData.length === 0 && isData.length === 0) {
      console.warn(
        `No BS or IS data for company: ${companyName}. Total items: ${data.length}`
      );
      return NextResponse.json(
        {
          error: `${companyName}의 재무 데이터 형식이 올바르지 않습니다. 다른 회사를 시도해주세요.`,
        },
        { status: 400 }
      );
    }

    const financialSummary = [
      bsData.length > 0 && '재무상태표 (Balance Sheet):',
      ...bsData.map(
        (item: FinancialItem) => `${item.account_nm}: ${item.thstrm_amount} (${item.bsns_year}년)`
      ),
      isData.length > 0 && '\n손익계산서 (Income Statement):',
      ...isData.map(
        (item: FinancialItem) => `${item.account_nm}: ${item.thstrm_amount} (${item.bsns_year}년)`
      ),
    ]
      .filter(Boolean)
      .join('\n');

    console.log(`Analyzing company: ${companyName}`);
    console.log(`BS items: ${bsData.length}, IS items: ${isData.length}`);

    // 순차적으로 분석 실행 (API 제한 회피)
    console.log('Starting sequential analysis...');
    
    const profitability = await analyzeWithPrompt(
      genAI,
      `회사명: ${companyName}

재무 데이터:
${financialSummary}

투자자 관점에서 이 회사의 '수익성'을 분석해주세요. 
다음을 포함하세요:
1. 순이익률, 영업이익률 등 수익성 지표
2. 회사의 실제 수익 창출 능력
3. 경영 효율성 평가
4. 투자 관점에서의 수익성 평가

한국어로 400자 이내의 간결하고 전문적인 분석을 제공해주세요.`
    );

    const growth = await analyzeWithPrompt(
      genAI,
      `회사명: ${companyName}

재무 데이터:
${financialSummary}

투자자 관점에서 이 회사의 '성장성'을 분석해주세요.
다음을 포함하세요:
1. 매출 성장률 및 추이
2. 이익 증감 추세
3. 시장 내 성장 잠재력
4. 향후 성장 가능성 평가

한국어로 400자 이내의 간결하고 전문적인 분석을 제공해주세요.`
    );

    const stability = await analyzeWithPrompt(
      genAI,
      `회사명: ${companyName}

재무 데이터:
${financialSummary}

투자자 관점에서 이 회사의 '안정성'을 분석해주세요.
다음을 포함하세요:
1. 부채 수준 및 자본 구조
2. 유동성과 단기 상환 능력
3. 재무 건전성 평가
4. 경영 위험도 평가

한국어로 400자 이내의 간결하고 전문적인 분석을 제공해주세요.`
    );

    const summary = await analyzeWithPrompt(
      genAI,
      `회사명: ${companyName}

투자자 관점의 분석:
이 회사의 수익성, 성장성, 안정성을 종합적으로 고려할 때, 투자 매력도를 평가해주세요.
- 투자 적합 대상인지
- 주의할 점
- 종합 평가 (강한 추천/추천/중립/주의/강한 주의)

한국어로 300자 이내로 간결하게 제공해주세요.`
    );

    const result: AnalysisResult = {
      profitability,
      growth,
      stability,
      summary,
    };

    return NextResponse.json(result);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Gemini API error:', errorMsg);
    return NextResponse.json(
      {
        error:
          errorMsg || 'AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}