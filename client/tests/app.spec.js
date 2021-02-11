import React from 'react';
import { create, act } from 'react-test-renderer';
import HomeScreen from '../src/screens/HomeScreen';
import MockProducts from '../tests/mock/MockProducts';

/**
 * To remove the obselete test : npm test -- -u
 */

// Set variables
const products = MockProducts;

// Test to Renderer JSX
test("Test", ()=> {
	const snap = create(
		<div><h1>Hello World!</h1></div>
	).toJSON();
	expect(snap).toMatchSnapshot();
});

// Test to renderer the Home screen
describe("Products", () => {

	it('Should the Home', () => {
		const snap = create(
			<HomeScreen/>
		).toJSON();
		expect(snap).toMatchSnapshot();
	});

	it('Should return starting value and updated value', () => {
		let root;
		act(() => {
			root = create(<HomeScreen value={1} />)
		});

		expect(root.toJSON()).toMatchSnapshot();

		// update with some different props
		act(() => {
			root.update(<HomeScreen value={2}/>);
		})

		// make assertions on root
		expect(root.toJSON()).toMatchSnapshot();
	});

	it('Should return an array of data', () => {
		let root;
		act(() => {
			root = create(<HomeScreen data={products} />)
		});

		expect(root.toJSON()).toMatchSnapshot();
	});
});
