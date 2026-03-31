'use client';

import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FinancialItem } from '@/lib/types';
import { calculateFinancialMetrics } from '@/lib/formatters';

interface AnalysisVisualizationProps {
  data: FinancialItem[];
}

export function AnalysisVisualization({ data }: AnalysisVisualizationProps) {
  const metrics = calculateFinancialMetrics(data);

  // 레이더 차트 데이터 (0-100 점수)
  const radarData = [
    {
      category: '수익성',
      점수: Math.round(metrics.profitabilityScore),
      fullMark: 100,
    },
    {
      category: '성장성',
      점수: Math.round(metrics.growthScore),
      fullMark: 100,
    },
    {
      category: '안정성',
      점수: Math.round(metrics.stabilityScore),
      fullMark: 100,
    },
  ];

  // 세부 지표 바차트 데이터
  const metricsData = [
    {
      name: '순이익률',
      값: Math.round(metrics.netMargin * 10) / 10,
      unit: '%',
    },
    {
      name: '영업이익률',
      값: Math.round(metrics.operatingMargin * 10) / 10,
      unit: '%',
    },
    {
      name: '매출성장률',
      값: Math.round(metrics.revenueGrowth * 10) / 10,
      unit: '%',
    },
    {
      name: '부채비율',
      값: Math.round(metrics.debtRatio * 10) / 10,
      unit: '%',
    },
  ];

  const scoreColors = {
    수익성: '#3b82f6',
    성장성: '#10b981',
    안정성: '#f59e0b',
  };

  return (
    <div className="space-y-8">
      {/* 종합 점수 - 레이더 차트 */}
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          📊 투자 지표 종합 평가 (0-100점)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData} margin={{ top: 20, right: 80, left: 80, bottom: 20 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="점수"
              dataKey="점수"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>

        {/* 점수 카드 */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(metrics.profitabilityScore)}
            </div>
            <div className="text-sm text-gray-600 mt-1">수익성 점수</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(metrics.growthScore)}
            </div>
            <div className="text-sm text-gray-600 mt-1">성장성 점수</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(metrics.stabilityScore)}
            </div>
            <div className="text-sm text-gray-600 mt-1">안정성 점수</div>
          </div>
        </div>
      </div>

      {/* 세부 재무 지표 */}
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          💼 세부 재무 지표
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={metricsData}
            margin={{ top: 20, right: 30, left: 30, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis />
            <Tooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value: any) => [
                `${typeof value === 'number' ? value.toFixed(2) : value}`,
                '값',
              ]}
            />
            <Legend />
            <Bar
              dataKey="값"
              fill="#8b5cf6"
              name="지표값"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* 지표 설명 */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">순이익률</div>
            <div className="text-sm text-gray-600 mt-1">
              {metrics.netMargin.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 mt-2">
              순이익 / 매출액 (높을수록 좋음)
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">영업이익률</div>
            <div className="text-sm text-gray-600 mt-1">
              {metrics.operatingMargin.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 mt-2">
              영업이익 / 매출액 (높을수록 좋음)
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">매출성장률</div>
            <div className="text-sm text-gray-600 mt-1">
              {metrics.revenueGrowth.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 mt-2">
              전년 대비 매출 증감 (양수가 좋음)
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">부채비율</div>
            <div className="text-sm text-gray-600 mt-1">
              {metrics.debtRatio.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 mt-2">
              부채 / 자산 (낮을수록 좋음)
            </div>
          </div>
        </div>
      </div>

      {/* 평가 가이드 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-800 mb-4">📋 점수 해석 가이드</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold text-blue-600 mb-2">수익성 (0-100)</div>
            <ul className="text-gray-600 space-y-1">
              <li>80 이상: 우수</li>
              <li>60-79: 양호</li>
              <li>40-59: 중간</li>
              <li>40 미만: 개선 필요</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-green-600 mb-2">성장성 (0-100)</div>
            <ul className="text-gray-600 space-y-1">
              <li>60 이상: 고성장</li>
              <li>40-59: 적정 성장</li>
              <li>20-39: 저성장</li>
              <li>20 미만: 침체</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-orange-600 mb-2">안정성 (0-100)</div>
            <ul className="text-gray-600 space-y-1">
              <li>70 이상: 매우 안정</li>
              <li>50-69: 안정적</li>
              <li>30-49: 보통</li>
              <li>30 미만: 위험</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
