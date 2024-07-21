import * as supertest from 'supertest';
import * as chai from 'chai';
const expect = chai.expect;
import config from './config.js';
import { accessToken } from './auth.test.js';

describe('Unit CRUD Operations', function() {
    let unitId;

    before(async function() {
        // Tunggu hingga token tersedia
        await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    it('should create a new unit', async function() {
        const response = await supertest.default(config.baseUrl)
            .post('/units')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'gram',
                description: 'weight measurement'
            })
            .expect(201);

        expect(response.body.status).to.equal('success');
        unitId = response.body.data.unitId;
        expect(unitId).to.be.a('string');
    });

    it('should get unit detail', async function() {
        const response = await supertest.default(config.baseUrl)
            .get(`/units/${unitId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data.unit).to.have.property('name','gram');
    });

    it('should update unit', async function() {
        const response = await supertest.default(config.baseUrl)
            .put(`/units/${unitId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ name: 'kilogram', description: 'weight measurement updated' })
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.have.property('name', 'kilogram');
    });

    // it('should delete unit', async function() {
    //     const response = await supertest.default(config.baseUrl)
    //         .delete(`/units/${unitId}`)
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .expect(200);

    //     expect(response.body.status).to.equal('success');
    // });
});
