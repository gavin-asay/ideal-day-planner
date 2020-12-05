//day.js used as alternative to moment.js
$("#currentDay").text(dayjs().format("dddd, MMMM DD, YYYY"));
$("#currentTime").text(dayjs().format("hh:mm:ss a"));

// clock interval function
setInterval(function() {
    $("#currentTime").text(dayjs().format("hh:mm:ss a"));
}, 1000);

let savedTasks = {};
let hour = dayjs().hour();
let scheduleList = $(".row");

// each .row element has an ID corresponding to the hour it represents
// highlight() compares that ID with the current hour to apply the past, present, future classes
let highlight = function() {
    if (parseInt(this.id) < hour) {
        $(this).children(".col-8").removeClass("past present future").addClass("past");
    } else if (parseInt(this.id) === hour) {
        $(this).children(".col-8").removeClass("past present future").addClass("present");
    } else if (parseInt(this.id) > hour) {
        $(this).children(".col-8").removeClass("past present future").addClass("future");
    }
}

// current hour is checked every 10 minutes and refreshes highlight() as needed
setInterval(function() {
    scheduleList.each(highlight);
    $("#currentDay").text(dayjs().format("dddd, MMMM DD, YYYY"));
}, 1000 * 60 * 10);

let taskSave = function() {
    savedTasks = {
        // property names likewise correspond to .row IDs
        8: $("#8 > .col-8").text().trim(),
        9: $("#9 > .col-8").text().trim(),
        10: $("#10 > .col-8").text().trim(),
        11: $("#11 > .col-8").text().trim(),
        12: $("#12 > .col-8").text().trim(),
        13: $("#13 > .col-8").text().trim(),
        14: $("#14 > .col-8").text().trim(),
        15: $("#15 > .col-8").text().trim(),
        16: $("#16 > .col-8").text().trim(),
        17: $("#17 > .col-8").text().trim(),
        18: $("#18 > .col-8").text().trim()
    };
 
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

let taskLoad = function() {
    savedTasks = JSON.parse(localStorage.getItem("tasks"));

    for (let i = 8; i < 19; i++) {
        $("#" + i).children(".schedule-text").html("<p>" + savedTasks[i] + "</p>");
    }
}

let clickHandler = function(event) {
    // function handles both clicking on text to update and save buttons
    if ($(event.target).hasClass("schedule-text")) {
        let textareaEl = $("<textarea>");
        textareaEl.val($(event.target).text());
        
        $(event.target).children("p").remove();
        $(event.target).append(textareaEl);
        textareaEl.trigger("focus");
    } else if (event.target.matches(".schedule-text > p")) {
        let textareaEl = $("<textarea>");
        textareaEl.val($(event.target).text());

        $(event.target).parent().append(textareaEl);
        $(event.target).remove();
        textareaEl.trigger("focus");
    } else if ($(event.target).hasClass("saveBtn")) {
        // jQuery traverses the DOM to handle match saveBtn with its corresponding textarea
        let targetRow = $(event.target).parent().siblings(".schedule-text");
        if (targetRow.has("textarea").length === 0) {
            return;
        }

        let newText = targetRow.children("textarea").val().trim();
        targetRow.children("textarea").remove();
        targetRow.html("<p>" + newText + "</p>");

        taskSave();
    }
}

scheduleList.each(highlight);
taskLoad();
$(".container").on("click", clickHandler);