import RequestProvider from './RequestProvider';
import { BASE_URL } from '@env';

export const Products = {
	// Get all products
	all: async () => {
		try {
			const response = await RequestProvider.get(`${BASE_URL}product`);
			if( 200  != response.status ) {
				// Return a status error
				console.log("error", response.status);
				return response.status;
			}

			return response.data;
		} catch (e) {
			console.error(e);
		}
	},
}