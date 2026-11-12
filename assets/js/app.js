
/* =========================================================
   ELENA · APLICACIÓN PRINCIPAL
   Archivo: assets/js/app.js
========================================================= */

(() => {
    "use strict";

    let soundEnabled = false;
    let audioContext = null;

    const soundButton = document.getElementById("soundToggle");
    const soundIcon = soundButton?.querySelector("i");

    // -----------------------------------------------------
    // AUDIO
    // -----------------------------------------------------

    function getAudioContext() {

        if (!audioContext) {

            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContextClass) return null;

            audioContext = new AudioContextClass();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        return audioContext;
    }

    function playTone(frequency, duration, volume = 0.035) {

        if (!soundEnabled) return;

        const context = getAudioContext();

        if (!context) return;

        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            frequency,
            context.currentTime
        );

        gain.gain.setValueAtTime(
            volume,
            context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();
        oscillator.stop(context.currentTime + duration);
    }

    function play(sound) {

        if (!soundEnabled) return;

        if (sound === "transition") {

            playTone(520, 0.12);

            setTimeout(() => {
                playTone(660, 0.15);
            }, 90);
        }

        if (sound === "click") {
            playTone(580, 0.1);
        }

        if (sound === "success") {

            playTone(523, 0.2);

            setTimeout(() => {
                playTone(659, 0.2);
            }, 140);

            setTimeout(() => {
                playTone(784, 0.3);
            }, 280);
        }
    }

    // -----------------------------------------------------
    // CONTROL DE SONIDO
    // -----------------------------------------------------

    if (soundButton && soundIcon) {

        soundButton.addEventListener("click", () => {

            soundEnabled = !soundEnabled;

            if (soundEnabled) {

                getAudioContext();

                soundIcon.className = "bi bi-volume-up-fill";

                playTone(580, 0.1);

            } else {

                soundIcon.className = "bi bi-volume-mute-fill";
            }
        });
    }

    // -----------------------------------------------------
    // SONIDOS DE INTERACCIÓN
    // -----------------------------------------------------

    document.addEventListener("click", event => {

        const button = event.target.closest("button");

        if (!button) return;
        if (button === soundButton) return;
        if (button.closest(".memory-modal")) return;

        play("click");
    });

    // -----------------------------------------------------
    // CORAZONES DECORATIVOS
    // -----------------------------------------------------

    function createFloatingHearts() {

        const container = document.getElementById("floatingHearts");

        if (!container) return;

        for (let i = 0; i < 12; i++) {

            const heart = document.createElement("i");

            heart.className = "bi bi-heart-fill ambient-heart";

            heart.style.left = `${Math.random() * 100}%`;

            heart.style.fontSize =
                `${8 + Math.random() * 12}px`;

            heart.style.animationDuration =
                `${10 + Math.random() * 12}s`;

            heart.style.animationDelay =
                `${Math.random() * 12}s`;

            container.appendChild(heart);
        }
    }

    createFloatingHearts();

    // -----------------------------------------------------
    // API GLOBAL DE SONIDOS
    // -----------------------------------------------------

    window.ELENA_SOUND = {
        play,
        isEnabled: () => soundEnabled
    };

    // -----------------------------------------------------
    // CARGA DE MÓDULOS
    // -----------------------------------------------------

    function loadModule(path) {

        return new Promise((resolve, reject) => {

            const script = document.createElement("script");

            script.src = path;
            script.async = true;

            script.onload = resolve;

            script.onerror = () => {
                reject(new Error(`No se pudo cargar ${path}`));
            };

            document.body.appendChild(script);
        });
    }

    async function initializeModules() {

        try {

            await loadModule("assets/js/memories.js");

            console.log("ELENA: módulo de recuerdos cargado.");

        } catch (error) {

            console.error(
                "ELENA: error cargando los módulos.",
                error
            );
        }
    }

    initializeModules();

})();
