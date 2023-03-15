const navbar = document.querySelector("div.navbar");

window.addEventListener("scroll",()=>{
    if(window.scrollY > 80){
        navbar.classList.add("change")
    }else{
        navbar.classList.remove("change")
    }
})