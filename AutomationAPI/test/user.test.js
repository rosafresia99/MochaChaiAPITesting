import * as supertest from 'supertest';
import * as chai from 'chai';
const expect = chai.expect;
import config from './config.js';
import { accessToken } from './auth.test.js';

describe('User CRUD Operations', function() {
    let userId;

    before(async function() {
        // Tunggu hingga token tersedia
        await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    it('should create a new user', async function() {
        const response = await supertest.default(config.baseUrl)
            .post('/users')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'kasir-serbaguna',
                email: 'kasir@example.com',
                password: 'kasir123@'
            })
            .expect(201);

        expect(response.body.status).to.equal('success');
        userId = response.body.data.userId;
        expect(userId).to.be.a('string');
    });

    it('should get user detail', async function() {
        const response = await supertest.default(config.baseUrl)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data.user).to.have.property('id', userId);
    });

    it('should update user', async function() {
        const response = await supertest.default(config.baseUrl)
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ name: 'updated-user', email: 'updated@example.com' })
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.have.property('name', 'updated-user');
    });

    it('should delete user', async function() {
        const response = await supertest.default(config.baseUrl)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body.status).to.equal('success');
    });
});
