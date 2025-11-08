const products = [
    { id: 1, name: "Abbey Stone Fleece Relaxed Sweatpants", brand: "Nestar Gaze", price: 8160, oldPrice: 0, images: ["full.webp"] },
    { id: 2, name: "Abbey Stone Soccer Fleece Sweat Shorts", brand: "Nestar Gaze", price: 4745, oldPrice: 0, images: ["fulla.webp"] },
    { id: 3, name: "Garden Yellow '90s Fit Fleece Hoodie", brand: "Nestar Gaze", price: 7499, oldPrice: 0, images: ["FOG.jpg"] },
    { id: 4, name: "Garden Yellow '90s Fit Fleece Hoodie", brand: "Nestar Gaze", price: 12645, oldPrice: 0, images: ["Abbey.jpg"] },
    { id: 5, name: "Timber Lounge Fleece Baggy Sweatpants", brand: "Nestar Gaze", price: 8890, oldPrice: 0, images: ["Timber.webp"] },
    { id: 6, name: "Dark Heather Oatmeal Fleece Relaxed Sweatpants", brand: "Nestar Gaze", price: 8575, oldPrice: 0, images: ["Dark.webp"] },
    { id: 7, name: "Dark Heather Oatmeal Fleece Relaxed Sweatpants", brand: "Nestar Gaze", price: 11950, oldPrice: 0, images: ["Jet.webp"] },
    { id: 8, name: "Jet Black Bonded Satin Zip Up Bomber Jacket", brand: "Nestar Gaze", price: 7999, oldPrice: 0, images: ["Black.jpg"] },
    { id: 9, name: "Jet Black Classic T-Shirt", brand: "Nestar Gaze", price: 4200, oldPrice: 0, images: ["Vlack.jpg"] },
    { id: 10, name: "Homestead Heather Classic Fleece Zip Up Hoodie", brand: "Nestar Gaze", price: 5200, oldPrice: 0, images: ["Heather.webp"] },
    { id: 11, name: "Black Heavy Fleece Hoodie", brand: "Nestar Gaze", price: 3999, oldPrice: 0, images: ["Homecom.jpg"] },
    { id: 12, name: "Timber & Cloud White Modern Fleece Track Jacket", brand: "Nestar Gaze", price: 7999, oldPrice: 0, images: ["Track.webp"] }
];


function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    localStorage.setItem("viewingProduct", JSON.stringify(product));
    window.location.href = "../Viewing Page/Viewing Page.html";
}

// Attach click handlers to all product cards
document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
        const id = parseInt(card.dataset.id);
        viewProduct(id);
    });
});

// Update cart badge count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    const badge = document.getElementById("cartBadge");
    if (cart.length > 0) {
        badge.style.display = "inline-block";
        badge.textContent = cart.length;
    } else {
        badge.style.display = "none";
    }
}

// Display cart modal items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="../product page/${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>₱ ${item.price.toLocaleString()}</p>
            </div>
        `;
        cartItems.appendChild(itemDiv);
    });

    cartTotal.textContent = `₱ ${total.toLocaleString()}.00`;
}

// Proceed to checkout
function proceedToCheckout() {
    window.location.href = "../CheckOut/Checkout.html";
}

// Get DOM elements
const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartTotalEl = document.getElementById("cartTotal");

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
    if (cart.length > 0) {
        cartBadge.style.display = "flex";
        cartBadge.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    } else {
        cartBadge.style.display = "none";
    }
}

// Calculate subtotal
function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Render cart items inside the modal
function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotalEl.textContent = "₱ 0.00";
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="../product page/${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-quantity">
                    <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
                </div>
                <p class="cart-item-price">₱ ${ (item.price * item.quantity).toLocaleString() }</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotalEl.textContent = `₱ ${getCartTotal().toLocaleString()}`;
}

// Open cart modal
cartIcon.addEventListener("click", () => {
    cartModal.classList.add("active");
    renderCart();
});

// Close cart modal
closeCart.addEventListener("click", () => {
    cartModal.classList.remove("active");
});

// Close modal if clicked outside
cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.classList.remove("active");
});

// Handle quantity buttons and remove buttons
cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    const action = e.target.dataset.action;

    if (action && index !== undefined) {
        if (action === "increase") cart[index].quantity++;
        if (action === "decrease") cart[index].quantity = Math.max(cart[index].quantity - 1, 1);
        saveCart();
        renderCart();
    }

    if (e.target.classList.contains("remove-btn")) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }
});

updateCartBadge();