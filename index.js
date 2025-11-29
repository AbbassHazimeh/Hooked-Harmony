function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadContentcard(page) {
    fetch(page)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("mainContent").innerHTML = data;

            if (page === 'cart.html') {
                loadScript('cart.js').then(() => {
                    if (typeof loadProducts === 'function') {
                        loadProducts();
                    } else {
                        console.error('loadProducts function is not defined.');
                    }
                }).catch((error) => console.error('Error loading script:', error));
            }
        })
        .catch((error) => console.error("Error loading content:", error));

    toggleDropdown();
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display =
        dropdownMenu.style.display === "none" ? "block" : "none";
}

function loadContent(page) {
    fetch(page)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("mainContent").innerHTML = data;
        })
        .catch((error) => console.error("Error loading content:", error));

    toggleDropdown();
}

window.onload = function () {
    loadContent("home.html");
};

window.onclick = function (event) {
    if (
        !event.target.matches(".menu-button") &&
        !event.target.matches(".menu-button *")
    ) {
        const dropdownMenu = document.getElementById("dropdownMenu");
        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        }
    }
};

function filterCategory(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        if (category === 'all') {
            product.style.display = 'block';
        } else {
            if (product.getAttribute('data-category') === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
    });
}
