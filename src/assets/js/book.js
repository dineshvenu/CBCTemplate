$(document).on('ready', function () {
    // initialization of unfold component
    $.HSCore.components.HSUnfold.init($('[data-unfold-target]'));

    // initialization of select picker
    $.HSCore.components.HSSelectPicker.init('.js-select');

    // initialization of slick carousel
    $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');

    // initialization of malihu scrollbar
    $.HSCore.components.HSMalihuScrollBar.init($('.js-scrollbar'));

    // initialization of show animations
    $.HSCore.components.HSShowAnimation.init('.js-animation-link');

    // init zeynepjs
    var zeynep = $('.zeynep').zeynep({
        onClosed: function () {
            // enable main wrapper element clicks on any its children element
            $("body main").attr("style", "");

            console.log('the side menu is closed.');
        },
        onOpened: function () {
            // disable main wrapper element clicks on any its children element
            $("body main").attr("style", "pointer-events: none;");

            console.log('the side menu is opened.');
        }
    });

    // handle zeynep overlay click
    $(".zeynep-overlay").click(function () {
        zeynep.close();
    });

    // open side menu if the button is clicked
    $(".cat-menu").click(function () {
        if ($("html").hasClass("zeynep-opened")) {
            zeynep.close();
        } else {
            zeynep.open();
        }
    });
});