# Vercel 배포 가이드 (Dashboard 방법)

## 문제 해결: Redeploy 팝업이 안 보일 때

### ✅ 해결책 1: 브라우저 캐시 삭제 및 새로고침

```
1. Vercel Dashboard 페이지 열기
2. Ctrl + Shift + Delete (또는 Cmd + Shift + Delete)
3. "모든 시간" 선택 → 모든 항목 체크
4. 캐시 데이터 삭제
5. F5로 새로고침
```

### ✅ 해결책 2: 다른 브라우저 사용

Chrome, Firefox, Safari 등 다른 브라우저 시도

### ✅ 해결책 3: 프라이빗/시크릿 모드 사용

```
1. Ctrl + Shift + N (또는 Cmd + Shift + N)
2. 새로운 시크릿 창에서 Vercel Dashboard 접속
3. 다시 로그인
4. Redeploy 버튼 클릭
```

### ✅ 해결책 4: Vercel Dashboard에서 직접 배포

#### 단계별 가이드:

**1단계: Vercel Dashboard 접속**
- https://vercel.com/dashboard

**2단계: 프로젝트 선택**
- `finance-data-visualization` 프로젝트 클릭

**3단계: 배포 상태 확인**
- "Deployments" 탭 클릭
- 최신 배포 항목에서 상태 확인

**4단계: 환경 변수 확인**
- Settings → Environment Variables
- 다음 변수 확인:
  - ✅ `OPENDART_API_KEY` 존재?
  - ✅ `GEMINI_API_KEY` 존재?

**5단계: Redeploy 실행**
```
방법 A: 배포 목록에서
1. 최신 배포 항목 오른쪽 메뉴 (⋮)
2. "Redeploy" 선택

방법 B: Settings에서
1. Settings → Project Settings
2. 아래로 스크롤
3. "Redeploy" 버튼 클릭
```

---

## 환경 변수 설정 완료 확인

### 현재 설정된 환경 변수:

| 변수명 | 상태 | 역할 |
|--------|------|------|
| OPENDART_API_KEY | ✅ 설정됨 | 한국 상장회사 재무 데이터 |
| GEMINI_API_KEY | ✅ 설정됨 | AI 분석 기능 |

### 환경 변수가 올바르게 적용되었는지 확인:

**배포 후 확인 방법:**
1. 배포된 URL 방문
2. 회사 검색 → 상세 페이지 접속
3. "투자자 관점 분석 보기" 버튼 클릭
4. AI 분석이 작동하면 ✅ 성공

---

## 배포 상태 모니터링

### Vercel Dashboard에서 확인:

**Deployments 탭:**
- 초록색 ✅ = 배포 성공
- 주황색 ⏳ = 배포 중
- 빨간색 ❌ = 배포 실패

**실패 시 확인할 사항:**
1. 빌드 로그 확인 (클릭 → Build Logs)
2. 에러 메시지 확인
3. 환경 변수 확인

---

## 배포된 프로젝트 URL

다음 형식으로 배포됩니다:
```
https://finance-data-visualization-<random>.vercel.app
또는
https://finance-data-visualization.vercel.app (커스텀 도메인 설정 시)
```

**실제 배포 URL을 확인하려면:**
1. Vercel Dashboard → 프로젝트 선택
2. 상단의 "Visit" 버튼 클릭
3. 배포된 라이브 사이트 확인

---

## 일반적인 문제 해결

### 1. 팝업이 안 보이는 경우
- ✅ 브라우저 캐시 삭제
- ✅ 팝업 차단 설정 확인 (브라우저 설정)
- ✅ 다른 브라우저 시도

### 2. Redeploy 후 변경사항이 안 보이는 경우
- ✅ 강력 새로고침: Ctrl + Shift + R
- ✅ 브라우저 캐시 삭제 후 접속
- ✅ 배포 완료 대기 (보통 1-3분)

### 3. "환경 변수 없음" 에러 나타나는 경우
- ✅ Settings → Environment Variables 확인
- ✅ 변수명 정확한지 확인 (대소문자 구분)
- ✅ 값이 비어있지 않은지 확인
- ✅ Redeploy 실행

### 4. AI 분석이 작동 안 하는 경우
- ✅ GEMINI_API_KEY 환경 변수 확인
- ✅ API 키가 올바른지 확인
- ✅ Google Cloud Console에서 API 활성화 확인
- ✅ 일일 할당량 확인 (Free Tier: 20회/일)

---

## 빠른 배포 확인 방법

### 1. 배포 완료 확인
```
Vercel Dashboard → Deployments
상태: ✅ Ready
```

### 2. 사이트 방문
```
Deployments에서 URL 클릭
또는 "Visit" 버튼 클릭
```

### 3. 기능 테스트
```
✅ 회사 검색 (예: 삼성전자)
✅ 재무 차트 표시
✅ AI 분석 (선택사항)
```

---

## 추가 도움말

### Vercel 커스텀 도메인 연결

**Settings → Domains에서:**
1. "Add" 클릭
2. 도메인 입력
3. DNS 설정 팔로우

### 배포 로그 확인

**Deployments → 특정 배포 → Logs:**
- Build logs: 빌드 과정 확인
- Runtime logs: 실행 시 에러 확인
- Network logs: API 호출 확인

---

## 💡 팁

- 환경 변수 추가 후 Redeploy는 **필수**입니다 (자동으로 적용 안 됨)
- Vercel은 GitHub Push 시 자동으로 배포하므로, 코드 변경 시 자동 배포됩니다
- 프로덕션 배포는 `--prod` 플래그 없이도 기본적으로 모든 브랜치가 배포됩니다

---

**배포 완료 후 위의 "배포 상태 모니터링" 섹션에서 확인하세요!** 🚀
