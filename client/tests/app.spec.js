// import React from 'react';
import { BASE_URL } from '@env';
// import { create, act } from 'react-test-renderer';
// import HomeScreen from '../src/screens/HomeScreen';
// import MockProducts from '../tests/mock/MockProducts';
import { Products } from '../src/services/ProductService';
import RequestProvider from "../src/services/RequestProvider";

/**
 * To remove the obselete test : npm test -- -u
 */

jest.mock("../src/services/RequestProvider");

// Set variables
let products;
// Test to Renderer JSX
// test("Test", ()=> {
// 	const snap = create(
// 		<div><h1>Hello World!</h1></div>
// 	).toJSON();
// 	expect(snap).toMatchSnapshot();
// });

// Test to renderer the Home screen
// describe("Products", () => {

// 	it('Should the Home', () => {
// 		const snap = create(
// 			<HomeScreen/>
// 		).toJSON();
// 		expect(snap).toMatchSnapshot();
// 	});

// 	it('Should return starting value and updated value', () => {
// 		let root;
// 		act(() => {
// 			root = create(<HomeScreen value={1} />)
// 		});

// 		expect(root.toJSON()).toMatchSnapshot();

// 		// update with some different props
// 		act(() => {
// 			root.update(<HomeScreen value={2}/>);
// 		})

// 		// make assertions on root
// 		expect(root.toJSON()).toMatchSnapshot();
// 	});

// 	it('Should return an array of data', () => {
// 		let root;
// 		products = MockProducts;
// 		act(() => {
// 			root = create(<HomeScreen data={products} />)
// 		});

// 		expect(root.toJSON()).toMatchSnapshot();
// 	});
// });

describe("Products Service", () => {
	it('Should return products from db', async() => {
		jest.spyOn(RequestProvider, "get").mockResolvedValue({
			data: [
				{
				  id: 2,
				  name: 'Tomate Séché',
				  created_at: '2021-02-11T10:01:43.139Z',
				  batchs: []
				},
				{
				  id: 1,
				  name: 'Carotte Râpé',
				  created_at: '2021-02-11T10:01:25.157Z',
				  batchs: []
				}
			],
			status: 200,
		});

		expect(RequestProvider.get).not.toHaveBeenCalled();
		products = await Products.all();
		expect(products).toHaveLength(2);
		expect(RequestProvider.get).toHaveBeenCalled();
		expect(RequestProvider.get).toHaveBeenCalledWith(`${BASE_URL}product`);
	});
});
