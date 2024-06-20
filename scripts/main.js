function showSection(sectionId) {
    // Скрываем все секции
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Показываем выбранную секцию
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

const cart = [];

function addToCart(button) {
    const productItem = button.parentElement;
    const productName = productItem.getAttribute('data-name');
    const productPrice = parseInt(productItem.getAttribute('data-price'));

    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} - ${item.price} руб. x ${item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">Удалить</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').innerText = `Итого: ${total} руб.`;
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity--;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }

    updateCart();
}

function checkout() {
    alert('не придумал');
    cart.length = 0;
    updateCart();
}
