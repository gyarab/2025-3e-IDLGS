import { describe, it, expect } from 'vitest';

//TODO tests for resin programs, simple programs with expected results including edge cases

//compile code
describe('RESIN test - compile', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

//interpret written code
describe('RESIN test - interpreter', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});
