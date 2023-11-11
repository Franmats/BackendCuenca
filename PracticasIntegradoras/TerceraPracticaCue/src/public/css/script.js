const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const menuImage = document.querySelector(".menu-image");

menuToggle.addEventListener("click", () => {
  toggleMenu();
});

menuImage.addEventListener("click", () => {
  toggleMenu();
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && event.target !== menuImage) {
    closeMenu();
  }
});

function toggleMenu() {
  menuToggle.classList.toggle("active");
  menu.classList.toggle("active");
}

function closeMenu() {
  menuToggle.classList.remove("active");
  menu.classList.remove("active");
}

function onclick (){
  console.log("listo");
}


const buttonid = document.querySelector("button")
buttonid.addEventListener("click",(event)=>{
  console.log(event);
})