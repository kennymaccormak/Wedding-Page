function rotate(element, degree) {
    element.css({
        '-webkit-transform': 'rotate(' + degree + 'deg)',
        '-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
        'zoom': 1
    });
}

function progressBarUpdate(x, outOf, elem) {
    var firstHalfAngle = 180,
        secondHalfAngle = 0,
        drawAngle = x / outOf * 360;

    if (drawAngle >= 180) {
        firstHalfAngle = drawAngle;
    } else {
        secondHalfAngle = drawAngle - 180;
    }

    rotate(elem.closest(".date-timer__item").find(".slice1"), -firstHalfAngle);
    rotate(elem.closest(".date-timer__item").find(".slice2"), -secondHalfAngle);

    if (x === 60) {
        x = 0;
    }
    elem.find(".date-timer__value").html(x);
}

function Timer(selector) {
    var t = $(this);
    var timerObj = {};
    var timeInterval = null;
    var finalDay = null;

    t.timer = $(selector);
    t.finalDate = $("#finalDate").val();

    t.days = t.timer.find(".date-timer-item--day").find(".date-timer__value");
    t.hours = t.timer.find(".date-timer-item--hours").find(".date-timer__value");
    t.minutes = t.timer.find(".date-timer-item--minutes").find(".date-timer__value");

    t.getTimeLeft = function (finalDate) {
        timerObj.leftDate = Date.parse(finalDate) - Date.parse(new Date());
        timerObj.minutes = Math.floor((timerObj.leftDate / 1000 / 60) % 60);
        timerObj.hours = Math.floor((timerObj.leftDate / (1000 * 60 * 60)) % 24);
        timerObj.days = Math.floor(timerObj.leftDate / (1000 * 60 * 60 * 24));

        if (finalDay === null) {
            finalDay = timerObj.leftDate;
        }

        return timerObj;
    };
    timerObj = t.getTimeLeft(t.finalDate);

    t.setTimeLeft = function () {
        t.getTimeLeft(t.finalDate);
        t.days.text(timerObj.days);
        t.hours.text(timerObj.hours);
        t.minutes.text(('0' + timerObj.minutes).slice(-2));

        progressBarUpdate(timerObj.minutes, 60, t.minutes);
        progressBarUpdate(timerObj.hours, 24, t.hours);
        progressBarUpdate(timerObj.leftDate, finalDay, t.days);

        if (timerObj.leftDate <= 0) {
            clearInterval(timeInterval);
            t.days.text("00");
            t.hours.text("00");
            t.minutes.text("00");
        }
    };
    t.setTimeLeft();
    timeInterval = setInterval(t.setTimeLeft, 1000);

    console.log("timerObj: ", timerObj);
}

$(function () {
    var timer = new Timer(".date-timer");
});
