function rotate(element, degree) {              // todo: refactor logic
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
        drawAngle = x / outOf * 360;  // caluclate the angle


    // calculate the angle to be displayed if each half
    if (drawAngle <= 180) {
        firstHalfAngle = drawAngle;
    } else {
        secondHalfAngle = drawAngle - 180;
    }

    // set the transition
    rotate(elem.find(".slice1"), firstHalfAngle);
    rotate(elem.find(".slice2"), secondHalfAngle);

    // set the values on the text
    if (x === 60) {
        x = 0;
    }
    elem.find(".status").html(x);
}

$(document).ready(function () {
    var pie1 = $('.pie-1'),
        pie2 = $('.pie-2'),
        pie3 = $('.pie-3'),
        t = 1;
    //progressBarUpdate(10, 100, pie1);
    progressBarUpdate(65, 100, pie2);
    progressBarUpdate(100, 100, pie3);
    setInterval(function () {
        progressBarUpdate(t, 60, pie1);
        (t < 60) ? t++ : t = 1;
    }, 1000);
});