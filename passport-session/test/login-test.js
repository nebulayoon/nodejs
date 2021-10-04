const request    = require('supertest'),
      { expect } = require('chai');

const app = require('../app');

const HappyUser = {
  id : 1,
  email : "test@gmail.com",
  name : "test",
  age : 23,
  passwd : "1111"
}

let cookie = null;

describe('Login Test', () => {
  before('POST /auth/login', done => {
    request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email : HappyUser.email, passwd : HappyUser.passwd })
      .expect(200)
      .expect('Content-Type', /json/)
      .then( res => {
        //cookie(sessionID) 저장
        cookie = res.headers['set-cookie'];

        let cookieName = cookie[0].split('=')[0];
        //cookie name happykoo(app.js에서 session key 설정)
        expect(cookieName).to.equal('happykoo-test');

        let user = res.body.loginUser;
        //로그인 유저 정보 일치 여부
        expect(user.id).to.equal(HappyUser.id);
        expect(user.email).to.equal(HappyUser.email);
        done();
      }).catch( err => {
        console.error("######Error >>", err);
        done(err);
      })
  });

  it('GET /auth/loginuser', done => {
    request(app)
      .get('/auth/loginuser')
      .set('Cookie', cookie)
      .expect(200)
      .then( res => {
        //cookie(sessionID) 값으로 loginUser 가져옴
        let loginUser = res.body;
        expect(loginUser.id).to.equal(HappyUser.id);
        expect(loginUser.name).to.equal(HappyUser.name);
        done();
      })
      .catch( err => {
        console.error("######Error >>", err);
        done(err);
      })
  });

  it('POST /auth/logout', done => {
    request(app)
      .post('/auth/logout')
      .set('Cookie', cookie)
      .expect(200)
      .then( res => {
        //로그아웃 성공
        expect(res.body.ACK).to.equal('SUCCESS');
        done();
      })
      .catch( err => {
        console.error("######Error >>", err);
        done(err);
      }) 
  });

  it('GET /auth/loginuser', done => {
    request(app)
      .get('/auth/loginuser')
      .set('Cookie', cookie)
      .expect(200)
      .then( res => {
        //로그아웃 했기에 loginUser가 없음
        let loginUser = res.body;
        expect(loginUser).to.deep.equal({});
        done();
      })
      .catch( err => {
        console.error("######Error >>", err);
        done(err);
      })
  });
});