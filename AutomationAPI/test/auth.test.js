import * as supertest from 'supertest';
import * as chai from 'chai';
const expect = chai.expect;
import config from './config.js';

let accessToken;
let refreshToken;


describe('Authorization', function() {
    it('should register a new user', async function() {
        const response = await supertest.default(config.baseUrl)
            .post('/registration')
            .send({
                name: config.credentials.name,
                email: config.credentials.email,
                password: config.credentials.password
            })
            .expect(201);

        //console.log('Registration response:', response.body); // Debug log

        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.have.property('name', config.credentials.name);
    });

    it('should login and get tokens', async function() {
        const response = await supertest.default(config.baseUrl)
            .post('/authentications')
            .send({
                email: config.credentials.email,
                password: config.credentials.password
            });

        //console.log('Login response:', response.body); // Debug log

        expect(response.status).to.equal(201);
        expect(response.body.status).to.equal('success');
        accessToken = response.body.data.accessToken;
        refreshToken = response.body.data.refreshToken;
        expect(accessToken).to.be.a('string');
        expect(refreshToken).to.be.a('string');
    });

    // it('should refresh token', async function() {
    //     const response = await supertest.default(config.baseUrl)
    //         .put('/authentications')
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .send({ refreshToken });

    //     console.log('Refresh token response:', response.body); // Debug log

    //     expect(response.status).to.equal(200);
    //     expect(response.body.status).to.equal('success');
    //     accessToken = response.body.data.accessToken;
    //     expect(accessToken).to.be.a('string');
    // });

    // it('should logout', async function() {
    //     const response = await supertest.default(config.baseUrl)
    //         .delete('/authentications')
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .send({ refreshToken });

    //     console.log('Logout response:', response.body); // Debug log

    //     expect(response.status).to.equal(200);
    //     expect(response.body.status).to.equal('success');
    // });
});

export { accessToken };
