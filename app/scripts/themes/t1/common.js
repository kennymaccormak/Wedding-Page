function scrollTo() {
    var link = $(this).find(".nav__item--link"),
        linkHref = link.attr("href"),
        scroll = $("a[name='" + linkHref + "']").offset().top
    ;

    $("html, body").animate({
        scrollTop: scroll
    }, 1500);
}

function formValidation(formId) {
    var form = formId,
        status = [],
        response = true,
        formComponents = {
            inputs: form.find("input"),
            textarea: form.find("textarea")
        }
    ;

    if (formComponents.inputs.length !== 0) {
        formComponents.inputs.each(function () {
            if ($(this).data("type") === "text" || $(this).data("type") === "phone") {
                if ($(this).val() === "") {
                    status.push(false);
                    $(this).addClass("validation-error");
                } else {
                    status.push(true);
                    $(this).removeClass("validation-error");
                }
            } else if ($(this).data("type") === "select") {
                if ($(this).val() === "") {
                    status.push(false);
                    $(this).closest(".select").addClass("validation-error");
                } else {
                    status.push(true);
                    $(this).closest(".select").removeClass("validation-error");
                }
            }
        });
    }

    if (formComponents.textarea.length !== 0) {
        formComponents.textarea.each(function () {
            if ($(this).val() === "") {
                status.push(false);
                $(this).addClass("validation-error");
            } else {
                status.push(true);
                $(this).removeClass("validation-error");
            }
        });
    }

    status.forEach(function (status) {
        if (status === false) {
            response = false
        }
    });

    return response;
}

function inicializeModalGallery() {
    var img = $(this),
        modal = $("#photoGalleryModal"),
        modalCloseBtn = modal.find(".button--close-modal"),
        modalTitle = modal.find(".modal-title"),
        chosenPhoto = modal.find(".chosen-photo__img"),
        chosenGroup = modal.find(".chosen-group__items"),
        chosenGroupItem = null,
        currentGalleryItems = $(".photo-gallery__group--active").find(".photo-gallery__img")
    ;

    modalTitle.text($(".photo-gallery__title--active").text());

    currentGalleryItems.each(function () {
        chosenGroup.append($("<div>", {
            "class": "chosen-group__item",
            html: $("<img>", {
                "class": "chosen-group__img",
                "src": $(this).attr("src")
            })
        }).click(setPhoto));
    });

    function setChosenPhoto(param) {
        chosenPhoto.attr("src", param.attr("src"));
    }

    function getCount(param) {
        var count = 0;
        currentGalleryItems.each(function () {
            if ($(this).attr("src") === param.attr("src")) {
                count = currentGalleryItems.index($(this));
                if (count > currentGalleryItems.length - 3) {
                    count = currentGalleryItems.length - 3
                }
            }
        });
        return count;
    }

    function positioningGroupPhotos(count, isAnimated) {
        var left = 0;

        if (count !== 0) {
            left = count * (-220);
        }

        chosenGroup.find(".chosen-group__item").each(function () {
            if (isAnimated) {
                $(this).animate({"left": left}, 500);
            } else {
                $(this).css({"left": left});
            }

            if ($(this).find("img").attr("src") === chosenPhoto.attr("src")) {
                $(this).addClass("chosen-group__item--active")
            }
            left += 220;
        })

    }

    function setPhoto() {
        var $this = $(this),
            img = $this.find("img")
        ;
        setChosenPhoto(img);
        chosenGroup.find(".chosen-group__item").each(function () {
            $(this).removeClass("chosen-group__item--active");
        });
        $(this).addClass("chosen-group__item--active");

        positioningGroupPhotos(getCount(img), true);
    }

    setChosenPhoto(img);
    positioningGroupPhotos(getCount(img), false);

    modal.show();

    modalCloseBtn.click(function () {
        $(".chosen-group__item").remove();
    });
}

function MobileMenu(selector) {
    var m = $(this);

    m.menu = $(selector);
    m.button = m.menu.find(".toggle-nav");
    m.mobMenu = m.menu.find(".nav");
    m.mobMenuItem = m.mobMenu.find(".nav__item");

    m.toggle = function () {
        m.button.toggleClass("toggle-nav--active");
        m.mobMenu.toggleClass("nav--active");
    };

    m.button.click(m.toggle);
    m.mobMenuItem.click(scrollTo);
    m.mobMenuItem.click(m.toggle);
}

function DesktopMenu(selector) {
    var m = $(this);

    m.menu = $(selector);
    m.deskMenuItem = m.menu.find(".nav__item");

    m.deskMenuItem.click(scrollTo);
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
    g.showMoreBtn = g.showMoreBtnWrap.find(".button");

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

    s.slides.first().addClass("time-and-place__place--active");
    s.navItems.first().addClass("time-and-place-button--active");

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

function Modal(selector) {
    var m = $(this);

    m.modal = $(selector);
    m.btnClose = m.modal.find(".button--close-modal");

    m.closeModal = function () {
        $(this).closest(".modal").hide();
    };

    m.btnClose.click(m.closeModal);
}

function Form(selector) {
    var f = $(this);

    f.form = $(selector);
    f.btnSubmit = f.form.find(".button");
    f.inputsText = f.form.find("input[data-type=\"text\"]");
    f.inputsPhone = f.form.find("input[data-type=\"phone\"]");

    f.filteredInputsText = function () {
        var input = $(this),
            value = input.val()
        ;

        if (value.match(/[0-9]/g))
            input.val(value.replace(/[0-9]/g, ''));
    };

    f.filteredInputsPhone = function () {
        var input = $(this),
            value = input.val(),
            len = value.length
        ;

        if (value.match(/[^0-9]/g))
            input.val(value.replace(/[^0-9]/g, ''));
        if (len > 10)
            input.val(value.substring(0, 10));
    };

    f.submitForm = function (event) {
        if (formValidation(f.form)) {
            f.form.submit();
        }
    };

    f.inputsText.on('change keyup input click', f.filteredInputsText);
    f.inputsPhone.on('change keyup input click', f.filteredInputsPhone);
    f.btnSubmit.click(function (event) {
        event.preventDefault();
        f.submitForm()
    });

}

function Guest(selector) {
    var g = $(this);

    g.guests = $(selector);
    g.guest = g.guests.find(".guest");
    g.showMoreBtnWrap = g.guests.find(".guests-buttons");
    g.showMoreBtn = g.guests.find(".button");

    g.showMoreImgs = function () {
        g.guest.css({"display": "block"});
        g.showMoreBtnWrap.css({"display": "none"});
    };

    g.showMoreBtn.click(g.showMoreImgs);
}

function PhotoGallery(selector) {
    var pg = $(this);

    pg.gallery = $(selector);
    pg.titles = pg.gallery.find(".photo-gallery__title");
    pg.photoGalleryGroup = pg.gallery.find(".photo-gallery__group");
    pg.imgs = pg.gallery.find(".photo-gallery__img");

    pg.changeGalleryGroup = function () {
        var $this = $(this),
            dataVal = $this.data("galleryGroup")
        ;

        pg.titles.each(function () {
            $(this).removeClass("photo-gallery__title--active")
        });

        $this.addClass("photo-gallery__title--active");

        pg.photoGalleryGroup.each(function () {
            if ($(this).data("galleryGroup") === dataVal) {
                $(this).css({"display": "block"});
                $(this).addClass("photo-gallery__group--active");
            } else {
                $(this).css({"display": "none"});
                $(this).removeClass("photo-gallery__group--active");
            }
        });
    };

    pg.titles.click(pg.changeGalleryGroup);
    pg.imgs.click(inicializeModalGallery);

    var modalGallery = new ModalGallery(".modal-gallery");
}

function ModalGallery(selector) {
    var mg = $(this);
    var photoIndex = 0,
        count = 0
    ;

    mg.gallery = $(selector);
    mg.prevPhotoBtn = mg.gallery.find(".chosen-group .button-control--prev");
    mg.nextPhotoBtn = mg.gallery.find(".chosen-group .button-control--next");
    mg.currentImg = mg.gallery.find(".chosen-photo__img");
    mg.allItemImg = mg.gallery.find(".chosen-group__item");
    mg.imgArray = mg.gallery.find(".chosen-group__img");

    mg.positioningImgInGroup = function (action, index) {
        // true = move left
        // false = move right
        var left = 0,
            allItemImg = $(".chosen-group__item"),
            allItemImgLength = allItemImg.length,
            $img = $(allItemImg[index])
        ;

        if (allItemImg.is(":animated")) {
            return
        }

        left = parseInt($img.css("left"));
        var firstElementLeft = parseInt(allItemImg.first().position().left);
        var lastElementLeft = parseInt(allItemImg.last().position().left);
        console.log("index: ", index);
        allItemImg.each(function () {
            if (action) {
                if (lastElementLeft === 440 && index === 0) {
                    left = parseInt($(this).position().left) - ((allItemImgLength - 3) * -220);
                    $(this).animate({"left": left}, 500);
                } else if (lastElementLeft !== 440) {
                    left = $(this).position().left - 220;
                    $(this).animate({"left": left}, 500);
                }
            } else {
                if (firstElementLeft === 0 && index > 2) {
                    left = parseInt($(this).position().left) - ((allItemImgLength - 3) * 220);
                    $(this).animate({"left": left}, 500);
                } else if (firstElementLeft !== 0) {
                    left = $(this).position().left + 220;
                    $(this).animate({"left": left}, 500);
                }
            }
        });
    };

    mg.setNextPhoto = function () {
        var btn = $(this),
            allItemImg = $(".chosen-group__item"),
            allItemImgLength = allItemImg.length,
            currentImgInGroup = $(".chosen-group__item--active"),
            index = allItemImg.index(currentImgInGroup),
            nextImgInGroup = (index === (allItemImgLength-1))
                ? allItemImg.first()
                : currentImgInGroup.next(),
            left = 0
        ;
        if (allItemImg.is(":animated")) {
            return
        }
        mg.currentImg.attr("src", nextImgInGroup.find("img").attr("src"));

        currentImgInGroup.removeClass("chosen-group__item--active");
        nextImgInGroup.addClass("chosen-group__item--active");

        mg.positioningImgInGroup(true, allItemImg.index(nextImgInGroup));
    };

    mg.setPrevPhoto = function () {
        var btn = $(this),
            allItemImg = $(".chosen-group__item"),
            currentImgInGroup = $(".chosen-group__item--active"),
            index = allItemImg.index(currentImgInGroup),
            prevImgInGroup = (index === 0)
                ? allItemImg.last()
                : currentImgInGroup.prev(),
            left = 0
        ;
        if (allItemImg.is(":animated")) {
            return
        }
        mg.currentImg.attr("src", prevImgInGroup.find("img").attr("src"));

        currentImgInGroup.removeClass("chosen-group__item--active");
        prevImgInGroup.addClass("chosen-group__item--active");

        mg.positioningImgInGroup(false, allItemImg.index(prevImgInGroup));
    };

    mg.prevPhotoBtn.click(mg.setPrevPhoto);
    mg.nextPhotoBtn.click(mg.setNextPhoto);
}

$(function () {
    var mobMenu = new MobileMenu(".mobile-header"),
        deskMenu = new DesktopMenu(".header"),
        timer = new Timer(".date-timer"),
        gallery = new Gallery("#relatives"),
        placesSlider = new PlacesSlider(".time-and-place"),
        select = new Select("#select1"),
        guest = new Guest(".guests-block"),
        photoGallery = new PhotoGallery(".photo-gallery"),
        form1 = new Form("#interviewForm"),
        form2 = new Form("#sendWishesModalForm"),
        modal1 = new Modal("#sendWishesModal"),
        modal2 = new Modal("#photoGalleryModal")
    ;


    $("#sendWishesButton").click(function () {
        $("#sendWishesModal").show();
    });

    $(window).resize(function () {
        if ($(window).width() < 1000) {
            $("#photoGalleryModal").hide();
            $(".chosen-group__item").remove();
        }
    });

    if ($(window).width() < 1000) {
        $("#photoGalleryModal").hide();
        $(".chosen-group__item").remove();
    }

    /*inicialize slick slider*/
    $('.wishes-slider').slick({
        dots: true
    });
});