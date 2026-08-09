const grid = document.getElementById("productGrid");
const filters = document.getElementById("filters");
const modal = document.getElementById("modal");

const categories = ["All", ...new Set(products.map(p => p.category))];

categories.forEach((category, i) => {
  const btn = document.createElement("button");
  btn.className = "filter" + (i === 0 ? " active" : "");
  btn.textContent = category;
  btn.onclick = () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(category);
  };
  filters.appendChild(btn);
});

function renderProducts(category = "All") {
  grid.innerHTML = "";
  products
    .filter(p => category === "All" || p.category === category)
    .forEach((product, index) => {
      const card = document.createElement("article");
      card.className = "product";
      card.innerHTML = `
        <div class="product-image">
          ${product.image
            ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
            : `<div class="placeholder-lamp" aria-label="Product image placeholder"></div>`}
        </div>
        <div class="product-info">
          <span class="category">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price">${product.price}</div>
        </div>`;
      card.onclick = () => openModal(product);
      grid.appendChild(card);
    });
}

function openModal(product) {
  const img = document.getElementById("modalImage");
  img.src = product.image || "";
  img.alt = product.name;
  img.style.display = product.image ? "block" : "none";
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalPrice").textContent = product.price;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalSpecs").textContent = product.specs;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

renderProducts();
