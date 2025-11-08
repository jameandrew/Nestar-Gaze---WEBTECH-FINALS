let cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];

document.addEventListener("DOMContentLoaded", function() {
    displayCartItems();
    updateOrderTotals();
    setupShippingHandlers();
    setupPaymentHandlers();
    setupCardFormatting();

    const completeOrderBtn = document.getElementById('completeOrderBtn');
    if (completeOrderBtn) {
        completeOrderBtn.addEventListener('click', completeOrder);
    }
});

function displayCartItems() {
    const cartContainer = document.getElementById("checkoutCartItems");
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p style="text-align:center;color:#666;padding:20px;">Your cart is empty</p>`;
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="checkout-cart-item" data-index="${index}">
            <img src="../Product page/${item.image}" alt="${item.name}" class="checkout-item-image">
            <div class="checkout-item-details">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-brand">${item.brand || "Nestar Gaze"}</div>
                <div class="checkout-item-quantity cart-item-quantity">
                    <button class="qty-btn btn-decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn btn-increase">+</button>
                </div>
            </div>
            <div class="checkout-item-price">₱ ${(item.price * item.quantity).toLocaleString()}.00</div>
            <button class="btn-remove-item">Remove</button>
        </div>
    `).join("");

    // Attach remove handlers
    document.querySelectorAll(".btn-remove-item").forEach(button => {
        button.addEventListener("click", function() {
            const index = parseInt(this.parentElement.dataset.index);
            removeCartItem(index);
        });
    });

    // Attach increment handlers
    document.querySelectorAll(".btn-increase").forEach(button => {
        button.addEventListener("click", function() {
            const index = parseInt(this.closest(".checkout-cart-item").dataset.index);
            cart[index].quantity++;
            saveCartAndRefresh();
        });
    });

    // Attach decrement handlers
    document.querySelectorAll(".btn-decrease").forEach(button => {
        button.addEventListener("click", function() {
            const index = parseInt(this.closest(".checkout-cart-item").dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                saveCartAndRefresh();
            }
        });
    });
}

function removeCartItem(index) {
    cart.splice(index, 1);
    saveCartAndRefresh();
}

function saveCartAndRefresh() {
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    displayCartItems();
    updateOrderTotals();
}

function updateOrderTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = getShippingCost();
    const total = subtotal + shippingCost;

    const subtotalElem = document.getElementById("subtotalAmount");
    const shippingElem = document.getElementById("shippingAmount");
    const totalElem = document.getElementById("totalAmount");

    if (subtotalElem) subtotalElem.textContent = `₱ ${subtotal.toLocaleString()}.00`;
    if (shippingElem) shippingElem.textContent = shippingCost === 0 ? "FREE" : `₱ ${shippingCost.toLocaleString()}.00`;
    if (totalElem) totalElem.textContent = `₱ ${total.toLocaleString()}.00`;
}

function getShippingCost() {
    const expressShipping = document.getElementById("expressShipping");
    return expressShipping && expressShipping.checked ? 250 : 0;
}

function setupShippingHandlers() {
    document.querySelectorAll('input[name="shipping"]').forEach(option => option.addEventListener("change", updateOrderTotals));
}

function setupPaymentHandlers() {
    const creditCardForm = document.getElementById("creditCardForm");
    document.querySelectorAll('input[name="payment"]').forEach(option => {
        option.addEventListener("change", function() {
            if (creditCardForm) creditCardForm.style.display = this.id === "creditCard" ? "block" : "none";
        });
    });
}

function setupCardFormatting() {
    const cardNumberInput = document.querySelector('#creditCardForm input[placeholder="Card Number"]');
    const expiryInput = document.querySelector('#creditCardForm input[placeholder="MM/YY"]');

    if (cardNumberInput) cardNumberInput.addEventListener("input", e => {
        let value = e.target.value.replace(/\s/g, '');
        e.target.value = value.match(/.{1,4}/g)?.join(' ') || value;
    });

    if (expiryInput) expiryInput.addEventListener("input", e => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
        e.target.value = value;
    });
}

function completeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    if (!validateForm()) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = getShippingCost();
    const total = subtotal + shippingCost;

    alert(`Order placed successfully!\n\nTotal: ₱ ${total.toLocaleString()}.00\n\nThank you for shopping with NESTAR GAZE!`);

    localStorage.removeItem("checkoutCart");

    setTimeout(() => {
        window.location.href = "../HomePage.html";
    }, 2000);
}

function validateForm() {
    const fields = document.querySelectorAll(".form-control[required]");
    for (let field of fields) {
        if (!field.value.trim()) {
            alert("Please fill in all required fields.");
            field.focus();
            return false;
        }
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return false;
    }

    return true;
}
