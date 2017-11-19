# Vue Study In Incheon - Day 1.

- Author : [SeolHun](https://github.com/Seolhun)
- IDE : SublimeText3 or Webstorm
- Version : Vue 2.5.3
- Started Date : 2017.11.09
---
## To do List 

#### Presentation
1. Build Example & Explanation
    1. Computed Properties and Watchers
    2. Class and Style Bindings
    3. Conditional Rendering
    4. List Rendering
    5. Event Handling
    6. Form Input Bindings

#### Project    
2. Build To do list using Local Storage.
    - To do List(Read, Write, Update, Delete)

---
#### Vue Summary with examples
1. Presentation 1
    1. Computed Properties and Methods
        1. The end result same, but computed method is cached.
            - 최종 결과에 대해 두가지 접근 방식은 서로 동일합니다. 하지만 차이점은 **계산된 속성은 종속성에 따라 캐시된다는 것** 입니다. 
        
    2. Computed Properties and Watchers
        1. 대부분의 경우 계산된 속성이 더 적합하지만 사용자 정의 감시자가 필요한 경우가 있습니다.
        - 데이터 변경에 대한 응답으로 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용합니다.
        
2. Presentation 2
    1. Binding HTML Classes
        1. v-bind:class 디렉티브는 일반 class 속성과 공존할 수 있습니다. 
        2. Object, Array, 3항식 등 다양한 방법으로 클레스를 바인딩 할 수 있습니다.
        3. 아래 예제를 확인해봅시다.
        
        ```html
        data: {
            isActive: true,
            hasError: false
        },
        <!-- 1. Binding classes-->
        <!-- Input -->
        <div class="static"
             v-bind:class="{ active: isActive, 'text-danger': hasError }"
        ></div>
        <!-- Output -->
        <div class="static active"></div>
 
        <!-- 2. Binding object-->
        data: {
           classObject: {
               active: true,
               'text-danger': true
           }
        }
        <!-- Input -->
        <div v-bind:class="classObject"></div>
        <!-- Output -->
        <div class="active text-danger"></div>
 
        <!-- 3. Binding objects using Array-->
        data: {
 			activeClass: 'active',
 			successClass: 'text-success'
        }
        <!-- Input -->
        <div v-bind:class="[activeClass, successClass]"></div>
        <!-- Output -->        
        <div class="active text-success"></div>
 
        <!-- 4. Binding classes using Ternary operator-->
        <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
        ```
        
    2. Binding Attribute with Components
        1. Component를 생성한 후에도 class를 바인딩 할 수 있습니다
        ```html
        <my-component
            v-bind:class="classObject"
            :message="message"
            :name="name"
        >
        </my-component>
 
        Vue.component('my-component', {
            props: ['message', 'name'],
            template: '<div class="text-info"><h1>{{ message }}, {{ name }}</h1></div>',
        })
 
        data: {
 			classObject: {
 				active: true,
 				'text-right': true
 			},
            message: 'Hello',
            name: 'Vue Study'
        }
        ```
        
    3. Binding HTML Style
        1. Style css의 Attribute 값을 사용하는 것 외에는 Binding Classes와 Vue 문법은 일치합니다
        2. Class와 다른 점은 Stlye 문법이므로 간단히 1개의 예제만 보겠습니다
        ```html
        <!-- 1. Binding object-->
        data: {
 			styleObject: {
 				color: 'red',
 				fontSize: '15px'
 			}
        }
        <!-- Input -->
        <div v-bind:style="styleObject">
            <p>Hello, Binding Styles</p>
        </div>
 
        <!-- Output -->
        <div style="color: red; font-size: 25px;">
           <p>Hello, Binding Styles</p>
        </div>
        ``` 

3. Presentation 3
    1. Conditional Rendering
        1. v-if, v-else, 
        2. v-else-if
            - v-else-if는 2.1.0부터 새롭게 추가됨.
            - v-else-if는 여러개를 사용하여 다양한 조건을 적용시킬 수 있습니다
            ```html
            <div v-if="type === 'A'">
              A
            </div>
            <div v-else-if="type === 'B'">
              B
            </div>
            <div v-else-if="type === 'C'">
              C
            </div>
            ```
        2. Controlling Reusable Elements with key
            - Key값을 사용하여 해당 template를 렌더링 할 수 있씁니다
            ```html
            <p>{{ loginType }}</p>
            <template v-if="loginType === 'username'">
                <label>사용자 이름</label>
                <input placeholder="사용자 이름을 입력하세요">
            </template>
            <template v-else>
                <label>이메일</label>
                <input placeholder="이메일 주소를 입력하세요">
            </template>
            ```
        3. v-show
            - v-show는 단순히 엘리먼트에 display CSS 속성을 토글합니다.
            - v-show는 '<template>' 구문을 지원하지 않으며 v-else와도 작동하지 않습니다.
            - 비교해보면, v-show는 훨씬 단순합니다. CSS 기반 토글만으로 초기 조건에 관계 없이 엘리먼트가 항상 렌더링 됩니다.
            
        4. v-if vs v-show
        - v-if는 조건부 블럭 안의 이벤트 리스너와 자식 컴포넌트가 토글하는 동안 적절하게 제거되고 다시 만들어지기 때문에 **진짜 조건부 렌더링 입니다**
        - if와 차이점은 v-show가 있는 엘리먼트는 항상 렌더링 되고 DOM에 남아있다는 점입니다. 
        - v-if는 또한 게으릅니다 초기 렌더링에서 조건이 거짓인 경우 아무것도 하지 않습니다.
            - **아무것도 하지 않는 다는 것은 DOM에 존재하지 않기 때문에 그렇습니다** 
            - 조건 블록이 처음으로 참이 될 때 까지 렌더링 되지 않습니다.
        - Example
            ```html
            <!-- 아래 예제를 보시면 style="display:none;" 을 보실 수 있습니다. -->
            <div class="row">
               <div class="col-sm-12">
                   <div class="col-sm-12 text-success" style="display: none;">
                       <h3>You can see me When condition is "true"</h3>
                   </div> 
                   <div class="col-sm-12 text-success" style="">
                       <h5>Search v-show element using Browser dev tools. can find it.</h5></div> <hr> <!----> <div class="col-sm-12 text-danger"><h5>Search v-if element using Browser dev tools. never find it.</h5>
                   </div>
               </div> 
            </div>
            ```
        5. v-if and v-for
        - v-for는 v-if와 함께 사용하는 경우, v-if보다 높은 우선순위를 갖습니다.
            - **이러한 이유는 v-for로 해당 데이터와 조건을 비교하여 Rendering 할지 말지를 결정해야 하기 떄문입니다**

4. Presentation 4
    1. List Rendering
        1. v-for
        - v-for 디렉티브를 사용하여 배열을 기반으로 리스트를 렌더링 할 수 있습니다.
        - v-for는 객체안에 필드값도 나열할 수 있습니다
        - Key
            - Vue가 v-for에서 렌더링된 엘리먼트 목록을 갱신할 때 기본적으로 “in-place patch” 전략을 사용합니다. 
            - 데이터 항목의 순서가 변경된 경우 항목의 순서와 일치하도록 DOM 요소를 이동하는 대신 **Vue는 각 요소를 적절한 위치에 패치하고 해당 인덱스에서 렌더링할 내용을 반영하는지 확인합니다.**
            - **Vue가 각 노드의 ID를 추적하고 기존 엘리먼트를 재사용하고 재정렬할 수 있도록 힌트를 제공하려면 각 항목에 고유한 key 속성을 제공해야 합니다.** 
            - key에 대한 이상적인 값은 각 항목의 고유한 ID입니다. 이 특별한 속성은 1.x 버전의 track-by와 거의 비슷하지만 속성처럼 작동하기 때문에 v-bind를 사용하여 동적 값에 바인딩 해야합니다. (여기서는 약어를 이용합니다.)
            - Example
                ```html
                <div v-for="item in items" :key="item.id">
                    <!-- content -->
                </div>
                ```
            - 반복되는 DOM 내용이 단순하지 않거나 의도적인 성능 향상을 위해 기본 동작에 의존하지 않는한 가능하면 언제나 v-for에 key를 추가하는 것이 좋습니다.
        - Mutation Methods
          - Vue는 감시중인 배열의 변이 메소드를 래핑하여 뷰 갱신을 트리거합니다. 래핑된 메소드는 다음과 같습니다.
          - 문법 : InstanceName.Data.MethodName
            - push() : - 예: app.items.push({ message: 'Baz' }) : 배열에 마지막 인덱스에 넣기 (LIFO)
            - pop() : - 예: app.items.pop() : 배열에 객체 빼기 (LIFO)
            - unshift() : - 예: app.items.unshift({ message: 'Baz' }) : 배열 첫 인덱스에 넣기
            - shift() : - 예: app.items.shift() : 배열 첫 인덱스 빼
            - splice() - 예: app.items.splice(index, 1) : 해당 인덱스와 갯수를 정하여 빼기
            - sort() - 배열 정렬
            - reverse() - 배열 역순 정렬
            - 콘솔을 열고 이전 예제의 items 배열로 변이 메소드를 호출하여 재생할 수 있습니다. - 예: app.items.push({ message: 'Baz' })
        - Replacing an Array
            - console에 해당 값을 입력하세요
            - 문법 : InstanceName.Data.MethodName
            - Example
                ```javascript
                app.items = app.items.filter(function (item) {
                  return item.message.match(/Foo/)
                })
                ```
        - **Caveat(Warning)**
            - JavaScript의 제한으로 인해 Vue는 배열에 대해 다음과 같은 변경 사항을 감지할 수 없습니다.
                1. 인덱스로 배열에 있는 항목을 직접 설정하는 경우, 예: vm.items[indexOfItem] = newValue
                2. 배열 길이를 수정하는 경우, 예: vm.items.length = newLength
            - 1번을 극복하기 위해 다음 두 경우 모두 vm.items[indexOfItem] = newValue 와 동일하게 수행하며, 반응형 시스템에서도 상태 변경을 트리거 합니다.
            - Example
                ```javascript
                // Vue.set
                Vue.set(example1.items, indexOfItem, newValue);
                // Array.prototype.splice
                app.items.splice(indexOfItem, 1, newValue);
                // 주의 사항 중 2번을 극복하기 위해 splice를 사용해야 합니다.
                app.items.splice(newLength)
                ```
        - **Object Change Detection Caveats**
            - Example
                ```javascript
                var vm = new Vue({
                  data: {
                    a: 1
                  }
                })
                // `vm.a` 는 반응형입니다.
                vm.b = 2
                // `vm.b` 는 반응형이 아닙니다.
                ```
                - Vue는 이미 만들어진 인스턴스에 새로운 루트레벨의 반응형 속성을 동적으로 추가하는 것을 허용하지 않습니다. 
                - 그러나 Vue.set(object, key, value) 메소드를 사용하여 중첩된 객체에 반응형 속성을 추가할 수 있습니다.
                - Example
                    ```javascript
                    Vue.set(vm.userProfile, 'age', 28)
                    // 인스턴스 메소드인 vm.$set를 사용할 수도 있습니다. 이는 전역 Vue.set의 별칭입니다.
                    this.$set(this.userProfile, 'age', 28)
                    ```
        - Displaying Filtered/Sorted Results
            - Filtered Computed
            - Example
                ```html
                <li v-for="n in evenNumbers">{{ n }}</li>
                data: {
                  numbers: [ 1, 2, 3, 4, 5 ]
                },
                computed: {
                    evenNumbers: function () {
                      return this.numbers.filter(function (number) {
                        return number % 2 === 0
                      })
                    }
                }
                ```
            - Filtered Method 
            - Example
                ```html
                <li v-for="n in even(numbers)">{{ n }}</li>
                data: {
                  numbers: [ 1, 2, 3, 4, 5 ]
                },
                methods: {
                  even: function (numbers) {
                    return numbers.filter(function (number) {
                      return number % 2 === 0
                    })
                  }
                }
                ```
        - v-for with Component
            - 2.2.0 이상에서 v-for는 key 가 필수 입니다. 
            - 그러나 컴포넌트에는 자체 범위가 분리되어있기 때문에 컴포넌트에 데이터를 자동으로 전달하지는 않습니다. **반복할 데이터를 컴포넌트로 전달하려면 props도 사용해야합니다.**

5. Presentation 5
    1. EventHandling 
        - Listening to Events
            - v-on 디렉티브를 사용하여 DOM 이벤트를 듣고 트리거 될 때 JavaScript를 실행할 수 있습니다.
            - Example
                ```html
                <button v-on:click="counter += 1">Add 1</button>
                ```
        - Method Event Handlers
            - 많은 이벤트 핸들러의 로직은 더 복잡할 것이므로, JavaScript를 v-on 속성 값으로 보관하는 것은 간단하지 않아 메소드의 이름을 받는 이유입니다.
            - Example
                ```html
                <button v-on:click="increment">Add 1</button>
                <button v-on:click="decrement">Add 1</button>
                ```
                ```javascript
                new Vue({
                    data: {
                        counter: 0
                    },
                    methods: {
                        increment: () => {
                            app.counter += 1;
                        },
                        decrement: () => {
                            app.counter -= 1;
                        }
                    }
                })
                ```
        
        - Methods in Inline Handlers
            - 메소드 이름을 직접 바인딩 하는 대신 인라인 JavaScript 구문에 메소드를 사용할 수도 있습니다.
            - Example
                ```html
                <button v-on:click="warn('Form cannot be submitted yet.', $event)">
                  Submit
                </button>
                ```
                ```javascript
                new Vue({
                    el: '#app',
                    methods: {
                        warn: function (message, event) {
                            // 이제 네이티브 이벤트에 액세스 할 수 있습니다
                            if (event) event.preventDefault()
                            alert(message)
                        }
                    }
                })
                ```
        - Event Modifiers
            - 이 문제를 해결하기 위해, Vue는 v-on 이벤트에 이벤트 수식어를 제공합니다. 수식어는 점으로 표시된 접미사 입니다.
                - .stop
                - .prevent
                - .capture
                - .self
                - .once
            - Example
                ```html
                <!-- 클릭 이벤트 전파가 중단됩니다 -->
                <a v-on:click.stop="doThis"></a>
                <!-- 제출 이벤트가 페이지를 다시 로드 하지 않습니다 -->
                <form v-on:submit.prevent="onSubmit"></form>
                <!-- 수식어는 체이닝 가능합니다(여러개를 묶어서 가능 -->
                <a v-on:click.stop.prevent="doThat"></a>
                <!-- 단순히 수식어만 사용할 수 있습니다 -->
                <form v-on:submit.prevent></form>
                <!-- 이벤트 리스너를 추가할 때 캡처모드를 사용합니다 -->
                <!--  즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
                <div v-on:click.capture="doThis">...</div>
                <!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다 -->
                <!-- 자식 엘리먼트에서는 안됩니다 -->
                <div v-on:click.self="doThat">...</div>
                ```
        - Key Modifiers
            - 키보드 이벤트를 청취할 때, 종종 공통 키 코드를 확인해야 합니다. Vue는 키 이벤트를 수신할 때 v-on에 대한 키 수식어를 추가할 수 있습니다.
            - Example
                ```html
                <!-- keyCode가 13일 때만 vm.submit()을 호출합니다 -->
                <input v-on:keyup.13="submit">
                ```
            - 모든 keyCode들을 기억하는 것은 번거롭기 때문에 Vue는 가장 일반적으로 사용되는 키의 별칭을 제공합니다.
                - .enter
                - .tab
                - .delete (“Delete” 와 “Backspace” 키 모두를 캡처합니다)
                - .esc
                - .space
                - .up
                - .down
                - .left
                - .right
            - Example
                ```html
                <!-- 위와 같습니다 -->
                <input v-on:keyup.enter="submit">
                <!-- 약어 사용도 가능합니다 -->
                <input @keyup.enter="submit">
                ```
                
                - **전역 config.keyCodes 객체를 통해 사용자 지정 키 수식어 별칭을 지정할 수 있습니다.**
                ```javascript
                // v-on:keyup.f1 이 가능합니다
                Vue.config.keyCodes.f1 = 112
                ```
            - Automatic Key Modifers
                - 2.5.0+에서 추가됨
                - KeyboardEvent.key를 통해 노출된 유효 키 이름을 수식어로 직접 사용할 수 있습니다.
                ```html
                <input @keyup.page-down="onPageDown">
                ```
                - 위의 예제에서 핸들러는 $event.key === 'PageDown' 만 호출됩니다.
                - **Warning
                    - 일부 키(.esc와 모든 화살표 키)는 IE9에서 일관성 없는 key 값을 가지고 있습니다. 
                    - IE9를 지원해야하는 경우 내장 알리아스가 선호됩니다.)
        - System Modifier Keys
            - 다음 수식어를 사용해 해당 수식어 키가 눌러진 경우에만 마우스 또는 키보드 이벤트 리스너를 트리거 할 수 있습니다.
                - .ctrl
                - .alt
                - .shift
                - .meta
            - **참고**
                - 매킨토시 키보드에서 meta는 command 키 입니다 (⌘). 
                - Windows 키보드에서 meta는 windows 키 (⊞) 입니다. 
                - Sun Microsystems 키보드에서 meta는 단색의 다이아몬드 (◆)로 표시됩니다.
                - 특정 키보드의 경우, 특히 MIT 및 Lisp 시스템 키보드와 Knight 키보드, space-cadet 키보드와 같은 제품에는 “META” 레이블이 지정됩니다.
                - Symbolics 키보드에서 메타는 “META” 또는 “Meta”로 표시됩니다.
            - .exact Modifier
                - 2.5.0+에서 추가됨
                - .exact 수식어는 다른 시스템 수식어와 조합해 그 핸들러가 실행되기 위해 정확한 조합이 눌러야하는 것을 보여줍니다.
                ```html
                <!-- Alt 또는 Shift와 함께 눌린 경우에도 실행됩니다. -->
                <button @click.ctrl="onClick">A</button>
                <!-- Ctrl 키만 눌려있을 때만 실행됩니다. -->
                <button @click.ctrl.exact="onCtrlClick">A</button>
                ```
            - Mouse Button Modifiers
                - 2.2.0 버전에서 추가됨
                - 다음 수식어를 사용해 해당 수식어 키가 눌러진 경우에만 마우스 또는 키보드 이벤트 리스너를 트리거 할 수 있습니다.
                    - .left
                    - .right
                    - .middle

6. Presentation 6
    1. Form Input Bindings
        - v-model 디렉티브를 사용하여 폼 input과 textarea 엘리먼트에 양방향 데이터 바인딩을 생성할 수 있습니다. 
        - 입력 유형에 따라 엘리먼트를 업데이트 하는 올바른 방법을 자동으로 선택합니다. 
        - 약간 이상하지만 v-model은 기본적으로 사용자 입력 이벤트에 대한 데이터를 업데이트하는 “syntax sugar”이며 일부 경우에 특별한 주의를 해야합니다.
        - **Warning**
            - v-model은 모든 form 엘리먼트의 초기 value와 checked 그리고 selected 속성을 무시합니다. 
            - 항상 Vue 인스턴스 데이터를 원본 소스로 취급합니다. 
            - 컴포넌트의 data 옵션 안에 있는 JavaScript에서 초기값을 선언해야합니다.
    2. **Modifiers**
        - Types
            - .lazy
                - 기본적으로, v-model은 각 입력 이벤트 후 입력과 데이터를 동기화 합니다. (단 앞에서 설명한 IME 구성은 제외됩니다.) .lazy 수식어를 추가하여 change 이벤트 이후에 동기화 할 수 있습니다.
                - Example
                    ```html
                    <!-- "input" 대신 "change" 이후에 동기화 됩니다. -->
                    <input v-model.lazy="msg" >
                    ```

            - .number
                - 사용자 입력이 자동으로 숫자로 형변환 되기를 원하면, v-model이 관리하는 input에 number 수식어를 추가하면 됩니다.
                - Example
                    ```html
                    <input v-model.number="age" type="number">
                    ```
                - type="number"를 사용하는 경우에도 HTML 입력 엘리먼트의 값은 항상 문자열을 반환하기 때문에 이것은 종종 유용하게 사용할 수 있습니다.
            - .trim
                - v-model이 관리하는 input을 자동으로 trim 하기 원하면, trim 수정자를 추가하면 됩니다.
                - Example
                    ```html
                    <input v-model.trim="msg">
                    ```