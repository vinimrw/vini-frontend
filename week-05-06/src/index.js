//============================= Login ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Verifica se o accessToken está presente no localStorage
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    // Se o accessToken não estiver presente, redirecione para a página de login
    window.location.href = 'login.html';
  }
});
//============================================================================

let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let shopItemsData = [];

const nameToken = localStorage.getItem('userName');
document.getElementById("welcome").innerHTML = "Welcome "  +nameToken

//TO DO 
//REMOVER O CONCAT PRA UM CSS COM ACESSIBILIDADE

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    shopItemsData = data;
    generateShop();
    console.log(shopItemsData)
  })
  .catch(error => console.error('Error fetching data:', error));

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, title, price, description, image, category} = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
      <div class="product">
        <div class="img-container">
          <img src="${image}" alt="" class="product-img">
        </div>
        <div class="product-content">
          <h2 class="product-title">${title}</h2>
          <h4 class="product-category">${category}</h4>
          <p class="product-discription">${description}</p>
          <div class="product-price-container">
            <h3 class="product-price">$${price}</h3>
            <div  id=${id} class="quantity">
          </div>
          <a href="#!" data-productId="${id}" class="add-to-cart" onclick="increment(${id})" >Add to Cart</a>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

let increment = (id) => {
  let selectedItem = shopItemsData.find((x) => x.id === id);
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      quantity: 1,
      price: selectedItem.price,
      title: selectedItem.title
    });
  } else {
    search.quantity += 1;
  }

  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.quantity;
  calculation();
};


let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
};

calculation();



//================== Login ===================

function logout() {
  // Limpa o accessToken do localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('data');
  
  // Redireciona de volta para a página de login
  window.location.href = 'login.html';
}

const timeLogout =  3600 * 1000; //sec * milisec 
setTimeout(logout, timeLogout);