function toggleNavigation(selector) {
    var s = $(this);

    s.header = $(selector);
    s.navButton = s.header.find(".toggle-nav");
    s.navigation = s.header.find(".mobile-header__nav");

    s.toggle = function () {
        s.navigation.toggleClass("mobile-header__nav--active");
        s.navButton.toggleClass("toggle-nav--active");
    };

    s.navButton.click(s.toggle);

}

function Timer(selector) {
    var t = $(this);
    var timerObj = {};
    var timeInterval = null;

    t.timer = $(selector);
    t.finalDate = t.timer.find(".date-timer-final-date").attr("data-final-date");
    t.days = t.timer.find(".time-left__time--days");
    t.hours = t.timer.find(".time-left__time--hours");
    t.minutes = t.timer.find(".time-left__time--minutes");
    t.seconds = t.timer.find(".time-left__time--seconds");


    t.getTimeLeft = function (finalDate) {
        timerObj.leftDate = Date.parse(finalDate) - Date.parse(new Date());
        timerObj.seconds = Math.floor((timerObj.leftDate / 1000) % 60);
        timerObj.minutes = Math.floor((timerObj.leftDate / 1000 / 60) % 60);
        timerObj.hours = Math.floor((timerObj.leftDate / (1000 * 60 * 60)) % 24);
        timerObj.days = Math.floor(timerObj.leftDate / (1000 * 60 * 60 * 24));

        return timerObj;
    };
    timerObj = t.getTimeLeft(t.finalDate);

    t.setTimeLeft = function () {
        t.getTimeLeft(t.finalDate);
        t.days.text(timerObj.days);
        t.hours.text(timerObj.hours);
        t.minutes.text(timerObj.minutes);
        t.seconds.text(('0' + timerObj.seconds).slice(-2));

        if (timerObj.leftDate <= 0) {
            clearInterval(timeInterval);
            t.days.text("00");
            t.hours.text("00");
            t.minutes.text("00");
            t.seconds.text("00");
        }
    };
    t.setTimeLeft();
    timeInterval = setInterval(t.setTimeLeft, 1000);

}

function Gallery(selector) {
    var g = $(this);

    g.galery = $(selector);
    g.galeryGroups = g.galery.find(".gallery-group");
    g.showMoreBtnWrap = g.galery.find(".gallery-buttons");
    g.showMoreBtn = g.showMoreBtnWrap.find(".gallery-button--show-more");

    g.showMoreImgs = function () {
        g.galeryGroups.css({"display": "block"});
        g.showMoreBtnWrap.css({"display": "none"});
    };

    g.showMoreBtn.click(g.showMoreImgs);
}

function PlacesSlider(selector) {
    var s = $(this);
    var count = 0;

    s.slider = $(selector);
    s.nav = s.slider.find(".time-and-place__menu");
    s.navItems = s.nav.find(".time-and-place__button");
    s.slides = s.slider.find(".time-and-place__place");

    s.changeSlide = function () {
        var event = $(this).data("event");

        s.slides.each(function () {
            $(this).removeClass("time-and-place__place--active");
        });
        $("#" + event).addClass("time-and-place__place--active");

        s.navItems.each(function () {
            $(this).removeClass("time-and-place-button--active");
        });
        $(this).addClass("time-and-place-button--active");

    };

    s.navItems.click(s.changeSlide);
}

function Select(selector) {
    var s = $(this);

    s.selectInput = $(selector);
    s.toggleBtn = s.selectInput.find(".select__button");
    s.chosenItem = s.selectInput.find(".select__chosen-item");
    s.dropDownItem = s.selectInput.find(".drop-down-list__item");
    s.hiddenInput = s.selectInput.find("#presence");

    s.toggleDropDownList = function () {
        s.selectInput.toggleClass("select--active");
    };

    s.choose = function () {
        s.hiddenInput.val($(this).text());
        s.chosenItem.text($(this).text());
        s.toggleDropDownList();
    };

    s.toggleBtn.click(s.toggleDropDownList);
    s.dropDownItem.click(s.choose);
}

$(function () {
    toggleNavigation(".mobile-header");
    var timer1 = new Timer("#marriedDate");
    var gallery1 = new Gallery("#relatives");
    var placesSlider = new PlacesSlider(".time-and-place");
    var select1 = new Select("#select1");

    function setActivePlacesSlide() {
        var slides = $(".time-and-place__place");
        var slideNavBtn = $(".time-and-place__button");
        slides.first().addClass("time-and-place__place--active");
        slideNavBtn.first().addClass("time-and-place-button--active");
    }

    setActivePlacesSlide();
    $('.wishes-slider').slick({
        dots: true
    });

});
