import React, { useEffect } from 'react'
import axios from 'axios'

const Payment = (effect, deps) => {
  useEffect(() => {
    const jquery = document.createElement("script")
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js"

    const iamport = document.createElement("script")
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"

    document.head.appendChild(jquery)
    document.head.appendChild(iamport)

    return () => {
      document.head.removeChild(jquery)
      document.head.removeChild(iamport)
    }
  }, [])

  const onClickPayment = () => {
    const { IMP } = window
    IMP.init('imp77220765') // 가맹점 식별코드

    const data = {
      pg: 'html5_inicis', //PG(필수)
      pay_method: 'card', //결제수단(필수)
      merchant_uid: `mid_${new Date().getTime()}`, //결제시간(필수)
      name: '결제 테스트', //주문명(필수)
      amount: '1000', //금액(필수)
      buyer_name: '김수완', //구매자 이름
      buyer_tel: '01012341234',
      buyer_email: 'kim@gmail.com',
      buyer_addr: '도산대로',
      buyer_postalcode: '05258'
    }

    IMP.request_pay(data, callback)
  }

  const callback = async ( res ) => {
    const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } = res
    
    if(success){
      await axios.post({
        url: 'http://127.0.0.1/payments/complete',
        headers: { "Content-Type": "application/json" },
        data: {
          imp_uid: res.imp_uid,
          merchant_uid: res.merchant_uid,
        }
      })
      //가맹점 서버 결제 API 성공시 로직
      switch(data.status) {
        case "vbankIssued":
          // 가상계좌 발급 시 로직
          break;
        case "success":
          // 결제 성공 시 로직
          break;
      }
    }else{
      alert(`결제 실패: ${error_msg}`)
    }
  }

  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  )
}

export default Payment