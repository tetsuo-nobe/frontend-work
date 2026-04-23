// タイムセールの table タグの表示用関数
function displayTable() {
  const category_id = document.getElementById("category").value;
  axios.get("/timesale?category=" + category_id)
  .then(function (response) {
    createTable(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

// table タグの作成用関数
function createTable(items) {
    // table タグを作成
    const tbl = document.createElement("table");
  
    // 表のヘッダー行を作成
    const th_row = document.createElement("tr");
  
    const cell0 = document.createElement("th");
    const cellText0 = document.createTextNode("割引");
    cell0.appendChild(cellText0);
    th_row.appendChild(cell0);
    const cell1 = document.createElement("th");
    const cellText1 = document.createTextNode("商品");
    cell1.appendChild(cellText1);
    th_row.appendChild(cell1);
    tbl.appendChild(th_row);
    
    // データ用のセルを作成
    items.forEach(item => {
      // 割引
      const td_row = document.createElement("tr");
      const discount_cell = document.createElement("td");
      const discount_cellText = document.createTextNode(`${item.discount}%OFF`);
      discount_cell.appendChild(discount_cellText);
      td_row.appendChild(discount_cell);
      // 商品
      const name_cell = document.createElement("td");
      const a = document.createElement("a");
      a.href = "static/html/dummy.html";
      a.textContent = item.item_name;
      name_cell.appendChild(a);
      td_row.appendChild(name_cell);
      //
      tbl.appendChild(td_row);
    })

    // 既存の table タグがあれば削除
    const existingTable = document.querySelector("#timesale");
    if (existingTable) {
      existingTable.remove(); 
    }
   
    // table タグの border 属性を 1 に設定
    tbl.setAttribute("border", "1");
    tbl.setAttribute("id", "timesale");
    
    // table タグを追加
    const timesale = document.getElementById("timesale-container"); 
    timesale.appendChild(tbl)
}
  
