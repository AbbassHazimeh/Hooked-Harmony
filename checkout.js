document.getElementById('place-order-btn').addEventListener('click', async function () {
    const fullName = document.getElementById('full-name')?.value.trim() || '';
    const country = document.getElementById('country')?.value || '';
    const address = document.getElementById('address')?.value.trim() || '';
    const city = document.getElementById('city')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const additionalInfo = document.getElementById('more')?.value.trim() || '';
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || '';

   
    if (!fullName || !country || !address || !city || !phone || !email || !paymentMethod) {
        showPopup('order-error-popup');
        return;
    }
    const orderData = {
        shippingInfo: {
            fullName,
            country,
            address,
            city,
            phone,
            email
        },
        additionalInfo,
        paymentMethod,
        products: await generateOrderData()
    };

    const orderDataJson = JSON.stringify(orderData, null, 2);
    const blob = new Blob([orderDataJson], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'orderData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showPopup('order-success-popup');
});

function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }
}

async function generateOrderData() {
    return [
        {
            id: 1,
            name: 'Sample Product',
            quantity: 2,
            price: 12.00,
            color: 'blue'
        }
    ];
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show');
  }

  function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
