# Vercel CLI 배포 완전 가이드

## 🚀 빠른 시작 (3단계)

### 1단계: Vercel 계정에서 토큰 생성

**Vercel Dashboard에서:**
1. [Vercel Settings](https://vercel.com/account/tokens) 접속
2. "Create Token" 클릭
3. Token name 입력 (예: `finance-deployment`)
4. Expiration 설정 (또는 No Expiration)
5. "Create" 클릭
6. **토큰 복사** (다시 보이지 않음 - 안전하게 보관)

### 2단계: 환경 변수 설정 (Windows PowerShell)

```powershell
# 토큰 설정 (복사한 토큰을 붙여넣으세요)
$env:VERCEL_TOKEN = "your_vercel_token_here"

# 확인
echo $env:VERCEL_TOKEN
```

### 3단계: 배포 실행

```bash
cd "c:\DATA\커서\finance"
vercel --prod --yes
```

---

## 📋 완전 배포 프로세스

### 전제 조건:
- ✅ GitHub에 코드 업로드됨 (완료)
- ✅ Vercel CLI 설치됨 (완료)
- ✅ Vercel 계정 있음

### 배포 단계:

#### **Step 1: Vercel 토큰 생성**

```
1. https://vercel.com/account/tokens 방문
2. "Create Token" 버튼 클릭
3. 정보 입력:
   - Token name: finance-deployment
   - Scope: Full Account
   - Expiration: No Expiration (또는 원하는 기간)
4. Create 클릭
5. 토큰 복사 (황색 강조 표시됨)
```

#### **Step 2: 환경 변수 설정 (PowerShell)**

```powershell
# 터미널 열기 (PowerShell)
# 다음 명령 실행:

$env:VERCEL_TOKEN = "vercel_xxxxxxxxxxxxx..."  # 복사한 토큰 붙여넣기
$env:VERCEL_ORG_ID = "your_org_id"  # (선택사항)
$env:VERCEL_PROJECT_ID = "your_project_id"  # (선택사항)

# 확인
echo "Token: $env:VERCEL_TOKEN"
```

#### **Step 3: 배포**

```powershell
cd "c:\DATA\커서\finance"

# 프로덕션 배포
vercel --prod --yes

# 또는 스테이징 배포 (테스트용)
vercel --yes
```

---

## 🎯 배포 과정

### 배포 시작 후 출력 예시:

```
Vercel CLI
> Release? [y/n]: y
> Retrieving project…
> Linked to finance-data-visualization
> Inspecting files…
> Uploading code…
> Building…
> Build complete
> Production URL: https://finance-data-visualization.vercel.app
```

### 배포 완료 확인:

```
✅ Production URL: https://finance-data-visualization.vercel.app
✅ Inspect: https://vercel.com/eureka0124/finance-data-visualization
```

---

## 🔧 환경 변수를 CLI로 설정하는 방법

배포 중 환경 변수가 없으면:

```powershell
# Vercel에 환경 변수 추가
vercel env add OPENDART_API_KEY
# 프롬프트에서 값 입력

vercel env add GEMINI_API_KEY
# 프롬프트에서 값 입력

# 확인
vercel env list
```

---

## ⚠️ 문제 해결

### "Token is not valid" 에러

```powershell
# 해결책 1: 토큰 다시 생성
# https://vercel.com/account/tokens에서 새 토큰 생성

# 해결책 2: 현재 세션에서 토큰 설정
$env:VERCEL_TOKEN = "new_token_here"

# 해결책 3: 영구적으로 설정
[Environment]::SetEnvironmentVariable("VERCEL_TOKEN","your_token","User")
```

### "Project not found" 에러

```
해결책:
1. vercel link 실행
2. 프롬프트에서 프로젝트 선택 또는 신규 생성
3. 다시 배포
```

### 환경 변수가 적용 안 됨

```
배포 후:
1. Vercel Dashboard 접속
2. Settings → Environment Variables 확인
3. 값이 제대로 설정되었는지 확인
4. 다시 배포 (Redeploy)
```

---

## 📚 자주 사용하는 명령어

```bash
# 프로덕션 배포 (권장)
vercel --prod --yes

# 스테이징 배포 (미리보기)
vercel --yes

# 프로젝트 연결
vercel link

# 환경 변수 설정
vercel env add VARIABLE_NAME

# 환경 변수 확인
vercel env list

# 배포 상태 확인
vercel logs

# 배포 취소
vercel remove
```

---

## ✅ 배포 후 확인 체크리스트

- [ ] Vercel Dashboard에서 배포 상태 = "Ready" (초록색)
- [ ] 배포 URL 방문 가능
- [ ] 회사 검색 기능 작동
- [ ] 재무 차트 표시됨
- [ ] AI 분석 버튼 클릭 가능
  - 작동하면 ✅ 성공 (환경 변수 적용됨)
  - "할당량 초과" 또는 API 에러면 ⚠️ 확인 필요

---

## 🎉 배포 완료!

성공적으로 배포되면:

```
Production URL: https://finance-data-visualization.vercel.app
```

이제 전 세계 어디서나 접속 가능합니다! 🌍
