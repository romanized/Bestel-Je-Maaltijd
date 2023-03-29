const $navbar = $("div.navbar");

$(window).on("scroll", () => {
  if ($(window).scrollTop() > 80) {
    $navbar.addClass("change");
  } else {
    $navbar.removeClass("change");
  }
});

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let $slides = $(".mySlides");
  let $dots = $(".dot");
  if (n > $slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = $slides.length;
  }
  $slides.hide();
  $dots.removeClass("active");
  $($slides[slideIndex - 1]).show();
  $($dots[slideIndex - 1]).addClass("active");
}

$(document).ready(function () {
  window.slideIndex = 1;
  showSlides(slideIndex);

  const $popup = $("#popup");
  const $closeBtn = $("#closeBtn");

  function openPopup() {
    setTimeout(() => {
      $popup.addClass("open");
    }, 1900);
  }

  $closeBtn.on("click", function () {
    $popup.removeClass("open");
  });

  openPopup();
});
