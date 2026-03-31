'use client';

import { useState } from 'react';
import { FinancialItem } from '@/lib/types';
import { BalanceSheetChart } from './BalanceSheetChart';
import { IncomeStatementChart } from './IncomeStatementChart';

interface FinancialChartsProps {
  data: FinancialItem[];
}

export function FinancialCharts({ data }: FinancialChartsProps) {
  const [activeTab, setActiveTab] = useState<'BS' | 'IS'>('BS');
  
  const years = Array.from(new Set(data.map((item) => item.bsns_year)))
    .sort()
    .reverse()
    .slice(0, 3);
  
  const [selectedYear, setSelectedYear] = useState(years[0] || '2023');

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('BS')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'BS'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          재무상태표
        </button>
        <button
          onClick={() => setActiveTab('IS')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'IS'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          손익계산서
        </button>
      </div>

      <div className="flex gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-3 py-1 rounded transition ${
              selectedYear === year
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {year}년
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        {activeTab === 'BS' && (
          <BalanceSheetChart data={data} year={selectedYear} />
        )}
        {activeTab === 'IS' && (
          <IncomeStatementChart data={data} year={selectedYear} />
        )}
      </div>
    </div>
  );
}
