import axios from "axios";

export class ApiControllers {
    // 'https://dummyjson.com/users/1'
    async getUserById(userId: any) {
        let response = await axios.get(`https://dummyjson.com/users/${userId}`);
        expect(response.status).toBe(200);
    }
}