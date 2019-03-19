## 원시자료형(Primitive)

- 객체를 제외한 모든 타입은 immutable이다.
- 원시타입은 변수에 할당될 때 메모리 상에 고정된 크기로 저장이 된다. 참조타입은 크기가 정해져 있지 않고 변수에 할당될 때 값이 직접 해당 변수에 저장될 수 없다. 변수에는 데이터에 대한 참조만 저장이 된다. 참조는 참조 타입 데이터의 주소이지 해당 값이 아니다.
- 원시형은 리터럴 값으로 만들어지거나 wrapper object로 만들어진다.
- JS의 6가지 원시자료형 : Boolean, null, undefined, number, string, symbol
- 객체형과 달리 원시타입의 값은 그 자체로 가지고 있다. 객체형은 참조형태를 띄고 있다.


## 값타입과 참조형

- JS는 6가지 원시타입과 3가지의 참조타입이 있다.
- boolean, null, undefined, string, number, symbol : primitive type
- array, function, object : reference type


## primitives
- 원시타입은 값을 할당받는다. 변수가 원시타입 값을 가지고 있다고 생각하면 된다.

```
let x = 10;
let y = 'abc'
let z = null;
```
- x가 10을, y가 'abc'를 z가 null을 포함하고 있다.
- 메모리상에서 보면 밑의 그림과 같다.

![](https://cdn-images-1.medium.com/max/1600/1*PdKLlT7zUrmDBZUOBsZh7w.png)

```
let x = 10;
let y = 'abc'

let a = x;
let b = y;

console.log(x, y, a, b); // 10, 'abc', 10, 'abc'
```
- 위와 같이 원시타입을 지닌 변수를 다른 변수에 복사를 하면 새로운 변수가 생성될때 값도 함께 복사가 된다.

![](https://cdn-images-1.medium.com/max/1600/1*MZ3AcwELYZ2ONYFg3LiTXQ.png)

- a,x중에 하나가 바뀌더라도 다른 하나는 그대로의 값을 가지고 있다.

### Object
- non-primitive값을 할당하지 않는 변수는 reference가 주어진다. 참조는 메모리상에 있는 객체의 주소를 가리킨다.
- 변수가 실제로 값을 포함하고 있지는 않다.

```
1) let arr = [];
2) arr.push(1);
```

![](https://cdn-images-1.medium.com/max/1600/1*h1aXuPwCyhu6GKwgeFMLDw.png)
![](https://cdn-images-1.medium.com/max/1600/1*HaemMnuU05EW1b3BZPubIg.png)

```
let reference = [1];
let refCopy = reference;
```

![](https://cdn-images-1.medium.com/max/1600/1*d2W3ulHbHRGrFQ-c1SG5gA.png)
