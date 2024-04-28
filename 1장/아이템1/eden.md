# 타입스크립트는 왜 등장했을까?

블로그 링크: https://velog.io/@jadenkim5179/%EC%9A%B0%EB%A6%AC%EA%B0%80-%ED%83%80%EC%9E%85%EC%9D%84-%EC%A0%95%EC%9D%98%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0

처음 자바스크립트를 사용하면서 많이 놀랐던 기억이 있다.

> ‘어떻게 이런 것까지 되는 거지?’  
> ’이게 왜 되는 거지?’

명시적인 타입이 없는 동적 언어 라고는 하지만, 그 정도가 심하다는 생각이 들었다.  
다음의 구문들은 차라리 에러를 발생시켜주었으면 하는 경우의 예시들이다.

```js
const a = [] + 3; // '3'
const b = {} + 3; // 3
const c = {} + []; // 0
const d = undefined + 3; // NaN
const e = null + 3; // 3

const obj = { name: "HI" };
const cnt = obj.nama + "!!"; // 'undefined!!'

const sum = (a, b) => a + b;
sum(1, 2, 3); // 3
```

위 구문들은 에러를 발생하지 않기 떄문에, 소리 소문 없이 이상한(?) 결과를 만들어내고 넘어가게 된다.  
차라리 const / let의 잘못된 사용이나 cannot read properties of undefined 같은 경우는 에러로 디버깅이라도 할 수 있지만, 위 사항들은 그저 잠복해있기 때문에 디버깅조차 쉽지 않다.

보통 위와 같은 구문들은 개발자가 의도해서 사용하기 보다는, 매개 변수로 잘못된 값을 넘기거나 하는 등의 실수로 인해서 만들어진다.  
애플리케이션이 단순할 때에는 문제가 없겠지만, 점차 복잡도가 올라갈수록 디버깅의 난이도는 기하 급수적으로 증가하게 된다.

타입스크립트는 자바스크립트의 타입을 검사하여, 의도치 않게 동작할 수 있는 코드들을 컴파일 타임에 잡아낸다.  
위에서 작성한 구문들은 모두 타입 체크에 걸려서 컴파일 타임에 오류를 확인할 수 있다.  
코드에서 명시적으로 타입을 정의 하지는 않았지만, 타입 체커가 자동으로 타입을 유추하여 체크한다.

```ts
const a = [] + 3; // Operator '+' cannot be applied to types 'never[]' and 'number'.
const b = {} + 3; // Operator '+' cannot be applied to types '{}' and 'number'.
const c = {} + []; // Operator '+' cannot be applied to types '{}' and 'never[]'.
const d = undefined + 3; // The value 'undefined' cannot be used here.
const e = null + 3; // The value 'null' cannot be used here.

const obj = { name: "HI" };
const cnt = obj.nama + "!!"; // Property 'nama' does not exist on type '{ name: string; }'.

const sum = (a, b) => a + b;
sum(1, 2, 3); // Expected 2 arguments, but got 3.
```

하지만 타입스크립트는 명시적인 타입 정의가 있을 때 더 빛을 발한다.  
개발자가 부지런하게 자신의 의도를 설명할수록 타입 체커는 더 영리하게 동작한다.  
예를 들어 다음과 같이 name을 프로퍼티로 갖는 객체의 배열을 정의한다고 하자.  
타입을 지정하지 않는다면 프로퍼티 명에 오타가 발생해도 컴파일 타임에 잡아낼 수 없다.

```ts
const names = [{ name: "A" }, { nama: "B" }, { nome: "C" }];
```

이 때에는 names에 속하는 객체들의 타입을 명시적으로 정의함으로써 개발자의 의도를 명시해야 한다.

```ts
type Name = { name: string };

const names: Name[] = [
  { name: "A" },
  { nama: "B" }, // Object literal may only specify known properties, and 'nama' does not exist in type 'Name'.
  { nome: "C" }, // Object literal may only specify known properties, and 'nome' does not exist in type 'Name'.
];
```

이와 같이 타입을 정의하는 것은 개발자의 의도를 명시적으로 드러내는 과정이라고 볼 수 있다.  
이는 순수한 자바스크립트를 작성하는 것보다 더 번거로운 작업일 수밖에 없다.  
하지만 어플리케이션이 조금이라도 복잡해질 가능성이 있다면, 어플리케이션 초기부터 꾸준히 타입을 관리해야 한다.
