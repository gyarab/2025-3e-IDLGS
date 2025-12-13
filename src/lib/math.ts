export const gcd = (a: number, b: number): number => {
	let x = a;
	while(b != 0) {
		const t = b;
		b = x % b;
		x = t;
	}
	return x;
}