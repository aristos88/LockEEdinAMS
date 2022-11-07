/*
window.onload = function() { 

};
*/
window.addEventListener("scroll", preventMotion, false);
window.addEventListener("touchmove", preventMotion, false);

//console.log(window.matchMedia("(max-width: 767px)").matches);
console.log(isMobile());
if (isMobile() || isMedia()){
  document.body.style.backgroundSize = "80%";
  document.getElementsByClassName("footer")[0].style.bottom = "-10px";
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isMedia(){
  return window.matchMedia("(max-width: 767px)").matches
}

function preventMotion(event)
{
    window.scrollTo(0, 0);
    //event.preventDefault();
    event.stopPropagation();
}

function removeScratchImg() {
  if (document.getElementById("scratchImg")){
    document.getElementById("scratchImg").remove();
  } 
  
}

function fireworksON() {
  //document.body.style.backgroundColor = "black";
  /*document.getElementsByClassName("text")[0].style.display = "none";
  document.getElementsByClassName("text")[1].style.display = "none";*/
  setTimeout("fireworksON2()", 3000);
}

function fireworksON2() {
  document.getElementsByClassName("firework")[0].style.display = "inline";
  document.getElementsByClassName("firework")[1].style.display = "inline";
  document.getElementsByClassName("firework")[2].style.display = "inline";
  document.getElementsByClassName("firework")[3].style.display = "inline";
  document.getElementsByClassName("firework")[4].style.display = "inline";
  document.getElementsByClassName("firework")[5].style.display = "inline";
}

let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

const init = () => {
  let gradientColor = context.createLinearGradient(0, 0, 135, 135);
  gradientColor.addColorStop(0, "black"); //"#c3a3f1"
  gradientColor.addColorStop(1, "black"); //"#6414e9"
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, 200, 200);
};

//initially mouse X and mouse Y positions are 0
let mouseX = 0;
let mouseY = 0;
let isDragged = false;

//Events for touch and mouse
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Detech touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error.
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};


//Get left and top of canvas
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

//Exact x and y position of mouse/touch
const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

isTouchDevice();
//Start Scratch
canvas.addEventListener(events[deviceType].down, (event) => {
  isDragged = true;
  //Get x and y position
  getXY(event);
  scratch(mouseX, mouseY);
});

//mousemove/touchmove
canvas.addEventListener(events[deviceType].move, (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isDragged) {
    getXY(event);
    scratch(mouseX, mouseY);
  }
});

//stop drawing
canvas.addEventListener(events[deviceType].up, () => {
  isDragged = false;
});

//If mouse leaves the square
canvas.addEventListener("mouseleave", () => {
  isDragged = false;
});

const scratch = (x, y) => {
  //destination-out draws new shapes behind the existing canvas content
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  //arc makes circle - x,y,radius,start angle,end angle
  context.arc(x, y, 20, 0, 2 * Math.PI); // number next to y is how big the eraser will be when scratching
  context.fill();
};

window.onload = init();

// Set the date we're counting down to
var countDownDate = new Date("Nov 12, 2023 15:30:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
