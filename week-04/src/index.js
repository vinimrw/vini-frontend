let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let shopItemsData = [];

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
          <h2 class="product-title">${title.length > 18 ? title.substring(0,18).concat(' ...') : title}</h2>
          <h4 class="product-category">${category}</h4>
          <p class="product-discription">${description. length > 20 ? description.substring(0,100).concat(' ...more') : description}</p>
          <div class="product-price-container">
            <h3 class="product-price">$${price}</h3>
            <div hidden id=${id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
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
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};


let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

