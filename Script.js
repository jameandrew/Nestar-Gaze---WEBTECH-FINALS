const mensProducts = [
    {
        id: 1,
        name: "LA Division 80 Layered Long Sleeve T-Shirt",
        brand: "Nestar Gaze",
        price: 3700,
        badge: "NEW ARRIVAL",
        emoji: "👕",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        name: "Camo LA Division 80 Layered Tee",
        brand: "Pacsun",
        price: 3700,
        badge: "LIMITED",
        emoji: "🎽",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        name: "SLAM Carmelo Anthony T-Shirt",
        brand: "Mitchell & Ness",
        price: 1700,
        oldPrice: 2500,
        badge: "FLASH SALE",
        badgeClass: "sale",
        emoji: "🏀",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        name: "LA Dodgers UD 9Forty Hat",
        brand: "New Era",
        price: 2350,
        badge: "HOT ITEM",
        emoji: "🧢",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    }
];

const womensProducts = [
    {
        id: 5,
        name: "Kings '62 Lace-Up Hoodie",
        brand: "Nestar Gaze",
        price: 4200,
        badge: "BESTSELLER",
        emoji: "👘",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
        id: 6,
        name: "Oversized Graphic Hoodie",
        brand: "Nestar Gaze",
        price: 3900,
        badge: "NEW",
        emoji: "🧥",
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
        id: 7,
        name: "Gray Piping Track Sweatpants",
        brand: "Pacsun",
        price: 3050,
        oldPrice: 4200,
        badge: "FLASH SALE",
        badgeClass: "sale",
        emoji: "👖",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
        id: 8,
        name: "Cropped Athletic Hoodie",
        brand: "Nestar Gaze",
        price: 3450,
        badge: "TRENDING",
        emoji: "👚",
        gradient: "linear-gradient(135deg, #ffd3a5 0%, #fd6585 100%)"
    }
];

// Function to create product card
function createProductCard(product) {
    const priceHTML = product.oldPrice 
        ? `₱${product.price.toLocaleString()}.00 <span class="old-price">₱${product.oldPrice.toLocaleString()}.00</span>`
        : `₱${product.price.toLocaleString()}.00`;
    
    const badgeClass = product.badgeClass ? `product-badge ${product.badgeClass}` : 'product-badge';
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image" style="background: ${product.gradient};">${product.emoji}</div>
            <div class="product-info">
                <span class="${badgeClass}">${product.badge}</span>
                <div class="product-name">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">${priceHTML}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Load products
function loadProducts() {
    const mensGrid = document.getElementById('mens-products');
    const womensGrid = document.getElementById('womens-products');
    
    mensGrid.innerHTML = mensProducts.map(createProductCard).join('');
    womensGrid.innerHTML = womensProducts.map(createProductCard).join('');
}

// Add to cart function
function addToCart(productId) {
    const allProducts = [...mensProducts, ...womensProducts];
    const product = allProducts.find(p => p.id === productId);
    
    if (product) {
        alert(`Added "${product.name}" to cart!\nPrice: ₱${product.price.toLocaleString()}.00`);
        console.log('Product added to cart:', product);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});