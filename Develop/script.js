$("#currentDay").text(dayjs().format("dddd, MMMM DD, YYYY"));
$("#currentTime").text(dayjs().format("hh:mm:ss a"));

setInterval(function() {
    $("#currentTime").text(dayjs().format("hh:mm:ss a"));
}, 1000);

// let hour = 12;
let savedTasks = {};
let hour = dayjs().hour();
let minute = dayjs().minute();
let scheduleList = $(".row");
let scheduleText = $(".schedule-text").text();
// scheduleList[0]['children'][1]['textContent'];

let highlight = function() {
    if (parseInt(this.id) < hour) {
        $(this).children(".col-8").removeClass("past present future").addClass("past");
    } else if (parseInt(this.id) === hour) {
        $(this).children(".col-8").removeClass("past present future").addClass("present");
    } else if (parseInt(this.id) > hour) {
        $(this).children(".col-8").removeClass("past present future").addClass("future");
    }
}

scheduleList.each(highlight);

setInterval(function() {
    scheduleList.each(highlight);
}, 1000 * 60 * 10);

let taskSave = function() {
    savedTasks = {
        8: $("#8 > .col-8").text(),
        9: $("#9 > .col-8").text(),
        10: $("#10 > .col-8").text(),
        11: $("#11 > .col-8").text(),
        12: $("#12 > .col-8").text(),
        13: $("#13 > .col-8").text(),
        14: $("#14 > .col-8").text(),
        15: $("#15 > .col-8").text(),
        16: $("#16 > .col-8").text(),
        17: $("#17 > .col-8").text(),
        18: $("#18 > .col-8").text()
    };
 
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

let taskLoad = function() {
    savedTasks = JSON.parse(localStorage.getItem("tasks"));
}

let clickHandler = function(event) {
    if ($(event.target).hasClass("schedule-text")) {
        let textareaEl = $("<textarea>");
        textareaEl.val($(event.target).text());
        
        $(event.target).text("");
        $(event.target).append(textareaEl);
    } else if ($(event.target).hasClass("saveBtn")) {
        // debugger;
        let targetRow = $(event.target).parent().siblings(".schedule-text");
        // if (targetRow.has("textarea").length === 0) {
        //     return;
        // }

        let newText = targetRow.children("textarea").val().trim();
        targetRow.children("textarea").remove();
        targetRow.text(newText);

        taskSave();
    }
}

taskLoad();
$(".container").on("click", clickHandler);