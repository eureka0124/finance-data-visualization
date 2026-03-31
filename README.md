# 재무 데이터 시각화 분석 서비스

누구나 쉽게 이해할 수 있는 한국 상장사 재무 데이터 시각화 및 AI 분석 서비스입니다.

## 주요 기능

### 1. 회사 검색 (Phase 1)
- 3,864개 한국 상장사 데이터 보유
- 회사명, 영문명, 회사코드로 검색 가능
- 실시간 퍼지 검색으로 빠른 결과 제공

### 2. 재무 데이터 시각화 (Phase 2)
- **재무상태표**: 자산/부채/자본 구성을 차트로 표시
- **손익계산서**: 매출액, 영업이익, 당기순이익 추이 분석
- 연결/개별 재무제표 비교
- 최근 3년 데이터 연도별 선택 가능
- OpenDART API 활용한 실시간 데이터

### 3. AI 분석 (Phase 3)
- Gemini 2.0 Flash 모델 활용
- 누구나 이해할 수 있는 쉬운 한국어 설명
- 회사의 전체 규모, 수익성, 건강도 분석
- 스트리밍 방식으로 실시간 분석 결과 제공

## 기술 스택

| 계층 | 기술 |
|------|------|
| **Frontend** | React 18 + TypeScript + Tailwind CSS |
| **Framework** | Next.js 14 (App Router) |
| **Charts** | Recharts |
| **Backend** | Next.js API Routes |
| **External APIs** | OpenDART API, Google Gemini API |
| **Deployment** | Vercel |

## 설치 및 실행

### 필수 요구사항
- Node.js 18+
- npm or yarn

### 로컬 개발

```bash
# 의존성 설치
npm install

# 환경 변수 설정
# .env.local 파일 생성 및 다음 내용 추가:
# OPENDART_API_KEY=your_api_key
# GEMINI_API_KEY=your_api_key

# 개발 서버 실행
npm run dev

# http://localhost:3000 접속
```

### 빌드

```bash
npm run build
npm run start
```

## Vercel 배포

### 배포 단계

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/finance.git
   git push -u origin main
   ```

2. **Vercel 연결**
   - [vercel.com](https://vercel.com)에서 로그인
   - "Add New..." → "Project" 선택
   - GitHub 저장소 선택

3. **환경 변수 설정**
   - Project Settings → Environment Variables
   - 다음 변수 추가:
     - `OPENDART_API_KEY`: OpenDART API 키
     - `GEMINI_API_KEY`: Google Gemini API 키

4. **배포**
   - 자동 배포: 메인 브랜치에 푸시 시 자동 배포
   - 수동 배포: Vercel 대시보드에서 "Redeploy" 클릭

## API 키 발급

### OpenDART API
- 사이트: https://opendart.fss.or.kr
- 신청 가능: 무료
- 사용량 제한: 월 20,000건

### Google Gemini API
- 사이트: https://aistudio.google.com/app/apikey
- 신청 가능: 무료 (일부 제한)
- 모델: gemini-2.0-flash

## 프로젝트 구조

```
finance/
├── public/
│   └── corp-data.json          # 3,864개 회사 데이터
├── src/
│   ├── app/
│   │   ├── page.tsx            # 메인 검색 페이지
│   │   ├── company/
│   │   │   └── [corpCode]/
│   │   │       └── page.tsx    # 회사 상세 페이지
│   │   └── api/
│   │       ├── financial/      # OpenDART 프록시
│   │       └── analyze/        # Gemini 분석
│   ├── components/
│   │   ├── SearchBox.tsx
│   │   ├── FinancialCharts.tsx
│   │   ├── BalanceSheetChart.tsx
│   │   ├── IncomeStatementChart.tsx
│   │   └── AIAnalysis.tsx
│   └── lib/
│       ├── types.ts
│       └── formatters.ts
├── scripts/
│   └── convert-xml.mjs         # XML → JSON 변환
├── .env.local                  # 환경 변수 (git 제외)
├── vercel.json                 # Vercel 배포 설정
└── package.json
```

## 주요 컴포넌트

### SearchBox
- 사용자 입력에 따른 실시간 검색
- 최대 20개 결과 표시
- 한글/영문 모두 지원

### FinancialCharts
- 탭 네비게이션으로 재무상태표/손익계산서 전환
- 연도별 데이터 비교
- 반응형 차트 (모바일 지원)

### AIAnalysis
- 스트리밍 방식 응답
- 쉬운 설명 생성
- 로딩 상태 표시

## 데이터 소스

- **회사 정보**: OpenDART (금융감독원 전자공시 시스템)
- **재무 데이터**: OpenDART API
  - 재무상태표 (BS: Balance Sheet)
  - 손익계산서 (IS: Income Statement)
  - 연결/개별 재무제표 모두 지원

## 주의사항

- ⚠️ `.env.local` 파일은 git 저장소에 포함되지 않습니다
- ⚠️ API 키는 절대 코드에 하드코딩하지 마세요
- ⚠️ Vercel 배포 시 환경 변수를 대시보드에서 설정하세요
- ⚠️ OpenDART API의 요청 제한(월 20,000건) 주의

## 라이센스

MIT License

## 문의

문제가 발생하면 GitHub Issues에 보고해주세요.
