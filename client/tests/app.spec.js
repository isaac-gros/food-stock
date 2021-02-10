import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../src/screens/HomeScreen';

/**
 * To remove the obselete test : npm test -- -u
 */


// Test to Renderer JSX
test("Test", ()=> {
	const snap = renderer.create(
		<div><h1>Hello World!</h1></div>
	).toJSON();
	expect(snap).toMatchSnapshot();
});

// Test to renderer the Home screen
describe("Products", () => {
	it('Should return products as props', () => {
		// Pass arr to  props
		const snap = renderer.create(
			<HomeScreen/>
		).toJSON();
		expect(snap).toMatchSnapshot();
	});
});
