const products = [
    { id: 1, name: "Mike Tyson Wavey T-Shirt", brand: "Nestar Gaze", price: 2160, oldPrice: 2700, images: ["1.jpg"] },
    { id: 2, name: "Mike Tyson Wavey T-Shirt", brand: "Nestar Gaze", price: 1745, oldPrice: 3050, images: ["2.webp"] },
    { id: 3, name: "The Joker Trifecta T-Shirt", brand: "Nestar Gaze", price: 1350, oldPrice: 2700, images: ["3.webp"] },
    { id: 4, name: "Mike Tyson Return To Las Vegas", brand: "Nestar Gaze", price: 1645, oldPrice: 2350, images: ["4.webp"] },
    { id: 5, name: "1990 Logo T-Shirt", brand: "Nestar Gaze", price: 1890, oldPrice: 2100, images: ["5.jpg"] },
    { id: 6, name: "Streetwear Team T-Shirt", brand: "Nestar Gaze", price: 1575, oldPrice: 2100, images: ["6.jpg"] },
    { id: 7, name: "OG's Haircut T-Shirt", brand: "Nestar Gaze", price: 1950, oldPrice: 2100, images: ["7.jpg"] },
    { id: 8, name: "Skrt Bulldog T-Shirt", brand: "Nestar Gaze", price: 1200, oldPrice: 2400, images: ["8.webp"] },
    { id: 9, name: "Icy T-Shirt", brand: "Nestar Gaze", price: 1200, oldPrice: 2400, images: ["9.jpg"] },
    { id: 10, name: "LA Dodgers Cap T-Shirt", brand: "Nestar Gaze", price: 1200, oldPrice: 2400, images: ["10.jpg"] },
    { id: 11, name: "Shea Stadium NY Mets Vintage", brand: "Nestar Gaze", price: 1200, oldPrice: 2400, images: ["11.jpg"] },
    { id: 12, name: "Baltimore Orioles Team Players", brand: "Nestar Gaze", price: 1785, oldPrice: 2100, images: ["12.jpg"] }
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