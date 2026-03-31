import { NextRequest, NextResponse } from 'next/server';

const OPENDART_API_KEY = process.env.OPENDART_API_KEY;
const OPENDART_URL = 'https://opendart.fss.or.kr/api/fnlttSinglAcnt.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const corp_code = searchParams.get('corp_code');
  const bsns_year = searchParams.get('bsns_year') || '2023';
  const reprt_code = searchParams.get('reprt_code') || '11011';

  if (!corp_code) {
    return NextResponse.json(
      { error: '회사 코드가 필요합니다' },
      { status: 400 }
    );
  }

  if (!OPENDART_API_KEY) {
    return NextResponse.json(
      { error: '서버 설정 오류: API 키가 없습니다' },
      { status: 500 }
    );
  }

  try {
    const currentYear = parseInt(bsns_year);
    const yearsToFetch = [currentYear, currentYear - 1, currentYear - 2];
    
    console.log(`📊 Fetching financial data for corp_code: ${corp_code}, years: ${yearsToFetch.join(',')}, reportType: ${reprt_code}`);
    
    // 3년치 데이터를 모두 가져옴
    const allData: any[] = [];
    const fetchResults: any = {};

    for (const year of yearsToFetch) {
      const url = new URL(OPENDART_URL);
      url.searchParams.set('crtfc_key', OPENDART_API_KEY);
      url.searchParams.set('corp_code', corp_code);
      url.searchParams.set('bsns_year', year.toString());
      url.searchParams.set('reprt_code', reprt_code);

      try {
        const response = await fetch(url.toString(), { cache: 'no-store' });
        const data = await response.json();

        fetchResults[year] = {
          status: data.status,
          message: data.message,
          count: data.list ? (Array.isArray(data.list) ? data.list.length : 1) : 0,
        };

        if (data.status === '000' && data.list) {
          allData.push(...(Array.isArray(data.list) ? data.list : [data.list]));
        }
      } catch (err) {
        console.error(`Error fetching year ${year}:`, err);
        fetchResults[year] = { error: String(err) };
      }
    }

    console.log(`Financial data fetch results:`, JSON.stringify(fetchResults, null, 2));
    console.log(`Total data collected: ${allData.length} items`);

    if (allData.length === 0) {
      console.warn(`No financial data available for corp_code: ${corp_code}`);
      return NextResponse.json(
        { error: '조회된 데이터가 없습니다. 해당 회사는 OpenDART API에서 재무데이터를 제공하지 않을 수 있습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: '000',
      message: '정상',
      list: allData,
    });
  } catch (error) {
    console.error('Financial API error:', error);
    return NextResponse.json(
      { error: '재무 데이터 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
