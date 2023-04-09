import { menuArray, orderSummaryArray } from "./data.js";

renderMenu();

document.addEventListener("click", clickListener);
document.getElementById("pay-btn").addEventListener("click", function (e) {
  e.preventDefault();
});

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
  } else if (e.target.dataset.removebutton) {
    removeMenuItem(Number(e.target.dataset.removebutton));
  } else if (e.target.id === "complete-order-btn") {
    openPayDetails();
  } else if (e.target.id === "pay-btn") {
    submitPayDetails();
  }
}

function addMenuItem(buttonId) {
  const menuItem = getMenuItem(buttonId);
  if (!orderSummaryArray.includes(menuItem)) {
    orderSummaryArray.push(menuItem);
  }
  renderOrderSummary();
}

function removeMenuItem(buttonId) {
  const menuItem = getMenuItem(buttonId);
  const removeIndex = orderSummaryArray.findIndex((item) => item === menuItem);
  orderSummaryArray.splice(removeIndex, 1);
  renderOrderSummary();
}

function getMenuItem(buttonId) {
  return menuArray.filter((item) => item.id === buttonId)[0];
}

function renderOrderSummary() {
  const orderSummaryEl = document.getElementById("order-summary");
  if (orderSummaryArray.length) {
    let orderSummaryDetailsHtml = ``;
    let totalPrice = 0;

    orderSummaryArray.forEach((item) => {
      orderSummaryDetailsHtml += `
        <div class="order-summary-item">
            <div class="order-summary-item-name">${item.name}</div>
            <button
              class="order-summary-remove-item"
              data-removebutton="${item.id}">
              remove
            </button>
            <div class="order-summary-item-price">$${item.price}</div>
          </div>
        `;

      totalPrice += item.price;
    });

    const orderSummaryHtml = `
    <p>Your Order</p>
    <div class="order-summary-details" id="order-summary-details">
        ${orderSummaryDetailsHtml}
        <div class="order-summary-item order-summary-total">
            <div class="order-summary-item-name">Total Price:</div>
            <div class="order-summary-item-price">$${totalPrice}</div>
        </div>
    </div>
    <button class='complete-order-btn' id='complete-order-btn'>Complete order<button>`;

    orderSummaryEl.innerHTML = orderSummaryHtml;
  } else {
    orderSummaryEl.innerHTML = ``;
  }
}

function openPayDetails() {
  document.getElementById("pay-modal").style.display = "flex";
}

function submitPayDetails() {
  const userName = document.getElementById("user-name").value;
  const userCard = document.getElementById("user-card").value;
  const userCcv = document.getElementById("user-ccv").value;
  if (userName && userCard && userCcv) {
    document.getElementById("pay-modal").style.display = "none";
    renderOrderStatus(userName);
  }
}

function renderOrderStatus(userName) {
  const orderSummaryEl = document.getElementById("order-summary");
  const orderStatusHtml = `
    <div class='order-status'>
    Thanks, ${userName}! Your order is on its way!
    </div>
    `;
  orderSummaryEl.innerHTML = orderStatusHtml;
}
