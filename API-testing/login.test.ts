import axios from "axios";
import { describe } from "node:test";
import jsonpath from 'jsonpath';
import fs from 'fs-extra';

import jsonData from '../api-data.json'; // read of token 

let userName: String;
let userPass:String;

describe('authorization', () => {
    test('get all users', async () => {
        const all_users_response = await axios.get(`${jsonData.baseUrl}/users`);
        // console.log(all_users_response.data)
        userName = String(
            jsonpath.query(all_users_response.data, "$..users[13].username")
            );
        let userName2 = String(
            jsonpath.query(all_users_response.data, "$..users[?(@id==12)].username")  // pull username of array #12 
        )
        userPass = String(
                jsonpath.query(all_users_response.data, "$..users[13].password")
            );
            console.log(userName + " pass: " + userPass);
            console.log(userName2)
        expect(all_users_response.status).toEqual(200);
    });

    test('get auth token', async () => {
        const auth_token_response = await axios.post(`${jsonData.baseUrl}/auth/login`,
            {
                username: `${userName}`,
                password: `${userPass}`,
                // username: 'kminchelle',
                // password: '0lelplR',
            },
            {
                headers: {
                 "Content-Type": "application/json",
                },
            }
        );
        // console.log(auth_token_response.data)
        // authToken = String(jsonpath.query(auth_token_response.data, "$..token"));
        // console.log(authToken)
        jsonData.token = auth_token_response.data.token; // reassigning the token  
        fs.writeJSONSync('api-data.json', jsonData);  // save of token value
    });
});