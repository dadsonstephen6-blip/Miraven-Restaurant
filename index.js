
/* =========================================================
   MIRAVEN RESTAURANT — WEBSITE JAVASCRIPT
   ========================================================= */


/* =========================
   1. MOBILE NAVIGATION
   ========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");

        const isOpen = navLinks.classList.contains("mobile-active");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close Menu" : "Open Menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-active");
            menuToggle.setAttribute("aria-label", "Open Menu");
        });
    });
}


/* =========================
   2. CUSTOMER COUNTER
   ========================= */

const counters = document.querySelectorAll(".counter");

function startCounter(counter) {
    const target = Number(counter.dataset.target);

    if (!Number.isFinite(target) || target <= 0) {
        counter.textContent = "0";
        return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        counter.textContent = Math.floor(target * progress);

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(updateCounter);
}

const statsSection = document.querySelector(".stats");

if (statsSection && counters.length > 0) {
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counters.forEach(startCounter);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 }
        );

        counterObserver.observe(statsSection);
    } else {
        counters.forEach(startCounter);
    }
}


/* =========================
   3. MENU FILTER
   ========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        menuCards.forEach(card => {
            const cardCategory = card.dataset.category;

            card.style.display =
                category === "all" || cardCategory === category
                    ? ""
                    : "none";
        });
    });
});


/* =========================
   4. RESERVATION FORM
   ========================= */

const reservationForm = document.querySelector(".reservation-form");

if (reservationForm) {
    reservationForm.addEventListener("submit", event => {
        event.preventDefault();

        const nameInput = reservationForm.querySelector("#name");

        if (!nameInput || nameInput.value.trim() === "") {
            alert("Please enter your name.");
            return;
        }

        const name = nameInput.value.trim();

        alert(
            `Thank you, ${name}! Your reservation request has been received.`
        );

        reservationForm.reset();
    });
}


/* =========================
   5. SCROLL REVEAL ANIMATION
   ========================= */

const revealElements = document.querySelectorAll(
    ".about-content, .about-images, .menu-card, .gallery-grid img, .reservation-content, .reservation-form, .contact-info"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("reveal-visible");
    });
}


/* =========================
   6. PAGE TRANSITIONS
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", event => {
            const href = link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                link.target === "_blank" ||
                link.hasAttribute("download")
            ) {
                return;
            }

            event.preventDefault();

            document.body.classList.remove("page-loaded");
            document.body.classList.add("page-leaving");

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});


/* =========================
   7. LOGO LOADING ANIMATION
   ========================= */

window.addEventListener("load", () => {
    const loader = document.querySelector(".miraven-loader");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1400);
});
