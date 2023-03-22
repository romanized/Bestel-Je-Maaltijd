const dishesData = [
  { id: 1, name: "Zalm Nigiri 2x", price: 3.90, img: "/Media/zalmnigiri.jpg" },
  { id: 2, name: "Tonijn Maki 6x", price: 4.70, img: "/Media/tonijnmaki.jpg" },
  { id: 3, name: "California Zalm 3x", price: 5.20, img: "/Media/Californiazalm.jpg" },
  { id: 4, name: "Surimi Temaki 2x", price: 4.50, img: "/Media/Surimitemaki.jpg" },
  { id: 5, name: "Gunak Zeewier 3x", price: 3.70, img: "/Media/gunakzeewier.jpg" },
  { id: 6, name: "Nigiri Omlet 2x", price: 4.70, img: "/Media/nigiriomlet.jpg" },
];

const cart = new Map();

function addToCart(id) {
  const dish = dishesData.find((d) => d.id === id);
  if (!cart.has(id)) {
    cart.set(id, { ...dish, count: 1 });
  } else {
    cart.get(id).count++;
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.size === 0) {
    cartItems.innerHTML = "Your cart is empty.";
  } else {
    let total = 0;
    for (const [id, item] of cart.entries()) {
      const listItem = document.createElement("div");
      const itemInfo = document.createElement("p");
      itemInfo.textContent = `${item.name} x ${item.count} ($${(
        item.price * item.count
      ).toFixed(2)})`;
      listItem.appendChild(itemInfo);

      const removeButton = document.createElement("button");
      removeButton.classList.add ("button2");
      removeButton.textContent = "Remove";
      removeButton.onclick = () => removeFromCart(id);
      listItem.appendChild(removeButton);

      cartItems.appendChild(listItem);
      total += item.price * item.count;
    }
    const totalElement = document.createElement("p");
    totalElement.style.fontWeight = "bold";
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartItems.appendChild(totalElement);
  }
}

function placeOrder() {
  if (cart.size === 0) {
    alert(
      "Uw winkelwagen is nog leeg. \nVoeg producten toe om door te gaan."
    );
  } else {
    let orderDetails = "Uw bestelling:\n";
    let total = 0;
    for (const [id, item] of cart.entries()) {
      orderDetails += `${item.name} x ${item.count} (€${
        item.price * item.count
      })\n`;
      total += item.price * item.count;
    }
    orderDetails += `Total: €${total}\n`;
    orderDetails += "Bestelling geplaatst, u ontvangt een bevestigingsmail.";
    alert(orderDetails);
    cart.clear();
    updateCartDisplay();
  }
}

function toggleCart() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("open");
}

function createDishElements() {
  const dishes = document.querySelector(".dishes");
  dishesData.forEach((dish) => {
    const dishElement = document.createElement("div");
    dishElement.classList.add("dish");

    const dishImage = document.createElement("img");
    dishImage.src = dish.img;
    dishImage.alt = dish.name;

    const dishName = document.createElement("p");
    dishName.classList.add("name");
    dishName.textContent = dish.name;

    const dishPrice = document.createElement("p");
    dishPrice.classList.add("price");
    dishPrice.textContent = "€" + dish.price;

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add ("button1");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.onclick = () => addToCart(dish.id);

    dishElement.appendChild(dishImage);
    dishElement.appendChild(dishName);
    dishElement.appendChild(dishPrice);
    dishElement.appendChild(addToCartButton);
    dishes.appendChild(dishElement);
  });
}

createDishElements();

function removeFromCart(id) {
  if (cart.has(id)) {
    const item = cart.get(id);
    item.count--;
    if (item.count === 0) {
      cart.delete(id);
    }
  }
  updateCartDisplay();
}
