
const climateData = {

    2021: {
        temperature: "1.09",
        co2: "416",
        seaLevel: "88",
        ice: "4.72"
    },

    2022: {
        temperature: "1.15",
        co2: "418",
        seaLevel: "92",
        ice: "4.67"
    },

    2023: {
        temperature: "1.45",
        co2: "421",
        seaLevel: "96",
        ice: "4.23"
    },

    2024: {
        temperature: "1.55",
        co2: "424",
        seaLevel: "101",
        ice: "4.28"
    },

    2025: {
        temperature: "1.48",
        co2: "427",
        seaLevel: "105",
        ice: "4.40"
    }

};


const yearButtons = document.querySelectorAll(".year-btn");


yearButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const year = this.dataset.year;

        const data = climateData[year];


        // Remove active from all buttons

        yearButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        // Add active to selected button

        this.classList.add("active");


        // Change selected year

        document.getElementById("selected-year").textContent = year;


        // Change climate data

        document.getElementById("temperature").textContent =
            data.temperature;

        document.getElementById("co2").textContent =
            data.co2;

        document.getElementById("seaLevel").textContent =
            data.seaLevel;

        document.getElementById("ice").textContent =
            data.ice;

    });

});
