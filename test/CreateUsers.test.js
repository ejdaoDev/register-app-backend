import request from 'supertest';
import 'regenerator-runtime/runtime';
import * as variables from './variables.js';

describe('POST /api/user', () => {
    let exits = 0;
    let errors = 0;
    test('should respond with 0 users not saved', async () => {
        for (let i = 0; i < variables.USERS.length; i++) {
            const response = await request(variables.URL).post('user')
                .set('Accept', 'application/json')
                .set('x-access-token', variables.X_ACCESS_TOKEN)
                .send(variables.USERS[i]);
            if (response.body.status === 200) {
                exits++;
            } else {
                errors++;
            }
        }
        console.log("users saved: " + exits);
        console.log("users NOT saved: " + errors);
        expect(errors).toBe(0);

    })
})
