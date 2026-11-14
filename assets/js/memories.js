
/* =========================================================
   ELENA · ÁLBUM DE RECUERDOS
   Archivo: assets/js/memories.js

   - Álbum visual de recuerdos.
   - Composición editorial asimétrica.
   - Tarjetas ilustradas e interactivas.
   - Fichas individuales con diseño premium.
   - Preparado para incorporar fotografías reales.
========================================================= */

(() => {
    "use strict";

    const memories = [
        {
            id: 1,
            title: "Una tarde de cine",
            category: "Una tarde para nosotros",
            icon: "bi-film",
            date: "",
            status: "upcoming",
            description: "Una película, palomitas y buena compañía.",
            detail: "Todavía tenemos que vivir esta tarde. Lo importante será compartirla contigo.",
            image: "",
            caption: "Nuestra próxima aventura",
            color: "pink",
            number: "01"
        },
        {
            id: 2,
            title: "Una quedada en el bar",
            category: "Pequeños momentos",
            icon: "bi-cup-hot",
            date: "",
            status: "upcoming",
            description: "Un rato juntos que espero que se alargue.",
            detail: "Porque a veces los mejores momentos no necesitan ningún plan extraordinario.",
            image: "assets/images/FotoBar.jpeg",
            caption: "Un ratito para nosotros",
            color: "cream",
            number: "02"
        },
        {
            id: 3,
            title: "El alumbrado de Navidad",
            category: "Una noche especial",
            icon: "bi-stars",
            date: "",
            status: "upcoming",
            description: "Luces, paseos y una noche especial.",
            detail: "Una noche para pasear, disfrutar de las luces y crear un recuerdo bonito.",
            image: "",
            caption: "Una Navidad diferente",
            color: "rose",
            number: "03"
        }
    ];

    const memoryScreen = document.querySelector('[data-screen="2"]');

    if (!memoryScreen) return;

    const memoryContainer = memoryScreen.querySelector(".memory-placeholder");

    if (!memoryContainer) return;

    // -----------------------------------------------------
    // ESTILOS
    // -----------------------------------------------------

    const style = document.createElement("style");
    style.id = "elenaMemoriesStyles";

    style.textContent = `
        /* CONTENEDOR GENERAL */

        .memory-experience {
            width: 100%;
            max-width: 1000px;
            margin: 35px auto 20px;
            padding: 0 10px;
            animation: memoryAppear .8s ease both;
        }

        @keyframes memoryAppear {
            from {
                opacity: 0;
                transform: translateY(18px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* CABECERA */

        .memory-heading {
            position: relative;
            max-width: 650px;
            margin: 0 auto 38px;
            text-align: center;
        }

        .memory-eyebrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            margin-bottom: 15px;
            color: var(--pink-dark, #a45c75);
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
        }

        .memory-eyebrow::before,
        .memory-eyebrow::after {
            content: "";
            width: 25px;
            height: 1px;
            background: #d9a9b8;
        }

        .memory-heading h2 {
            margin: 0;
            color: var(--burgundy, #713149);
            font-family: var(--font-title, Georgia, serif);
            font-size: clamp(30px, 5vw, 43px);
            font-weight: 500;
            line-height: 1.2;
            letter-spacing: -.8px;
        }

        .memory-heading h2 span {
            color: #b77991;
            font-style: italic;
        }

        .memory-heading p {
            max-width: 420px;
            margin: 15px auto 0;
            color: var(--muted, #8f7b82);
            font-size: 12px;
            line-height: 1.9;
        }

        .memory-heading-decoration {
            display: block;
            margin-top: 18px;
            color: #c98da2;
            font-size: 17px;
            opacity: .8;
        }

        /* PEQUEÑA INTRODUCCIÓN */

        .memory-section-label {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0 0 16px;
            color: #a17b87;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .memory-section-label::after {
            content: "";
            flex: 1;
            height: 1px;
            background: #eadce0;
        }

        /* GALERÍA */

        .memory-gallery {
            display: grid;
            grid-template-columns: 1.12fr .88fr;
            grid-template-rows: repeat(2, minmax(225px, 1fr));
            gap: 17px;
            width: 100%;
        }

        /* TARJETAS */

        .memory-card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            width: 100%;
            min-height: 0;
            padding: 0;
            overflow: hidden;
            border: 1px solid rgba(119, 65, 83, .10);
            border-radius: 19px;
            background: #fffdfc;
            color: inherit;
            text-align: left;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(75, 23, 43, .045);
            transition:
                transform .4s cubic-bezier(.2,.8,.2,1),
                box-shadow .4s ease,
                border-color .3s ease;
            -webkit-tap-highlight-color: transparent;
        }

        .memory-card:first-child {
            grid-row: 1 / 3;
        }

        .memory-card:hover {
            transform: translateY(-6px);
            border-color: rgba(183, 121, 145, .45);
            box-shadow: 0 18px 38px rgba(75, 23, 43, .11);
        }

        .memory-card:focus-visible {
            outline: 3px solid var(--pink-dark, #a45c75);
            outline-offset: 5px;
        }

        /* ZONA VISUAL */

        .memory-card-visual {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 0;
            flex: 1;
            overflow: hidden;
            isolation: isolate;
        }

        .memory-card:first-child .memory-card-visual {
            min-height: 330px;
        }

        .memory-card:nth-child(2) .memory-card-visual,
        .memory-card:nth-child(3) .memory-card-visual {
            min-height: 145px;
        }

        .memory-card-visual::before {
            position: absolute;
            inset: 0;
            z-index: -1;
            content: "";
            opacity: .8;
            transition: transform .8s ease;
        }

        .memory-card:hover .memory-card-visual::before {
            transform: scale(1.06);
        }

        .memory-card-visual.pink::before {
            background:
                radial-gradient(circle at 20% 25%, rgba(255,255,255,.8), transparent 30%),
                radial-gradient(circle at 85% 80%, rgba(183,121,145,.25), transparent 35%),
                linear-gradient(140deg, #f8e8eb, #e9bdcb 55%, #d9a6b8);
        }

        .memory-card-visual.cream::before {
            background:
                radial-gradient(circle at 75% 20%, rgba(255,255,255,.8), transparent 30%),
                radial-gradient(circle at 20% 85%, rgba(193,144,113,.2), transparent 35%),
                linear-gradient(140deg, #f7ecdf, #e9d2bf 55%, #d8bba9);
        }

        .memory-card-visual.rose::before {
            background:
                radial-gradient(circle at 20% 25%, rgba(255,255,255,.7), transparent 30%),
                radial-gradient(circle at 85% 80%, rgba(111,49,73,.2), transparent 35%),
                linear-gradient(140deg, #eedde5, #d5afc0 55%, #b77c95);
        }

        /* DECORACIÓN INTERIOR */

        .memory-visual-decoration {
            position: absolute;
            inset: 13px;
            border: 1px solid rgba(255,255,255,.52);
            border-radius: 12px;
            pointer-events: none;
        }

        .memory-visual-decoration::before,
        .memory-visual-decoration::after {
            position: absolute;
            content: "✦";
            color: rgba(255,255,255,.8);
            font-size: 13px;
        }

        .memory-visual-decoration::before {
            top: 12px;
            left: 14px;
        }

        .memory-visual-decoration::after {
            right: 14px;
            bottom: 12px;
        }

        .memory-visual-icon {
            position: relative;
            z-index: 1;
            display: grid;
            place-items: center;
            width: 102px;
            height: 102px;
            border: 1px solid rgba(255,255,255,.75);
            border-radius: 50%;
            background: rgba(255,255,255,.24);
            color: #713149;
            font-size: 39px;
            box-shadow: 0 8px 25px rgba(91, 43, 61, .08);
            backdrop-filter: blur(5px);
            transition: transform .5s ease;
        }

        .memory-card:first-child .memory-visual-icon {
            width: 125px;
            height: 125px;
            font-size: 47px;
        }

        .memory-card:hover .memory-visual-icon {
            transform: scale(1.08) rotate(-5deg);
        }

        .memory-card-visual img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform .8s ease;
        }

        .memory-card:hover .memory-card-visual img {
            transform: scale(1.055);
        }

        .memory-photo-tag {
            position: absolute;
            right: 25px;
            bottom: 24px;
            z-index: 2;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 11px;
            border: 1px solid rgba(255,255,255,.45);
            border-radius: 30px;
            background: rgba(255,255,255,.55);
            color: #713149;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 1.2px;
            backdrop-filter: blur(8px);
        }

        .memory-card:first-child .memory-photo-tag {
            right: 30px;
            bottom: 30px;
        }

        .memory-card-number {
            position: absolute;
            top: 25px;
            left: 27px;
            z-index: 2;
            color: rgba(113,49,73,.75);
            font-family: var(--font-title, Georgia, serif);
            font-size: 13px;
            font-style: italic;
            letter-spacing: 1px;
        }

        /* TEXTO DE LAS TARJETAS */

        .memory-card-content {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 17px 19px 18px;
            background: #fffdfc;
        }

        .memory-card:first-child .memory-card-content {
            padding: 23px 25px 25px;
        }

        .memory-card-text {
            min-width: 0;
        }

        .memory-card-category {
            display: block;
            margin-bottom: 6px;
            color: #b17b8e;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 1.7px;
            text-transform: uppercase;
        }

        .memory-card-title {
            margin: 0;
            color: var(--burgundy, #713149);
            font-family: var(--font-title, Georgia, serif);
            font-size: 17px;
            font-weight: 500;
            line-height: 1.35;
        }

        .memory-card:first-child .memory-card-title {
            font-size: 23px;
        }

        .memory-card-caption {
            margin: 6px 0 0;
            color: var(--muted, #8f7b82);
            font-size: 10px;
            line-height: 1.6;
        }

        .memory-card-arrow {
            display: grid;
            flex: 0 0 34px;
            place-items: center;
            width: 34px;
            height: 34px;
            border: 1px solid #ecdce2;
            border-radius: 50%;
            color: #9d6279;
            font-size: 13px;
            transition: .3s ease;
        }

        .memory-card:hover .memory-card-arrow {
            transform: translateX(3px);
            border-color: #c58da2;
            background: #f8edf1;
        }

        /* PIE DEL ÁLBUM */

        .memory-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin: 27px auto 0;
            color: #a17b87;
            font-family: var(--font-title, Georgia, serif);
            font-size: 13px;
            font-style: italic;
            text-align: center;
        }

        .memory-footer i {
            color: #c88ba2;
            font-size: 11px;
        }

        /* MODAL */

        .memory-modal-overlay {
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(37, 15, 27, .72);
            backdrop-filter: blur(9px);
            opacity: 0;
            visibility: hidden;
            transition: opacity .3s ease, visibility .3s ease;
        }

        .memory-modal-overlay.open {
            opacity: 1;
            visibility: visible;
        }

        .memory-modal {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            max-width: 760px;
            max-height: 88vh;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,.55);
            border-radius: 23px;
            background: #fffaf8;
            box-shadow: 0 25px 80px rgba(0,0,0,.24);
            transform: translateY(25px) scale(.98);
            transition: transform .35s cubic-bezier(.2,.8,.2,1);
        }

        .memory-modal-overlay.open .memory-modal {
            transform: translateY(0) scale(1);
        }

        .memory-modal-close {
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 5;
            display: grid;
            place-items: center;
            width: 38px;
            height: 38px;
            border: 1px solid rgba(113,49,73,.1);
            border-radius: 50%;
            background: rgba(255,255,255,.88);
            color: #713149;
            cursor: pointer;
            transition: .25s ease;
        }

        .memory-modal-close:hover {
            transform: rotate(90deg);
            background: #f5e5eb;
        }

        .memory-modal-image {
            position: relative;
            display: grid;
            place-items: center;
            min-height: 390px;
            overflow: hidden;
            background: linear-gradient(145deg, #f8dfe7, #e8b5c7);
        }

        .memory-modal-image.pink {
            background: linear-gradient(145deg, #f8e8eb, #d9a6b8);
        }

        .memory-modal-image.cream {
            background: linear-gradient(145deg, #f7ecdf, #d8bba9);
        }

        .memory-modal-image.rose {
            background: linear-gradient(145deg, #eedde5, #b77c95);
        }

        .memory-modal-image img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .memory-modal-image i {
            color: #713149;
            font-size: 75px;
        }

        .memory-modal-image::after {
            position: absolute;
            inset: 15px;
            border: 1px solid rgba(255,255,255,.55);
            border-radius: 12px;
            content: "";
            pointer-events: none;
        }

        .memory-modal-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 42px 35px;
            overflow-y: auto;
        }

        .memory-modal-kicker {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 17px;
            color: #b17b8e;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .memory-modal-kicker::before {
            width: 20px;
            height: 1px;
            background: #c58da2;
            content: "";
        }

        .memory-modal h3 {
            margin: 0 0 15px;
            color: #713149;
            font-family: var(--font-title, Georgia, serif);
            font-size: clamp(25px, 4vw, 34px);
            font-weight: 500;
            line-height: 1.2;
        }

        .memory-modal-description {
            margin: 0;
            color: #8f7b82;
            font-size: 12px;
            line-height: 1.9;
        }

        .memory-modal-divider {
            width: 42px;
            height: 1px;
            margin: 23px 0;
            background: #d6a8b8;
        }

        .memory-modal-note {
            position: relative;
            padding: 17px 18px;
            border-left: 2px solid #c58da2;
            border-radius: 0 12px 12px 0;
            background: #f8edf1;
            color: #754458;
            font-family: var(--font-title, Georgia, serif);
            font-size: 15px;
            font-style: italic;
            line-height: 1.7;
        }

        .memory-modal-bottom {
            display: flex;
            align-items: center;
            gap: 7px;
            margin-top: 25px;
            color: #b17b8e;
            font-size: 9px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .memory-modal-bottom i {
            font-size: 12px;
        }

        /* TABLET */

        @media (max-width: 760px) {
            .memory-experience {
                margin-top: 25px;
            }

            .memory-gallery {
                gap: 12px;
            }

            .memory-card-content {
                padding: 14px;
            }

            .memory-card:first-child .memory-card-content {
                padding: 19px;
            }

            .memory-card-title {
                font-size: 15px;
            }

            .memory-card:first-child .memory-card-title {
                font-size: 20px;
            }

            .memory-modal {
                max-width: 620px;
            }

            .memory-modal-image {
                min-height: 340px;
            }

            .memory-modal-content {
                padding: 35px 25px;
            }
        }

        /* MÓVIL */

        @media (max-width: 560px) {
            .memory-experience {
                padding: 0 3px;
                margin-top: 22px;
            }

            .memory-heading {
                margin-bottom: 28px;
            }

            .memory-heading h2 {
                font-size: 32px;
            }

            .memory-heading p {
                max-width: 310px;
                font-size: 11px;
            }

            .memory-section-label {
                margin-bottom: 12px;
                font-size: 8px;
            }

            .memory-gallery {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto;
                gap: 11px;
            }

            .memory-card:first-child {
                grid-column: 1 / -1;
                grid-row: auto;
            }

            .memory-card:first-child .memory-card-visual {
                min-height: 225px;
            }

            .memory-card:nth-child(2) .memory-card-visual,
            .memory-card:nth-child(3) .memory-card-visual {
                min-height: 125px;
            }

            .memory-visual-icon {
                width: 75px;
                height: 75px;
                font-size: 29px;
            }

            .memory-card:first-child .memory-visual-icon {
                width: 95px;
                height: 95px;
                font-size: 37px;
            }

            .memory-card-number {
                top: 19px;
                left: 20px;
            }

            .memory-photo-tag {
                right: 19px;
                bottom: 19px;
                padding: 7px 9px;
                font-size: 7px;
            }

            .memory-card:first-child .memory-photo-tag {
                right: 22px;
                bottom: 22px;
            }

            .memory-card-content {
                align-items: flex-start;
                gap: 7px;
                padding: 13px 11px 14px;
            }

            .memory-card:first-child .memory-card-content {
                padding: 17px 16px;
            }

            .memory-card-category {
                font-size: 7px;
                letter-spacing: 1px;
            }

            .memory-card-title {
                font-size: 13px;
            }

            .memory-card:first-child .memory-card-title {
                font-size: 19px;
            }

            .memory-card-caption {
                font-size: 9px;
            }

            .memory-card-arrow {
                flex-basis: 28px;
                width: 28px;
                height: 28px;
                font-size: 11px;
            }

            .memory-footer {
                margin-top: 22px;
                font-size: 12px;
            }

            .memory-modal-overlay {
                align-items: center;
                padding: 14px;
            }

            .memory-modal {
                display: flex;
                flex-direction: column;
                max-height: 88vh;
                overflow-y: auto;
                border-radius: 20px;
            }

            .memory-modal-image {
                flex: 0 0 190px;
                min-height: 190px;
                max-height: 190px;
            }

            .memory-modal-image i {
                font-size: 55px;
            }

            .memory-modal-content {
                padding: 25px 22px 27px;
                overflow: visible;
            }

            .memory-modal-kicker {
                margin-bottom: 12px;
                font-size: 8px;
            }

            .memory-modal h3 {
                margin-bottom: 11px;
                font-size: 27px;
            }

            .memory-modal-description {
                font-size: 11px;
            }

            .memory-modal-divider {
                margin: 17px 0;
            }

            .memory-modal-note {
                padding: 13px 15px;
                font-size: 14px;
            }

            .memory-modal-bottom {
                margin-top: 18px;
            }
        }

        @media (max-width: 360px) {
            .memory-gallery {
                gap: 8px;
            }

            .memory-card-content {
                padding: 11px 9px;
            }

            .memory-card-title {
                font-size: 12px;
            }

            .memory-card-arrow {
                display: none;
            }
        }

        /* REDUCIR MOVIMIENTO */

        @media (prefers-reduced-motion: reduce) {
            .memory-experience,
            .memory-card,
            .memory-card-visual *,
            .memory-modal,
            .memory-modal-overlay {
                animation: none !important;
                transition: none !important;
            }
        }
    `;

    document.head.appendChild(style);

    // -----------------------------------------------------
    // CONSTRUCCIÓN DE LA GALERÍA
    // -----------------------------------------------------

    memoryContainer.innerHTML = `
        <section class="memory-experience">

            <header class="memory-heading">
                <span class="memory-eyebrow">
                    Un pequeño rincón para nosotros
                </span>

                <h2>
                    Cosas bonitas que<br>
                    <span>nos quedan por vivir.</span>
                </h2>

                <p>
                    Hay momentos que todavía no han ocurrido,
                    pero que ya tienen un huequito reservado
                    en esta historia.
                </p>

                <span class="memory-heading-decoration" aria-hidden="true">
                    ✧
                </span>
            </header>

            <div class="memory-section-label">
                Nuestro pequeño álbum
            </div>

            <div class="memory-gallery" id="memoryGallery">

                ${memories.map(memory => `
                    <button
                        class="memory-card"
                        type="button"
                        data-memory-id="${memory.id}"
                        aria-label="Descubrir: ${memory.title}"
                    >
                        <div class="memory-card-visual ${memory.color}">

                            <span class="memory-card-number">
                                Nº ${memory.number}
                            </span>

                            <span class="memory-visual-decoration"></span>

                            ${memory.image
                                ? `
                                    <img
                                        src="${memory.image}"
                                        alt="${memory.title}"
                                    >
                                `
                                : `
                                    <span class="memory-visual-icon">
                                        <i class="bi ${memory.icon}"></i>
                                    </span>
                                `
                            }

                            <span class="memory-photo-tag">
                                <i class="bi bi-camera"></i>
                                UN RECUERDO POR CREAR
                            </span>

                        </div>

                        <div class="memory-card-content">

                            <div class="memory-card-text">
                                <span class="memory-card-category">
                                    ${memory.category}
                                </span>

                                <h3 class="memory-card-title">
                                    ${memory.title}
                                </h3>

                                <p class="memory-card-caption">
                                    ${memory.caption}
                                </p>
                            </div>

                            <span class="memory-card-arrow" aria-hidden="true">
                                <i class="bi bi-arrow-up-right"></i>
                            </span>

                        </div>
                    </button>
                `).join("")}

            </div>

            <footer class="memory-footer">
                <i class="bi bi-heart-fill"></i>
                <span>Lo mejor de esta historia aún está por llegar</span>
                <i class="bi bi-heart-fill"></i>
            </footer>

        </section>
    `;

    // -----------------------------------------------------
    // MODAL DE RECUERDOS
    // -----------------------------------------------------

    const overlay = document.createElement("div");

    overlay.className = "memory-modal-overlay";
    overlay.id = "memoryModalOverlay";

    overlay.innerHTML = `
        <article
            class="memory-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memoryModalTitle"
        >

            <button
                class="memory-modal-close"
                type="button"
                aria-label="Cerrar"
                id="memoryModalClose"
            >
                <i class="bi bi-x-lg"></i>
            </button>

            <div
                class="memory-modal-image"
                id="memoryModalImage"
            ></div>

            <div class="memory-modal-content">

                <span
                    class="memory-modal-kicker"
                    id="memoryModalDate"
                ></span>

                <h3 id="memoryModalTitle"></h3>

                <p
                    class="memory-modal-description"
                    id="memoryModalDescription"
                ></p>

                <div class="memory-modal-divider"></div>

                <div
                    class="memory-modal-note"
                    id="memoryModalNote"
                ></div>

                <div class="memory-modal-bottom">
                    <i class="bi bi-heart-fill"></i>
                    <span>Un momento para recordar</span>
                </div>

            </div>

        </article>
    `;

    document.body.appendChild(overlay);

    const modalImage = document.getElementById("memoryModalImage");
    const modalDate = document.getElementById("memoryModalDate");
    const modalTitle = document.getElementById("memoryModalTitle");
    const modalDescription = document.getElementById("memoryModalDescription");
    const modalNote = document.getElementById("memoryModalNote");
    const modalClose = document.getElementById("memoryModalClose");

    let previousFocus = null;

    // -----------------------------------------------------
    // ABRIR RECUERDO
    // -----------------------------------------------------

    function openMemory(id) {
        const memory = memories.find(item => item.id === Number(id));

        if (!memory) return;

        previousFocus = document.activeElement;

        modalTitle.textContent = memory.title;
        modalDescription.textContent = memory.description;
        modalNote.textContent = memory.detail;

        modalDate.textContent = memory.date
            ? memory.date
            : memory.status === "completed"
                ? "Un recuerdo que ya es nuestro"
                : "Un momento que está por llegar";

        modalImage.className = `memory-modal-image ${memory.color}`;

        if (memory.image) {
            const image = document.createElement("img");

            image.src = memory.image;
            image.alt = memory.title;

            modalImage.replaceChildren(image);
        } else {
            const icon = document.createElement("i");

            icon.className = `bi ${memory.icon}`;
            icon.setAttribute("aria-hidden", "true");

            modalImage.replaceChildren(icon);
        }

        overlay.classList.add("open");
        document.body.style.overflow = "hidden";

        modalClose.focus();
    }

    // -----------------------------------------------------
    // CERRAR RECUERDO
    // -----------------------------------------------------

    function closeMemory() {
        if (!overlay.classList.contains("open")) return;

        overlay.classList.remove("open");
        document.body.style.overflow = "";

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }
    }

    // -----------------------------------------------------
    // EVENTOS
    // -----------------------------------------------------

    memoryContainer.addEventListener("click", event => {
        const card = event.target.closest("[data-memory-id]");

        if (!card) return;

        openMemory(card.dataset.memoryId);
    });

    modalClose.addEventListener("click", closeMemory);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeMemory();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            overlay.classList.contains("open")
        ) {
            closeMemory();
        }
    });

    // -----------------------------------------------------
    // API PÚBLICA
    // -----------------------------------------------------

    window.ELENA_MEMORIES = {
        getAll() {
            return memories.map(memory => ({ ...memory }));
        },

        getById(id) {
            const memory = memories.find(
                item => item.id === Number(id)
            );

            return memory ? { ...memory } : null;
        },

        open: openMemory,
        close: closeMemory
    };

})();
