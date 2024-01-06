/**
 * Countdown Timer Script
 * 
 * Author: Navneet Baid
 * Last Updated: 07/01/2024
 * 
 * Description: 
 * This script creates a dynamic countdown timer based on a target date.
 * It dynamically generates HTML elements to display days, hours, minutes, and seconds.
 * The countdown updates every second and utilizes CSS for visual effects.
 */

// Select all elements with the class "countdown" and the countdown container element
const countdownEls = document.querySelectorAll(".countdown");
const countdownDiv = document.getElementById("countdown");

// Iterate through each countdown element and initialize the countdown
countdownEls.forEach(countdownEl => createCountdown(countdownEl));

/**
 * Create Countdown Function
 * 
 * @param {HTMLElement} countdownEl - The countdown element to initialize.
 */
function createCountdown(countdownEl) {
    // Parse the target date from the data attribute
    const targetDate = new Date(countdownEl.dataset.targetDate);

    // Check if the target date is valid
    if (isNaN(targetDate)) {
        console.error("Invalid date format");
        return;
    }

    // Define parts of the countdown: days, hours, minutes, seconds
    const parts = {
        days: { text: ["days", "day"], dots: 30 },
        hours: { text: ["hours", "hour"], dots: 24 },
        minutes: { text: ["minutes", "minute"], dots: 60 },
        seconds: { text: ["seconds", "second"], dots: 60 },
    };

    // Create HTML elements for each part of the countdown
    Object.entries(parts).forEach(([key, value]) => {
        // Create a container element for the countdown part
        const partEl = document.createElement("div");
        partEl.classList.add("part", key);
        partEl.style.setProperty("--dots", value.dots);
        value.element = partEl;

        // Create a sub-element for displaying remaining time
        const remainingEl = document.createElement("div");
        remainingEl.classList.add("remaining");
        remainingEl.innerHTML = `
            <span class="number"></span>
            <span class="text"></span>
        `;
        partEl.append(remainingEl);

        // Create dots for visual effect
        for (let i = 0; i < value.dots; i++) {
            const dotContainerEl = document.createElement("div");
            dotContainerEl.style.setProperty("--dot-idx", i);
            dotContainerEl.classList.add("dot-container");
            const dotEl = document.createElement("div");
            dotEl.classList.add("dot");
            dotContainerEl.append(dotEl);
            partEl.append(dotContainerEl);
        }

        // Append the part element to the countdown element
        countdownEl.append(partEl);
    });

    // If the target date is in the future, initiate countdown
    if (targetDate > new Date()) {
        getRemainingTime(targetDate, parts);
    }

    // If the target date is in the past, hide the countdown element
    if (targetDate <= new Date()) {
        countdownDiv.style.display = 'none';
    }
}

/**
 * Get Remaining Time Function
 * 
 * @param {Date} targetDate - The target date for the countdown.
 * @param {Object} parts - Parts of the countdown (days, hours, minutes, seconds).
 */
function getRemainingTime(targetDate, parts) {
    // Get the current date and time
    const now = new Date();

    // Calculate the time difference between the target date and current date
    const diff = targetDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update HTML elements to display the remaining time
    Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
        const remaining = parts[key].element.querySelector(".number");
        const text = parts[key].element.querySelector(".text");
        remaining.innerText = value;
        text.innerText = parts[key].text[Number(value === 1)];

        // Update dot visibility based on the remaining time
        const dots = parts[key].element.querySelectorAll(".dot");
        dots.forEach((dot, idx) => {
            dot.dataset.active = idx <= value;
            dot.dataset.lastactive = idx === value;
        });
    });

    // Request animation frame for continuous countdown updates
    window.requestAnimationFrame(() => {
        getRemainingTime(targetDate, parts);
    });
}
