import axios from "axios";
import { describe } from "node:test";
import jsonpath from 'jsonpath';

let userId: Number;
let id: Number;
// let postId: Number;
let title: String;
let body: String;
let email: String;

describe('API JSONPlaceholder', () => {

    test('get user data of #66', async () => {
    const getUserData = await axios.get('https://jsonplaceholder.typicode.com/posts');
    // console.log('GET user data:', getUserData)
        userId = Number(
            jsonpath.query(getUserData.data, "$..userId")[66]
        );
        console.log('User ID: ', userId)
        id = Number(
            jsonpath.query(getUserData.data, "$..id")[66]
        )
        console.log('ID of array: ', id)
        title = String(
            jsonpath.query(getUserData.data, "$..title")[66]
        );
        console.log('Title: ', title)
        body = String(
            jsonpath.query(getUserData.data, "$..body")[66]
        );
        console.log('Response body: ', body)
        expect(getUserData.status).toEqual(200);
        expect(jsonpath.query(getUserData.data, "$..body").length).toBeGreaterThan(0);
        expect(jsonpath.query(getUserData.data, "$..title").length).toBeGreaterThan(0);
        expect(getUserData.data[66].body).toBeDefined();
        expect(typeof getUserData.data[66].body).toBe('string');
    });

    test('get user data of #5', async () => {
        const getUserData2 = await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments');
        // console.log('GET user data:', getUserData2)
        id = Number(
            jsonpath.query(getUserData2.data, "$..id")[4]
        )
        console.log('ID of array: ', id)
        email = String(
            jsonpath.query(getUserData2.data, "$..email")[4]
        );
        console.log('Email address: ', email)
        body = String(
            jsonpath.query(getUserData2.data, "$..body")[4]
        );
        console.log('Response body: ', body)
        expect(getUserData2.status).toEqual(200);
        expect(getUserData2.data[4]).toBeTruthy();
        expect(getUserData2.data[4].email).toBeDefined();
        expect(typeof getUserData2.data[4].email).toBe('string');
        expect(getUserData2.data[4].id).toBeDefined();
        expect(typeof getUserData2.data[4].id).toBe('number');
    });

    test('get data of existing user on the page', async () => {
         const getUserData3 = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log('GET user data:', getUserData3)
        userId = Number(
            jsonpath.query(getUserData3.data, "$..userId")[0]
        );
        console.log('User ID: ', userId)
        title = String(
            jsonpath.query(getUserData3.data, "$..title")[0]
        );
        console.log('Title: ', title)
        expect(getUserData3.status).toEqual(200);
        expect(getUserData3.data).toHaveProperty('body');
    });


    test('POST request #1', async () => {
        const addUserData = await axios.post('https://jsonplaceholder.typicode.com/comments?postId=1',
        { 
            "postId": 2,
            "name": "Some title",
            "email": "annaSA@test.com",
            "body": 'Some text',
        },
        {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
        );
        console.log(addUserData)
        expect(addUserData.status).toBe(201);
        expect(addUserData.data).toHaveProperty('postId');
        expect(addUserData.data).toHaveProperty('id');
        expect(addUserData.data).toHaveProperty('name');
        expect(addUserData.data).toHaveProperty('email');
        expect(addUserData.data).toHaveProperty('body');
        console.log('created ID: ', addUserData.data.id);
    });

    test('POST request #2', async () => {
    const addUserData2 = await axios.post('https://jsonplaceholder.typicode.com/posts/1/comments',
        { 
            "postId": 1,
            "name": "Name on latin",
            "email": "myEmail@example.com",
            "body": 'Some text on latin',
        },
        {
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
        );
        console.log(addUserData2)
        expect(addUserData2.status).toBe(201);
        expect(addUserData2.data).toHaveProperty('id');
        console.log('created ID for POST request #2: ', addUserData2.data.id);
        expect(addUserData2.data.name).toBe('Name on latin');
        expect(addUserData2.data.email).toBe('myEmail@example.com');
        expect(addUserData2.data.body).toBe('Some text on latin');
    });

});
