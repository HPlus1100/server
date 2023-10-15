# Gitflow

Gitflow 워크플로우는 Vincent Driessen이 제안한 것으로, 소프트웨어 개발 프로젝트의 전체 수명주기에 걸쳐 효과적인 버전 관리를 지원하도록 설계되었습니다.

<img src="https://techblog.woowahan.com/wp-content/uploads/img/2017-10-30/git-flow_overall_graph.png" width="700" />

## Description

### 중앙 저장소 Workflow

Gitflow 는 중앙 저장소 워크플로우를 기반으로 합니다. 모든 개발자는 프로젝트의 코드를 로컬에 클론하여 작업하고, 작업이 완료되면 중앙 저장소에 푸시합니다.

### Feature 브랜치 Workflow

`feature` 브랜치는 새로운 피처를 개발하는 동안 `master` 브랜치를 깨뜨리지 않도록 하는 격리된 환경을 제공합니다. 개발이 완료되면 이 피처 브랜치는 `develop` 브랜치로 병합됩니다.

### Gitflow Workflow의 핵심 아이디어

Gitflow 는 이러한 브랜치 구조를 확장하여, 프로젝트의 릴리스 주기에 더 잘 맞게 조정하였습니다. 그 결과 두 개의 메인 브랜치와 여러 지원 브랜치가 만들어졌습니다.

### Gitflow의 브랜치

Gitflow 워크플로우는 다음의 두 가지 유형의 브랜치를 사용합니다: 메인 브랜치와 지원 브랜치.

- 메인 브랜치: `master`와 `develop` 브랜치로, 모든 브랜치의 변화들이 결국 이 두 브랜치로 병합됩니다.
- 지원 브랜치: 특정 목적을 위해 생성되었다가 사용 후 삭제되는 브랜치로, `feature`, `release`, `hotfix` 브랜치가 있습니다.

### Feature 브랜치

피처 브랜치는 새로운 피처나 버그 수정을 위한 것입니다. `develop` 브랜치에서 분기하며, 작업이 완료되면 `develop` 브랜치로 병합됩니다.

### Release 브랜치

릴리스 브랜치는 새로운 프로덕션 릴리스를 준비하는 데 사용됩니다. 이 브랜치는 `develop`에서 분기하며, 준비가 완료되면 `master`와 `develop`에 병합됩니다.

### Hotfix 브랜치

핫픽스 브랜치는 프로덕션 릴리스에서 발생한 버그를 긴급하게 수정하는 데 사용됩니다. 이 브랜치는 `master`에서 분기하며, 수정이 완료되면 `master`와 `develop`에 병합됩니다.

## Rules

### 브랜치 네이밍 규칙

- `Feature` 브랜치: 새로운 기능이나 버그 수정 작업에 사용되며, `feature/기능-이름`의 형식을 따릅니다. 예를 들어, 로그인 버튼을 추가하는 경우 `feature/add-login-button` 등의 이름을 사용할 수 있습니다.
- `Release` 브랜치: 새로운 프로덕션 릴리스 준비에 사용되며, `release-버전번호` 형식으로 이름이 지정됩니다. 예를 들어, 첫 번째 릴리스를 준비하는 경우 `release-1.0.0`와 같이 명명합니다.
- `Hotfix` 브랜치: 프로덕션 릴리스에서 발생한 긴급한 버그 수정에 사용되며, `hotfix/수정내용` 형식으로 이름이 지정됩니다. 예를 들어 앱 시작 시 충돌을 수정하는 경우 `hotfix/fix-crash-on-startup`과 같이 명명합니다.

## git 병합 방식

![github-flow-repository-structure](https://techblog.woowahan.com/wp-content/uploads/img/2017-10-30/github-flow_repository_structure.png)

<img src="https://nvie.com/img/merge-without-ff@2x.png" width="500" />

1.  **Upstream Repository의 develop branch를 fetch하고 이를 기반으로 새로운 feature 브랜치 생성:**

    - 로컬에 upstream repository를 추가합니다.

      ```
      git remote add upstream <upstream repository url>
      ```

    - Upstream Repository의 변경 사항을 fetch 합니다.

      ```
      git fetch upstream
      ```

    - 로컬 develop branch를 upstream의 develop branch로 설정합니다.

      ```
      git checkout -b develop upstream/develop
      ```

    - 이제 새로운 기능을 위한 feature 브랜치를 생성합니다.

      ```
      git checkout -b feature/new_feature
      ```

2.  **새로운 기능 개발 및 commit:**

    - 새로운 기능을 개발하고 이를 commit합니다. 이때, 여러 개의 commit이 생성될 수 있습니다.

      ```
      git add .
      git commit -m "Develop new_feature part 1"
      git add .
      git commit -m "Develop new_feature part 2"
      ```

3.  **여러 개의 commit을 하나로 합치기:**

    - interactive rebase 명령을 통해 최근 commit들을 합칩니다.

      ```
      git rebase -i HEAD~2
      ```

    - 이때, 첫 commit은 `pick`으로 두고, 나머지 commit들은 `squash` 또는 `fixup`으로 설정해 합칠 수 있습니다.

4.  **작업 브랜치를 `upstream/develop`에 rebase하기:**

    - **`rebase`**를 통해 최신의 develop branch를 기반으로 변경사항을 재배치하며 conflict를 해결합니다.

      ```
      git pull -–rebase upstream develop
      ```

5.  **로컬의 feature 브랜치를 origin으로 push:**

    - 로컬의 feature 브랜치를 origin repository에 push합니다.

      ```
      git push origin feature/new_feature
      ```

6.  **Pull request를 생성:**

    - Github이나 Gitlab과 같은 웹 인터페이스를 통해 `pull request`를 생성합니다.
    - `Pull request`의 base branch를 `upstream repository`의 `develop branch`로 설정하고, compare branch를 `origin`의 `feature/new_feature`로 설정합니다.

7.  **Pull request 리뷰**:

    - 같은 `feature`를 개발하는 동료 또는 대표 리뷰어에게 리뷰 승인을 받은 후 자신의 `Pull Request`를 `merge`합니다.

8.  **Pull request가 merge 되면 로컬의 develop 및 feature 브랜치를 삭제:**

    - 로컬에서 develop 브랜치로 이동합니다.

      ```
      git checkout develop
      ```

    - 로컬의 feature 브랜치를 삭제합니다.

      ```
      git branch -d feature/new_feature
      ```

이와 같이 Git Flow 전략을 따르면서 새로운 기능을 개발하고, 이를 upstream repository에 반영하는 전체 과정을 수행할 수 있습니다.

## Conventional commit

| 키워드   | 사용                                                                  |
| -------- | --------------------------------------------------------------------- |
| feat     | 새로운 기능 추가                                                      |
| fix      | 버그 수정                                                             |
| docs     | 문서 수정                                                             |
| style    | 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)기능 수정이 없는 경우 |
| design   | 사용자 UI 디자인 변경 (CSS 등)                                        |
| test     | 테스트 코드, 리팩토링 테스트 코드 추가                                |
| refactor | 코드 리팩토링                                                         |
| build    | 빌드 파일 수정                                                        |
| ci       | CI 설정 파일 수정                                                     |
| perf     | 성능 개선                                                             |
| chore    | 빌드 업무 수정, 패키지 매니저 수정 (gitignore 수정 등)                |
| rename   | 파일 혹은 폴더명을 수정만 한 경우                                     |
| remove   | 파일을 삭제만 한 경우                                                 |

# 참고

[https://techblog.woowahan.com/2553/](https://techblog.woowahan.com/2553/)

[https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

[https://www.dropbox.com/s/yazdsa7q0wjizyz/GIT을 기반으로 한 프로젝트 개발 프로세스](https://www.dropbox.com/s/yazdsa7q0wjizyz/GIT%EC%9D%84)

[https://velog.io/@emrhssla/그림으로-이해하는-merge-no-ff-squash-rebase-그리고-pull-requestPR](https://velog.io/@emrhssla/%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-merge-no-ff-squash-rebase-%EA%B7%B8%EB%A6%AC%EA%B3%A0-pull-requestPR)
