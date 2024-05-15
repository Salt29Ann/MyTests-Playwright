import axios from "axios";

describe('API test GET user data', () => {

    test('URL check with method try/catch', async () => {
        try {
            const responsePage = await axios.get('https://jsonplaceholder.typicodeINVALID_URL.com/posts');
            return responsePage.data;
        } catch(error: any) {
            if(error.response && error.response.status == 404) {
                throw new Error('Error code is 404');
            } else {
                throw new Error('Failed to load the website page')
            }
        }
    });
});