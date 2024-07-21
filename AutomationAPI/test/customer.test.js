import supertest from 'supertest';
import { expect } from 'chai';
import config from './config.js';
import { accessToken } from './auth.test.js';


describe('Customer CRUD Operations', function() {
    let customerId;

    before(async function() {
        // Tunggu hingga token tersedia
        await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    it('should create a new customer', async function() {
        const response = await supertest(config.baseUrl)
            .post('/customers')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'Budi',
                phone: '081234567890',
                address: 'Bandung',
                description: 'Budi anak Pak Edi'
            })
            .expect(201);

        expect(response.body.status).to.equal('success');
        customerId = response.body.data.customerId;
        expect(customerId).to.be.a('string');
    });

    it('should get customer detail', async function() {
        const response = await supertest(config.baseUrl)
            .get(`/customers/${customerId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data.customer).to.have.property('name', 'Budi');
    });

    it('should update customer', async function() {
        const response = await supertest(config.baseUrl)
            .put(`/customers/${customerId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ name: 'Budi Doremi', phone: '08987654321', address: 'Bandung', description: 'Pelanggan VIP' })
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.have.property('name', 'Budi Doremi');
    });

    it('should delete customer', async function() {
        const response = await supertest(config.baseUrl)
            .delete(`/customers/${customerId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body.status).to.equal('success');
    });
});
