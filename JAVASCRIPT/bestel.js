const dishesData = [
  { id: 1, name: "Sushi Roll", price: 9.99, img: "sushi-roll.jpg" },
  { id: 2, name: "Sashimi Platter", price: 12.99, img: "sashimi-platter.jpg" },
  { id: 3, name: "Salmon Nigiri", price: 5.99, img: "salmon-nigiri.jpg" },
  { id: 4, name: "Spicy Tuna Roll", price: 10.99, img: "spicy-tuna-roll.jpg" },
  { id: 5, name: "Rainbow Roll", price: 11.99, img: "rainbow-roll.jpg" },
  { id: 6, name: "California Roll", price: 7.99, img: "california-roll.jpg" },
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
      "Your cart is empty. Please add items to your cart before placing an order."
    );
  } else {
    let orderDetails = "You ordered:\n";
    let total = 0;
    for (const [id, item] of cart.entries()) {
      orderDetails += `${item.name} x ${item.count} ($${
        item.price * item.count
      })\n`;
      total += item.price * item.count;
    }
    orderDetails += `Total: $${total}\n`;
    orderDetails += "Your order has been placed.";
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
    dishPrice.textContent = "$" + dish.price;

    const addToCartButton = document.createElement("button");
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
