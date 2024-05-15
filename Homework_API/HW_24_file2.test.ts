import axios from "axios";

describe('Page Params and Headers', () => {

test('custom headers and URL parameters', async () => {
    try {
     const response = await axios.get(`https://merchant.transactfirst.com`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'Authorization': 'Bearer null'
            } ,
            params: {
                filter: 'active',
                sortBy: 'name',
                limit: 100,
            }
        }); 
        expect(response.status).toBe(200);
        return response.data;
    }catch (error: any) {
        throw new Error('Failed to fetch data with headers and params: ' + error.message);
        }
    });
});