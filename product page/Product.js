const products = [
    { id: 1, name: "Apex Motorsports Polo Shirt", brand: "Nestar Gaze", price: 5050, oldPrice: 6700, images: ["Apex.webp", "apex1.jpg", "apex 2.jpg", "apex 3.jpg"] },
    { id: 2, name: "European Cropped", brand: "Nestar Gaze", price: 2650, oldPrice: 3050, images: ["Crop.jpg"] },
    { id: 3, name: "Villa Du Jardin Camp Shirt", brand: "Nestar Gaze", price: 5050, oldPrice: 7700, images: ["Villa.jpg"] },
    { id: 4, name: "Nothing Is Impossible T-Shirt", brand: "Nestar Gaze", price: 1645, oldPrice: 2350, images: ["RB.webp"] },
    { id: 5, name: "Technicals T-Shirt", brand: "Nestar Gaze", price: 1890, oldPrice: 2100, images: ["Technicals.jpg"] },
    { id: 6, name: "D.A.R.E Camo T-Shirt", brand: "Nestar Gaze", price: 1575, oldPrice: 2100, images: ["DARE.jpg"] },
    { id: 7, name: "Ozzy & Lemmy T-Shirt", brand: "Nestar Gaze", price: 1950, oldPrice: 2100, images: ["Ozzy.jpg"] },
    { id: 8, name: "Nx PacSun Pole Position Shirt", brand: "Pacsun", price: 5200, oldPrice: 7400, images: ["Formula.webp"] },
    { id: 9, name: "Arts District Flea", brand: "Nestar Gaze", price: 4200, oldPrice: 6400, images: ["art.jpg"] },
    { id: 10, name: "Quarter Zip Shirt", brand: "Nestar Gaze", price: 3999, oldPrice: 5400, images: ["Ford.jpg"] },
    { id: 11, name: "Monza Italy Staff Zip Up", brand: "Nestar Gaze", price: 3200, oldPrice: 4900, images: ["Monza.jpg"] },
    { id: 12, name: "Legacy Quarter Zip Shirt", brand: "Nestar Gaze", price: 4785, oldPrice: 5100, images: ["Legacy.jpg"] }
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



