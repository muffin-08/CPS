
window.addEventListener('scroll', function () {
    const nav = document.querySelector('.site-nav');
    if (nav) {
        if (window.scrollY > 20) nav.classList.add('sticky');
        else nav.classList.remove('sticky');
    }
});

document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const productId = btn.getAttribute('data-id');
        alert(`🛒 Product ID ${productId} added to cart.`);
    });
});

const shipping = 5.00;
let discount = 0;
let couponApplied = false;


function handleMinus(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const item = cartItems.find(i => i.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        renderCart();
    }
}

function handlePlus(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const item = cartItems.find(i => i.id === id);
    if (item) {
        item.quantity++;
        renderCart();
    }
}

function updateTotals() {
    let subtotal = cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    let itemsCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    document.getElementById('itemCount').innerText = itemsCount;
    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    let total = subtotal + shipping - discount;
    if (total < 0) total = 0;
    document.getElementById('totalPrice').innerText = `$${total.toFixed(2)}`;
}

const applyBtn = document.getElementById('applyCoupon');
const couponInput = document.getElementById('couponCode');
const msgDiv = document.getElementById('couponMessage');
if (applyBtn && couponInput && msgDiv) {
    applyBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        if (couponApplied) {
            msgDiv.innerText = 'Coupon already used!';
            msgDiv.style.color = '#c0392b';
            return;
        }
        if (code === 'SAVE10') {
            discount = 10.00;
            couponApplied = true;
            msgDiv.innerText = '$10 off applied!';
            msgDiv.style.color = '#1f5f3a';
            updateTotals();
            applyBtn.disabled = true;
            applyBtn.style.opacity = '0.6';
        } else {
            msgDiv.innerText = 'Invalid code. Try SAVE10';
            msgDiv.style.color = '#c0392b';
        }
    });
}

const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('✅ Order placed! Thank you for shopping with CPS.');
        window.location.href = 'index.html';
    });
}

renderCart();