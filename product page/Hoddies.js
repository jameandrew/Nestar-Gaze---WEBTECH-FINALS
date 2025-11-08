const products = [
    { id: 1, name: "Pusha T It's Almost Dry T-Shirt", brand: "Nestar Gaze", price: 2160, oldPrice: 2700, images: ["Soul.jpg"] },
    { id: 2, name: "Subliminal Racing Full Zip Hoodie", brand: "Nestar Gaze", price: 4745, oldPrice: 6050, images: ["Racing.webp"] },
    { id: 3, name: "Around Hoodie", brand: "Nestar Gaze", price: 7350, oldPrice: 9700, images: ["Around.jpg"] },
    { id: 4, name: "Still Bad Oversized T-Shirt", brand: "Nestar Gaze", price: 1645, oldPrice: 2350, images: ["Prix.webp"] },
    { id: 5, name: "NY Raw Applique Full Zip Hoodie", brand: "Nestar Gaze", price: 3890, oldPrice: 5100, images: ["NY.jpg"] },
    { id: 6, name: "Choppers Core Logo Hoodie", brand: "Nestar Gaze", price: 4575, oldPrice: 5100, images: ["West.jpg"] },
    { id: 7, name: "Studio Hoodie", brand: "Nestar Gaze", price: 4950, oldPrice: 6400, images: ["Studio.jpg"] },
    { id: 8, name: "Downtown Rodeo Hoodie", brand: "Nestar Gaze", price: 4290, oldPrice: 6400, images: ["End.webp"] },
    { id: 9, name: "Factory Gear Hoodie", brand: "Nestar Gaze", price: 5290, oldPrice: 6400, images: ["Factory.webp"] },
    { id: 10, name: "Dreams Come True Puff Hoodie", brand: "Nestar Gaze", price: 5999, oldPrice: 6400, images: ["Dreams.webp"] },
    { id: 11, name: "Torment Hoodie", brand: "Nestar Gaze", price: 3290, oldPrice: 5299, images: ["Torment.webp"] },
    { id: 12, name: "LA Raw Applique Hoodie", brand: "Nestar Gaze", price: 6785, oldPrice: 7900, images: ["Journet.jpg"] }
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