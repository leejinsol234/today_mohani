# Springboot와 React, Oracle 통합 AWS 배포하기
## 1. Infra Structure 설계 <br>
![infra structure](https://github.com/leejinsol234/today_mohani/assets/140874690/0171c811-3e3c-4a84-ba41-e62d4b2c0fb9)
<br>
## 2. 가상 네트워크 구축<br>
1) VPC 생성
2) 인터넷 게이트웨이 생성
3) VPC-인터넷 게이트웨이 연결
4) 서브넷 생성
5) 라우팅 테이블 생성
6) 서브넷-라우팅 테이블 연결
7) 보안 그룹 생성
## 3. 인스턴스 생성<br>
연결 확인하기
## 4. RDS 생성<br>
1) 서브넷 그룹 생성
2) 파라미터 그룹 생성
3) 옵션 그룹 생성
4) 데이터베이스 생성
5) MySQL 연결 확인
## 5. 빌드 환경 구축
설치 중 오류
gradle.build에서 스프링부트 플러그인 버전 연동이 요구됨.
-> Spring Boot plugin 버전 맞춰서 설치해야 됨!