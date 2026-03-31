# Vercel 배포 가이드

## GitHub에 업로드 완료 ✅

저장소: https://github.com/eureka0124/finance-data-visualization

## Vercel 배포 단계

### 1단계: Vercel 프로젝트 생성

```bash
# Vercel CLI 설치 (선택사항)
npm i -g vercel

# 배포
vercel
```

또는 [Vercel Dashboard](https://vercel.com/dashboard)에서:
1. **New Project** 클릭
2. GitHub에서 `finance-data-visualization` 저장소 선택
3. **Import** 클릭

### 2단계: 환경 변수 설정 🔐

**중요**: API 키는 절대로 git에 커밋하지 마세요. Vercel에서만 설정하세요.

#### Vercel Dashboard에서 설정:

프로젝트 Settings → Environment Variables 탭에서 다음 변수를 추가:

```
OPENDART_API_KEY = your_opendart_api_key_here
GEMINI_API_KEY = your_gemini_api_key_here
```

#### 또는 CLI로 설정:

```bash
vercel env add OPENDART_API_KEY
# 프롬프트에서 API 키 입력

vercel env add GEMINI_API_KEY
# 프롬프트에서 API 키 입력
```

### 3단계: 배포

```bash
# 개발 환경에서 테스트
vercel dev

# 프로덕션에 배포
vercel --prod
```

## API 키 획득 방법

### OpenDART API 키
1. [금융감독원 전자공시 시스템](https://opendart.fss.or.kr/)에 접속
2. 회원가입 후 로그인
3. "API 신청" 메뉴에서 API 키 신청
4. 승인 후 API 키 복사

### Gemini API 키
1. [Google AI Studio](https://ai.google.dev/)에 접속
2. Google 계정으로 로그인
3. "Get API Key" 클릭
4. 새 API 키 생성
5. API 키 복사

⚠️ **주의**: Free Tier는 일일 20개 요청 제한
- 유료 플랜: [Google Cloud Console](https://console.cloud.google.com/)에서 설정 가능

## 배포 후 확인

1. Vercel이 제공하는 URL 방문
2. 예: `https://finance-data-visualization.vercel.app`

## 배포 환경에서의 차이

### 개발 환경 (.env.local)
```
OPENDART_API_KEY=...
GEMINI_API_KEY=...
```

### 배포 환경 (Vercel)
- Environment Variables에서 설정
- 자동으로 빌드 및 실행 시 적용
- .env.local 파일은 배포되지 않음 (보안상 이유)

## 문제 해결

### API 키 오류
- ✅ 키가 올바르게 복사되었는지 확인
- ✅ Vercel Environment Variables에서 공백 제거 확인
- ✅ 배포 후 즉시 테스트 (캐시 문제 가능)

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 확인
npm run build 2>&1 | grep -i error
```

### Gemini API Rate Limit
- Free Tier: 일일 20개 요청
- 유료 플랜으로 업그레이드하면 증가

## 보안 체크리스트

- ✅ `.env.local` 파일이 `.gitignore`에 있는가?
- ✅ GitHub 저장소에 API 키가 커밋되지 않았는가?
- ✅ Vercel Environment Variables에만 키가 설정되었는가?
- ✅ 저장소가 private (선택사항)인가?

## 추가 최적화

### 배포 후 성능 최적화

```bash
# Vercel Analytics 활성화
# Dashboard → Settings → Analytics

# Performance 모니터링
# Dashboard → Monitoring → Analytics
```

### 커스텀 도메인 연결

1. Vercel Dashboard → Settings → Domains
2. 도메인 추가 및 DNS 설정
3. SSL 인증서 자동 생성

## 문의 및 지원

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [GitHub 저장소](https://github.com/eureka0124/finance-data-visualization)

---

**배포 완료 후 http://localhost:3000 에서 테스트했던 기능들이 모두 작동합니다!** 🎉
