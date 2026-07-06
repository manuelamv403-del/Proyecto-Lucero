// ======================================
// PROYECTO LUCEROS
// UI - FINAL
// ======================================

const UI = {

    letterButton: null,
    intro: null,
    letter: null,
    letterContent: null,
    phraseInterval: null,

    init() {

        const button = document.getElementById("startButton");

        this.intro = document.querySelector(".intro");
        this.letterButton = document.getElementById("letterButton");
        this.letter = document.getElementById("letter");
        this.letterContent = document.getElementById("letterContent");

        this.letterButton.style.display = "none";

        button.addEventListener("click", () => {
            this.intro.style.opacity = "0";
            this.intro.style.pointerEvents = "none";

            setTimeout(() => {
                this.playMitchellStar();
            }, 1200);
        });

        this.letterButton.addEventListener("click", () => {
            this.cinematicTransition();
        });

    },

    playMitchellStar() {

        const scene = document.createElement("div");
        scene.className = "mitchell-scene";

        const star = document.createElement("div");
        star.className = "mitchell-star";

        const name = document.createElement("div");
        name.className = "mitchell-name";

        scene.appendChild(star);
        scene.appendChild(name);
        document.body.appendChild(scene);

        const text = "Mitchell";
        let i = 0;

        setTimeout(() => {

            const typing = setInterval(() => {

                name.textContent += text.charAt(i);
                i++;

                if (i >= text.length) {

                    clearInterval(typing);

                    setTimeout(() => {

                        scene.classList.add("fade-out");

                        setTimeout(() => {
                            scene.remove();
                            Heart.start();
                            this.startPhraseCloud();
                        }, 1500);

                    }, 1800);

                }

            }, 180);

        }, 1600);

        setTimeout(() => {
            this.showLetterButton();
        }, 26000);

    },

    startPhraseCloud() {

        let index = 0;

        this.createFloatingPhrase(phrases[index]);

        this.phraseInterval = setInterval(() => {

            index++;

            if (index >= phrases.length) {
                index = 0;
            }

            this.createFloatingPhrase(phrases[index]);

        }, 800);

    },

    createFloatingPhrase(text) {

        const phrase = document.createElement("div");

        phrase.className = "floating-heart-phrase";
        phrase.textContent = text;

        const side = Math.floor(Math.random() * 4);

        let x = 0;
        let y = 0;

        switch (side) {

            case 0:
                x = (Math.random() - 0.5) * 700;
                y = -220 - Math.random() * 120;
                break;

            case 1:
                x = 260 + Math.random() * 180;
                y = (Math.random() - 0.5) * 450;
                break;

            case 2:
                x = (Math.random() - 0.5) * 700;
                y = 220 + Math.random() * 120;
                break;

            default:
                x = -260 - Math.random() * 180;
                y = (Math.random() - 0.5) * 450;
                break;
        }

        phrase.style.setProperty("--x", `${x}px`);
        phrase.style.setProperty("--y", `${y}px`);
        phrase.style.setProperty("--r", `${Math.random() * 16 - 8}deg`);

        document.body.appendChild(phrase);

        requestAnimationFrame(() => {
            phrase.classList.add("show");
        });

        setTimeout(() => {
            phrase.classList.add("fade");
        }, 2800);

        setTimeout(() => {
            phrase.remove();
        }, 4500);

    },

    showLetterButton() {

        this.letterButton.style.display = "block";
        this.letterButton.style.opacity = "1";

    },

    cinematicTransition() {

        clearInterval(this.phraseInterval);

        document.querySelectorAll(".floating-heart-phrase").forEach(p => {
            p.style.transition = "1.5s";
            p.style.opacity = "0";
            p.style.transform += " scale(.5)";
        });

        this.letterButton.style.opacity = "0";

        Heart.points.material.transparent = true;

        const fade = setInterval(() => {

            Heart.points.material.opacity -= 0.02;

            if (Heart.points.material.opacity <= 0) {

                clearInterval(fade);

                this.showLetter();

            }

        }, 16);

    },

    showLetter() {

        this.letter.style.display = "flex";

        requestAnimationFrame(() => {
            this.letter.classList.add("show");
        });

        this.typeLetter(finalLetter);

    },

    typeLetter(text) {

        this.letterContent.textContent = "";

        let i = 0;

        const timer = setInterval(() => {

            this.letterContent.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {

                clearInterval(timer);

                setTimeout(() => {
                    UI.startFinalScene();
                }, 2200);

            }

        }, 35);

    },

    startFinalScene() {

        this.letter.classList.add("letter-fade");

        setTimeout(() => {

            this.letter.style.display = "none";

            Heart.startFinale();

            const final = document.createElement("div");
            final.className = "final-message";

            final.innerHTML = `
                <p>Gracias por permitirme sentir esto por ti.</p>
                <span>Espero seguir escribiendo esta historia contigo.</span>
                <small>— Manuel ❤️</small>
            `;

            document.body.appendChild(final);

            requestAnimationFrame(() => {
                final.classList.add("show");
            });

        }, 1800);

    }

};