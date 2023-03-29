function showMenu() {
  const $menu = $("#menu");
  if ($menu.css("display") === "block") {
    $menu.css("display", "none");
  } else {
    $menu.css("display", "block");
  }
}
