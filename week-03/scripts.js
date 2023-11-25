const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const showFavoritesButton = document.getElementById("showFavoritesButton");
const showAllButton = document.getElementById("showAllButton");

let users = [];
let favorites = [];

function updateFavorites() {
  userCardContainer.childNodes.forEach(card => {
    const isFavorite = favorites.includes(card);
    card.classList.toggle("favorite", isFavorite);
  });
}

function saveFavoritesToLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites.map(card => card.dataset.cardId)));
}

function loadFavoritesFromLocalStorage() {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    const favoriteIds = JSON.parse(storedFavorites);
    favorites = users.filter(user => favoriteIds.includes(user.element.dataset.cardId)).map(user => user.element);
    updateFavorites();
  }
}

// Add event listener 
userCardContainer.addEventListener("click", e => {
  if (e.target.matches("[data-favorite-button]")) {
    const card = e.target.closest(".card");
    if (card) {
      card.classList.toggle("favorite");
      if (card.classList.contains("favorite")) {
        favorites.push(card);
      } else {
        favorites = favorites.filter(fav => fav !== card);
      }
      saveFavoritesToLocalStorage();
    }
  }
});

showFavoritesButton.addEventListener("click", () => {
  userCardContainer.childNodes.forEach(card => {
    const isFavorite = card.classList.contains("favorite");
    card.classList.toggle("hide", !isFavorite);
  });
});

showAllButton.addEventListener("click", () => {
  userCardContainer.childNodes.forEach(card => {
    card.classList.remove("hide");
  });
});

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  users.forEach(user => {
    const isVisible =
      user.title.toLowerCase().includes(value) ||
      user.company.toLowerCase().includes(value) ||
      user.location.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    users = data.map((user, index) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      
      card.dataset.cardId = index; // Unique identifier to each card

      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      const location = card.querySelector("[data-location]");
      
      const link = card.querySelector("[data-link]");

      header.textContent = user.title;
      body.textContent = user.company;
      location.textContent = user.location;

      link.href = user.url;
      header.addEventListener('click', () => {
        window.open(link.href, '_blank');
      });

      userCardContainer.append(card);
      return { title: user.title, company: user.company, location: user.location, url: user.url, element: card };
    });

    loadFavoritesFromLocalStorage();
    updateFavorites();
  });