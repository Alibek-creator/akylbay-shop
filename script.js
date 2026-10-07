// Akylbay Shop storefront
// ВАЖНО: замените номер ниже на номер магазина в международном формате без + и пробелов.
const WHATSAPP_NUMBER = "77002788639";

const products = [
  {
    id: 1,
    name: "Oversize Hoodie",
    category: "tops",
    price: 22990,
    description: "Плотный хлопок, свободная посадка",
    sizes: ["S", "M", "L", "XL"],
    badge: "Хит",
    type: "hoodie",
    tone: "#111111"
  },
  {
    id: 2,
    name: "Essential T-Shirt",
    category: "tops",
    price: 11990,
    description: "Мягкий хлопок, универсальный крой",
    sizes: ["S", "M", "L", "XL"],
    badge: "New",
    type: "tshirt",
    tone: "#f8f8f5"
  },
  {
    id: 3,
    name: "Urban Cargo",
    category: "bottoms",
    price: 19990,
    description: "Прямой крой и функциональные карманы",
    sizes: ["S", "M", "L", "XL"],
    badge: "",
    type: "pants",
    tone: "#272727"
  },
  {
    id: 4,
    name: "Mono Jacket",
    category: "outerwear",
    price: 29990,
    description: "Лёгкая куртка на каждый день",
    sizes: ["M", "L", "XL"],
    badge: "Limited",
    type: "jacket",
    tone: "#d9d9d5"
  },
  {
    id: 5,
    name: "Wide Pants",
    category: "bottoms",
    price: 18990,
    description: "Широкий силуэт и комфортная посадка",
    sizes: ["S", "M", "L"],
    badge: "",
    type: "pants",
    tone: "#e9e9e5"
  },
  {
    id: 6,
    name: "City Cap",
    category: "accessories",
    price: 7990,
    description: "Регулируемый размер, плотный хлопок",
    sizes: ["One size"],
    badge: "",
    type: "cap",
    tone: "#111111"
  },
  {
    id: 7,
    name: "Everyday Longsleeve",
    category: "tops",
    price: 14990,
    description: "Базовый лонгслив из мягкого трикотажа",
    sizes: ["S", "M", "L", "XL"],
    badge: "New",
    type: "longsleeve",
    tone: "#ededeb"
  },
  {
    id: 8,
    name: "Minimal Tote",
    category: "accessories",
    price: 6990,
    description: "Вместительная сумка для города",
    sizes: ["One size"],
    badge: "",
    type: "bag",
    tone: "#f8f8f5"
  }
];

let cart = JSON.parse(localStorage.getItem("akylbay-cart") || "[]");
let activeCategory = "all";

const productsContainer = document.getElementById("products");
const filters = document.getElementById("filters");
const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const closeCartButton = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartSummary = document.getElementById("cartSummary");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const continueShopping = document.getElementById("continueShopping");
const toast = document.getElementById("toast");
const whatsappFloat = document.getElementById("whatsappFloat");
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

function createProductSvg(product) {
  const dark = product.tone.toLowerCase() === "#111111" || product.tone.toLowerCase() === "#272727";
  const stroke = dark ? "#ffffff" : "#111111";
  const accent = dark ? "#deded8" : "#111111";
  let garment = "";

  if (product.type === "hoodie") {
    garment = `
      <path d="M172 90c12-35 40-55 68-55s56 20 68 55l48 28-31 66-35-18v172H190V166l-35 18-31-66 48-28Z"
        fill="${product.tone}" stroke="${stroke}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M195 91c7 38 26 57 45 57s38-19 45-57" fill="none" stroke="${stroke}" stroke-width="7"/>
      <path d="M212 235h56" stroke="${stroke}" stroke-width="7" stroke-linecap="round"/>
    `;
  } else if (product.type === "tshirt") {
    garment = `
      <path d="M170 76 115 112l32 65 42-22v183h102V155l42 22 32-65-55-36-32 20h-76l-32-20Z"
        fill="${product.tone}" stroke="${stroke}" stroke-width="7" stroke-linejoin="round"/>
      <circle cx="240" cy="187" r="31" fill="none" stroke="${accent}" stroke-width="5"/>
      <text x="240" y="201" text-anchor="middle" font-family="Arial" font-size="38" font-weight="700" fill="${accent}">A</text>
    `;
  } else if (product.type === "pants") {
    garment = `
      <path d="M174 64h132l-6 102-16 180h-64l-10-160-10 160h-64l-16-180-6-102Z"
        fill="${product.tone}" stroke="${stroke}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M174 108h132M240 65v86" stroke="${stroke}" stroke-width="6"/>
      <path d="M188 129h-30v56h34M292 129h30v56h-34" fill="none" stroke="${stroke}" stroke-width="6"/>
    `;
  } else if (product.type === "jacket") {
    garment = `
      <path d="M178 76 126 112l28 70 35-19v175h102V163l35 19 28-70-52-36-34 17h-56l-34-17Z"
        fill="${product.tone}" stroke="${stroke}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M240 94v244M196 180h35M249 180h35" stroke="${stroke}" stroke-width="6"/>
      <circle cx="240" cy="135" r="4" fill="${stroke}"/>
      <circle cx="240" cy="165" r="4" fill="${stroke}"/>
    `;
  } else if (product.type === "longsleeve") {
    garment = `
      <path d="M178 80 112 119l22 54 50-20v185h112V153l50 20 22-54-66-39-32 18h-60l-32-18Z"
        fill="${product.tone}" stroke="${stroke}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M206 99c8 23 20 35 34 35s26-12 34-35" fill="none" stroke="${stroke}" stroke-width="6"/>
      <path d="M210 242h60" stroke="${accent}" stroke-width="6"/>
    `;
  } else if (product.type === "cap") {
    garment = `
      <path d="M150 200c0-74 38-124 95-124 55 0 96 41 96 117v17H150v-10Z"
        fill="${product.tone}" stroke="${stroke}" stroke-width="7"/>
      <path d="M340 210c-3 39-45 60-107 48l-66-13c-21-4-30-20-17-35h190Z"
        fill="${product.tone}" stroke="${stroke}" stroke-width="7"/>
      <path d="M245 79v127" stroke="${stroke}" stroke-width="6"/>
      <text x="245" y="170" text-anchor="middle" font-family="Arial" font-size="54" font-weight="700" fill="${accent}">A</text>
    `;
  } else {
    garment = `
      <path d="M170 135h140l22 203H148l22-203Z" fill="${product.tone}" stroke="${stroke}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M195 135c0-60 18-88 45-88s45 28 45 88" fill="none" stroke="${stroke}" stroke-width="9"/>
      <circle cx="240" cy="223" r="33" fill="none" stroke="${accent}" stroke-width="5"/>
      <text x="240" y="238" text-anchor="middle" font-family="Arial" font-size="42" font-weight="700" fill="${accent}">A</text>
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 420" role="img" aria-label="${product.name}">
      <rect width="480" height="420" rx="34" fill="#ecece8"/>
      <circle cx="70" cy="60" r="34" fill="none" stroke="#d7d7d2" stroke-width="2"/>
      <circle cx="410" cy="350" r="68" fill="none" stroke="#d7d7d2" stroke-width="2"/>
      ${garment}
    </svg>
  `;

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function renderProducts() {
  const filtered = activeCategory === "all"
    ? products
    : products.filter(product => product.category === activeCategory);

  productsContainer.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-card__media">
        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ""}
        <img src="${createProductSvg(product)}" alt="${product.name}">
      </div>
      <div class="product-card__body">
        <div class="product-card__meta">
          <h3>${product.name}</h3>
          <strong>${formatPrice(product.price)}</strong>
        </div>
        <p class="product-card__description">${product.description}</p>
        <div class="product-card__sizes">
          ${product.sizes.map(size => `<span class="size-chip">${size}</span>`).join("")}
        </div>
        <button class="add-button" type="button" data-add="${product.id}">
          Добавить в корзину
        </button>
      </div>
    </article>
  `).join("");
}

function saveCart() {
  localStorage.setItem("akylbay-cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast("Товар добавлен в корзину");
}

function updateQuantity(productId, delta) {
  const item = cart.find(entry => entry.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(entry => entry.id !== productId);
  saveCart();
  renderCart();
  showToast("Товар удалён");
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;

  if (!cart.length) {
    cartItems.innerHTML = "";
    cartItems.style.display = "none";
    cartEmpty.classList.add("is-visible");
    cartSummary.classList.add("is-hidden");
    return;
  }

  cartItems.style.display = "flex";
  cartEmpty.classList.remove("is-visible");
  cartSummary.classList.remove("is-hidden");

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(entry => entry.id === item.id);
    return `
      <div class="cart-item">
        <div class="cart-item__image">
          <img src="${createProductSvg(product)}" alt="${product.name}">
        </div>
        <div>
          <h4>${product.name}</h4>
          <p>${formatPrice(product.price)}</p>
          <div class="cart-item__controls">
            <button class="quantity-button" type="button" data-decrease="${product.id}" aria-label="Уменьшить количество">−</button>
            <strong>${item.quantity}</strong>
            <button class="quantity-button" type="button" data-increase="${product.id}" aria-label="Увеличить количество">+</button>
          </div>
        </div>
        <button class="remove-button" type="button" data-remove="${product.id}" aria-label="Удалить товар">×</button>
      </div>
    `;
  }).join("");

  const total = cart.reduce((sum, item) => {
    const product = products.find(entry => entry.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  cartTotal.textContent = formatPrice(total);
}

function openCart() {
  cartDrawer.classList.add("is-open");
  drawerOverlay.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  drawerOverlay.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function checkoutInWhatsApp() {
  if (!cart.length) {
    showToast("Корзина пуста");
    return;
  }

  const lines = cart.map((item, index) => {
    const product = products.find(entry => entry.id === item.id);
    return `${index + 1}. ${product.name} — ${item.quantity} шт. × ${formatPrice(product.price)}`;
  });

  const total = cart.reduce((sum, item) => {
    const product = products.find(entry => entry.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  const message = [
    "Здравствуйте! Хочу оформить заказ в Akylbay Shop:",
    "",
    ...lines,
    "",
    `Итого: ${formatPrice(total)}`,
    "",
    "Подскажите, пожалуйста, по наличию и размерам."
  ].join("\n");

  window.open(buildWhatsAppLink(message), "_blank", "noopener");
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter-button").forEach(item => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderProducts();
});

productsContainer.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  addToCart(Number(button.dataset.add));
});

cartItems.addEventListener("click", event => {
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");
  const remove = event.target.closest("[data-remove]");

  if (increase) updateQuantity(Number(increase.dataset.increase), 1);
  if (decrease) updateQuantity(Number(decrease.dataset.decrease), -1);
  if (remove) removeFromCart(Number(remove.dataset.remove));
});

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
drawerOverlay.addEventListener("click", closeCart);
checkoutButton.addEventListener("click", checkoutInWhatsApp);

continueShopping.addEventListener("click", () => {
  closeCart();
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
});

whatsappFloat.href = buildWhatsAppLink("Здравствуйте! Хочу узнать подробнее об одежде Akylbay Shop.");

menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mainNav.addEventListener("click", event => {
  if (event.target.tagName === "A") {
    mainNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    mainNav.classList.remove("is-open");
  }
});

renderProducts();
renderCart();
