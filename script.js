import { menuArray, orderSummaryArray } from "./data.js";

const userName = document.getElementById("user-name");
const userCard = document.getElementById("user-card");
const userCcv = document.getElementById("user-ccv");
const orderSummaryEl = document.getElementById("order-summary");

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
        <button class="add-button order-btn" data-addbutton="${item.id}">+</button>
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
    openPayModal();
  } else if (e.target.id === "pay-btn") {
    e.preventDefault();
    submitPayDetails();
  } else if (e.target.id === "edit-btn") {
    e.preventDefault();
    closePayModal();
  } else if (e.target.id === "new-order-btn") {
    closePayModal();
    orderSummaryEl.innerHTML = ``;
  }
}

function openPayModal() {
  document.getElementById("pay-modal").style.display = "flex";
  document.querySelectorAll(`button.order-btn`).forEach((button) => {
    button.disabled = true;
    button.style.display = "none";
  });
}

function closePayModal() {
  document.getElementById("pay-modal").style.display = "none";
  document.querySelectorAll(`button.order-btn`).forEach((button) => {
    button.disabled = false;
    button.style.display = "block";
  });
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
              class="order-summary-remove-item order-btn"
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

function submitPayDetails() {
  if (userName.value && userCard.value && userCcv.value) {
    document.getElementById("pay-modal").style.display = "none";
    renderOrderStatus(userName.value);
    clearInputs();
  }
}

function renderOrderStatus(userName) {
  orderSummaryEl.innerHTML = `
    <div class='order-status'>
    Thanks, ${userName}! Your order is on its way!
    </div>
    <button class='new-order-btn' id='new-order-btn'>New Order</button>
    `;
}

function clearInputs() {
  orderSummaryArray.length = 0;
  userName.value = ``;
  userCard.value = ``;
  userCcv.value = ``;
}
