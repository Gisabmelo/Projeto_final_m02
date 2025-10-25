const request = require('supertest');
const {expect} = require('chai');
const app = require('../src/app');
const postLogin = require('./fixture/requisicoes/login/postLogin.json');

let token;

//Testes
describe ('Login',() => {    
    // Register user before testing login
    before(async () => {
        // Register the test user first
        await request(app)
            .post('/api/auth/register')
            .send(postLogin);
    });

describe ('POST/auth/login',() => {
    it('Quando informo valores validos, tenho login bem sucedido com 200 CREATED', async () => {
        const respostaLogin = await request(app)
            .post('/api/auth/login')
            .send(postLogin)

        token = respostaLogin.body.token
        expect(respostaLogin.status).to.equal(200)
        expect(respostaLogin.body).to.have.property('token')
    })
});

describe('GET /books', () => {
    before(async () => {
        // Realiza login para obter o token antes dos testes de livros
        const respostaLogin = await request(app)
            .post('/api/auth/login')
            .send(postLogin);
        token = respostaLogin.body.token;
        // Cria um livro de teste para que a lista não fique vazia
        await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Livro Teste', author: 'Autor Teste', quantity: 3 });
    });

    it('Deve retornar uma lista de livros com sucesso', async () => {
        const res = await request(app)
            .get('/api/books')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0]).to.have.property('title');
        expect(res.body[0]).to.have.property('author');
        expect(res.body[0]).to.have.property('quantity');
    });
});

});

