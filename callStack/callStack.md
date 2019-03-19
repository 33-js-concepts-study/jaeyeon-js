# Call Stack
 

- JS엔진은 힙과 호출스택으로 구성된 싱글스레드 인터프리터이다.
- 호출스택은 함수 호출에 사용된다. 비동기프로그래밍에서 매우 중요하기때문에 이해를 해야한다.
- Asynchronous Javascript에는 콜백함수, 이벤트루프, 작업큐가 있다. 콜백함수는 이벤트 루프에 의해 콜백함수가 스택에 푸쉬 된 후 실행 중 콜스택에 의해 작동된다.
- ![](/Users/jaeyeonkim/Downloads/1_PPkrowy4n_Pyehb_NdhLrg.png)

- JS는 싱글쓰레드이기 때문에 콜스택이 하나이다. 한번에 하나의 일만 할 수 있다.
- 콜스택은 기본적으로 우리의 프로그램이 어디에 있는지를 기록하는 자료구조이다.


```
function multiply(x, y) {
	return x*y;
}

function printSquare(x) {
	var s = multiply(x, x);
    console.log(s);
}
printSquare(5);
```

![](/Users/jaeyeonkim/Downloads/call-stack.png)

- 호출 스택의 각 단계를 스택프레임이라고 한다.
- 크롬브라우저의 경우 스택프레임 최대사이즈가 16,000이다. 만약에 스택이 초과되면 Max Stack Error Reached에러가 발생을 한다.

![](/Users/jaeyeonkim/Downloads/1_PPkrowy4n_Pyehb_NdhLrg.png)

- 콜스택은 각 스택 스레임의 위치 레코드를 유지 관리한다. 여기서는 다음에 실행될 함수에 대한 정보를 가지고 있다. 실행 후 제거를 한다. 이런 속성으로 JS에서 코드를 동기식으로 만든다.

### 콜스택의 실행원리

```
function firstFunction() {
	console.log('Hello from firstFunction');
}

function secondFunction() {
	firstFunction();
    console.log('secondFunction에서 끝');
}

secondFunction();
```

1. secondFunction()이 실행되면 빈 스택프레임이 생성된다. 
2. 스택에 푸쉬된 secondFunction()이 firstFunction()을 call한다.
3. firstFunction에서 console을 리턴하여 프린트한다.
4. firstFunction이 스택에서 pop된다.
5. secondFunction()이 실행된다. 
6. console.log가 실행되고 secondFuntion이 pop된다.

# 실행컨텍스트

- 실행컨텍스트 : JS가 왜 그렇게 동작하는지 설명해준다. 실행 가능한 JS코드 블록이 실행되는 환경.
- JS가 동작하는 원리를 이해하기 위해서는 실행컨텍스트를 알아야한다.
- 우리가 브라우저에서 매번 JS를 실행시키면, 엔진은 몇가지 단계를 거친다. 그중하나가 Global Execution Context를 생성한다.
- 엔진이란? JS엔진은 JS코드를 실행하는 것을 말한다. JS엔진으로는 GoogleV8과 SpiderMonkey가 있다.
- 엔진은 우리가 JS코드를 동작시킬때마다 Global Execution Context를 생성을 한다.
- 현재 실행되는 컨텍스트에서 이 컨텍스트와 관련 없는 코드가 실행되면, 새로운 컨텍스트가 생성되어 스택에 들어가고 제어권이 그 컨텍스트로 이동한다.!!!

```
var name = 'zero'; // (1)변수 선언 (6)변수 대입
function wow(word) { // (2)변수 선언 (3)변수 대입
  console.log(word + ' ' + name); // (11)
}
function say () { // (4)변수 선언 (5)변수 대입
  var name = 'nero'; // (8)
  console.log(name); // (9)
  wow('hello'); // (10)
}
say(); // (7)

//result
nero
hello zero
```
- wow('hello')가 hello zero인 이유는 lexical scoping때문이다.

1. 처음 코드를 실행(브라우저가 스크립트를 로딩해서 실행)하는 순간 모든 것을 포함하는 전역컨텍스트가 생긴다. 모든것을 관리하기 위한 환경이다. 이 전역컨테스트는 페이지가 종료될때까지 유지가 된다.
2. 함수컨텍스트가 있는데, 함수를 호출할때마다 함수컨텍스트가 생긴다.

### 컨텍스트 4가지 원칙
1. 전역컨텍스트 하나 생성후, 함수 호출 시마다 컨텍스트가 생긴다
2. 컨텍스트 생성 시 컨텍스트 안에 변수객체(arguments, variable), scope chain, this가 생성된다.
3. 컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수객체에서 찾고, 없다면 스코프체인을 따라 올라간다.
4. 함수 실행이 마무리가 되면 해당 컨텍스트는 사라진다.(클로저제외) 페이지가 종료되면 전역컨텍스트가 사라진다.

## 전역컨텍스트
- 전역컨텍스트가 생성후 변수객체, scope chain, this가 들어온다. 전역컨텍스트는 arguments(함수의인자)가 없다. variable은 해당 스코프의 변수들이다.
- scope chain은 자기자신인 전역변수객체이다.
- this는 따로 설정안하면 window

```
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: ['name', 'wow', 'say'],
  },
  scopeChain: ['전역 변수객체'],
  this: window,
}
variable: [{ name: 'zero' }, { wow: Function }, { say: Function }]
```
- 호이스팅때문에 wow, say는 선언과 동시에 대입이 된다.

## 함수컨텍스트

- say()를 하는순간 새로운 컨텍스트인 say함수컨텍스트가 생성된다.
- say()함수에 arguments가 없기때문에 null, variable은 name뿐이다.
- 
```
'say 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: ['name'], // 초기화 후 [{ name: 'nero' }]가 됨
  },
  scopeChain: ['say 변수객체', '전역 변수객체'],
  this: window,
}

```
- say()함수 내에서 wow()함수를 호출했으므로 wow컨텍스트가 생긴다. wow컨텍스트의 arguments는 word='hello'고, scope chain은 wow스코프와 전역스코프이다. 

```
wow 컨텍스트': {
  변수객체: {
    arguments: [{ word : 'hello' }],
    variable: null,
  },
  scopeChain: ['wow 변수객체', '전역 변수객체'],
  this: window,
}
```
- wow함수가 실행되면 word는 arguments에서 찾을 수 있고, name은 wow변수객체에 값이 없으므로 scope chain을 따라 전역스코프에서 찾는다. lexical scoping에 의해 name은 zero이다.


### Execution Context


![](https://www.valentinog.com/blog/wp-content/uploads/2018/05/javascript-what-is-global-execution-context-1.png)

```
let num = 2;

function pow(num) {
	return num*num;
}
```

### How does the engine read that code?

1. 엔진 : 첫째줄에 변수가 있다. 전역메모리에 변수를 비축해라
2. 엔진 : 셋째줄에 함수가 선언되어있다. 전역메모리에 역시 함수를 비축해라
- 엔진은 함수를 실행시키지 않는다. 함수의 선언이지 호출이 아니다.
- 함수선언과 변수는 전역메모리에 선언이 된다.

### Global memory?
- JS의 엔진은 전역메모리를 가지고 있다. 전역메모리는 전역변수와 함수선언들을 포함하고 있다.
- JS코드를 실행시키면 엔진은 Global Execution Context와 Global memory(also called Global scope or global varibale environment)를 생성한다.

![](https://www.valentinog.com/blog/wp-content/uploads/2018/05/javascript-global-execution-context-global-memory.png)

### What is the Execution Context? what is the call stack?

```
let num = 2;
function pow(num) {
	return num*num;
}

let res = pow(num);
```
- 자바스크립트로 함수를 호출하면 엔진이 도움을 요청한다. 그 도움은 call-stack으로 온다.
- 콜스택은 현재 실행의 기록과도 같다.
- 콜스택은 2가지의 메소드를 가지고 있다. pop, push

![](https://www.valentinog.com/blog/wp-content/uploads/2018/05/javascript-call-stack.png)

### What is the execution context? the local execution context

- JS엔진은 전역실행컨텍스트와 전역메모리, 콜스택을 생성한다.
- 코드를 실행시키면 JS엔진은 도움을 요청하고, call-stack에 도움이 온다.
- 콜스택은 어떤 함수들이 호출이 되었는지 계속 추적을 한다. 그러나 함수 실행중에 다른 일이 발생을 하면, 우선 전역실행컨텍스트에 보이게 된다. 그리고 다른 미니컨텍스트가 함수와 함께 나타난다. 그 미니컨텍스트를 지역실행컨텍스트라고 부른다.(Local Execution Context)


### Result
- JS엔진은 Execution Context, global memory, call stack을 만든다.
- 함수를 호출을 하면 엔진은 local momery를 가진 local execution context를 생성한다.

