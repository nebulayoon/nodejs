var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express()

app.use(session({ //세션 미들웨어는 req에 session이라는 객체를 추가한다.
  secret: 'keyboard cat',  //실제서버에서는 변수처리를 하거나 따른 파일로 만들어야함(?)
  resave: false, //세션 데이터가 바뀌기 전까지는 세션 저장소에 값을 저장하지 않는다.(true는 바뀌었던 바뀌지 않았던 계속 저장한다)
  saveUninitialized: true, //세션이 필요하기 전까지는 세션을 구동시키지 않는다. 따라서 기본적으로 true로 사용한다.
  store:new FileStore(),
}))


app.get('/', function (req, res, next) {
  console.log(req.session)
  if(req.session.num === undefined){
    req.session.num = 1;
  }else{
    req.session.num = req.session.num + 1;
  }
  res.send(`hello session ${req.session.num}`)
})

app.listen(4000, () => {
  console.log('port 4000')
})