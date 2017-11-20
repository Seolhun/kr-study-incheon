# Vue Study In Incheon - Day 2.
## Vue Component

- Author : jhbaik
- IDE : Visual Studio Code
- Version : Vue 2.5.3
- Started Date : 2017.11.19

---

# 1. 컴포넌트

html 엘리먼트를 확장하여 캡슐화
전체어플리케이션은 컴포넌트의 조합으로 이루어지게 된다.
어플리케이션을 어떻게 컴포넌트의 조합으로 나눌껀지 결정하고 컴포넌트를 생성하여 배치한다. 

부모 컴포넌트는 자식 컴포넌트에게 **Prop(속성)** 를 통해 데이터를 전달하고, 
자식 컴포넌트는 부모 컴포넌트에게 **emit 으로 이벤트**를 보내 상호작용을 한다.
비 부모-자식 (sibling or any) 컴포넌트의 경우는 **더미 vue 인스턴스를 event bus** 로 사용하여 **\$emit 하고, \$on** 하여 사용할 수 있다.

<img src="https://joshua1988.github.io/images/posts/web/vuejs/components.png" width="250px"/>  <img src="https://kr.vuejs.org/images/props-events.png" width="250px"/>   <img src="https://ob6mci30g.qnssl.com/Blog/ArticleImage/51_12.png" width="250px">

#### 전역 컴포넌트를 등록

> ```html
> <div id="example">
>   <my-component > </my-component>
> </div>
>
> <script>
> Vue.component('my-component'  // tagName (lowercase and hyphen) MyComponent
> 			, {				// options 
> 							// (vue 인스턴스 옵션과 비슷하지만 data를 함수로 사용해야한다.)
>               template: '<div>사용자 정의 컴포넌트 입니다!</div>',		// 인라인 
>               data : function() {
>                 return {
>                   counter : 0
>                 }
>               }
> 			});
> 			
> // 루트 인스턴스 생성
> new Vue({
>   el: '#example'
>   // template: '<div>사용자 정의 컴포넌트 입니다!</div>',		// 인라인
>   // Render : ()=>{}
> })
> </script>
> ```

- 컴포넌트의 `data` 속성은 꼭 함수로 작성해야한다. 
  - 또한 함수에서 새로운 객체를 반환하여야 한다.  
  - 일반 전역 데이터 객체를 넘겨 공유하면 모든 컴포넌트가 데이터를 공유하게 된다. 
  - > ```html
    > <script>
    > // 오류
    > Vue.component('my-component', {
    >   data: {
    >     message: 'hello'
    >   }
    > })
    > // 데이터 공유
    > var data = { text: 'hello' }
    > Vue.component('my-component', {
    >   data: function () {
    >     return data;
    >   }
    >   // 모든 컴포넌트가 같은 값을 공유하지 않게 아래와 같이 수정
    >   // data: function () {
    >   //   return {
    >   //     text: 'hello'
    >   //   }
    >   // }
    > })
    > </sciprt>
    > ```

- Vue 인스턴스를 생성하기전에 꼭 Component 부터 등록!
- tagName 은 kebab-case 로 사용을 권장한다. 그렇지 않았더라도 HTML 은 kebab-case (lowercase hyphen 표기법) 을 사용해야한다. (html property, attribute, tag.. )
- template 의 root 요소는 하나여야 한다. 
- template 표기방법
  - 인라인 표기 (component 등록시에 template 문자열 지정 )  // 비추
  - inline-template (component 사용시에 내부에서 바로 사용 - inline-template 명시) // 비추
  - \<template> 태그 (.vue 파일에서 주로 사용)
  - \<script type="text/x-template" id="templateId">   // 비추

- 렌더링 
  > ```html
  > <div id="example">
  >   <div>사용자 정의 컴포넌트 입니다!</div>
  > </div>
  > ```

#### 지역 컴포넌트 등록

> ```html
> <script>
> var Child = {
>   template: '<div>사용자 정의 컴포넌트 입니다!</div>'
> }
>
> new Vue({
>   // ...
>   components: {
>     // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
>     'my-component': Child
>   }
> })
> </script>
> ```

- 지역 컴포넌트 등록은 array [ ... ] 로도 가능하다 


#### \.vue 단일 파일 컴포넌트 - vue-loader 에 의해 파싱되어 지원되어진다. 

- ES6 나 CSS 빌드 등을 지원하게 되며, 컴포넌트 단위로 분리, 관리할 수 있다. 템플릿도 깔끔하게 작성가능.
- vue.component 하지 않음 (자동), 반드시 export 해야함. 
- template 에 id 부여하지 않음 (자동)
- 사용할때는 import 해서 사용함. 
- vetur 에서 scaffold 로 Snippet 할 수 있음

- \.vue 파일

  > ```html
  > <template>	// id 부여하지 않음
  >   <div>
  >     component test-son1<br/>
  >     {{text}}-{{isComplete}}
  >   </div>
  > </template>
  >
  > <script>
  > export default {	// vue.component 하지 않음, 반드시 export 해야함.
  >   name: 'ZVueCompSon',
  >   data () {
  >     return {
  >     }
  >   },
  >   props : ['text','isComplete'],
  >   computed : {
  >   },  
  >   methods : {
  >   }  
  > }
  > </script>
  >
  > <style>
  > </style>
  > ```

#### DOM template 제한 사항 및 해결책

> ```html
> <!-- 문제 : <table> 은 하위에 가질 수 있는 element 가 제한이 있다 -->
> <table>
>   <my-row>...</my-row>
> </table>
> ```

> ```html
> <!-- is 특수 속성 사용 -->
> <table>
>   <tr is="my-row"></tr>
> </table>
> ```

**다음 소스 중 하나에 포함되면 문자열 템플릿을 사용하는 경우에는 이러한 제한 사항이 적용되지 않습니다.**:

- \<script type="text/x-template">
- JavaScript 인라인 템플릿 문자열
- \.vue 컴포넌트 (단일파일 컴포넌트)
- \<template> 를 사용할때는 is 특수 속성을 사용해야한다. 

따라서 가능한 경우 항상 문자열 템플릿을 사용하는 것이 좋습니다.

# 2. Props  

상위 컴포넌트의 데이터를 하위 컴포넌트로 전달하는 사용자 지정 특성.

- 컴포넌트 정의할때 props 지정

> ```html
> <script>
> Vue.component('child', {  
> // props 정의  
> ***props: ['MyMessage'],***
> // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며  
> // vm의 this.MyMessage로 사용할 수 있습니다.  
> template: '<span>{{ MyMessage}}</span>'})
</script>
> ```

- 컴포넌트 사용할때 props 전달

> ```<child my-message="안녕하세요!"></child>```

- 동적 Props 바인딩

> ```<child :my-message="parentMsg"></child>```

- v-bind 을 이용한 객체 Props 바인딩

> ```html
> todo: {  text: 'Learn Vue',  isComplete: false}
> ```
>
> ```html
> <todo-item v-bind="todo"></todo-item>
> ```
> 아래와 같다.
> ```html
> <todo-item
>   v-bind:text="todo.text"
>   v-bind:is-complete="todo.isComplete"
> ></todo-item>
> ```

- 리터럴 구문은 문자열이기 때문에 숫자 상수를 전달하고자 하면 v-bind 를 이용하여 전달해야한다.

- 단방향 (상위==>하위)  흐름 : 상위 데이터가 업데이트 되면 하위는 업데이트 되지만 하위에서 업데이트 되면 상위는 업데이트 되지 않는다.

- primitive 일 경우에는 하위컴포넌트에서 받은 prop 를 업데이트 하면 하위 컴포넌트에만 반영되면서 워닝이 나오고, object 일 경우에는 하위컴포넌트에서 받은 prop 를 업데이트 하면 워닝 없이 모든 컴포넌트가 업데이트 된다. 

- 만약 하위에서 prop 로 데이터를 받은 후에 해당 데이터를 업데이트 하고자 하면 ==> 새로운 내부 데이터를 만들어 상위에서 받은 prop 는 초기값으로만 사용한다. 

  >props: ['initialCounter'],data: function () {  return { counter: this.initialCounter }}

- 만약 값은 업데이트 되지 않지만, 상위에서 받은 prop 를 변형해서 고정시키고자 한다면 computed 를 사용한다. 

  >props: ['size'],computed: {  normalizedSize: function () {    return this.size.trim().toLowerCase()  }}

- 컴포넌트는 자신의 props 의 요구사항을 지정하여 검증할 수 있고, 요구사항이 충족되지 않으면 워닝이 나온다. 이때는 props 를 배열이 아닌 객체 타입으로 사용한다. 

  > ```html
  > Vue.component('example', {
  >   props: {
  >     // 기본 타입 확인 (`null` 은 어떤 타입이든 가능하다는 뜻입니다)
  >     propA: Number,
  >     // 여러개의 가능한 타입
  >     propB: [String, Number],
  >     // 문자열이며 꼭 필요합니다
  >     propC: {
  >       type: String,
  >       required: true
  >     },
  >     // 숫자이며 기본 값을 가집니다
  >     propD: {
  >       type: Number,
  >       default: 100
  >     },
  >     // 객체/배열의 기본값은 **팩토리 함수에서 반환 되어야 합니다.**
  >     propE: {
  >       type: Object,
  >       default: function () {
  >         return { message: 'hello' }
  >       }
  >     },
  >     // 사용자 정의 유효성 검사 가능
  >     propF: {
  >       validator: function (value) {
  >         return value > 10
  >       }
  >     }
  >   }
  > })
  > ```

- > `type`은 다음 네이티브 생성자 중 하나를 사용할 수 있습니다.
  >
  > - String
  > - Number
  > - Boolean
  > - Function
  > - Object
  > - Array
  > - Symbol
  >
  > 또한, `type` 은 커스텀 생성자 함수가 될 수 있고, assertion은 `instanceof` 체크로 만들어 질 것입니다.
  >
  > props 검증이 실패하면 Vue는 콘솔에서 경고를 출력합니다(개발 빌드를 사용하는 경우). props는 컴포넌트 인스턴스가 **생성되기 전**에 검증되기 때문에 `default` 또는 `validator`함수 내에서 `data`, `computed` 또는 `methods`와 같은 인스턴스 속성을 사용할 수 없습니다.



# 3. event 및 기타 속성

- props 가 아닌 속성을 컴포넌트에 전달하게 되면  

  - 일단 모두 컴포넌트 root element 에 자동으로 추가된다. 
  - 중첩 (컴포넌트 내부에서도 있고, 상위에서도 전달되어 자동으로 추가된 속성) 된 속성의 경우
    - style : 합쳐져서 최종적인 style 을 만든다.  
    - 그외 : 전달된 속성이 내부 속성을 대체한다. 

- 이벤트 트리거(발산)

  - $emit : 이벤트 트리거

- 이벤트 감지 등록

  - v-on : 템플릿에 자식에서 호출한 이벤트 감지 등록  ($on 은 자식 이벤트는 감지하지 않음)
  - \$on  : 자식 이외의 이벤트 감지 등록 (더미 vue 객체 (이벤트버스) 와 \$emit, $on 을 통한 통신)
  - 컴포넌트에서 발행한 이벤트가 기본 이벤트와 이름이 같다면 
    - 기본적으로 컴포넌트에서 발생한 이벤트로 인식된다.
    - 구별하고자 하면 v-on:click.native="xxx" 처럼 native 수식어를 붙여준다. 


  - > ```html
    > <div id="counter-event-example">
    >   <p>{{ total }}</p>
    >   <button-counter v-on:increment="incrementTotal"></button-counter>
    >   <button-counter v-on:increment="incrementTotal"></button-counter>
    > </div>
    > ```
    >

- > ```html
  > Vue.component('button-counter', {
  >   template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  >   data: function () {
  >     return {
  >       counter: 0
  >     }
  >   },
  >   methods: {
  >     incrementCounter: function () {
  >       this.counter += 1
  >       this.$emit('increment')
  >     }
  >   },
  > })
  >
  > new Vue({
  >   el: '#counter-event-example',
  >   data: {
  >     total: 0
  >   },
  >   methods: {
  >     incrementTotal: function () {
  >       this.total += 1
  >     }
  >   }
  > })
  >  
  > ```

- .sync 수식어 : 양방향바인딩(??) 이라기보다는 update:name 이벤트수신에 대한 syntex sugar.

- 사용자정의 입력 컴포넌트

  - v-model 로 앙방향 바인딩 할 수 있다. 

  - v-model 을 사용하면 컴포넌트는 value prop 를 가져야하고, input 이벤시에 상위로 input 이벤트를 $emit 하여야 한다. 

  - checkbox 등의 특수 타입 입력 컴포넌트를 위해 v-model 을 커스텀할 수 있다. 

    - > ```html
      > Vue.component('my-checkbox', {
      >   model: {
      >     prop: 'checked',
      >     event: 'change'
      >   },
      >   props: {
      >     // 다른 목적을 위해 `value` prop를 사용할 수 있습니다.
      >     checked: Boolean,
      >     value: String
      >   },
      >   // ...
      > })
      >
      > ```
      >
      > ```
      > <my-checkbox v-model="foo" value="some value"></my-checkbox>
      >
      > ```
      >
      > 아래와 같습니다
      >
      > ```html
      > <my-checkbox
      >   :checked="foo"
      >   @change="val => { foo = val }"
      >   value="some value">
      > </my-checkbox>
      > ```

  ​


# 4. 슬롯

- 범위 컴파일

  - 상위 데이터는 상위 범위로 컴파일 되며, 하위 데이터는 하위 범위로 컴파일 된다. 

- 단일 슬롯

  - 기본적으로 상위에서 component 태그 안의 컨텐츠는 삭제된다. 
  - component template 안에 <slot> 이 있다면 상위의 component 태그 안의 컨텐츠가 <slot> 위치에 삽입되어 <slot> 을 대체한다. 
  - 이는 prop 로 html 문자열을 전달하기 귀찮은 문제를 해결한다. 

- 이름을 가지는 슬롯

  - 슬롯이 여러개 있다면 slot 이 이름을 가질 수 있다. 상위에서 component 태그 안의 컨텐츠에 slot 이름을 주어 대체할 위치를 지정할 수 있다. 이때 이름이 없는 기본 slot 이 하나 존재할 수 있고, 이 기본 슬롯은 이름 없는 컨텐츠의 포괄적 컨테이너가 된다. 

- 범위를 가지는 슬롯

  - component 가 slot 을 가지고, 상위에서 component 태그 안의 컨텐츠(template 포함 모든 component 나 element) 가 sslot-scope 를 가지면 하위 component 의 slot 태그에서 지정된 속성 (prop) 를 사용할 수 있다. 

  - > 범위가 지정된 슬롯은 이미 렌더링 된 엘리먼트 대신 재사용 가능한 템플릿(데이터를 전달할 수 있음)으로 작동하는 특별한 유형의 슬롯입니다.
    >
    > prop을 컴포넌트에게 전달하는 것처럼, 하위 컴포넌트에서 단순히 데이터를 슬롯에 전달하면 됩니다.
    >
    > ```html
    > <div class="child">
    >   <slot text="hello from child"></slot>
    > </div>
    >
    > ```
    >
    > 부모에서, 특별한 속성 `scope-scope`를 가진 `<template>` 엘리먼트가 있어야 합니다. 이것은 범위를 가지는 슬롯을 위한 템플릿임을 나타냅니다. `slot-scope`의 값은 자식으로부터 전달 된 props 객체를 담고있는 임시 변수의 이름입니다:
    >
    > ```html
    > <div class="parent">
    >   <child>
    >     <template slot-scope="props">
    >       <span>hello from parent</span>
    >       <span>{{ props.text }}</span>
    >     </template>
    >   </child>
    > </div>
    >
    > ```
    >
    > 위를 렌더링하면 출력은 다음과 같습니다.
    >
    > ```html
    > <div class="parent">
    >   <div class="child">
    >     <span>hello from parent</span>
    >     <span>hello from child</span>
    >   </div>
    > </div>
    >
    > ```
    >
    > > 2.5.0+에서, `slot-scope` 는 더이상 `<template>` 뿐 아니라 컴포넌트나 엘리먼트에서도 사용할 수 있습니다.
    >
    > 범위가 지정된 슬롯의 보다 일반적인 사용 사례는 컴포넌트 사용자가 리스트의 각 항목을 렌더링하는 방법을 사용자 정의할 수 있는 리스트 컴포넌트입니다.
    >
    > ```html
    > <my-awesome-list :items="items">
    >   <!-- scoped slot 역시 이름을 가질 수 있습니다 -->
    >   <li
    >     slot="item"
    >     slot-scope="props"
    >     class="my-fancy-item">
    >     {{ props.text }}
    >   </li>
    > </my-awesome-list>
    >
    > ```
    >
    > 그리고 리스트 컴포넌트의 템플릿 :
    >
    > ```html
    > <ul>
    >   <slot name="item"
    >     v-for="item in items"
    >     :text="item.text">
    >     <!-- 대체 컨텐츠는 여기입니다. -->
    >   </slot>
    > </ul>
    >
    > ```

- 디스트럭처링 

  - slot-scope 에서 객체로 받아서 obj.name 형태로도 사용가능하고, 
  - ES2015 디스트럭처 표현식으로도 사용가능하다. {name1, name2...}


# 5. 동적컴포넌트

- 컴포넌트를 이름으로 바꿔 넣을 수 있다. 

  - >```html
    >var vm = new Vue({
    >  el: '#example',
    >  data: {
    >    currentView: 'home'
    >  },
    >  components: {
    >    home: { /* ... */ },
    >    posts: { /* ... */ },
    >    archive: { /* ... */ }
    >  }
    >})
    >```
    >
    >```html
    ><component v-bind:is="currentView">
    >  <!-- vm.currentView가 변경되면 컴포넌트가 변경됩니다! -->
    ></component>
    >```

- 이때 바뀌여서 없어지는 (비활성??) 컴포넌트를 캐시하기 위해서 <keep-alive> 를 사용할 수 있다. 

  - > ```html
    > <keep-alive>
    >   <component :is="currentView">
    >     <!-- 비활성화 된 컴포넌트는 캐시 됩니다! -->
    >   </component>
    > </keep-alive>
    > ```


# 6. 기타

- 재사용 가능한 컴포넌트 제작하기

  - prop, event, slot  이용하여 잘 설계된 컴포넌트.

- 자식 컴포넌트 참조 : ref 속성을 줘서 자식 직접 참조

  - > ```html
    > <div id="parent">
    >   <user-profile ref="profile"></user-profile>
    > </div>
    > ```

  - > ```html    
    > var parent = new Vue({ el: '#parent' })
    > // 자식 컴포넌트 인스턴스에 접근합니다.
    > var child = parent.$refs.profile
    > ```

- 비동기 컴포넌트 & 고급 비동기 컴포넌트

  - 컴포넌트를 비동기로 필요할때 로드할 수 있다. 
  - https://jsfiddle.net/changjoo_park/em578twu/

- 컴포넌트 이름 규약

  - 컴포넌트나 prop 등록할때 kebab/camel/pascal case 를 사용가능하나 html 에서는 kebab 만 가능.

- 재귀 컴포넌트 & 컴포넌트 사이의 순환 참조

  - 재귀로 컴포넌트를 사용할 수 있다.
  - tree 컴포넌트등.. 
  - stackoverflow 가능성 있다. 

- 인라인 템플릿

  - component 사용하면서 inline-template 이라고 명시하고 바로 html 템플릿 사용.

- X-Templates

  - script 에 템프릿 표기 (비추) 

- v-once를 이용한 비용이 적게드는 정적 컴포넌트

  - 정적인 컴포넌트라면 v-once 속성을 이용하면 캐시하여 빠르다.
  - 데이터는 초기값을 제외하고는 바인딩 되지 않음.

- component 에서 css (스타일) = .vue 

  - 전역
  - scoped
  - computed



