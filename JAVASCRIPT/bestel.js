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
  const $cartItems = $("#cart-items");
  $cartItems.html("");

  if (cart.size === 0) {
    $cartItems.html("Uw winkelwagentje is leeg.");
  } else {
    let total = 0;
    for (const [id, item] of cart.entries()) {
      const $listItem = $("<div>");
      const $itemInfo = $("<p>").text(`${item.name} x ${item.count} (€${(
        item.price * item.count
      ).toFixed(2)})`);
      $listItem.append($itemInfo);

      const $removeButton = $("<button>").addClass("button2").text("Verwijder").click(() => removeFromCart(id));
      $listItem.append($removeButton);

      $cartItems.append($listItem);
      total += item.price * item.count;
    }
    const $totalElement = $("<p>").css("fontWeight", "bold").text(`Totaal: €${total.toFixed(2)}`);
    $cartItems.append($totalElement);
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
    orderDetails += `Totaal: €${total}\n`;
    orderDetails += "Bestelling geplaatst, bezorging kan 20 a 40 minuten duren.";
    alert(orderDetails);
    cart.clear();
    updateCartDisplay();
  }
}

function toggleCart() {
  const $cart = $("#cart");
  $cart.toggleClass("open");
}

function createDishElements() {
  const $dishes = $(".dishes");
  dishesData.forEach((dish) => {
    const $dishElement = $("<div>").addClass("dish");

    const $dishImage = $("<img>").attr("src", dish.img).attr("alt", dish.name);

    const $dishName = $("<p>").addClass("name").text(dish.name);

    const $dishPrice = $("<p>").addClass("price").text("€" + dish.price + "0");

    const $addToCartButton = $("<button>").addClass("button1").text("Bestel").click(() => addToCart(dish.id));

    $dishElement.append($dishImage, $dishName, $dishPrice, $addToCartButton);
    $dishes.append($dishElement);
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
