// クレジットカード情報の入力エリアの表示切替用関数
function handlePaymentChange(radio) {
    const div_cc = document.getElementById("div_cc");
    
    if (radio.value == "CreditCard") {
        div_cc.style.display = "block";
    }
    else {
        div_cc.style.display = "none";
    }
    
}

// クーポンコード入力エリアの表示切替用関数
function handleCouponChange(checkbox) {
    const div_cp = document.getElementById("div_cp");
    
    if (checkbox.checked) {
        div_cp.style.display = "block";
    }
    else {
        div_cp.style.display = "none";
    }
    
}

//設定ボタンクリック時に実行する関数
function confirmPayment() {
    // 決済方法で選択された値を取得
    const payment = document.getElementsByName("payment")
    let selectedValue = "";
    for (let i = 0; i < payment.length; i++) {
      if (payment.item(i).checked) {
        selectedValue = payment.item(i).value;
        break;
      }
    }
    // 決済方法のメッセージ
    let payment_method;
    if (selectedValue == "CreditCard") {
         payment_method = "クレジットカードでお支払い";
    }else if (selectedValue == "CashOnDelivery") {
         payment_method = "代金引き換えでお支払い";
    }
    // クーポンの使用について判定
    let use_coupon = "";
    const coupon = document.getElementById("coupon");
    if (coupon.checked) {
        use_coupon = "クーポンをご使用\n";
        use_coupon +=use_coupon = "クーポン番号：" + document.getElementById("cp_number").value;
    }

    let message = "以下の内容で設定します。よろしいですか？\n";
    message += payment_method + "\n";
    message += use_coupon + "\n";
    if  (confirm(message)) {
        // OK が選択された場合の処理
        alert("設定が完了しました。");
        return;
    }
    
}
