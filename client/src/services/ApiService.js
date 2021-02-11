export const Food = {
	recipe: async () => {
		const response = await fetch("");

		if( 200  != response ) {
			// Return an error
		}
		return response;
	},
}