import axios from "axios";
import { describe } from "node:test";
import jsonpath from 'jsonpath';
import fs from 'fs-extra';


let userName: String;
let userPass:String;
let authToken:String;

describe('Test for users', () => {
    test('get all users', async () => {
        const all_users_response = await axios.get('https://dummyjson.com/users');
        // console.log(all_users_response.data)
        userName = String(
            jsonpath.query(all_users_response.data, "$..users[13].username")
            );
        userPass = String(
                jsonpath.query(all_users_response.data, "$..users[13].password")
            );
            console.log(userName + " pass: " + userPass);
        expect(all_users_response.status).toEqual(200);
    });

    test('get auth token', async () => {
        const auth_token_response = await axios.post('https://dummyjson.com/auth/login',
            {
                username: `${userName}`,
                password: `${userPass}`,
                expiresInMins: 30,
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
        authToken = String(jsonpath.query(auth_token_response.data, "$..token"));
        // console.log(authToken)
        fs.writeJSONSync('api-token.json', authToken);
    });
});