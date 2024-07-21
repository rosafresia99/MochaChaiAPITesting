// test/product.test.js
import supertest from 'supertest';
import { expect } from 'chai';
import config from './config.js';
import { accessToken } from './auth.test.js';
import {categoryId, setProductId} from './sharedData.js';

console.log('Category ID:', categoryId)
describe('Product CRUD Operations', function() {
    let productId;

    before(async function() {
        this.timeout(10000); // Tambahkan timeout 10 detik untuk hook ini
        // Tunggu hingga token dan categoryId tersedia
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Category ID:', categoryId); // Verifikasi categoryId
    });

    it('should create a new product', async function() {
        const response = await supertest(config.baseUrl)
            .post('/products')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                category_id: categoryId,
                code: 'A314ASDDFIER3432',
                name: 'taro',
                price: '3500',
                cost: '3000',
                stock: '5'
            })
            .expect(201);

        expect(response.body.status).to.equal('success');
        productId = response.body.data.productId;
        setProductId(productId);
        expect(productId).to.be.a('string');
    });

    it('should get product detail', async function() {
        const response = await supertest(config.baseUrl)
            .get(`/products/${productId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data.product).to.have.property('code', 'A314ASDDFIER3432');
    });

    it('should update product', async function() {
        const response = await supertest(config.baseUrl)
            .put(`/products/${productId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                category_id: categoryId,
                code: 'A314ASDDFIER3432',
                name: 'taro updated',
                price: '4500',
                cost: '4000',
                stock: '10'
            })
            .expect(200);

        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.have.property('name', 'taro updated');
    });

    // it('should delete product', async function() {
    //     const response = await supertest(config.baseUrl)
    //         .delete(`/products/${productId}`)
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .expect(200);

    //     expect(response.body.status).to.equal('success');
    // });
});
