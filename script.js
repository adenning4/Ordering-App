import { menuArray, orderSummaryArray } from "./data.js";

renderMenu();

document.addEventListener("click", clickListener);

function renderMenu() {
  const menuEl = document.getElementById("menu");
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
        <button class="add-button" data-addbutton="${item.id}">+</button>
    </div>
        `;
  });

  menuEl.innerHTML = menuHtml;
}

function clickListener(e) {
  if (e.target.dataset.addbutton) {
    addMenuItem(Number(e.target.dataset.addbutton));
  }
}

function addMenuItem(buttonId) {
  const menuItem = getMenuItem(buttonId);
  if (!orderSummaryArray.includes(menuItem)) {
    orderSummaryArray.push(menuItem);
  }
  renderOrderSummary();
}

function getMenuItem(buttonId) {
  return menuArray.filter((item) => item.id === buttonId)[0];
}

function renderOrderSummary() {
  if (orderSummaryArray.length) {
    const orderSummaryDetailsEl = document.getElementById(
      "order-summary-details"
    );
    let orderSummaryDetailsHtml = ``;
    orderSummaryArray.forEach((item) => {
      orderSummaryDetailsHtml += `
        <div class="order-summary-item">
            <div class="order-summary-item-name">${item.name}</div>
            <button
              class="order-summary-remove-item"
              data-removebutton="${item.id}">
              remove
            </button>
          </div>
          <div class="order-summary-item-price">${item.price}</div>
        `;
    });
    orderSummaryDetailsEl.innerHTML = orderSummaryDetailsHtml;
  }
}
