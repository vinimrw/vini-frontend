let cartItems = document.getElementById("cartItems");
let totalPrice = document.getElementById("totalPrice");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let shopItemsData = [];

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    shopItemsData = data;
    displayCartItems();
  })
  .catch(error => console.error('Error fetching data:', error));

function displayCartItems() {
  cartItems.innerHTML = basket.map((cartItem) => {
    let selectedItem = shopItemsData.find((item) => item.id === cartItem.id);
    let total = selectedItem.price * cartItem.item;
    
    return `
    <tr>
      <td>${selectedItem.title}</td>
      <td>${cartItem.item}</td>
      <td>$${selectedItem.price.toFixed(2)}</td>
      <td>$${total.toFixed(2)}</td>
      <td><button onclick="removeItem(${cartItem.id})">Remove</button></td>
    </tr>
  `;
  }).join("");

  // Total Price
  let totalAmount = basket.reduce((acc, cartItem) => {
    let selectedItem = shopItemsData.find((item) => item.id === cartItem.id);
    return acc + selectedItem.price * cartItem.item;
  }, 0);

  totalPrice.textContent = `$ ${totalAmount.toFixed(2)}`;
}


window.removeItem = function (id) {
  basket = basket.filter((item) => item.id !== id);

  localStorage.setItem("data", JSON.stringify(basket));
  displayCartItems();
};

