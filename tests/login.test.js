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

        it('Quando informo valores invalidos, tenho login mal sucedido com 401 UNAUTHORIZED', async () => {
            const respostaLogin = await request(app)
            .post('/api/auth/login')
            .send({
                name: 'Gislaine',
                password: 'senha_errada'
            })
            expect(respostaLogin.status).to.equal(401)
            expect(respostaLogin.body).to.have.property('error', 'invalid credentials')
        })
    })
}) 