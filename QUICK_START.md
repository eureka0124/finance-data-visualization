# Vercel 배포 - 가장 간단한 방법 ⚡

## 🚀 5분 안에 배포하기 (권장)

### 방법: Vercel Dashboard에서 GitHub 연결

#### **Step 1: Vercel Dashboard 접속**
```
https://vercel.com/dashboard
```

#### **Step 2: "Add New" → "Project" 클릭**
```
1. "+ Add New" 클릭
2. "Project" 선택
```

#### **Step 3: GitHub 저장소 선택**
```
1. "Import Git Repository" 클릭
2. GitHub 저장소 검색
3. "finance-data-visualization" 선택
4. "Import" 클릭
```

#### **Step 4: 프로젝트 설정**
```
1. Project Name: finance-data-visualization
2. Framework: Next.js
3. "Continue" 클릭
```

#### **Step 5: 환경 변수 추가** 🔑
```
1. "Environment Variables" 섹션
2. "Add" 클릭 (두 번)

첫 번째:
- Name: OPENDART_API_KEY
- Value: [당신의 API 키]
- Framework: All

두 번째:
- Name: GEMINI_API_KEY
- Value: [당신의 API 키]
- Framework: All

3. "Deploy" 클릭
```

#### **Step 6: 배포 완료 대기**
```
- 배포 진행 상황 실시간 확인
- 약 2-5분 소요
- 완료 시 "Visit" 버튼 표시
```

---

## ✅ 배포 확인

### 배포 완료 시:
```
🎉 Success! Project is live
Production URL: https://finance-data-visualization.vercel.app
```

### 기능 테스트:
1. 배포 URL 방문
2. 회사 검색 (예: 삼성)
3. 회사 선택
4. 차트 표시 확인 ✅
5. "투자자 관점 분석 보기" 클릭 (AI 분석 테스트)

---

## 🔄 향후 배포

### GitHub에 코드 Push 시:
```bash
git add .
git commit -m "message"
git push origin master
```

### Vercel이 자동으로:
✅ 배포 감지
✅ 자동 빌드
✅ 자동 배포
✅ 라이브 업데이트

---

## 💾 주요 정보 저장

배포 완료 후 다음을 저장해두세요:

```
프로젝트명: finance-data-visualization
배포 URL: https://finance-data-visualization.vercel.app
GitHub: https://github.com/eureka0124/finance-data-visualization
Vercel Dashboard: https://vercel.com/eureka0124/finance-data-visualization
```

---

## 🆘 문제 해결

### "Build failed" 에러
```
1. Vercel Dashboard → Deployments 클릭
2. 실패한 배포 클릭
3. "Build Logs" 탭에서 에러 확인
4. GitHub에서 코드 수정 후 Push
5. Vercel이 자동으로 다시 배포
```

### 환경 변수 적용 안 됨
```
1. Settings → Environment Variables 확인
2. 변수가 있는지 확인
3. 값이 비어있지 않은지 확인
4. Deployments 탭에서 최신 배포 클릭
5. "Redeploy" 버튼 클릭
```

### 배포는 됐지만 기능 안 함
```
1. 배포된 사이트 새로고침 (F5)
2. 캐시 삭제 후 다시 방문 (Ctrl+Shift+Delete)
3. 개발자도구 열기 (F12) → Console 탭 확인
4. 에러 메시지 있으면 스크린샷
```

---

## 🎯 Next Steps

배포 완료 후:

1. ✅ 사이트 방문 및 테스트
2. ✅ 회사 검색 → 재무 데이터 확인
3. ✅ AI 분석 테스트 (선택)
4. ✅ 커스텀 도메인 연결 (선택)
5. ✅ 팀원과 공유

---

**이제 프로젝트가 전 세계에 배포됩니다! 🌍**
