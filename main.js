let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let x;
// get total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = null;
    total.style.background = null;
  }
}

// create pruduct

let dataProduct;
if (localStorage.product) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}
submit.onclick = () => {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
    // count of products
  if (title.value,price.value,category.value !== '') {
      if (mood === "create") {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }
  } else {
    dataProduct[x] = newProduct;
    mood = "creat";
    submit.innerHTML = "Create";
    count.style.display = "block";
    }
    clearData();
  }


  localStorage.setItem("product", JSON.stringify(dataProduct));
  showData();
};
//  clear inputs
function clearData() {
  title.value = null;
  price.value = null;
  taxes.value = null;
  ads.value = null;
  discount.value = null;
  total.innerHTML = null;
  count.value = null;
  category.value = null;
  total.style.background = null;
}
// read
function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
     <tr>
     <td>${i+1}</td>
     <td>${dataProduct[i].title}</td>
     <td>${dataProduct[i].price}</td>
     <td>${dataProduct[i].taxes}</td>
     <td>${dataProduct[i].ads}</td>
     <td>${dataProduct[i].total}</td>
     <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id='delete '>delete</button></td>
     </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick="deleteDataAll()" >Delete all (${dataProduct.length})</button>
    `;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();

// delete
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
function deleteDataAll() {
  dataProduct.splice(0);
  localStorage.clear();
  showData();
}

// update
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";

  mood = "update";
  x = i;
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "serchTitle") {
    searchMood = "title";
  } else {
    searchMood = "catogery";
  }
  search.placeholder = "Search by " + searchMood;

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table;
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
          <td>${i}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id='delete '>delete</button></td>
          </tr>
         `;
        document.getElementById("tbody").innerHTML = table;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {   
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
       <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id='delete '>delete</button></td>
        </tr>
       `;
        document.getElementById("tbody").innerHTML = table;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
