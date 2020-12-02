$("#currentDay").text(dayjs().format("dddd, MMMM DD, YYYY"));
$("#currentTime").text(dayjs().format("hh:mm:ss a"));

setInterval(function() {
    $("#currentTime").text(dayjs().format("hh:mm:ss a"));
}, 10);

// let hour = 12;
let hour = dayjs().hour();
let scheduleList = $(".row");

scheduleList.each(function() {
    if (parseInt(this.id) < hour) {
        $(this).children(".col-8").addClass("past");
    } else if (parseInt(this.id) === hour) {
        $(this).children(".col-8").addClass("present");
    } else if (parseInt(this.id) > hour) {
        $(this).children(".col-8").addClass("future");
    }
});

