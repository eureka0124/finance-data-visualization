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

interface BalanceSheetChartProps {
  data: FinancialItem[];
  year: string;
}

export function BalanceSheetChart({ data, year }: BalanceSheetChartProps) {
  const bsData = data
    .filter((item) => item.sj_div === 'BS' && item.bsns_year === year)
    .reduce(
      (acc, item) => {
        const key = item.account_nm;
        const amount = parseFinancialAmount(item.thstrm_amount);
        if (!acc[key]) {
          acc[key] = { name: key };
        }
        acc[key][item.fs_div] = amount;
        return acc;
      },
      {} as Record<string, any>
    );

  const chartData = Object.values(bsData)
    .filter(
      (item) =>
        item.name.includes('자산') ||
        item.name.includes('부채') ||
        item.name.includes('자본')
    )
    .slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
        <YAxis tickFormatter={(val) => formatNumber(val)} />
        <Tooltip
          formatter={(value) => formatNumber(typeof value === 'number' ? value : 0)}
          contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
        />
        <Legend />
        <Bar dataKey="CFS" fill="#3b82f6" name="연결재무제표" />
        <Bar dataKey="OFS" fill="#10b981" name="개별재무제표" />
      </BarChart>
    </ResponsiveContainer>
  );
}
