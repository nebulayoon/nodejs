"use strict";

const id = document.querySelector("#id"),
psword = document.querySelector("#psword"),
loginBtn = document.querySelector("button");
const login = () => {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }).then((res) => res.json())
  .then((res) => {
    if(res.success){
      location.href = "/";
    }else{
      alert(res.msg);
    }
  })
  .catch((err) => {
    console.error(new Error("로그인중 에러발생)"))
  })
}

loginBtn.addEventListener("click", login);

console.log('해윙')
