/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".info-card, .cause, .impact-item, .solution-card, .stat"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});


/* =========================
   ADD SHOW CLASS
========================= */

const style = document.createElement("style");

style.innerHTML = `
    .show {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(style);


/* =========================
   CHECKLIST
========================= */

const checkboxes = document.querySelectorAll(
    '.checklist input[type="checkbox"]'
);

const progressText = document.getElementById("progress");

const progressFill = document.getElementById("progress-fill");


function updateProgress() {

    const completed = document.querySelectorAll(
        '.checklist input[type="checkbox"]:checked'
    ).length;

    const total = checkboxes.length;

    const percentage = (completed / total) * 100;

    progressText.textContent = `${completed} / ${total}`;

    progressFill.style.width = `${percentage}%`;

}


checkboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", updateProgress);

});


/* =========================
   COUNTER
========================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach((counter) => {

        const target = parseFloat(
            counter.getAttribute("data-target")
        );

        let current = 0;

        const increment = target / 50;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent =
                    current.toFixed(1);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    target.toFixed(1);

            }

        };

        updateCounter();

    });

}


const dataSection = document.querySelector(".data-section");


const counterObserver = new IntersectionObserver(
    (entries) => {

        if (entries[0].isIntersecting) {

            startCounters();

        }

    },
    {
        threshold: 0.3
    }
);


counterObserver.observe(dataSection);


/* =========================
   NAVBAR EFFECT
========================= */

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5, 8, 6, 0.9)";

    } else {

        navbar.style.background =
            "rgba(5, 8, 6, 0.65)";

    }

});


/* =========================
   PARALLAX HERO
========================= */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {

        hero.style.backgroundPosition =
            `center ${scrollPosition * 0.35}px`;

    }

});

/* =========================================
   CLIMATE DATA DASHBOARD
========================================= */

const climateYears = {

    2021: {
        temperature: 1.09,
        co2: 416,
        sea: 88
    },

    2022: {
        temperature: 1.15,
        co2: 418,
        sea: 92
    },

    2023: {
        temperature: 1.45,
        co2: 421,
        sea: 96
    },

    2024: {
        temperature: 1.55,
        co2: 424,
        sea: 101
    },

    2025: {
        temperature: 1.48,
        co2: 427,
        sea: 105
    }

};


const dataYearButtons =
    document.querySelectorAll(".data-year");


const dashboardYear =
    document.getElementById("dashboardYear");

const dashboardTemperature =
    document.getElementById("dashboardTemperature");

const dashboardCO2 =
    document.getElementById("dashboardCO2");

const dashboardSea =
    document.getElementById("dashboardSea");

const mapYear =
    document.getElementById("mapYear");


/* YEAR BUTTON */

dataYearButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const year = this.dataset.year;

        const data = climateYears[year];


        dataYearButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        this.classList.add("active");


        dashboardYear.textContent = year;

        dashboardTemperature.textContent =
            data.temperature;

        dashboardCO2.textContent =
            data.co2;

        dashboardSea.textContent =
            data.sea;

        mapYear.textContent = year;

    });

});


/* TEMPERATURE GRAPH */

const temperatureCanvas =
    document.getElementById("temperatureChart");


if (temperatureCanvas && typeof Chart !== "undefined") {

    new Chart(temperatureCanvas, {

        type: "line",

        data: {

            labels: [
                "2021",
                "2022",
                "2023",
                "2024",
                "2025"
            ],

            datasets: [{

                label: "Temperature °C",

                data: [
                    1.09,
                    1.15,
                    1.45,
                    1.55,
                    1.48
                ],

                borderColor: "#8ccf63",

                backgroundColor:
                    "rgba(140,207,99,0.12)",

                fill: true,

                tension: 0.4,

                pointRadius: 5

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {
                    grid: {
                        color: "#293029"
                    },

                    ticks: {
                        color: "#7f887f"
                    }
                },

                x: {
                    grid: {
                        color: "#293029"
                    },

                    ticks: {
                        color: "#7f887f"
                    }
                }

            }

        }

    });

}


/* CO2 GRAPH */

const co2Canvas =
    document.getElementById("co2Chart");


if (co2Canvas && typeof Chart !== "undefined") {

    new Chart(co2Canvas, {

        type: "bar",

        data: {

            labels: [
                "2021",
                "2022",
                "2023",
                "2024",
                "2025"
            ],

            datasets: [{

                label: "CO₂ ppm",

                data: [
                    416,
                    418,
                    421,
                    424,
                    427
                ],

                backgroundColor: "#8ccf63"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {

                    grid: {
                        color: "#293029"
                    },

                    ticks: {
                        color: "#7f887f"
                    }

                },

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#7f887f"
                    }

                }

            }

        }

    });

}


/* SEA LEVEL GRAPH */

const seaCanvas =
    document.getElementById("seaChart");


if (seaCanvas && typeof Chart !== "undefined") {

    new Chart(seaCanvas, {

        type: "line",

        data: {

            labels: [
                "2021",
                "2022",
                "2023",
                "2024",
                "2025"
            ],

            datasets: [{

                label: "Sea Level mm",

                data: [
                    88,
                    92,
                    96,
                    101,
                    105
                ],

                borderColor: "#4c9dff",

                backgroundColor:
                    "rgba(76,157,255,0.12)",

                fill: true,

                tension: 0.35,

                pointRadius: 5

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {

                    grid: {
                        color: "#293029"
                    },

                    ticks: {
                        color: "#7f887f"
                    }

                },

                x: {

                    grid: {
                        color: "#293029"
                    },

                    ticks: {
                        color: "#7f887f"
                    }

                }

            }

        }

    });

}
