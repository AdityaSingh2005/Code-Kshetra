var eventStartDate = new Date("Feb 10, 2024 00:00:00").getTime();
var eventEndDate = new Date("Feb 11, 2024 00:00:00").getTime();

// Update the countdown every 1 second
var x = setInterval(function () {
    var now = new Date().getTime();

    // Check if the current date is before the event
    if (now < eventStartDate) {
        var distance = eventStartDate - now;
        displayCountdown(distance);
    } else if (now <= eventEndDate) {
        // Event is ongoing
        document.getElementById("countdown").innerHTML = "<p>Event is happening now!</p>";
    } else {
        // Event has ended
        document.getElementById("countdown").innerHTML = "<p>Event has ended!</p>";
        clearInterval(x);
    }
}, 1000);

// Helper function to display countdown
function displayCountdown(distance) {
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = formatTime(days);
    document.getElementById("hours").innerHTML = formatTime(hours);
    document.getElementById("minutes").innerHTML = formatTime(minutes);
    document.getElementById("seconds").innerHTML = formatTime(seconds);
}

// Helper function to add leading zero to single-digit numbers
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}
