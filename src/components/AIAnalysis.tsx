'use client';

import { useState } from 'react';
import { FinancialItem } from '@/lib/types';
import { AnalysisVisualization } from './AnalysisVisualization';

interface AIAnalysisProps {
  companyName: string;
  data: FinancialItem[];
}

interface AnalysisResult {
  profitability: string;
  growth: string;
  stability: string;
  summary: string;
}

export function AIAnalysis({ companyName, data }: AIAnalysisProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI 분석 요청 실패');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'AI 분석 중 오류가 발생했습니다';
      
      // 할당량 초과 에러 메시지 개선
      if (errorMsg.includes('할당량') || errorMsg.includes('quota') || errorMsg.includes('사용 가능한 AI 모델')) {
        setError('😓 Gemini API 일일 할당량을 초과했습니다.\n\n내일 다시 시도해주세요.\n또는 https://ai.google.dev/pricing 에서 유료 플랜으로 업그레이드하면 즉시 사용 가능합니다.');
      } else {
        setError(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? 'AI가 분석 중입니다...' : '투자자 관점 분석 보기 🤖'}
      </button>

      {error && (
        <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-lg">
          <div className="flex gap-4">
            <div className="text-3xl flex-shrink-0">⚠️</div>
            <div>
              <h4 className="font-bold text-red-800 mb-2">분석 요청 실패</h4>
              <p className="text-red-700 whitespace-pre-line text-sm leading-relaxed">
                {error}
              </p>
              {error.includes('할당량') && (
                <div className="mt-4 pt-4 border-t border-red-200">
                  <p className="text-xs text-red-600">
                    💡 팁: 재무 시각화 섹션은 정상 작동하며, 시각화 자료만 사용해도 회사 분석이 가능합니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-8">
          {/* 시각화 섹션 */}
          <AnalysisVisualization data={data} />

          {/* AI 텍스트 분석 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">🤖 AI 상세 분석</h2>

            {/* 수익성 분석 */}
            <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                💰 수익성 (Profitability)
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {analysis.profitability}
              </div>
            </div>

            {/* 성장성 분석 */}
            <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                📈 성장성 (Growth)
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {analysis.growth}
              </div>
            </div>

            {/* 안정성 분석 */}
            <div className="p-6 bg-orange-50 border-l-4 border-orange-500 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">
                🛡️ 안정성 (Stability)
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {analysis.stability}
              </div>
            </div>

            {/* 종합 의견 */}
            <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                ⭐ 투자 종합 의견
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {analysis.summary}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}