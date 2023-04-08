import { menuArray } from "./data.js";

renderMenu();

function renderMenu() {
  const menu = document.getElementById("menu");
  let menuHtml = ``;
  menuArray.forEach((item) => {
    menuHtml += `
    <div class="menu-item">
        <div class="menu-image">${item.emoji}</div>
        <div class="menu-description">
            <p class="menu-item-name">${item.name}</p>
            <p class="menu-item-ingredients">${item.ingredients}</p>
            <p class="menu-item-price">$${item.price}</p>
        </div>
        <button class="add-button" data-button="${item.id}">+</button>
    </div>
        `;
  });

  menu.innerHTML = menuHtml;
}
