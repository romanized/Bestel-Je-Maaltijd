const navbar = document.querySelector("div.navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("change");
    } else {
        navbar.classList.remove("change");
    }
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = slides.length;}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
    window.slideIndex = 1;
    showSlides(slideIndex);

    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("closeBtn");

    function openPopup() {
        setTimeout(() => {
            popup.classList.add("open");
        }, 1900);
    }

    closeBtn.addEventListener("click", function () {
        popup.classList.remove("open");
    });

    openPopup();
});
