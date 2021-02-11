import axios from 'axios';

// Request to get some data from the server
export default {
	get: (url) => {
		return axios.get(url);
	}
}