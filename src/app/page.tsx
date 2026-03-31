'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Company } from '@/lib/types';
import { SearchBox } from '@/components/SearchBox';

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/corp-data.json')
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  const handleSelect = (company: Company, year: string, reportType: string) => {
    router.push(
      `/company/${company.corp_code}?year=${year}&reportType=${reportType}`
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* 배경 그래픽 요소 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      {/* 그리드 패턴 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-2xl mx-auto p-8 relative z-10">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          {/* 아이콘 */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-lg opacity-75"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
            재무 데이터 시각화 분석
          </h1>
          <p className="text-xl text-blue-100 mb-2">
            Professional Financial Intelligence Platform
          </p>
          <p className="text-base text-blue-200">
            회사의 재무 건강도를 투자자 관점에서 분석하고 시각화합니다
          </p>
        </div>

        {/* 메인 카드 */}
        {companies.length > 0 && (
          <div className="relative">
            {/* 카드 배경 효과 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>

            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* 장식 요소 */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full -ml-16 -mb-16"></div>

              {/* 제목 */}
              <div className="relative mb-8">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <span className="text-3xl">🔍</span>
                  회사 검색 및 분석
                </h2>
                <p className="text-blue-100 text-sm">원하는 회사를 검색하고 상세한 재무 분석을 받으세요</p>
              </div>

              {/* SearchBox */}
              <div className="relative">
                <SearchBox companies={companies} onSelect={handleSelect} />
              </div>

              {/* 통계 정보 */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-400/30">
                    <div className="text-2xl font-bold text-blue-100">
                      {companies.length.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-200 mt-1">등록된 회사</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-xl p-4 border border-cyan-400/30">
                    <div className="text-2xl font-bold text-cyan-100">3+</div>
                    <div className="text-sm text-cyan-200 mt-1">연도 데이터</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-400/30">
                    <div className="text-2xl font-bold text-purple-100">AI</div>
                    <div className="text-sm text-purple-200 mt-1">분석 지원</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {companies.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin text-5xl mb-4">⚙️</div>
              <div className="text-blue-100">데이터를 로드 중입니다...</div>
            </div>
          </div>
        )}

        {/* 하단 정보 */}
        <div className="mt-16 text-center">
          <p className="text-blue-200 text-sm">
            💡 팁: 회사명, 영문명, 또는 코드로 검색할 수 있습니다
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </main>
  );
}
