// =======================
// GET VIEWING PRODUCT
// =======================
const product = JSON.parse(localStorage.getItem("viewingProduct"));

// Update main image and thumbnails
if (product) {
    const mainImage = document.getElementById("mainImage");
    mainImage.src = `../product page/${product.images[0]}`;

    const thumbs = document.querySelectorAll(".thumb");

    thumbs.forEach((thumb, i) => {
        if (i < product.images.length) {
            thumb.src = `../product page/${product.images[i]}`;
            thumb.onclick = () => changeImage(thumb);
            thumb.style.display = "inline-block";
        } else {
            thumb.style.display = "none";
        }
    });

    if (thumbs.length > 0) thumbs[0].classList.add("active");
}

// Populate product details
if (product) {
    document.querySelector(".product-title").textContent = product.name;
    document.querySelector(".product-price").textContent = `₱ ${product.price.toLocaleString()}.00`;
}

// Change main image when clicking a thumbnail
function changeImage(element) {
    const mainImg = document.getElementById("mainImage");
    const allThumbs = document.querySelectorAll(".thumb");
    mainImg.src = element.src;
    allThumbs.forEach(thumb => thumb.classList.remove("active"));
    element.classList.add("active");
}

// =======================
// SIZE SELECTION
// =======================
const sizeButtons = document.querySelectorAll(".size-btn");
let selectedSize = null;

sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        sizeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSize = btn.dataset.size;
    });
});

// =======================
// CART FUNCTIONS
// =======================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = cart.length;
}

// Add to cart
document.getElementById("addToCartBtn").addEventListener("click", () => {
    const quantity = parseInt(document.getElementById("quantity").value) || 1;

    if (!selectedSize) {
        alert("Please select a size before adding to bag.");
        return;
    }

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: quantity,
        image: product.images[0]
    };

    let cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    cart.push(cartItem);
    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    updateCartCount();
    alert(`${product.name} added to bag!`);
});


function goBacktoViewing() {
    window.location.href = "../product page/Product.html";
}

function goBacktoback() {
    window.history.back();
}

updateCartCount();
