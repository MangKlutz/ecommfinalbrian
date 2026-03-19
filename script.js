// === GLOBAL VARIABLES & INITIALIZATION ===
// Initialize the cart counter using the browser's local storage so it remembers across pages
let cartItemCount = parseInt(localStorage.getItem('cartItemCount')) || 0;
let subtotal = 0;
let shipping = 80.00; // Default shipping
let totalCost = 0;
let promoCode = "";

document.addEventListener("DOMContentLoaded", () => {
    updateCartCounterUI(); // Ensure the counter badge shows up on page load
    
    // Check if we are on the Shopping Cart page
    if(document.getElementById('display-subtotal')) {
        let shippingDropdown = document.getElementById('shippingMethod');
        if (shippingDropdown) {
            shipping = parseFloat(shippingDropdown.value);
        }
        calculateTotals();
    }
});

// === CART COUNTER LOGIC ===
function updateCartCounterUI() {
    let counterElement = document.getElementById('cart-counter');
    if (counterElement) {
        if (cartItemCount > 0) {
            counterElement.innerText = cartItemCount;
            counterElement.style.display = 'block';
        } else {
            counterElement.style.display = 'none';
        }
    }
}

// === CART PAGE LOGIC ===
function updateShipping() {
    let shippingDropdown = document.getElementById('shippingMethod');
    if (shippingDropdown) {
        shipping = parseFloat(shippingDropdown.value);
        calculateTotals();
    }
}

function updateQuantity(buttonElement, change) {
    let qtySpan = buttonElement.parentElement.querySelector('.qty-value');
    let currentQty = parseInt(qtySpan.innerText);
    let newQty = currentQty + change;
    
    if (newQty >= 1) {
        qtySpan.innerText = newQty;
        calculateTotals();
    }
}

function deleteItem(buttonElement) {
    let cartItemRow = buttonElement.closest('.cart-item');
    cartItemRow.remove();
    calculateTotals();
}

function calculateTotals() {
    subtotal = 0; 
    let totalItemsInCart = 0; // Track total items for the badge
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        let priceStr = item.querySelector('.item-price').getAttribute('data-price');
        let price = parseFloat(priceStr);
        let quantity = parseInt(item.querySelector('.qty-value').innerText);
        subtotal += (price * quantity);
        totalItemsInCart += quantity; 
    });

    // Sync the counter badge with the actual items on the cart page
    cartItemCount = totalItemsInCart;
    localStorage.setItem('cartItemCount', cartItemCount);
    updateCartCounterUI();

    if (subtotal > 0) { totalCost = subtotal + shipping; } 
    else { totalCost = 0; shipping = 0; }

    document.getElementById('display-subtotal').innerText = `₱${subtotal.toFixed(2)}`;
    document.getElementById('display-totalCost').innerText = `₱${totalCost.toFixed(2)}`;
}

function handleCheckout() {
    let promoElement = document.getElementById('promoCode');
    promoCode = promoElement ? promoElement.value : "";
    alert(`Checkout initiated!\nSubtotal: ₱${subtotal}\nShipping: ₱${shipping}\nPromo: ${promoCode}\nTotal: ₱${totalCost}`);
}

function handleLogout() { alert("Logging out..."); }

// === PRODUCT PAGE LOGIC ===
let productPrice = 350.50;
let productQuantity = 1;
let productName = "Beyond Burger Plant Based Patties";

function updateProductQuantity(change) {
    let newQty = productQuantity + change;
    if (newQty >= 1) {
        productQuantity = newQty;
        document.getElementById('productQuantity').innerText = productQuantity;
    }
}

function addToCart() {
    let totalItemPrice = productPrice * productQuantity;
    
    // Add the selected quantity to our global cart counter
    cartItemCount += productQuantity;
    localStorage.setItem('cartItemCount', cartItemCount);
    updateCartCounterUI(); 
    
    alert(`Added to Cart!\nItem: ${productName}\nQty: ${productQuantity}\nTotal: ₱${totalItemPrice.toFixed(2)}`);
}

function handleSignIn() { alert("Redirecting to Login..."); }

function switchTab(tabName) {
    let tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    if(event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}