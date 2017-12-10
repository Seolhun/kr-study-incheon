# Vuex
- vue.js 어플리케이션에 대한 ***상태관리패턴+라이브러리***  
  모든 컴포넌트에 대한 중앙집중식 저장소 역할을 한다. 

vue를 위한 flux 구현체 (react 의 redux 같은)

<img src="https://vuex.vuejs.org/kr/images/vuex.png" width="500px"/> 

- 컴포넌트는 상태를 데이터로 바인딩하여 렌더링을 한다.
- 상태가 변하면 Dispatch 로 Actions 를 실행하여 상태를 변경(commit) 한다.
- mutations 한다.
- 새로운 상태는 컴포넌트에 업데이트 된다.
- 이렇게되면 상태에 대한 추적이 가능한 기록이 남을 수 있어 개발에 용이하다. 
- (개인적인 생각으로) 이벤트소싱, CQRS 와 느낌적으로 비슷하다. 

실제로 Dan Abramov는 공식 tutorial문서에서 이렇게 얘기하고 있다.

```
Following in the steps of Flux, CQRS, and Event Sourcing, Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen. These restrictions are reflected in the three principles of Redux.
```
https://deminoth.github.io/redux/introduction/Motivation.html

(Command Query Responsibility Segregation)
```
CRQS는 (데이터를 변경하는) Command 부분을 (데이터를 읽어들이는) Query 로부터 분리시킨다
```

컴포넌트에 공유된 상태들을 추출하여 이를 전역 싱글톤으로 관리하여 컴포넌트 트리에 관계없이 상태에 접근하거나 동작을 트리거 할 수 있도록 함. 

여러 컴포넌트에 장황한 prop 를 없앨 수 있고, 부모관계가 아닌 컴포넌트들에 대한 이벤트버스 트릭을 없앨 수 있고 전반적으로 코드가 간단하고 유지보수가 쉬운 코드를 작성하게 도와줌.

항상 vuex 가 필요한것을 아니고, 
모든 상태를 store 에 넣어서 관리할 필요도 없다. 
(컴포넌트 국지적인 데이터는 이전처럼 컴포넌트 내부 데이터로 사용하면 된다)

중대형 규모의 SPA 어플리캐이션에서 필요함
Redux의 저자인 Dan Abramov의 좋은 인용.

```
Flux 라이브러리는 안경과 같습니다. 필요할 때 알아볼 수 있습니다.
```
- 개인적인 생각으로는 대부분의 어플리케이션에서 vuex 를 사용하는 편이 더 쉽게 개발/유지보수 가능할듯. 
- 참고링크 : https://github.com/stepanowon/vuejs_book/blob/master/vuex/about_vuex.md
- ​

## 설치 
- CDN - vue 뒤에 추가
```
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

- NPM
```
npm install vuex --save
```

- YARN - facebook 에서 만든 npm에 대응하는 새로운 패키지 매니저
```
yarn add vuex
```

CDN 으로 사용할때는 그냥 사용하면 되고, 
모듈시스템을 사용할때는 
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```
으로 명시적으로 추가함으로 사용할 수 있다.

## 핵심컨셉

### 1. Store (저장소) 
상태를 보유하고 있는 컨테이너
전역객체와는 2가지 다른점
1). vue store 는 반응형. 저장소의 상태가 변경되면 vue 컴포넌트가 업데이트 됨. 
2). 저장소의 상태를 변경할때 커밋을 이용한 변이를 이용해야함.
### 2. State (상태) - 단일상태트리
Store 에 들어있는 데이터 역할을 한다. (원본소스)
어플리케이션마다 하나의 저장소만 갖는다 (모듈로 나눌수있다.)       

State 를 컴포넌트에서 가져올때는 
전역객체로부터 접근도 가능하지만 

```
// Counter 컴포넌트를 만듭니다
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
        return store.state.count
        }
    }
}        
```
루트컴포넌트에 store 옵션을 사용해 모든 하위 컴포넌트에 저장소를 주입하는 방식을 추천한다. 

```
const app = new Vue({
el: '#app',
// "store" 옵션을 사용하여 저장소를 제공하십시오.
// 그러면 모든 하위 컴포넌트에 저장소 인스턴스가 삽입됩니다.
store,
components: { Counter },
template: `
    <div class="app">
    <counter></counter>
    </div>
`
})

--- 

const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
        return this.$store.state.count
        }
    }
}
```

- 이는 모듈화된 컴포넌트에서 store 를 가져와야 하는것을 피할 수 있다. 
- 테스트 할때 편하다 ???        
- mapState helper
  store 접근하는 method 를 생성해준다. 

```
// 독립 실행 형 빌드에서 헬퍼가 Vuex.mapState로 노출됩니다.
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 화살표 함수는 코드를 매우 간결하게 만들어 줍니다!
    count: state => state.count,

    // 문자열 값 'count'를 전달하는 것은 `state => state.count`와 같습니다.
    countAlias: 'count',

    // `this`를 사용하여 로컬 상태에 액세스하려면 일반적인 함수를 사용해야합니다
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

또한 매핑 된 계산된 속성의 이름이 상태 하위 트리 이름과 같을 때 문자열 배열을 mapState에 전달할 수 있다.
```
computed: mapState([
  // this.count를 store.state.count에 매핑 합니다.
  'count'
])
```
객체 확장 연산자
  로컬 method 와 같이 사용하고자 할때 mapState 는 객체를 반환하기 때문에 객체 확장 연산자를 사용하여 사용할 수 있다. 

```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }

let n = { x, y, ...z };
n; // { x: 1, y: 2, a: 3, b: 4 }
```

### 3. Getters
저장소 상태를 기반하는 상태를 계산할때 사용. (Store 입장에서 computed)
이를 사용하면 같은 computed 를 여러 컴포넌트에서 공유할 수 있는 효과 있다. 

```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
    }
  }
})
```
사용할때 
```
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```
- mapGetters helper
  mapState 와 같이 getters 를 매핑하는 method 를 생성해준다.

### 4. Mutations (변이)
- Store 상태(데이터) 를 변경하는 유일한 방법.
  이벤트와 유사.
- 문자열 타입으로 매핑되는 핸들러를 mutations 에 정의하고 실제 상태를 여기서 변경된다. 
- 사용할때는 mutations 을 직접 호출할 수 없고, store.commit('문자열타입') 을 호출한다. 이벤트등록과 유사.
- commit 할때 payload (전달되는 데이터) 를 같이 전달할 수 있다. 
```
  store.commit('문자열타입', payload )
  store.commit('문자열타입', { payload object} )
```
- 객체스타일 커밋
  객체스타일로 커밋할 수 있고, 이때 type 은 매핑용으로 사용되지만 객체전체가 payload 로 전달된다.
```
  store.commit({type:'문자열타입', data1:val1, data2:val2})
```
- 주의사항 (Vue의 반응성 규칙)

1. 원하는 모든 필드에 앞서 저장소를 초기화하는 것이 좋습니다.
2. 객체에 새 속성을 추가할 때 다음 중 하나를 수행해야합니다.
  - Vue.set(obj, 'newProp', 123)을 사용하거나,
  - 객체를 새로운 것으로 교체하십시오. 예를 들어, 3 단계 객체 전파 문법을 사용하면 다음과 같이 작성할 수 있습니다.
  ```
   state.obj = { ...state.obj, newProp: 123 }
  ```

- 변이문자열 타입을 상수로 선언해 한곳에서 관리하길 추천한다. 

- 변이는 동기적이여야 한다. 

  모든 commit 은 기록되어지고, 추적되어야 하는데 비동기의 경우는 콜백에서 실제 상태가 변경되므로 본질적으로 추적할 수 없게된다. 비동기의 경우는 actions 를 이용하여 수행하고, 결과를 commit 한다. 

- mapMutations helper 를 이용하여 commit method 를 생성할 수 있다. (루트에 store 주입필요)
```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment' // this.increment()를 this.$store.commit('increment')에 매핑합니다.
    ]),
    ...mapMutations({
      add: 'increment' // this.add()를 this.$store.commit('increment')에 매핑합니다.
    })
  }
}
```
### 5. Actions (액션)
mutations 와 유사하나 상태를 직접변경하는것이 아니고, commit 을 하며, 비동기 작업을 할 수 있다. 

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```
사용할때는 commit 이 아닌 dispatch 를 사용한다.
```
store.dispatch('increment')
```
dispatch 는 commit 과 동일하게 payload 를 전달할 수 있다. 

- mapActions helper 를 사용하여 dispath 를 호출하는 method 를 생성할 수 있다 (루트 store 주입 필요)

- actions 는 promise 를 반활 할 수 있고 dispatch 에서 then 으로 이후 작업을 할 수 있다. 

- action 안에 action 을 promise 를 이용해 then 으로 사용할 수 있다. 

- promise 는 async/await 문법으로 사용할 수 있다.

### 6. Module (모듈)
- store 는 단일 상태 트리를 사용하기 때문에 규모가 하나로 커질 위험이 있다. 
- store 를 모듈로 나눌 수 있다. 
```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA'의 상태
store.state.b // -> moduleB'의 상태
```
- mutations : 첫번째 인자 state 는 지역의 state
- getter : 첫번째 인자 state 는 지역의 state , rootState 는 세번째 인자로 전달됨. 
- actions : ctx 는 ctx.state, ctx.rootState 로 접근가능. 

- 이름이 전역으로 사용되기 때문에 접두사/접미사를 사용하여 네임스페이스를 만들어두면 좋다.

- 동적 모듈을 추가할 수 있다.
```
store.registerModule('myModule', {
  // ...
})
```
  vue 플러그인도 저장소 모듈에 연결하여 vuex 를 활용할 수 있다. 

```
store.unregisterModule(moduleName)
```
으로 동적 모듈을 제거할 수 있다. - static 모듈을 제거할 수 없다.

### 7. Devtools
크롬 DevTools 를 설치하면, vuex 저장소의 내용을 조회할 수 있으며, 커밋로그를 볼 수 있고, 타임머신 기능으로 원하는 커밋위치로 이동할 수 있다. 

### 8. 기타
- 플러그인 

변이에 대한 훅을 등록할수 있는 store를 인자로 받는 함수.
```
const myPlugin = store => {
  // 저장소가 초기화 될 때 불립니다.
  store.subscribe((mutation, state) => {
    // 매 변이시마다 불립니다.
    // 변이는 { type, payload } 포맷으로 제공됩니다.
  })
}

// 사용시

const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```
이렇게 store 를 생성할때 plugin 함수를 plugins 에 넣고 생성하면, 초기에 호출되어 subscribe 로 mutation 에 대한 hook 을 등록할 수 있다.

로깅(내장로거가 플러그인 함수로 존재), 특정 mutation 에 작업하기 등등을 할 수 있다. 

- strict 모드 

활성화 하면 변이가 핸드러 외부에서 일어날때 오류를 출력한다. 

```
const store = new Vuex.Store({
  // ...
  strict: true
})
```

개발할때는 사용하고, 배포시에는 성능잇슈로 사용을 추천하지 않는다.
환경설정으로 처리가능하다.

```
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```
- 폼핸들링
  양방향바인딩의 경우 바로 store 의 상태를 바인딩하면, 변이 핸들러 외부에서 store 의 상태가 바뀌게 되므로 문제가 있다. 

  이것을 해결하는 방법은. 
  1. v-model 로 양방향 바인딩 하지 않고, :value 로 단방향 바인딩하고, @input 또는 @change 에서 commit 하면 된다. 
  2. v-model 로 computed 를 양방향 바인딩하고 get/set 을 구현해 set 에서 commit 하면 된다. 

테스팅

핫리로딩

API