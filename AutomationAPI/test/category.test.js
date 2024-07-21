import supertest from 'supertest';
import { expect } from 'chai';
import config from './config.js';
import { accessToken } from './auth.test.js';
import { setCategoryId } from './sharedData.js';  // Impor fungsi untuk mengatur categoryId

describe('Category CRUD Operations', function() {
    let categoryId;

    before(async function() {
        this.timeout(10000); // Tambahkan timeout 10 detik untuk hook ini
        // Tunggu hingga token tersedia
        await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    it('should create a new category', async function() {
        this.timeout(10000); // Tambahkan timeout 10 detik untuk tes ini
        const response = await supertest(config.baseUrl)
            .post('/categories')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'makanan ringan',
                description: 'makanan ringan dari indofood'
            })
            .expect(201);

        expect(response.body.status).to.equal('success');
        categoryId = response.body.data.categoryId;
        setCategoryId(categoryId);
        expect(categoryId).to.be.a('string');
    });

    it('should get category detail', async function() {
        this.timeout(10000); // Tambahkan timeout 10 detik untuk tes ini
        const response = await supertest(config.baseUrl)
            .get(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);

        // Tambahkan log untuk melihat respons yang diterima
        //console.log(response.body);

        expect(response.body.status).to.equal('success');
        expect(response.body.data.category).to.have.property('name', 'makanan ringan');
    });

    it('should update category', async function() {
        this.timeout(10000); // Tambahkan timeout 10 detik untuk tes ini
        const response = await supertest(config.baseUrl)
            .put(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ name: 'minuman ringan', description: 'minuman ringan dari indofood' })
            .expect(200);
        console.log(response.body);
        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.have.property('name', 'minuman ringan');
    });

    // it('should delete category', async function() {
    //     this.timeout(10000); // Tambahkan timeout 10 detik untuk tes ini
    //     const response = await supertest(config.baseUrl)
    //         .delete(`/categories/${categoryId}`)
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .expect(200);

    //     expect(response.body.status).to.equal('success');
    // });
});
