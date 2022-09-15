# OAuth-forum

OAuth를 활용한 네이버인증 연동 스토어

**22.09.08 ~ 22.09.14**

원티드 백엔드 프리온보딩 3차 과제입니다. `backend`

### 목차

[1.서비스 개요](#서비스-목표)<br>
[2.요구사항 구현 내용](#요구사항-구현-내용)<br>
[3.실행 방법 정리](#실행-방법-정리)<br>
[4.회고](#회고)<br>

## 서비스 목표

다음은 이번 프로젝트에서 이루고자 하는 목표입니다.

- `nestjs`를 사용하여 스토어 만들기.
- 네이버 로그인 연동하기.
- `multer`를 사용하여 이미지 파일 관리.✅
- `TypeORM`을 사용하여 관계형 데이터베이스 구축.✅

### ERD



### 기술 스택

`nodejs` `nestjs` `typeorm` `mySql` `typescript`

### git flow

`main` `develop`두 종류의 브랜치를 기본으로 사용합니다.


1. 각 기능이 병합된 `develop` 에서 `main`로 병합합니다.
2. 병합된 `feature-taskname` 브렌치들은 삭제합니다.

## 요구사항 구현 내용



## 실행 방법 정리

```
npm build
npm start
```

```
npm run dev // 개발용
```

### 커밋 컨벤션

`fix:` 버그가 발생해 코드를 고칠 때  
`feat:` 기능을 추가할 때  
`build:` 빌드할 때  
`chore:` 설정 변경 발생시(단순오타 등은 refactor 😊)  
`docs:` 문서 수정(마크다운 파일, swagger doc 등)  
`style:` 코드 스타일 수정(개행 등)  
`refactor:` 코드의 기능변화 없이 수정할 때  
`test:` 테스트파일 관련 작업(jest)

## 회고

### 이전 과제에서의 회고

[이전과제](https://github.com/RunningLearner/Anonymous-Forum)

1. 에러처리를 미처 놓친 부분이 있다.

- 페이지에 게시글 없을 때 에러처리 필요.
- 찾는 게시글이 없을 때 에러처리 필요.

2. `Typescript`, `TypeORM`을 사용은 했지만 너무나도 미숙해서 시간낭비가 있었다.

- 에러타입관련 try catch 숙지 필요.

3. http 에러코드 204.

- 204를 반환하도록 하고 왜 메세지가 안오는지 한참 헤매였다.

4. hash하면 늘어나요~

- DB에서 비밀번호 6자이상을 설정해 놓았지만 4자리로 입력해도 통과 가능했다.
  왜냐하면 bcrypt를 통해 해싱된 비밀번호는 엄청 길기 떄문이다.
  따라서, 해싱을 하기전의 길이로 유효성 검사를 해주어야한다.
  이것떄문에도 시간을 좀 빼았겼다.

5. async 남발

- async 자동완성으로 함수를 만들다가 await 처리하지 않아서 한참을 헤매였다.

6. 다음과제는 `Nest.js`를 써보는 것도 좋을 것 같다.

### 이번 과제에서의 회고
1. 새로운 프레임워크를 다루게 되었는데, 이 과정에서 많은 시간이 걸렸고, 끝내 과제를 완성하지 못하였다.
- 예를들어 리퀘스트 안에 새로운 속성을 부여할 때 타입인식이 안되는 경우에는 커스텁타입으로 새로이 생긴 속성을 명시해야한다..
- 미들웨어를 가드나 다른 데코레이터 형식으로 사용하기 떄문에 많은 것들이 함축되어 있었다..(그것을 모르고 왜 되는거지에 한참 빠져있었다..)
2. 관계형 DB를 처음 짜보았는데, 정규화 문제에 대하여 고민하느라 시간을 많이 써버렸다. (처음부터 완벽한 모델링은 없다.) 

### Made By

🍀 [남승인](https://github.com/RunningLearner)
