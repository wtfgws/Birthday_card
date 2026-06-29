const intro = document.getElementById("intro");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

const yes = document.querySelector(".yes");
const no = document.querySelector(".no");

const bubble = document.getElementById("bubble");
const blossom =
document.getElementById("blossomOverlay");

let state = 0;
let tries = 0;


const messages = [
    "😏 Nice try...",
    "😂 Almost got me!",
    "🥺 Okay... you win."
];

window.onload = start;

function start() {

    intro.style.opacity = "1";
    intro.style.transition = "0.5s";

    setTimeout(moveIntro, 1500);

}

function moveIntro() {

    intro.style.top = "12%";
    intro.style.fontSize = "36px";
    intro.style.transition = "all 0.8s ease";

    setTimeout(hideIntro, 900);

}

function hideIntro() {

    intro.style.opacity = "0";
    showGifs();

    setTimeout(showLine1, 500);

}

function showLine1() {

    line1.classList.add("show");

    setTimeout(showLine2, 900);

}

function showLine2() {

    line2.classList.add("show");

    setTimeout(showButtons, 900);

}

function showButtons() {

    yes.classList.add("show");

    setTimeout(() => {

        no.classList.add("show");

    }, 300);

}
// ---------- BUTTON EVENTS ----------

yes.addEventListener("touchstart", yesClick);
yes.addEventListener("mouseenter", yesClick);

no.addEventListener("touchstart", noClick);
no.addEventListener("mouseenter", noClick);

function yesClick(){

    // First interaction: swap buttons
    if(state === 0){

        swapButtons();
        state = 1;
        return;

    }

    celebrate();

}

function noClick(){

    // First interaction: swap buttons too
    if(state === 0){

        swapButtons();
        state = 1;
        return;

    }

    escapeNo();

}

function swapButtons(){

    yes.style.transition = "all .4s ease";
    no.style.transition = "all .4s ease";

    yes.style.left = "62%";
    yes.style.right = "auto";

    no.style.left = "18%";
    no.style.right = "auto";

}

function celebrate(){

    bubble.innerHTML = "😭 Nooooooo!";
    bubble.style.opacity = "1";

    no.style.pointerEvents = "none";
    no.style.transition = "all .7s ease";
    no.style.transform = "translateY(-250px) rotate(720deg) scale(0)";
    no.style.opacity = "0";

 heartExplosion();

startPetals();

blossom.classList.add("show");

blossom.style.animation = "none";
blossom.offsetHeight;   // force reflow
blossom.style.animation = "sakuraSway 2s ease-in-out";

setTimeout(() => {

    blossom.classList.remove("show");

},9000);


    
    document.body.animate(

[
{transform:"scale(1)"},
{transform:"scale(1.02)"},
{transform:"scale(1)"}
],

{
duration:250
}

);

    yes.style.transition = ".3s";
    yes.style.transform = "scale(1.25)";

    setTimeout(()=>{
        yes.style.transform = "scale(1)";
    },300);

    setTimeout(()=>{
        bubble.style.opacity = "0";
        bubble.style.transform="translateX(-50%) scale(1)";
    },700);

    // Uncomment when page2.html exists
    // setTimeout(()=>{
    //     window.location.href = "page2.html";
    // },2200);

}

function escapeNo(){

    if(tries >= messages.length){
        bubble.style.opacity = "0";bubble.style.transform="translateX(-50%) scale(1)";
        
        return;
    }

    bubble.innerHTML = messages[tries];
    bubble.style.opacity = "1";

    const left = Math.random()*55 + 15;
    const top = Math.random()*25 + 55;

    no.style.left = left + "%";
    no.style.top = top + "%";
    no.style.right = "auto";

    tries++;

    setTimeout(()=>{
        bubble.style.opacity = "0";bubble.style.transform="translateX(-50%) scale(.4)";
    },900);

}

function heartExplosion(){

const box=document.getElementById("hearts");

for(let i=0;i<25;i++){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="💖";

heart.style.left="50%";
heart.style.top="82%";

heart.style.setProperty("--x",
(Math.random()*500-250)+"px");

heart.style.setProperty("--y",
(-Math.random()*500)+"px");

box.appendChild(heart);

setTimeout(()=>heart.remove(),1400);

}

}
function showGifs(){

const gif1=document.querySelector(".gif1");
const gif2=document.querySelector(".gif2");

gif1.style.animation="popGif .6s forwards";

gif2.style.animation="popGifCorner .6s forwards";

}
function startPetals(){

    const box = document.getElementById("petalsContainer");

    let count = 0;

    const rain = setInterval(()=>{

        const petal = document.createElement("img");

        petal.src = "images/petals.png";
        petal.className = "petal";

        // Spawn FROM THE BRANCH
        const startX = 72 + Math.random()*18;
        const startY = 3 + Math.random()*12;

        petal.style.left = startX + "vw";
        petal.style.top = startY + "vh";

        petal.style.width =
        (45 + Math.random()*20) + "px";

        petal.style.animationDuration =
        (5 + Math.random()*2) + "s";

        petal.style.setProperty(
            "--drift",
            (Math.random()*160-80)+"px"
        );

        box.appendChild(petal);

        setTimeout(()=>petal.remove(),7000);

        count++;

        if(count>8){
            clearInterval(rain);
        }

    },150);

}