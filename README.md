# Fail-archive

## 1. 개요
자신의 실패 경험을 공유 할 수 있는 게시판 위주의 커뮤니티

## 2. 기술 스택
 Next.js, Typescript, Zod, Supabase(Postgres DB), Shadcn, Zustand, Vercel

 ## 3. 구조
1. 게시글에 태그기능을 추가해 분류 및 검색할 수 있게 했습니다. 또한 태그 검색중 자동 완성 백엔드 api를 추
가 했습니다.
2. Next.js의 instrumentation 기능을 이용해 태그 자동완성시 DB 조회가 아닌 서버내 메모리에서 찾도록 하였습
니다. 최초 서버 실해시 Supabase fetch, 그 이후, realtime DB 연결로 새로운 태그를 배열에 추가 하는 구조를
채택하였습니다.
3. 클라이언트에서 태그 자동완성 기능에 디바운싱 라이브러리를 이용하여 불필요한 서버 부하를 최소화 하였습
니다.
4. Supabase는 PosgresDB에 접근하는 Javascript API를 제공합니다. 그렇기 때문에 일반적인 방식처럼 백엔드가
DB 전면에 나서서 데이터 입출력을 통제하는 구조와는 다릅니다. Postgres function을 통한 RPC 호출과 RLS
작업을 통하여 트랜잭션, 데이터 접근 인가를 구현하였습니다.
5. 전체 등록된 태그를 관리를 위해 태그 테이블을 두었습니다. 각 게시글에 적용되는 태그는 Many to Many 구
조 대신 게시글마다 반정규화된 배열 컬럼을 두고 GIN 인덱스를 적용하였습니다