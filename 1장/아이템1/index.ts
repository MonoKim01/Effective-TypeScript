interface State {
	name: string;
	capital: string;
}

const states: State[] = [
	{name:"test", capitol:"tt"}
	// 작성되지 않은 타입이라서 제대로 동작하지 않음
	// capital 을 쓰려고 한게 아닌지 타입체커에서 표시되어줌.
];
for (const state of states) {
	console.log(state);
}