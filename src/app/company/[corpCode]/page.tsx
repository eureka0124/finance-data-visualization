'use client';

import { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FinancialItem } from '@/lib/types';
import { FinancialCharts } from '@/components/FinancialCharts';
import { AIAnalysis } from '@/components/AIAnalysis';

interface Company {
  corp_code: string;
  corp_name: string;
  corp_eng_name: string;
  stock_code: string;
}

export default function CompanyPage({
  params,
}: {
  params: Promise<{ corpCode: string }>;
}) {
  const { corpCode } = use(params);
  const searchParams = useSearchParams();
  const year = searchParams.get('year') || '2023';
  const reportType = searchParams.get('reportType') || '11011';

  const [company, setCompany] = useState<Company | null>(null);
  const [financialData, setFinancialData] = useState<FinancialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesRes = await fetch('/corp-data.json');
        const companies = await companiesRes.json();
        const foundCompany = companies.find(
          (c: Company) => c.corp_code === corpCode
        );

        if (!foundCompany) {
          setError('회사를 찾을 수 없습니다');
          setLoading(false);
          return;
        }

        setCompany(foundCompany);

        const response = await fetch(
          `/api/financial?corp_code=${corpCode}&bsns_year=${year}&reprt_code=${reportType}`
        );
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setFinancialData(data.list || []);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '데이터 로드 실패'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [corpCode, year, reportType]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="text-lg text-gray-600">데이터를 로드 중입니다...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            ← 뒤로가기
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
            <div className="font-semibold mb-2">오류 발생</div>
            <div>{error}</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          ← 뒤로가기
        </button>

        {company && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {company.corp_name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {company.corp_eng_name}
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <div>
                <span className="font-semibold">회사코드:</span> {company.corp_code}
              </div>
              <div>
                <span className="font-semibold">종목코드:</span> {company.stock_code}
              </div>
            </div>
          </div>
        )}

        {financialData.length > 0 ? (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                📊 재무 데이터 시각화
              </h2>
              <FinancialCharts data={financialData} />
            </div>

            {company && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  🤖 AI 분석
                </h2>
                <AIAnalysis companyName={company.corp_name} data={financialData} />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-700">
            <div className="font-semibold mb-2">데이터 없음</div>
            <div>선택한 연도에 대한 재무 데이터가 없습니다.</div>
          </div>
        )}
      </div>
    </main>
  );
}