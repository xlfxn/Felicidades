/* ============================================================
   ESTADO GENERAL
   ============================================================ */

const DEFAULT_PROGRESS = {
    chiikawa: false,
    hachiware: false,
    cinnamoroll: false,
    chococat: false,
    usagi: false,
    pompompurin: false,
    momonga: false
};

const PROGRESS_STORAGE_KEY = "birthdayProgress";
const CHOCOCAT_STORAGE_KEY = "birthdayChococatClues_v3";

let progress = loadProgress();

// Estado temporal de experiencias que no necesitan persistir entre recargas.
let currentHachiwarePage = 0;

const HACHIWARE_MEMORIES_PER_PAGE = 2;
let chiikawaDiscoveries = new Set();
let hachiwareSeen = new Set();
let currentLetterPage = 0;
let pompompurinOpened = new Set();
let usagiSolved = new Set();
let currentUsagiRound = 0;
let momongaScore = 0;

let momongaActiveBush = -1;

let momongaLastBush = -1;

let momongaGameRunning = false;

let momongaShowTimer = null;

let momongaHideTimer = null;

let modalCompletionPending = null;
let completionReturnScreen = null;

// Chococat sí conserva sus pistas al recargar, pero el reset global las elimina.
let chococatFoundClues = loadChococatClues();

// Claves antiguas de las pruebas anteriores: se eliminan para que no arrastren el 3/3.
localStorage.removeItem("birthday_chococat_clues");
localStorage.removeItem("birthday_chococat_clues_v2");


/* ============================================================
   DOM
   ============================================================ */

const screens = {
    intro: document.getElementById("intro-screen"),
    hub: document.getElementById("hub-screen"),
    finalVideo: document.getElementById("final-video-screen"),
    chiikawa: document.getElementById("chiikawa-screen"),
    hachiware: document.getElementById("hachiware-screen"),
    cinnamoroll: document.getElementById("cinnamoroll-screen"),
    chococat: document.getElementById("chococat-screen"),
    usagi: document.getElementById("usagi-screen"),
    pompompurin: document.getElementById("pompompurin-screen"),
    momonga: document.getElementById("momonga-screen"),
    completion: document.getElementById("completion-screen")
};

const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const characterButtons = document.querySelectorAll(".character");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

// Final

const finalCakeButton = document.getElementById("final-cake-button");

const finalVideo = document.getElementById("final-video");

const finalVideoBack = document.getElementById("final-video-back");

const modal = document.getElementById("placeholder-modal");
const modalClose = document.getElementById("modal-close");
const modalBack = document.getElementById("modal-back");
const modalStandardContent = document.getElementById("modal-standard-content");
const modalIcon = document.getElementById("modal-icon");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const dynamicContent = document.getElementById("dynamic-content");

const completionIcon = document.getElementById("completion-icon");
const completionEyebrow = document.getElementById("completion-eyebrow");
const completionTitle = document.getElementById("completion-title");
const completionText = document.getElementById("completion-text");
const completionBack = document.getElementById("completion-back");

// Chiikawa
const chiikawaBack = document.getElementById("chiikawa-back");
const discoveries = document.querySelectorAll(".discovery");
const chiikawaProgressText = document.getElementById("chiikawa-progress-text");
const chiikawaProgressFill = document.getElementById("chiikawa-progress-fill");

// Hachiware
const hachiwareBack = document.getElementById("hachiware-back");
const hachiwareMemoryGrid = document.getElementById("hachiware-memory-grid");
const hachiwareProgressText = document.getElementById("hachiware-progress-text");
const hachiwareProgressFill = document.getElementById("hachiware-progress-fill");
const hachiwarePrevPage =
    document.getElementById("hachiware-prev-page");

const hachiwareNextPage =
    document.getElementById("hachiware-next-page");

const hachiwarePageIndicator =
    document.getElementById("hachiware-page-indicator");

// Cinnamoroll
const cinnamorollBack = document.getElementById("cinnamoroll-back");
const cinnamorollEnvelope =
    document.getElementById(
        "cinnamoroll-envelope"
    );

const openLetter =
    document.getElementById(
        "open-letter"
    );

const cinnamorollEnvelopeArea =
    document.getElementById(
        "cinnamoroll-envelope-area"
    );

const cinnamorollLetter =
    document.getElementById(
        "cinnamoroll-letter"
    );
const cinnamorollProgressText = document.getElementById("cinnamoroll-progress-text");
const cinnamorollProgressFill = document.getElementById("cinnamoroll-progress-fill");
const letterEyebrow = document.getElementById("letter-eyebrow");
const letterTitle = document.getElementById("letter-title");
const letterText = document.getElementById("letter-text");
const letterNext = document.getElementById("letter-next");

// Chococat
const chococatBack = document.getElementById("chococat-back");
const chococatProgressText = document.getElementById("chococat-progress-text");
const chococatProgressFill = document.getElementById("chococat-progress-fill");
const chococatClues = document.querySelectorAll(".choco-clue[data-clue]");
const chococatSecret = document.getElementById("chococat-secret");
const chococatSecretButton = document.getElementById("chococat-secret-button");

// Usagi

const usagiProgressText =
    document.getElementById(
        "usagi-progress-text"
    );

const usagiProgressFill =
    document.getElementById(
        "usagi-progress-fill"
    );

const usagiRound =
    document.getElementById(
        "usagi-round"
    );

const usagiRoundLabel =
    document.getElementById(
        "usagi-round-label"
    );

const usagiWord =
    document.getElementById(
        "usagi-word"
    );

const usagiFeedback =
    document.getElementById(
        "usagi-feedback"
    );

const usagiCheck =
    document.getElementById(
        "usagi-check"
    );

const usagiNext =
    document.getElementById(
        "usagi-next"
    );

const usagiFinish =
    document.getElementById(
        "usagi-finish"
    );

const usagiFinishButton =
    document.getElementById(
        "usagi-finish-button"
    );

// Pompompurin

const pompompurinProgressText =
    document.getElementById(
        "pompompurin-progress-text"
    );

const pompompurinProgressFill =
    document.getElementById(
        "pompompurin-progress-fill"
    );

const pompompurinGifts =
    document.getElementById(
        "pompompurin-gifts"
    );

const pompompurinFinish =
    document.getElementById(
        "pompompurin-finish"
    );

const pompompurinFinishButton =
    document.getElementById(
        "pompompurin-finish-button"
    );

// Momonga

const momongaBack =
    document.getElementById(
        "momonga-back"
    );

const momongaProgressText =
    document.getElementById(
        "momonga-progress-text"
    );

const momongaProgressFill =
    document.getElementById(
        "momonga-progress-fill"
    );

const momongaScoreText =
    document.getElementById(
        "momonga-score"
    );

const momongaMessage =
    document.getElementById(
        "momonga-message"
    );

const momongaField =
    document.getElementById(
        "momonga-field"
    );

const momongaReward =
    document.getElementById(
        "momonga-reward"
    );

const momongaRewardImage =
    document.getElementById(
        "momonga-reward-image"
    );

const momongaRewardFallback =
    document.getElementById(
        "momonga-reward-fallback"
    );

const momongaRewardTitle =
    document.getElementById(
        "momonga-reward-title"
    );

const momongaRewardText =
    document.getElementById(
        "momonga-reward-text"
    );

const momongaCompleteButton =
    document.getElementById(
        "momonga-complete"
    );


/* ============================================================
   LOCAL STORAGE
   ============================================================ */

function loadProgress() {
    const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);

    if (!saved) {
        return { ...DEFAULT_PROGRESS };
    }

    try {
        const parsed = JSON.parse(saved);
        return {
            ...DEFAULT_PROGRESS,
            ...(parsed && typeof parsed === "object" ? parsed : {})
        };
    } catch (error) {
        console.error("Error cargando el progreso general:", error);
        return { ...DEFAULT_PROGRESS };
    }
}

function saveProgress() {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function loadChococatClues() {
    const saved = localStorage.getItem(CHOCOCAT_STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {
        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return [...new Set(parsed)]
            .map(Number)
            .filter(index => Number.isInteger(index) && index >= 0 && index <= 2)
            .sort((a, b) => a - b);
    } catch (error) {
        console.error("Error cargando las pistas de Chococat:", error);
        return [];
    }
}

function saveChococatClues() {
    localStorage.setItem(
        CHOCOCAT_STORAGE_KEY,
        JSON.stringify(chococatFoundClues)
    );
}


/* ============================================================
   NAVEGACIÓN Y PROGRESO GLOBAL
   ============================================================ */

function showScreen(targetScreen) {
    if (!targetScreen) return;

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    targetScreen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function getCompletedCount() {
    return Object.values(progress).filter(Boolean).length;
}

function updateProgressUI() {
    const completed = getCompletedCount();
    const total = Object.keys(DEFAULT_PROGRESS).length;

    if (progressText) {
        progressText.textContent = `${completed} / ${total}`;
    }

    if (progressFill) {
        progressFill.style.width = `${(completed / total) * 100}%`;
    }
}

function isCharacterUnlocked(characterId) {
    if (characterId === "chiikawa") return true;

    if (["hachiware", "cinnamoroll", "chococat"].includes(characterId)) {
        return progress.chiikawa;
    }

    if (["usagi", "pompompurin"].includes(characterId)) {
        return getCompletedCount() >= 2;
    }

    if (characterId === "momonga") {

        return [
            "chiikawa",
            "hachiware",
            "cinnamoroll",
            "chococat",
            "usagi",
            "pompompurin"
        ].every(
            id => progress[id]
        );

    }

    return false;
}

function updateCharacterStates() {
    characterButtons.forEach(button => {
        const characterId = button.dataset.character;
        const unlocked = isCharacterUnlocked(characterId);

        button.classList.toggle("locked", !unlocked);
        button.setAttribute("aria-disabled", String(!unlocked));

        let lock = button.querySelector(".lock-indicator");

        if (!unlocked && !lock) {
            lock = document.createElement("span");
            lock.className = "lock-indicator";
            lock.textContent = "🔒";
            button.appendChild(lock);
        }

        if (unlocked && lock) {
            lock.remove();
        }
    });
}

function showHub() {

    updateProgressUI();
    updateCharacterStates();

    const total =
        Object.keys(
            DEFAULT_PROGRESS
        ).length;

    const allCompleted =
        getCompletedCount() === total;


    /*
     * Si están las 7 experiencias completas,
     * el HUB pasa a modo final.
     */

    screens.hub
        ?.classList.toggle(
            "final-mode",
            allCompleted
        );


    showScreen(
        screens.hub
    );

}

/* ============================================================
   MENSAJE FINAL
   ============================================================ */

function showFinalVideo() {

    const total =
        Object.keys(
            DEFAULT_PROGRESS
        ).length;


    if (
        getCompletedCount() !== total
    ) {

        return;

    }


    showScreen(
        screens.finalVideo
    );

}

/* ============================================================
   MODAL
   ============================================================ */

function openStandardModal(icon, title, description) {
    if (!modal) return;

    if (modalStandardContent) {
        modalStandardContent.style.display = "";
    }

    if (dynamicContent) {
        dynamicContent.style.display = "none";
        dynamicContent.innerHTML = "";
    }

    if (modalIcon) modalIcon.textContent = icon;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = description;

    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
}

function openDynamicModal(html) {
    if (!modal) return;

    if (modalStandardContent) {
        modalStandardContent.style.display = "none";
    }

    if (dynamicContent) {
        dynamicContent.style.display = "block";
        dynamicContent.innerHTML = html;
    }

    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    if (!modal) return;

    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");

    if (modalStandardContent) {
        modalStandardContent.style.display = "";
    }

    if (dynamicContent) {
        dynamicContent.style.display = "none";
        dynamicContent.innerHTML = "";
    }

    if (modalCompletionPending) {
        const characterId = modalCompletionPending;
        modalCompletionPending = null;

        window.setTimeout(() => {
            showCompletion(characterId);
        }, 180);
    }
}


/* ============================================================
   FINALIZACIÓN
   ============================================================ */

function showCompletion(characterId) {

    const content =
        birthdayContent
            ?.completion
            ?.[characterId];


    if (!content) {
        return;
    }


    /*
     * Guardamos qué experiencia
     * estaba viendo antes.
     */

    completionReturnScreen =
        document.querySelector(
            ".screen.active"
        );


    if (completionIcon) {

        completionIcon.textContent =
            content.icon;

    }


    if (completionEyebrow) {

        completionEyebrow.textContent =
            content.eyebrow;

    }


    if (completionTitle) {

        completionTitle.textContent =
            content.title;

    }


    if (completionText) {

        completionText.textContent =
            content.text;

    }


    showScreen(
        screens.completion
    );

}

function closeCompletion() {

    /*
     * Volvemos a la experiencia
     * que acababa de completar,
     * NO al menú principal.
     */

    if (
        completionReturnScreen
    ) {

        const target =
            completionReturnScreen;


        completionReturnScreen =
            null;


        showScreen(
            target
        );

        return;

    }


    /*
     * Fallback por seguridad.
     */

    showHub();

}

function completeExperience(
    characterId,
    usePendingModal = false
) {

    progress[characterId] =
        true;

    saveProgress();

    updateProgressUI();

    updateCharacterStates();


    const total =
        Object.keys(
            DEFAULT_PROGRESS
        ).length;


    const allCompleted =
        getCompletedCount() ===
        total;


    /*
     * Si acabamos de completar
     * la última experiencia:
     *
     * NO mostramos el cartel normal
     * de personaje completado.
     *
     * Volvemos directamente al HUB
     * en modo final.
     */

    if (allCompleted) {

        modalCompletionPending =
            null;

        completionReturnScreen =
            null;


        closeModal();


        /*
         * Por seguridad, detenemos
         * cualquier timer de Momonga.
         */

        stopMomongaGame();


        showHub();

        return;

    }


    /*
     * Comportamiento normal
     * para todas las demás.
     */

    if (usePendingModal) {

        modalCompletionPending =
            characterId;

    }

    else {

        showCompletion(
            characterId
        );

    }

}


/* ============================================================
   CHIIKAWA
   ============================================================ */

function showChiikawa() {
    chiikawaDiscoveries = new Set();

    discoveries.forEach(discovery => {
        discovery.classList.remove("discovered");
        discovery.disabled = false;
    });

    updateChiikawaProgress();
    showScreen(screens.chiikawa);
}

function updateChiikawaProgress() {
    const count = chiikawaDiscoveries.size;
    const total = discoveries.length || 3;

    if (chiikawaProgressText) {
        chiikawaProgressText.textContent = `${count} / ${total}`;
    }

    if (chiikawaProgressFill) {
        chiikawaProgressFill.style.width = `${(count / total) * 100}%`;
    }
}

discoveries.forEach(discovery => {
    discovery.addEventListener("click", () => {
        const index = Number(discovery.dataset.discovery);
        const item = birthdayContent?.chiikawa?.discoveries?.[index];

        if (!item) return;

        const isNew = !chiikawaDiscoveries.has(index);

        if (isNew) {
            chiikawaDiscoveries.add(index);
            discovery.classList.add("discovered");
            updateChiikawaProgress();
        }

        openStandardModal(
            ["✨", "💕", "⭐"][index] || "✨",
            item.title,
            item.content
        );

        if (isNew && chiikawaDiscoveries.size === discoveries.length) {
            completeExperience("chiikawa", true);
        }
    });
});


/* ============================================================
   HACHIWARE
   ============================================================ */

function showHachiware() {

    const memories =
        birthdayContent?.hachiware?.memories || [];

    currentHachiwarePage = 0;


    /*
     * Si el álbum ya fue completado,
     * marcamos todos los recuerdos como vistos.
     */

    if (progress.hachiware) {

        hachiwareSeen =
            new Set(
                memories.map(
                    (_, index) => index
                )
            );

    } else {

        hachiwareSeen =
            new Set();

    }


    renderHachiwareMemories();

    updateHachiwareProgress();

    showScreen(
        screens.hachiware
    );
}

function renderHachiwareMemories() {

    if (!hachiwareMemoryGrid) {
        return;
    }


    const memories =
        birthdayContent
            ?.hachiware
            ?.memories || [];


    const totalPages =
        Math.ceil(
            memories.length /
            HACHIWARE_MEMORIES_PER_PAGE
        );


    /*
     * Evitamos páginas inexistentes.
     */

    currentHachiwarePage =
        Math.max(
            0,
            Math.min(
                currentHachiwarePage,
                Math.max(totalPages - 1, 0)
            )
        );


    const startIndex =
        currentHachiwarePage *
        HACHIWARE_MEMORIES_PER_PAGE;


    const memoriesToShow =
        memories.slice(
            startIndex,
            startIndex +
            HACHIWARE_MEMORIES_PER_PAGE
        );


    hachiwareMemoryGrid.innerHTML =
        "";


    memoriesToShow.forEach(
        (memory, localIndex) => {

            const index =
                startIndex +
                localIndex;


            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "memory-card";


            card.dataset.memory =
                String(index);


            card.setAttribute(
                "aria-label",
                `Abrir recuerdo ${index + 1}: ${memory.title}`
            );


            /*
             * Si ya lo había abierto,
             * conservamos el check.
             */

            if (
                hachiwareSeen.has(index)
            ) {

                card.classList.add(
                    "seen"
                );

            }


            const media =
                document.createElement(
                    "div"
                );


            media.className =
                "memory-card-media";


            const image =
                document.createElement(
                    "img"
                );


            image.className =
                "memory-card-image";


            image.src =
                memory.image;


            image.alt =
                memory.title;


            const fallback =
                document.createElement(
                    "span"
                );


            fallback.className =
                "memory-card-fallback";


            fallback.textContent =
                memory.fallback ||
                "📸";


            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );

                    fallback.style.display =
                        "none";

                }
            );


            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                    fallback.style.display =
                        "grid";

                }
            );


            media.append(
                image,
                fallback
            );


            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "memory-card-meta";


            meta.innerHTML = `
                <span>
                    Recuerdo ${index + 1}
                </span>

                <h3>
                    ${memory.title}
                </h3>
            `;


            card.append(
                media,
                meta
            );


            card.addEventListener(
                "click",
                () => {

                    openHachiwareMemory(
                        index,
                        card
                    );

                }
            );


            hachiwareMemoryGrid
                .appendChild(card);

        }
    );


    /*
     * Navegación del álbum.
     */

    if (hachiwarePageIndicator) {

        hachiwarePageIndicator.textContent =
            totalPages
                ? `${currentHachiwarePage + 1} / ${totalPages}`
                : "0 / 0";

    }


    if (hachiwarePrevPage) {

        hachiwarePrevPage.disabled =
            currentHachiwarePage === 0;

    }


    if (hachiwareNextPage) {

        hachiwareNextPage.disabled =
            currentHachiwarePage >=
            totalPages - 1;

    }

}

hachiwarePrevPage?.addEventListener(
    "click",
    () => {

        if (
            currentHachiwarePage > 0
        ) {

            currentHachiwarePage--;

            renderHachiwareMemories();

        }

    }
);


hachiwareNextPage?.addEventListener(
    "click",
    () => {

        const memories =
            birthdayContent
                ?.hachiware
                ?.memories || [];


        const totalPages =
            Math.ceil(
                memories.length /
                HACHIWARE_MEMORIES_PER_PAGE
            );


        if (
            currentHachiwarePage <
            totalPages - 1
        ) {

            currentHachiwarePage++;

            renderHachiwareMemories();

        }

    }
);

function openHachiwareMemory(index, card) {
    const memory = birthdayContent?.hachiware?.memories?.[index];
    if (!memory) return;

    const isNew = !hachiwareSeen.has(index);

    if (isNew) {
        hachiwareSeen.add(index);
        card?.classList.add("seen");
        updateHachiwareProgress();
    }

    openDynamicModal(`
        <div class="memory-modal">
            <div class="memory-modal-media">
                <img src="${memory.image}" alt="${memory.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
                <span class="memory-modal-fallback">${memory.fallback || "📸"}</span>
            </div>
            <p class="memory-modal-counter">Recuerdo ${index + 1}</p>
            <h3>${memory.title}</h3>
            <p>${memory.text}</p>
        </div>
    `);

    const total = birthdayContent?.hachiware?.memories?.length || 0;

    if (isNew && total > 0 && hachiwareSeen.size === total) {
        completeExperience("hachiware", true);
    }
}

function updateHachiwareProgress() {
    const total = birthdayContent?.hachiware?.memories?.length || 0;
    const count = hachiwareSeen.size;

    if (hachiwareProgressText) {
        hachiwareProgressText.textContent = `${count} / ${total}`;
    }

    if (hachiwareProgressFill) {
        hachiwareProgressFill.style.width = total
            ? `${(count / total) * 100}%`
            : "0%";
    }
}


/* ============================================================
   CINNAMOROLL
   ============================================================ */

function showCinnamoroll() {

    currentLetterPage = 0;


    cinnamorollEnvelope
        ?.classList.remove(
            "open"
        );


    if (cinnamorollEnvelopeArea) {

        cinnamorollEnvelopeArea
            .style.display =
            "flex";

    }


    cinnamorollLetter
        ?.classList.remove(
            "visible"
        );


    if (openLetter) {

        openLetter.style.display =
            "inline-flex";

    }


    /*
     * Antes de abrir el sobre
     * mostramos 0 / total.
     */

    const total =
        birthdayContent
            ?.cinnamoroll
            ?.pages
            ?.length || 0;


    if (cinnamorollProgressText) {

        cinnamorollProgressText
            .textContent =
            `0 / ${total}`;

    }


    if (cinnamorollProgressFill) {

        cinnamorollProgressFill
            .style.width =
            "0%";

    }


    showScreen(
        screens.cinnamoroll
    );

}

function openCinnamorollLetter() {

    cinnamorollEnvelope
        ?.classList.add(
            "open"
        );


    /*
     * Esperamos a que termine
     * la animación del sobre.
     */

    window.setTimeout(
        () => {

            if (
                cinnamorollEnvelopeArea
            ) {

                cinnamorollEnvelopeArea
                    .style.display =
                    "none";

            }


            cinnamorollLetter
                ?.classList.add(
                    "visible"
                );


            updateCinnamorollPage();

        },
        800
    );

}

function updateCinnamorollPage() {
    const pages = birthdayContent?.cinnamoroll?.pages || [];
    const total = pages.length;

    if (!total) return;

    currentLetterPage = Math.min(Math.max(currentLetterPage, 0), total - 1);
    const page = pages[currentLetterPage];

    if (letterEyebrow) {
        letterEyebrow.textContent = `Página ${currentLetterPage + 1} de ${total}`;
    }

    if (letterTitle) letterTitle.textContent = page.title;
    if (letterText) letterText.textContent = page.text;

    if (letterNext) {
        letterNext.textContent = currentLetterPage === total - 1
            ? "Guardar carta 💙"
            : "Seguir leyendo →";
    }

    if (cinnamorollProgressText) {
        cinnamorollProgressText.textContent = `${currentLetterPage + 1} / ${total}`;
    }

    if (cinnamorollProgressFill) {
        cinnamorollProgressFill.style.width = `${((currentLetterPage + 1) / total) * 100}%`;
    }
}

openLetter?.addEventListener(
    "click",
    openCinnamorollLetter
);


cinnamorollEnvelope
    ?.addEventListener(
        "click",
        openCinnamorollLetter
    );

letterNext?.addEventListener("click", () => {
    const pages = birthdayContent?.cinnamoroll?.pages || [];
    if (!pages.length) return;

    if (currentLetterPage < pages.length - 1) {
        currentLetterPage += 1;
        updateCinnamorollPage();
        return;
    }

    completeExperience("cinnamoroll");
});


/* ============================================================
   CHOCOCAT
   ============================================================ */

function showChococat() {
    updateChococatProgress();
    showScreen(screens.chococat);
}

function updateChococatProgress() {
    const total = 3;
    const count = chococatFoundClues.length;

    if (chococatProgressText) {
        chococatProgressText.textContent = `${count} / ${total}`;
    }

    if (chococatProgressFill) {
        chococatProgressFill.style.width = `${(count / total) * 100}%`;
    }

    chococatClues.forEach(clue => {
        const index = Number(clue.dataset.clue);
        const found = chococatFoundClues.includes(index);

        clue.classList.toggle("found", found);
        clue.setAttribute("aria-pressed", String(found));
        clue.setAttribute(
            "aria-label",
            found ? `Pista ${index + 1} encontrada` : `Buscar la pista ${index + 1}`
        );
    });

    const allFound = count === total;

    if (chococatSecret) {
        chococatSecret.classList.toggle("visible", allFound);
        chococatSecret.setAttribute("aria-hidden", String(!allFound));
    }
}

function resetChococatExperience() {
    chococatFoundClues = [];

    localStorage.removeItem(CHOCOCAT_STORAGE_KEY);
    localStorage.removeItem("birthday_chococat_clues");
    localStorage.removeItem("birthday_chococat_clues_v2");

    updateChococatProgress();
}

chococatClues.forEach(clue => {
    clue.addEventListener("click", () => {
        const index = Number(clue.dataset.clue);

        if (!Number.isInteger(index) || index < 0 || index > 2) {
            return;
        }

        const clueData = birthdayContent?.chococat?.discoveries?.[index];
        if (!clueData) return;

        if (!chococatFoundClues.includes(index)) {
            chococatFoundClues.push(index);
            chococatFoundClues.sort((a, b) => a - b);
            saveChococatClues();
            updateChococatProgress();
        }

        openStandardModal(
            ["🐾", "⭐", "🔎"][index],
            clueData.title,
            clueData.text
        );
    });
});

chococatSecretButton?.addEventListener("click", () => {
    if (chococatFoundClues.length !== 3) return;
    completeExperience("chococat");
});


/* ============================================================
   POMPOMPURIN
   ============================================================ */

function showPompompurin() {

    const gifts =
        birthdayContent
            ?.pompompurin
            ?.gifts || [];


    /*
     * Si la experiencia ya fue completada,
     * al volver podemos ver todos los regalos
     * como abiertos.
     */

    if (progress.pompompurin) {

        pompompurinOpened =
            new Set(
                gifts.map(
                    (_, index) => index
                )
            );

    }


    renderPompompurinGifts();

    updatePompompurinProgress();

    showScreen(
        screens.pompompurin
    );

}

/* ============================================================
   USAGI
   ============================================================ */

function showUsagi() {

    const words =
        birthdayContent
            ?.usagi
            ?.words || [];


    /*
     * Si Usagi ya se completó anteriormente,
     * mostramos todas las palabras como resueltas.
     */

    if (progress.usagi) {

        usagiSolved =
            new Set(
                words.map(
                    (_, index) => index
                )
            );

        currentUsagiRound =
            words.length;

    }


    renderUsagiRound();

    updateUsagiProgress();

    showScreen(
        screens.usagi
    );

}


/* ------------------------------------------------------------
   MOSTRAR RONDA
   ------------------------------------------------------------ */

function renderUsagiRound() {

    const words =
        birthdayContent
            ?.usagi
            ?.words || [];


    const total =
        words.length;


    /*
     * Protección por si no hay palabras.
     */

    if (!total) {

        if (usagiWord) {

            usagiWord.innerHTML =
                "";

        }


        if (usagiFeedback) {

            usagiFeedback.textContent =
                "Todavía no hay palabras configuradas para Usagi.";

            usagiFeedback.className =
                "usagi-feedback error";

        }


        return;

    }


    /*
     * Si hemos terminado las 5 palabras.
     */

    if (
        currentUsagiRound >= total
    ) {

        if (usagiRound) {

            usagiRound.style.display =
                "none";

        }


        if (usagiFinish) {

            usagiFinish.classList.add(
                "visible"
            );

        }


        return;

    }


    /*
     * Mostrar la zona normal del juego.
     */

    if (usagiRound) {

        usagiRound.style.display =
            "";

        usagiRound.classList.remove(
            "shake"
        );

    }


    if (usagiFinish) {

        usagiFinish.classList.remove(
            "visible"
        );

    }


    const challenge =
        words[currentUsagiRound];


    if (
        !challenge ||
        !challenge.word
    ) {

        return;

    }


    /*
     * Texto "Palabra X de 5".
     */

    if (usagiRoundLabel) {

        usagiRoundLabel.textContent =
            `Palabra ${currentUsagiRound + 1} de ${total}`;

    }


    /*
     * Limpiamos mensaje anterior.
     */

    if (usagiFeedback) {

        usagiFeedback.textContent =
            "";

        usagiFeedback.className =
            "usagi-feedback";

    }


    /*
     * Botones.
     */

    if (usagiNext) {

        usagiNext.style.display =
            "none";

    }


    if (usagiCheck) {

        usagiCheck.style.display =
            "inline-flex";

    }


    if (!usagiWord) {

        return;

    }


    usagiWord.innerHTML =
        "";


    const missingPositions =
        Array.isArray(
            challenge.missing
        )
            ? challenge.missing
            : [];


    /*
     * Generamos la palabra letra por letra.
     */

    [...challenge.word].forEach(
        (letter, index) => {

            const position =
                document.createElement(
                    "div"
                );


            position.className =
                "usagi-letter";


            /*
             * LETRA OCULTA
             */

            if (
                missingPositions.includes(
                    index
                )
            ) {

                const input =
                    document.createElement(
                        "input"
                    );


                input.type =
                    "text";


                input.maxLength =
                    1;


                input.autocomplete =
                    "off";


                input.autocorrect =
                    "off";


                input.spellcheck =
                    false;


                input.inputMode =
                    "text";


                input.className =
                    "usagi-letter-input";


                input.dataset.index =
                    String(index);


                input.setAttribute(
                    "aria-label",
                    `Letra que falta en la posición ${index + 1}`
                );


                /*
                 * Al escribir una letra,
                 * salta al siguiente hueco.
                 */

                input.addEventListener(
                    "input",
                    () => {

                        /*
                         * Evitamos más de un carácter.
                         */

                        input.value =
                            input.value.slice(
                                0,
                                1
                            );


                        /*
                         * Quitamos colores de error/acierto
                         * si vuelve a editar.
                         */

                        input.classList.remove(
                            "wrong",
                            "correct"
                        );


                        if (
                            input.value.length
                        ) {

                            const inputs =
                                [
                                    ...usagiWord
                                        .querySelectorAll(
                                            ".usagi-letter-input"
                                        )
                                ];


                            const inputPosition =
                                inputs.indexOf(
                                    input
                                );


                            inputs[
                                inputPosition + 1
                            ]?.focus();

                        }

                    }
                );


                /*
                 * ENTER = comprobar.
                 *
                 * BACKSPACE en hueco vacío =
                 * volver al anterior.
                 */

                input.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key ===
                            "Enter"
                        ) {

                            checkUsagiWord();

                            return;

                        }


                        if (
                            event.key ===
                                "Backspace" &&
                            !input.value
                        ) {

                            const inputs =
                                [
                                    ...usagiWord
                                        .querySelectorAll(
                                            ".usagi-letter-input"
                                        )
                                ];


                            const inputPosition =
                                inputs.indexOf(
                                    input
                                );


                            inputs[
                                inputPosition - 1
                            ]?.focus();

                        }

                    }
                );


                position.appendChild(
                    input
                );

            }

            /*
             * LETRA VISIBLE
             */

            else {

                const visible =
                    document.createElement(
                        "span"
                    );


                visible.textContent =
                    letter;


                visible.className =
                    "usagi-letter-visible";


                position.appendChild(
                    visible
                );

            }


            usagiWord.appendChild(
                position
            );

        }
    );


    /*
     * Ponemos automáticamente el cursor
     * en el primer hueco.
     */

    window.setTimeout(
        () => {

            usagiWord
                ?.querySelector(
                    ".usagi-letter-input"
                )
                ?.focus();

        },
        120
    );

}


/* ------------------------------------------------------------
   COMPROBAR RESPUESTA
   ------------------------------------------------------------ */

function checkUsagiWord() {

    const words =
        birthdayContent
            ?.usagi
            ?.words || [];


    const challenge =
        words[currentUsagiRound];


    if (
        !challenge ||
        !usagiWord
    ) {

        return;

    }


    const inputs =
        [
            ...usagiWord
                .querySelectorAll(
                    ".usagi-letter-input"
                )
        ];


    if (!inputs.length) {

        return;

    }


    let correct =
        true;


    inputs.forEach(
        input => {

            const index =
                Number(
                    input.dataset.index
                );


            const expected =
                String(
                    challenge.word[index] ||
                    ""
                )
                    .toLocaleLowerCase();


            const received =
                input
                    .value
                    .trim()
                    .toLocaleLowerCase();


            const isCorrect =
                received === expected;


            input.classList.toggle(
                "correct",
                isCorrect
            );


            input.classList.toggle(
                "wrong",
                !isCorrect
            );


            if (!isCorrect) {

                correct =
                    false;

            }

        }
    );


    /*
     * ALGUNA LETRA ES INCORRECTA
     */

    if (!correct) {

        if (usagiRound) {

            usagiRound.classList.remove(
                "shake"
            );


            /*
             * Reinicia la animación shake.
             */

            void usagiRound.offsetWidth;


            usagiRound.classList.add(
                "shake"
            );

        }


        if (usagiFeedback) {

            usagiFeedback.textContent =
                "Mmm... Usagi dice que alguna letra no encaja 🐰";


            usagiFeedback.className =
                "usagi-feedback error";

        }


        return;

    }


    /*
     * PALABRA CORRECTA
     */

    usagiSolved.add(
        currentUsagiRound
    );


    updateUsagiProgress();


    /*
     * Bloqueamos los inputs.
     */

    inputs.forEach(
        input => {

            input.disabled =
                true;

        }
    );


    if (usagiFeedback) {

        usagiFeedback.textContent =
            "¡Correcto! ✨";


        usagiFeedback.className =
            "usagi-feedback success";

    }


    /*
     * Escondemos comprobar.
     */

    if (usagiCheck) {

        usagiCheck.style.display =
            "none";

    }


    /*
     * Mostramos siguiente.
     */

    if (usagiNext) {

        usagiNext.style.display =
            "inline-flex";


        if (
            currentUsagiRound ===
            words.length - 1
        ) {

            usagiNext.textContent =
                "Ver resultado ✨";

        }

        else {

            usagiNext.textContent =
                "Siguiente →";

        }

    }

}


/* ------------------------------------------------------------
   PROGRESO
   ------------------------------------------------------------ */

function updateUsagiProgress() {

    const total =
        birthdayContent
            ?.usagi
            ?.words
            ?.length || 0;


    const count =
        usagiSolved.size;


    /*
     * Texto 0 / 5, 1 / 5...
     */

    if (usagiProgressText) {

        usagiProgressText.textContent =
            `${count} / ${total}`;

    }


    /*
     * Barra.
     */

    if (usagiProgressFill) {

        usagiProgressFill.style.width =
            total
                ? `${(count / total) * 100}%`
                : "0%";

    }

}


/* ------------------------------------------------------------
   BOTÓN COMPROBAR
   ------------------------------------------------------------ */

usagiCheck?.addEventListener(
    "click",
    checkUsagiWord
);


/* ------------------------------------------------------------
   BOTÓN SIGUIENTE
   ------------------------------------------------------------ */

usagiNext?.addEventListener(
    "click",
    () => {

        const total =
            birthdayContent
                ?.usagi
                ?.words
                ?.length || 0;


        if (
            currentUsagiRound >=
            total
        ) {

            return;

        }


        currentUsagiRound++;


        renderUsagiRound();

    }
);


/* ------------------------------------------------------------
   BOTÓN FINAL
   ------------------------------------------------------------ */

usagiFinishButton
    ?.addEventListener(
        "click",
        () => {

            const total =
                birthdayContent
                    ?.usagi
                    ?.words
                    ?.length || 0;


            /*
             * Solo puede terminar
             * cuando estén las 5.
             */

            if (
                !total ||
                usagiSolved.size !==
                    total
            ) {

                return;

            }


            completeExperience(
                "usagi"
            );

        }
    );



/* ------------------------------------------------------------
   RENDERIZAR REGALOS
   ------------------------------------------------------------ */

function renderPompompurinGifts() {

    if (!pompompurinGifts) {
        return;
    }


    const gifts =
        birthdayContent
            ?.pompompurin
            ?.gifts || [];


    pompompurinGifts.innerHTML =
        "";


    gifts.forEach(
        (gift, index) => {

            const opened =
                pompompurinOpened
                    .has(index);


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "pompompurin-gift";


            if (opened) {

                button.classList.add(
                    "opened"
                );

            }


            button.dataset.gift =
                String(index);


            /*
             * IMAGEN PERSONALIZADA O EMOJI
             */

            let visualContent;


            if (gift.image) {

                visualContent = `

                    <img
                        src="${gift.image}"
                        alt=""
                        class="pompompurin-gift-image"

                        onerror="
                            this.style.display='none';
                            this.nextElementSibling.style.display='grid';
                        "
                    >

                    <span
                        class="pompompurin-gift-emoji image-fallback"
                    >
                        ${gift.emoji || "🎁"}
                    </span>

                `;

            } else {

                visualContent = `

                    <span class="pompompurin-gift-emoji">
                        ${gift.emoji || "🎁"}
                    </span>

                `;

            }


            button.innerHTML = `

                <span class="pompompurin-gift-number">
                    Regalo ${index + 1}
                </span>

                <span class="pompompurin-gift-visual">

                    ${visualContent}

                </span>

                <span class="pompompurin-gift-status">

                    ${
                        opened
                            ? "Abierto ✓"
                            : "Tócame"
                    }

                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    openPompompurinGift(
                        index
                    );

                }
            );


            pompompurinGifts
                .appendChild(button);

        }
    );

}


/* ------------------------------------------------------------
   ABRIR REGALO
   ------------------------------------------------------------ */

function openPompompurinGift(index) {

    const gift =
        birthdayContent
            ?.pompompurin
            ?.gifts
            ?.[index];


    if (!gift) {
        return;
    }


    const isNew =
        !pompompurinOpened
            .has(index);


    if (isNew) {

        pompompurinOpened
            .add(index);


        renderPompompurinGifts();

        updatePompompurinProgress();

    }


    /*
     * CONTENIDO INTERIOR:
     * imagen personalizada o emoji.
     */

    let revealVisual;


    if (gift.revealImage) {

        revealVisual = `

            <div class="pompompurin-reveal-visual">

                <img
                    src="${gift.revealImage}"
                    alt=""
                    class="pompompurin-reveal-image"

                    onerror="
                        this.style.display='none';
                        this.nextElementSibling.style.display='grid';
                    "
                >

                <span
                    class="pompompurin-reveal-emoji image-fallback"
                >
                    ${
                        gift.revealEmoji ||
                        gift.emoji ||
                        "🎁"
                    }
                </span>

            </div>

        `;

    } else {

        revealVisual = `

            <div class="pompompurin-reveal-visual">

                <span class="pompompurin-reveal-emoji">
                    ${
                        gift.revealEmoji ||
                        gift.emoji ||
                        "🎁"
                    }
                </span>

            </div>

        `;

    }


    openDynamicModal(`

        <div class="pompompurin-reveal">

            ${revealVisual}

            <p class="eyebrow">
                Regalo ${index + 1}
            </p>

            <h3>
                ${gift.title}
            </h3>

            <p>
                ${gift.text}
            </p>

        </div>

    `);

}


/* ------------------------------------------------------------
   PROGRESO
   ------------------------------------------------------------ */

function updatePompompurinProgress() {

    const gifts =
        birthdayContent
            ?.pompompurin
            ?.gifts || [];


    const count =
        pompompurinOpened.size;


    const total =
        gifts.length;


    if (pompompurinProgressText) {

        pompompurinProgressText
            .textContent =
            `${count} / ${total}`;

    }


    if (pompompurinProgressFill) {

        const percentage =
            total
                ? (count / total) * 100
                : 0;


        pompompurinProgressFill
            .style.width =
            `${percentage}%`;

    }


    /*
     * No completamos automáticamente.
     *
     * Ella abre los tres regalos,
     * cierra el último y después
     * decide cuándo finalizar.
     */

    if (pompompurinFinish) {

        pompompurinFinish
            .classList.toggle(
                "visible",
                count === total &&
                total > 0
            );

    }

}


/* ------------------------------------------------------------
   FINALIZAR
   ------------------------------------------------------------ */

pompompurinFinishButton
    ?.addEventListener(
        "click",
        () => {

            const total =
                birthdayContent
                    ?.pompompurin
                    ?.gifts
                    ?.length || 0;


            if (
                pompompurinOpened.size !==
                total
            ) {
                return;
            }


            completeExperience(
                "pompompurin"
            );

        }
    );

/* ============================================================
   MOMONGA
   ============================================================ */

function showMomonga() {

    renderMomongaBushes();

    updateMomongaProgress();


    showScreen(
        screens.momonga
    );


    /*
     * Si ya se completó anteriormente,
     * enseñamos directamente el premio.
     */

    if (progress.momonga) {

        momongaScore =
            birthdayContent
                ?.momonga
                ?.targetScore || 5;


        updateMomongaProgress();

        showMomongaReward();

        return;

    }


    hideMomongaReward();

    startMomongaGame();

}


/* ------------------------------------------------------------
   CREAR LOS 6 ARBUSTOS
   ------------------------------------------------------------ */

function renderMomongaBushes() {

    if (!momongaField) {
        return;
    }


    const bushCount =
        birthdayContent
            ?.momonga
            ?.bushCount || 6;


    momongaField.innerHTML =
        "";


    for (
        let index = 0;
        index < bushCount;
        index++
    ) {

        const bush =
            document.createElement(
                "button"
            );


        bush.type =
            "button";


        bush.className =
            "momonga-bush";


        bush.dataset.bush =
            String(index);


        bush.setAttribute(
            "aria-label",
            `Arbusto ${index + 1}`
        );


        bush.innerHTML = `

            <span class="momonga-peek">

                <img
                    src="assets/characters/momonga.png"
                    alt=""
                    class="momonga-peek-image"

                    onerror="
                        this.style.display='none';
                        this.nextElementSibling.style.display='grid';
                    "
                >

                <span class="momonga-peek-fallback">
                    😈
                </span>

            </span>


            <span class="momonga-bush-foliage">

                <span></span>
                <span></span>
                <span></span>

            </span>

        `;


        bush.addEventListener(
            "click",
            () => {

                handleMomongaBushClick(
                    index,
                    bush
                );

            }
        );


        momongaField.appendChild(
            bush
        );

    }

}


/* ------------------------------------------------------------
   INICIAR JUEGO
   ------------------------------------------------------------ */

function startMomongaGame() {

    stopMomongaTimers();


    const target =
        birthdayContent
            ?.momonga
            ?.targetScore || 5;


    if (
        momongaScore >= target
    ) {

        showMomongaReward();

        return;

    }


    momongaGameRunning =
        true;


    if (momongaMessage) {

        momongaMessage.textContent =
            "Ojo... puede aparecer en cualquier parte.";

    }


    /*
     * La primera aparición ocurre
     * relativamente rápido.
     */

    scheduleNextMomonga(
        700
    );

}


/* ------------------------------------------------------------
   PROGRAMAR SIGUIENTE APARICIÓN
   ------------------------------------------------------------ */

function scheduleNextMomonga(
    delay = null
) {

    if (!momongaGameRunning) {
        return;
    }


    window.clearTimeout(
        momongaShowTimer
    );


    /*
     * Como Momonga permanece visible
     * unos 800 ms, dejamos entre
     * 250 y 1100 ms después.
     *
     * Resultado:
     * aproximadamente una aparición
     * cada 1 - 2 segundos.
     */

    const nextDelay =
        delay ??
        randomMomongaNumber(
            250,
            1100
        );


    momongaShowTimer =
        window.setTimeout(
            showRandomMomonga,
            nextDelay
        );

}


/* ------------------------------------------------------------
   MOMONGA APARECE
   ------------------------------------------------------------ */

function showRandomMomonga() {

    if (!momongaGameRunning) {
        return;
    }


    const bushes =
        [
            ...momongaField
                .querySelectorAll(
                    ".momonga-bush"
                )
        ];


    if (!bushes.length) {
        return;
    }


    /*
     * No repetimos el mismo arbusto
     * dos veces consecutivas.
     */

    const available =
        bushes
            .map(
                (_, index) => index
            )
            .filter(
                index =>
                    index !==
                    momongaLastBush
            );


    const randomIndex =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];


    momongaActiveBush =
        randomIndex;


    momongaLastBush =
        randomIndex;


    const bush =
        bushes[randomIndex];


    bush.classList.add(
        "active"
    );


    bush.setAttribute(
        "aria-label",
        "¡Momonga está aquí!"
    );


    /*
     * Momonga está visible 800 ms.
     */

    momongaHideTimer =
        window.setTimeout(
            () => {

                hideActiveMomonga();

                scheduleNextMomonga();

            },
            1000
        );

}


/* ------------------------------------------------------------
   OCULTAR MOMONGA
   ------------------------------------------------------------ */

function hideActiveMomonga() {

    if (!momongaField) {
        return;
    }


    const active =
        momongaField.querySelector(
            ".momonga-bush.active"
        );


    if (active) {

        active.classList.remove(
            "active"
        );


        const index =
            Number(
                active.dataset.bush
            );


        active.setAttribute(
            "aria-label",
            `Arbusto ${index + 1}`
        );

    }


    momongaActiveBush =
        -1;

}


/* ------------------------------------------------------------
   CLICK EN ARBUSTO
   ------------------------------------------------------------ */

function handleMomongaBushClick(
    index,
    bush
) {

    if (!momongaGameRunning) {
        return;
    }


    /*
     * CLICK CORRECTO
     */

    if (
        index ===
        momongaActiveBush
    ) {

        window.clearTimeout(
            momongaHideTimer
        );


        momongaScore++;


        bush.classList.add(
            "hit"
        );


        window.setTimeout(
            () => {

                bush.classList.remove(
                    "hit"
                );

            },
            350
        );


        hideActiveMomonga();

        updateMomongaProgress();


        const target =
            birthdayContent
                ?.momonga
                ?.targetScore || 5;


        if (
            momongaScore >= target
        ) {

            if (momongaMessage) {

                momongaMessage.textContent =
                    "¡Lo atrapaste! Momonga ya no tiene escapatoria ✨";

            }


            stopMomongaGame();


            window.setTimeout(
                showMomongaReward,
                500
            );


            return;

        }


        const messages = [

            "¡Pillado! 😈",

            "¡Uno más! Momonga está enfadado.",

            "¡Casi lo tienes!",

            "Se está quedando sin escondites...",

            "Momonga no esperaba que fueras tan rápida."

        ];


        if (momongaMessage) {

            momongaMessage.textContent =
                messages[
                    Math.min(
                        momongaScore - 1,
                        messages.length - 1
                    )
                ];

        }


        scheduleNextMomonga(
            randomMomongaNumber(
                450,
                900
            )
        );


        return;

    }


    /*
     * CLICK EN ARBUSTO INCORRECTO.
     * No penalizamos puntos.
     */

    bush.classList.remove(
        "miss"
    );


    void bush.offsetWidth;


    bush.classList.add(
        "miss"
    );


    window.setTimeout(
        () => {

            bush.classList.remove(
                "miss"
            );

        },
        300
    );

}


/* ------------------------------------------------------------
   PROGRESO
   ------------------------------------------------------------ */

function updateMomongaProgress() {

    const target =
        birthdayContent
            ?.momonga
            ?.targetScore || 5;


    const score =
        Math.min(
            momongaScore,
            target
        );


    if (momongaProgressText) {

        momongaProgressText.textContent =
            `${score} / ${target}`;

    }


    if (momongaProgressFill) {

        momongaProgressFill.style.width =
            `${(score / target) * 100}%`;

    }


    if (momongaScoreText) {

        momongaScoreText.textContent =
            score === 1
                ? "1 punto"
                : `${score} puntos`;

    }

}


/* ------------------------------------------------------------
   PARAR JUEGO
   ------------------------------------------------------------ */

function stopMomongaGame() {

    momongaGameRunning =
        false;


    stopMomongaTimers();

    hideActiveMomonga();

}


function stopMomongaTimers() {

    window.clearTimeout(
        momongaShowTimer
    );


    window.clearTimeout(
        momongaHideTimer
    );


    momongaShowTimer =
        null;


    momongaHideTimer =
        null;

}


/* ------------------------------------------------------------
   PREMIO
   ------------------------------------------------------------ */

function showMomongaReward() {

    stopMomongaGame();


    const reward =
        birthdayContent
            ?.momonga
            ?.reward;


    if (!reward) {
        return;
    }


    hideMomongaReward();


    /*
     * PLAYLIST
     */

    let playlistContent;


    if (reward.playlistEmbed) {

        playlistContent = `

            <div class="momonga-playlist-wrap">

                <iframe
                    src="${reward.playlistEmbed}"
                    class="momonga-playlist"
                    title="Playlist especial"
                    loading="lazy"
                    allow="
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        fullscreen;
                        picture-in-picture
                    "
                ></iframe>

            </div>

        `;

    }

    else {

        playlistContent = `

            <div class="momonga-playlist-placeholder">
                🎧
                <span>
                    Playlist pendiente
                </span>
            </div>

        `;

    }


    /*
     * POPUP
     */

    openDynamicModal(`

        <div class="momonga-popup">

            <p class="eyebrow">
                Premio conseguido ✨
            </p>


            <h3>
                ${reward.title}
            </h3>


            <p class="momonga-popup-text">
                ${reward.text}
            </p>


            ${playlistContent}


            <button
                id="momonga-popup-continue"
                class="primary-button"
                type="button"
            >
                Continuar ✨
            </button>

        </div>

    `);


    /*
     * TERMINAR MOMONGA
     */

    document
        .getElementById(
            "momonga-popup-continue"
        )
        ?.addEventListener(
            "click",
            () => {

                closeModal();

                completeExperience(
                    "momonga"
                );

            }
        );

}


function hideMomongaReward() {

    if (momongaReward) {

        momongaReward.classList.remove(
            "visible"
        );

    }


    if (momongaField) {

        momongaField.classList.remove(
            "finished"
        );

    }

}


/* ------------------------------------------------------------
   UTILIDAD RANDOM
   ------------------------------------------------------------ */

function randomMomongaNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* ------------------------------------------------------------
   COMPLETAR MOMONGA
   ------------------------------------------------------------ */

momongaCompleteButton
    ?.addEventListener(
        "click",
        () => {

            const target =
                birthdayContent
                    ?.momonga
                    ?.targetScore || 5;


            if (
                momongaScore <
                target
            ) {

                return;

            }


            completeExperience(
                "momonga"
            );

        }
    );

/* ============================================================
   HUB / PERSONAJES
   ============================================================ */

startButton?.addEventListener("click", showHub);

finalCakeButton
    ?.addEventListener(
        "click",
        showFinalVideo
    );


finalVideoBack
    ?.addEventListener(
        "click",
        () => {

            showHub();

        }
    );

characterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const characterId = button.dataset.character;

        if (!isCharacterUnlocked(characterId)) {
            openStandardModal(
                "🔒",
                "Pasito a pasito",
                "Aún quedan cosas que debes descubrir."
            );
            return;
        }

        if (characterId === "chiikawa") {
            showChiikawa();
            return;
        }

        if (characterId === "hachiware") {
            showHachiware();
            return;
        }

        if (characterId === "cinnamoroll") {
            showCinnamoroll();
            return;
        }

        if (characterId === "chococat") {
            showChococat();
            return;
        }
    
        if (characterId === "usagi") {

            showUsagi();

            return;

        }

        if (characterId === "pompompurin") {

            showPompompurin();

            return;

        }

        if (characterId === "momonga") {

            showMomonga();

            return;

        }

        const character = birthdayContent?.characters?.[characterId];

        if (character) {
            openStandardModal(
                character.icon,
                character.name,
                character.description
            );
        }
    });
});


/* ============================================================
   BOTONES VOLVER
   ============================================================ */

chiikawaBack?.addEventListener("click", showHub);
hachiwareBack?.addEventListener("click", showHub);
cinnamorollBack?.addEventListener("click", showHub);
chococatBack?.addEventListener("click", showHub);
completionBack?.addEventListener(
    "click",
    closeCompletion
);

// Las pantallas futuras están preparadas, aunque su experiencia aún no está construida.
["usagi", "pompompurin"].forEach(id => {

    document.getElementById(`${id}-back`)
        ?.addEventListener(
            "click",
            showHub
        );

});


momongaBack?.addEventListener(
    "click",
    () => {

        stopMomongaGame();

        showHub();

    }
);


/* ============================================================
   MODAL
   ============================================================ */

modalClose?.addEventListener("click", closeModal);
modalBack?.addEventListener("click", closeModal);

modal?.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});


/* ============================================================
   RESET GLOBAL
   ============================================================ */

resetButton?.addEventListener("click", () => {
    const confirmed = window.confirm("¿Quieres empezar de nuevo?");
    if (!confirmed) return;

    progress = { ...DEFAULT_PROGRESS };
    saveProgress();

    chiikawaDiscoveries = new Set();
    hachiwareSeen = new Set();
    pompompurinOpened = new Set();
    usagiSolved = new Set();
    currentUsagiRound = 0;
    currentLetterPage = 0;
    modalCompletionPending = null;
    stopMomongaGame();
    momongaScore = 0;
    momongaActiveBush = -1;
    momongaLastBush = -1;

    discoveries.forEach(discovery => {
        discovery.classList.remove("discovered");
        discovery.disabled = false;
    });

    resetChococatExperience();
    updateChiikawaProgress();
    updateHachiwareProgress();
    updateCinnamorollPage();
    updateProgressUI();
    updateCharacterStates();
    renderUsagiRound();
    updateUsagiProgress();
    renderPompompurinGifts();
    updatePompompurinProgress();
    renderMomongaBushes();

    hideMomongaReward();

    updateMomongaProgress();

    closeModal();
    showHub();
});


/* ============================================================
   IMÁGENES DE PERSONAJES
   ============================================================ */

function setupCharacterImages() {
    document.querySelectorAll(".character").forEach(button => {
        const image = button.querySelector(".character-image");
        const fallback = button.querySelector(".character-fallback");

        if (!image || !fallback) return;

        const showImage = () => {
            image.style.visibility = "visible";
            fallback.style.display = "none";
        };

        const showFallback = () => {
            image.style.visibility = "hidden";
            fallback.style.display = "flex";
        };

        image.addEventListener("load", showImage);
        image.addEventListener("error", showFallback);

        if (image.complete) {
            if (image.naturalWidth > 0) showImage();
            else showFallback();
        }
    });
}


/* ============================================================
   INICIALIZACIÓN
   ============================================================ */

setupCharacterImages();
updateProgressUI();
updateCharacterStates();
updateChiikawaProgress();
updateHachiwareProgress();
updateCinnamorollPage();
updateChococatProgress();
