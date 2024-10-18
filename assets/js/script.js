const page = document.querySelector(".page");
const container = document.querySelector(".container");
const squares = document.querySelectorAll(".square");
const score = document.querySelector(".score span");
const time = document.querySelector(".time span");
const life = document.querySelector(".life span");
const start = document.querySelector(".start");
let gameSpeed = 1000;

const playSound = (sound) => {
    const audio = new Audio(`./assets/audio/${sound}.mp3`);
    audio.play();
};

const reStart = () =>{
    setTimeout(() => {
        window.location.reload();
    }, 5000);
}

start.addEventListener("click", () => {
    page.classList.remove("active");
    container.classList.add("active");

    playFishing();
    playSound("start");
});

const clearFish = () => {
    squares.forEach((square) => square.classList.remove("fish"));
};

const clickFishing = () => {
    squares.forEach((btn) => btn.addEventListener("click", (e) => {
        if (e.target.classList.contains("fish")) {
            score.textContent = Number(score.textContent) + 1;
            playSound("splash");
            clearFish();
        }
    }));
};

const playFishing = () => {
    time.textContent = 30;

    if(score.textContent == 0){
        score.textContent = 0; 
    }

    let lives = Number(life.textContent); 

    const count = setInterval(() => {
        if (time.textContent > 0) {
            clearFish();
            time.textContent = Number(time.textContent) - 1;

            const fishing = Math.floor(Math.random() * squares.length);
            squares[fishing].classList.add("fish");
        }

        if (time.textContent == 0) {
            clearInterval(count);

            if (score.textContent < 50) {
                page.classList.add("active");
                container.classList.remove("active");

                lives -= 1; 
                life.textContent = lives;

                page.querySelector("h1").textContent = "Tente novamente...";
                page.querySelector("h2").textContent = "";
                page.querySelector("h3").textContent = `Falta apenas: ${Math.max(0, 50 - score.textContent)} peixes!`;
                playSound("game_over");

                start.style.display="none";

                gameSpeed -= 250;

                setTimeout(()=>{
                    page.classList.remove("active");
                    container.classList.add("active");

                    playFishing();
                    playSound("start");

                }, 3000);

            } else {
                page.classList.add("active");
                container.classList.remove("active");

                page.querySelector("h1").textContent = "PARABÉNS!!";
                page.querySelector("h2").textContent = "";
                page.querySelector("h3").innerHTML = `<div class="winner"><h1>Você GANHOU!!</h1><h2>Pescou ${score.textContent} peixes!</h2><h3> E não é conversa de Pescador!</h3></div>`;

                playSound("win");
                reStart();
                
            }

            if (lives === 0) {
                page.querySelector("h1").textContent = "GAME OVER";
                page.querySelector("h2").textContent = "";
                page.querySelector("h3").textContent = "";
                
                playSound("game_over");

                start.style.display="none";

                reStart();
            }
        }
    }, gameSpeed);

    clickFishing();
};
