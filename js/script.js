// ========================================
// CONTACT — SERVICE PILLS
// ========================================

document.querySelectorAll('.service-pill').forEach(btn => {
    btn.addEventListener('click', () => {

        document.querySelectorAll('.service-pill').forEach(b => {
            b.className =
                'service-pill px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-code-tag text-code-tag uppercase tracking-wider font-semibold transition-all';
        });

        btn.className =
            'service-pill px-4 py-1.5 rounded-full bg-primary text-on-primary font-code-tag text-code-tag uppercase tracking-wider font-bold shadow-md transition-all';
    });
});


// ========================================
// SLIDESHOWS
// ========================================

const poleSliders = {

    uiux: {
        current: 0,
        total: 3,
        colorClass: 'bg-primary',
        activeWidth: 'w-8',
        timer: null
    },

    graphic: {
        current: 0,
        total: 4,
        colorClass: 'bg-secondary',
        activeWidth: 'w-8',
        timer: null
    },

    qa: {
        current: 3,
        total: 4,
        colorClass: 'bg-tertiary',
        activeWidth: 'w-8',
        timer: null
    }
};


// ========================================
// AFFICHAGE D'UNE SLIDE
// ========================================

function updateSlideView(poleKey) {

    const data = poleSliders[poleKey];

    const container =
        document.getElementById('container-' + poleKey);

    if (!container) return;

    const slides =
        container.querySelectorAll('[data-slide-index]');


    slides.forEach((slide, idx) => {

        if (idx === data.current) {

            slide.classList.remove(
                'opacity-0',
                'scale-95',
                'pointer-events-none',
                'z-0'
            );

            slide.classList.add(
                'opacity-100',
                'scale-100',
                'pointer-events-auto',
                'z-10'
            );

        } else {

            slide.classList.remove(
                'opacity-100',
                'scale-100',
                'pointer-events-auto',
                'z-10'
            );

            slide.classList.add(
                'opacity-0',
                'scale-95',
                'pointer-events-none',
                'z-0'
            );
        }
    });


    // Compteur

    const counter =
        document.getElementById('counter-' + poleKey);

    if (counter) {

        counter.textContent =
            `${String(data.current + 1).padStart(2, '0')} / ${String(data.total).padStart(2, '0')}`;
    }


    // Points de navigation

    const dotsContainer =
        document.getElementById('dots-' + poleKey);

    if (dotsContainer) {

        const dots =
            dotsContainer.querySelectorAll('button');

        dots.forEach((dot, idx) => {

            if (idx === data.current) {

                dot.className =
                    `h-2.5 rounded-full transition-all duration-300 ${data.colorClass} ${data.activeWidth}`;

            } else {

                dot.className =
                    'w-2.5 h-2.5 rounded-full transition-all duration-300 bg-surface-container-highest hover:bg-outline';
            }
        });
    }
}


// ========================================
// SLIDE SUIVANTE / PRÉCÉDENTE
// ========================================

function slidePole(poleKey, direction) {

    const data = poleSliders[poleKey];

    if (!data) return;

    data.current =
        (data.current + direction + data.total) % data.total;

    updateSlideView(poleKey);
}


// ========================================
// ALLER À UNE SLIDE PRÉCISE
// ========================================

function goToSlide(poleKey, targetIndex) {

    const data = poleSliders[poleKey];

    if (!data) return;

    data.current =
        targetIndex % data.total;

    updateSlideView(poleKey);
}


// ========================================
// DÉMARRAGE AUTOMATIQUE
// ========================================

function startAutoCycle(poleKey) {

    if (poleSliders[poleKey].timer) {
        clearInterval(poleSliders[poleKey].timer);
    }

    poleSliders[poleKey].timer =
        setInterval(() => {

            slidePole(poleKey, 1);

        }, 5000);
}


// ========================================
// ARRÊT AUTOMATIQUE
// ========================================

function stopAutoCycle(poleKey) {

    if (poleSliders[poleKey].timer) {

        clearInterval(
            poleSliders[poleKey].timer
        );

        poleSliders[poleKey].timer = null;
    }
}


// ========================================
// INITIALISATION DES SLIDESHOWS
// ========================================

['uiux', 'graphic', 'qa'].forEach(pole => {

    updateSlideView(pole);

    startAutoCycle(pole);

    const container =
        document.getElementById('container-' + pole);

    if (container) {

        container.addEventListener(
            'mouseenter',
            () => stopAutoCycle(pole)
        );

        container.addEventListener(
            'mouseleave',
            () => startAutoCycle(pole)
        );
    }
});