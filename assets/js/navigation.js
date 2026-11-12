
/* =====================================================
   ELENA · NAVEGACIÓN
===================================================== */

(() => {
    "use strict";

    const screens = [...document.querySelectorAll(".story-screen")];
    const backButton = document.getElementById("backButton");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const indicators = [...document.querySelectorAll(".step")];

    let currentScreen = 0;
    let navigating = false;

    function updateNavigation() {

        screens.forEach((screen, index) => {
            screen.classList.toggle("active", index === currentScreen);
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentScreen);
        });

        const total = screens.length;
        const percentage = ((currentScreen + 1) / total) * 100;

        progressFill.style.width = `${percentage}%`;

        progressText.textContent =
            `${String(currentScreen + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

        backButton.disabled = currentScreen === 0;

        const activeScreen = screens[currentScreen];
        activeScreen.scrollTop = 0;

        document.dispatchEvent(new CustomEvent("elena:screenChanged", {
            detail: {
                current: currentScreen,
                total
            }
        }));
    }

    function goToScreen(index) {

        if (navigating) return;
        if (index < 0 || index >= screens.length) return;
        if (index === currentScreen) return;

        navigating = true;

        currentScreen = index;
        updateNavigation();

        if (window.ELENA_SOUND) {
            window.ELENA_SOUND.play("transition");
        }

        setTimeout(() => {
            navigating = false;
        }, 550);
    }

    function nextScreen() {
        goToScreen(currentScreen + 1);
    }

    function previousScreen() {
        goToScreen(currentScreen - 1);
    }

    document.querySelectorAll("[data-next]").forEach(button => {
        button.addEventListener("click", nextScreen);
    });

    backButton.addEventListener("click", previousScreen);

    window.ELENA_NAVIGATION = {
        next: nextScreen,
        back: previousScreen,
        goTo: goToScreen,
        getCurrentScreen: () => currentScreen
    };

    updateNavigation();

})();
