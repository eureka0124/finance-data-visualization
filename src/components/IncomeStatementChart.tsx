'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FinancialItem } from '@/lib/types';
import { formatNumber, parseFinancialAmount } from '@/lib/formatters';

interface IncomeStatementChartProps {
  data: FinancialItem[];
  year: string;
}

export function IncomeStatementChart({ data, year }: IncomeStatementChartProps) {
  // 3년 데이터 수집 (현재연도와 과거 2년)
  const currentYear = parseInt(year);
  const years = [currentYear, currentYear - 1, currentYear - 2];

  const getAmountForYear = (
    accountName: string,
    targetYear: number,
    fsDivision: string
  ): number => {
    const item = data.find(
      (i) =>
        i.sj_div === 'IS' &&
        i.account_nm === accountName &&
        i.fs_div === fsDivision &&
        parseInt(i.bsns_year) === targetYear
    );
    return parseFinancialAmount(item?.thstrm_amount || '0');
  };

  // 고정 키를 사용하여 Recharts 호환성 확보
  const chartData = [
    {
      name: '매출액',
      year0: getAmountForYear('매출액', currentYear, 'CFS'),
      year1: getAmountForYear('매출액', currentYear - 1, 'CFS'),
      year2: getAmountForYear('매출액', currentYear - 2, 'CFS'),
    },
    {
      name: '영업이익',
      year0: getAmountForYear('영업이익', currentYear, 'CFS'),
      year1: getAmountForYear('영업이익', currentYear - 1, 'CFS'),
      year2: getAmountForYear('영업이익', currentYear - 2, 'CFS'),
    },
    {
      name: '당기순이익',
      year0: getAmountForYear('당기순이익(손실)', currentYear, 'CFS'),
      year1: getAmountForYear('당기순이익(손실)', currentYear - 1, 'CFS'),
      year2: getAmountForYear('당기순이익(손실)', currentYear - 2, 'CFS'),
    },
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b'];
  const barLabels = [
    { key: 'year0', label: `${currentYear}년` },
    { key: 'year1', label: `${currentYear - 1}년` },
    { key: 'year2', label: `${currentYear - 2}년` },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        3년 연도별 비교 (연결재무제표 기준)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(val) => formatNumber(val as number)} />
          <Tooltip
            formatter={(value) => formatNumber(typeof value === 'number' ? value : 0)}
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
          />
          <Legend />
          {barLabels.map((bar, idx) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              fill={colors[idx]}
              name={bar.label}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
