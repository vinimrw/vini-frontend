//================================== Login ===============================================
document.addEventListener('DOMContentLoaded', function() {
  // Verifica se o accessToken está presente no localStorage
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    // Se o accessToken não estiver presente, redirecione para a página de login
    window.location.href = 'login.html';
  }
});
//=========================================================================================


let cartItems = document.getElementById("cartItems");
let totalPrice = document.getElementById("totalPrice");

let basket = JSON.parse(localStorage.getItem("data")) || [];

function displayCartItems() {
  
  let totalCart = 0
  cartItems.innerHTML = basket.map((cartItem) => {
    let total = cartItem.price * cartItem.quantity;
    totalCart += total;
    return `
    <tr>
      <td>${cartItem.title}</td>
      <td>${cartItem.quantity}</td>
      <td>$${cartItem.price.toFixed(2)}</td>
      <td>$${total.toFixed(2)}</td>

      <td><button onclick="removeItem(${cartItem.id})">Remove</button></td>
    </tr>
  `;
  }).join("");

  totalPrice.textContent = `$ ${totalCart.toFixed(2)}`;
}

window.removeItem = function (id) {
  basket = basket.filter((item) => item.id !== id);

  localStorage.setItem("data", JSON.stringify(basket));
  displayCartItems();
};

displayCartItems();

//===================================== Login ===============================================
function checkout() {
  // Limpa o accessToken do localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('data');
  
  // Redireciona de volta para a página de login
  window.location.href = 'login.html';
}

const timeLogout =  3600 * 1000; //sec * milisec 
setTimeout(checkout, timeLogout);
//=========================================================================================

