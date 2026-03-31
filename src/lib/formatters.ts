export function formatNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;
  if (isNaN(num)) return '0';
  
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1) + '조';
  }
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '억';
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(0) + '만';
  }
  return num.toLocaleString();
}

export function parseFinancialAmount(value: string): number {
  return parseInt(value.replace(/,/g, ''), 10) || 0;
}

export interface FinancialMetrics {
  profitabilityScore: number;
  growthScore: number;
  stabilityScore: number;
  operatingMargin: number;
  netMargin: number;
  debtRatio: number;
  revenueGrowth: number;
}

export function calculateFinancialMetrics(data: any[]): FinancialMetrics {
  // 재무 지표 계산
  const latestYear = data
    .filter((i) => i.sj_div === 'IS')
    .reduce((max, item) => (parseInt(item.bsns_year) > max ? parseInt(item.bsns_year) : max), 0);

  const prevYear = latestYear - 1;

  // 최신 연도 데이터
  const latestRevenue = parseFinancialAmount(
    data.find((i) => i.sj_div === 'IS' && i.account_nm === '매출액' && parseInt(i.bsns_year) === latestYear && i.fs_div === 'CFS')?.thstrm_amount || '0'
  );
  const latestOperatingIncome = parseFinancialAmount(
    data.find((i) => i.sj_div === 'IS' && i.account_nm === '영업이익' && parseInt(i.bsns_year) === latestYear && i.fs_div === 'CFS')?.thstrm_amount || '0'
  );
  const latestNetIncome = parseFinancialAmount(
    data.find((i) => i.sj_div === 'IS' && i.account_nm === '당기순이익(손실)' && parseInt(i.bsns_year) === latestYear && i.fs_div === 'CFS')?.thstrm_amount || '0'
  );

  // 이전 연도 데이터
  const prevRevenue = parseFinancialAmount(
    data.find((i) => i.sj_div === 'IS' && i.account_nm === '매출액' && parseInt(i.bsns_year) === prevYear && i.fs_div === 'CFS')?.thstrm_amount || '0'
  );

  // 재무상태표 데이터
  const latestAssets = parseFinancialAmount(
    data.find((i) => i.sj_div === 'BS' && i.account_nm === '자산총계' && parseInt(i.bsns_year) === latestYear && i.fs_div === 'CFS')?.thstrm_amount || '0'
  );
  const latestLiabilities = parseFinancialAmount(
    data.find((i) => i.sj_div === 'BS' && i.account_nm === '부채총계' && parseInt(i.bsns_year) === latestYear && i.fs_div === 'CFS')?.thstrm_amount || '0'
  );

  // 각 지표 계산
  const operatingMargin = latestRevenue > 0 ? (latestOperatingIncome / latestRevenue) * 100 : 0;
  const netMargin = latestRevenue > 0 ? (latestNetIncome / latestRevenue) * 100 : 0;
  const debtRatio = latestAssets > 0 ? (latestLiabilities / latestAssets) * 100 : 0;
  const revenueGrowth = prevRevenue > 0 ? ((latestRevenue - prevRevenue) / prevRevenue) * 100 : 0;

  // 점수 계산 (0-100)
  const profitabilityScore = Math.min(100, Math.max(0, netMargin * 5)); // 순이익률 기반
  const growthScore = Math.min(100, Math.max(0, revenueGrowth + 50)); // 성장률 기반 (음수 대응)
  const stabilityScore = Math.min(100, Math.max(0, 100 - debtRatio)); // 부채비율 기반

  return {
    profitabilityScore,
    growthScore,
    stabilityScore,
    operatingMargin,
    netMargin,
    debtRatio,
    revenueGrowth,
  };
}
