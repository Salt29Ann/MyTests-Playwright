import axios from "axios";
import { describe } from "node:test";
import jsonData from '../api-data.json'; // read of token 
import { fakerEN } from "@faker-js/faker";
import { ApiControllers } from "./controler";

let fakeUserName = fakerEN.person.firstName();
let fakeLastName = fakerEN.person.lastName();
let fakePhoneNumber = fakerEN.phone.number();

describe('Test for users', () => {

    const controllers = new ApiControllers();
    const apiClient = axios.create({
        baseURL: `${jsonData.baseUrl}`
    });
    apiClient.interceptors.request.use(
        function (config) {
            config.headers.Authorization = `Bearer ${jsonData.token}`
            console.log(`Request URL: ${config.baseURL}${config.url}`)
            return config;
        }
    )

    test('get current user', async () => {
        let current_user_data = await apiClient.get(`/user/me`, 
        {
            // headers: {
            // "Authorization": `Bearer ${jsonData.token}`
            // }
         })
         .then(function (response) {
    console.log(response.data)
    console.log(response.status)
    console.log(response.statusText)
        });
    });

    test('get current user with try/catch', async () => {
        try {
        await axios.get(`${jsonData.baseUrl}/user/me`, {
            headers: {
            "Authorization": `Bearer ${jsonData.token}`,
            }
        }).catch((err) => {
            if (err.response.status == 404) {
                throw new Error('Opa 404 error');
            }
            throw err;
        });
        } catch (err) {
            console.error(err);
        }
    });

    test('get current user with expect', async () => {
        let responseT = await axios.get(`${jsonData.baseUrl}/user/me`, {
            headers: {
            "Authorization": `Bearer ${jsonData.token}`,
            },
        });
    expect(responseT.status).toBe(200);
    });

    test('PUT user data', async () => {
//         fetch('https://dummyjson.com/users/1', {
//   method: 'PUT', /* or PATCH */
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//   lastName: 'Owais'
//   })
// })
        let put_user = await axios.put(`${jsonData.baseUrl}/users/3`,
            {
                firstName: fakeUserName,
                lastName: fakeLastName,
                phone: fakePhoneNumber,
            },
            {
                headers: { 
                    "Authorization": `Bearer ${jsonData.token}`,
                },
            }
        )
    });

    test('user controller', async() => {
        await controllers.getUserById('4');
    });
});