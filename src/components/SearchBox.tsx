'use client';

import { useState, useMemo } from 'react';
import { Company } from '@/lib/types';

interface SearchBoxProps {
  companies: Company[];
  onSelect: (company: Company, year: string, reportType: string) => void;
}

export function SearchBox({ companies, onSelect }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedReportType, setSelectedReportType] = useState('11011');
  
  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return companies
      .filter(
        (c) =>
          c.corp_name.toLowerCase().includes(q) ||
          c.corp_eng_name.toLowerCase().includes(q) ||
          c.corp_code.includes(q)
      )
      .slice(0, 20);
  }, [query, companies]);

  const handleSelectCompany = (company: Company) => {
    onSelect(company, selectedYear, selectedReportType);
    setQuery('');
  };

  return (
    <div className="space-y-6">
      {/* 회사 검색 */}
      <div>
        <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span className="text-lg">🏢</span>회사 검색
        </label>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="회사명 또는 영문명으로 검색 (예: 삼성, Samsung)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-800 placeholder-gray-500 transition"
          />
          {filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur border border-white/30 rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
              {filtered.map((company) => (
                <button
                  key={company.corp_code}
                  onClick={() => handleSelectCompany(company)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition"
                >
                  <div className="font-semibold text-gray-800">{company.corp_name}</div>
                  <div className="text-sm text-gray-600">{company.corp_eng_name}</div>
                  <div className="text-xs text-gray-500">코드: {company.corp_code}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 사업연도 선택 */}
      <div>
        <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span className="text-lg">📅</span>사업연도
        </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-800 transition"
        >
          <option value="2025">2025년</option>
          <option value="2024">2024년</option>
          <option value="2023">2023년</option>
          <option value="2022">2022년</option>
          <option value="2021">2021년</option>
        </select>
      </div>

      {/* 보고서 타입 선택 */}
      <div>
        <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span className="text-lg">📊</span>보고서 타입
        </label>
        <select
          value={selectedReportType}
          onChange={(e) => setSelectedReportType(e.target.value)}
          className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-800 transition"
        >
          <option value="11011">사업보고서</option>
          <option value="11012">반기보고서</option>
          <option value="11013">1분기보고서</option>
          <option value="11014">3분기보고서</option>
        </select>
      </div>
    </div>
  );
}
