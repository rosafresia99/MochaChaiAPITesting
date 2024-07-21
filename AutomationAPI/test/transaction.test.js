import supertest from 'supertest';
import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import config from './config.js';
import { accessToken } from './auth.test.js';
import {productId} from './sharedData.js';


describe('Transaction CRUD Operations', function() {
    let transactionId;
    const officeId = uuidv4(); 
    console.log(officeId);

    before(async function() {
        // Tunggu hingga token tersedia
        await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    // it('should add a new transaction', async function() {
    //     try {
    //         const response = await supertest(config.baseUrl)
    //             .post('/purchases')
    //             .set('Authorization', `Bearer ${accessToken}`)
    //             .send({
    //                 officeId: officeId,
    //                 date: '2023-01-28T17:00:00.000Z',
    //                 invoice: 'INV/02/12/2023/001',
    //                 amount: 14000,
    //                 discount: 0,
    //                 description: 'testing',
    //                 items: [
    //                     {
    //                         productId: productId,
    //                         quantity: 4,
    //                         cost: 1000
    //                     }
    //                 ]
    //             })
    //             .expect(201);

    //         console.log('Create Transaction Response:', response.body);
    //         expect(response.body.status).to.equal('success');
    //         transactionId = response.body.data.purchaseId;
    //         expect(transactionId).to.be.a('string');
    //     } catch (error) {
    //         console.error('Error response:', error.response.body);
    //         throw error;
    //     }
    // });

    // it('should get transaction detail', async function() {
    //     try {
    //         const response = await supertest(config.baseUrl)
    //             .get(`/purchases/${transactionId}`)
    //             .set('Authorization', `Bearer ${accessToken}`)
    //             .expect(200);

    //         console.log('Get Transaction Detail Response:', response.body);
    //         expect(response.body.status).to.equal('success');
    //         expect(response.body.data.purchase).to.have.property('id', transactionId);
    //     } catch (error) {
    //         console.error('Error response:', error.response.body);
    //         throw error;
    //     }
    // });

    it('should get list of transactions', async function() {
        const response = await supertest(config.baseUrl)
            .get('/purchases')
            .set('Authorization', `Bearer ${accessToken}`)
            .query({
                startDate: '2023-01-29',
                endDate: '2023-01-30'
            })
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data.purchases).to.be.an('array');
    });
});
