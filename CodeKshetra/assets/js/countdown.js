// const countdownEls = document.querySelectorAll(".countdown")
// countdownEls.forEach(countdownEl => createCountdown(countdownEl))

// function createCountdown(countdownEl) {
//     const target = new Date(new Date(countdownEl.dataset.targetDate).toLocaleString('en',))
//     const parts = {
//         days: { text: ["days", "day"], dots: 30 },
//         hours: { text: ["hours", "hour"], dots: 24 },
//         minutes: { text: ["minutes", "minute"], dots: 60 },
//         seconds: { text: ["seconds", "second"], dots: 60 },
//     }

//     Object.entries(parts).forEach(([key, value]) => {
//         const partEl = document.createElement("div");
//         partEl.classList.add("part", key);
//         partEl.style.setProperty("--dots", value.dots);
//         value.element = partEl;

//         const remainingEl = document.createElement("div");
//         remainingEl.classList.add("remaining");
//         remainingEl.innerHTML = `
//       <span class="number"></span>
//       <span class="text"></span>
//     `
//         partEl.append(remainingEl);
//         for (let i = 0; i < value.dots; i++) {
//             const dotContainerEl = document.createElement("div");
//             dotContainerEl.style.setProperty("--dot-idx", i);
//             dotContainerEl.classList.add("dot-container")
//             const dotEl = document.createElement("div");
//             dotEl.classList.add("dot")
//             dotContainerEl.append(dotEl);
//             partEl.append(dotContainerEl);
//         }
//         countdownEl.append(partEl);
//     })
//     getRemainingTime(target, parts)
// }

// function getRemainingTime(target, parts, first = true) {
//     const now = new Date()
//     const remaining = {}
//     let seconds = Math.floor((target - (now)) / 1000);
//     let minutes = Math.floor(seconds / 60);
//     let hours = Math.floor(minutes / 60);
//     let days = Math.floor(hours / 24);
//     hours = hours - (days * 24);
//     minutes = minutes - (days * 24 * 60) - (hours * 60);
//     seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
//     Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
//         const remaining = parts[key].element.querySelector(".number");
//         const text = parts[key].element.querySelector(".text");
//         remaining.innerText = value;
//         text.innerText = parts[key].text[Number(value == 1)]
//         const dots = parts[key].element.querySelectorAll(".dot")
//         dots.forEach((dot, idx) => {
//             dot.dataset.active = idx <= value;
//             dot.dataset.lastactive = idx == value;
//         })
//     })
//     if (now <= target) {
//         window.requestAnimationFrame(() => {
//             getRemainingTime(target, parts, false)
//         });
//     }
// }
const countdownEls = document.querySelectorAll(".countdown");
countdownEls.forEach(countdownEl => createCountdown(countdownEl));

function createCountdown(countdownEl) {
    const targetDate = new Date(countdownEl.dataset.targetDate);

    if (isNaN(targetDate)) {
        console.error("Invalid date format");
        return;
    }

    const parts = {
        days: { text: ["days", "day"], dots: 30 },
        hours: { text: ["hours", "hour"], dots: 24 },
        minutes: { text: ["minutes", "minute"], dots: 60 },
        seconds: { text: ["seconds", "second"], dots: 60 },
    };

    Object.entries(parts).forEach(([key, value]) => {
        const partEl = document.createElement("div");
        partEl.classList.add("part", key);
        partEl.style.setProperty("--dots", value.dots);
        value.element = partEl;

        const remainingEl = document.createElement("div");
        remainingEl.classList.add("remaining");
        remainingEl.innerHTML = `
            <span class="number"></span>
            <span class="text"></span>
        `;
        partEl.append(remainingEl);

        for (let i = 0; i < value.dots; i++) {
            const dotContainerEl = document.createElement("div");
            dotContainerEl.style.setProperty("--dot-idx", i);
            dotContainerEl.classList.add("dot-container");
            const dotEl = document.createElement("div");
            dotEl.classList.add("dot");
            dotContainerEl.append(dotEl);
            partEl.append(dotContainerEl);
        }

        countdownEl.append(partEl);
    });

    if (targetDate > new Date()) {
        getRemainingTime(targetDate, parts);
    }
}

function getRemainingTime(targetDate, parts) {
    const now = new Date();

    const diff = targetDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
        const remaining = parts[key].element.querySelector(".number");
        const text = parts[key].element.querySelector(".text");
        remaining.innerText = value;
        text.innerText = parts[key].text[Number(value === 1)];

        const dots = parts[key].element.querySelectorAll(".dot");
        dots.forEach((dot, idx) => {
            dot.dataset.active = idx <= value;
            dot.dataset.lastactive = idx === value;
        });
    });

    window.requestAnimationFrame(() => {
        getRemainingTime(targetDate, parts);
    });
}
