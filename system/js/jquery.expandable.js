
// This is a custom plugin written to be used for the expanding content blocks on the Keep Updated and Expert FAQ pages

(function ($) {

    var expandableMethods = {
        init: function (options) {

            var expandableSettings = $.extend({
                controlClass: ".expand_control", // Applies to the control that triggers opening and closing the element
                contentClass: ".expand_content", // Applies to each block of content
                containerClass: ".expand_container", // Applies to the div around the content blocks, which changes height
                alternateContent: false, // If true then there are two content blocks for the open and closed states, instead of just one for when open
                linkedBlocks: false, // When one element expands, all others are closed
                controlAction: { action: "fadeOut", addedClass: "" }, // Change to be made to the control when element is selected
                heightAdjustment: 0, // Used where animating container block has vertical padding in addition to the height of the content
                speed: 500 // Number of milliseconds that transitions will take
            }, options);

            var allBlocks = this;

            return this.each(function () {

                var container = this;

                $(window).load(function () {

                    var firstHeight = $(container).find(expandableSettings.contentClass).first().height();
                    var lastHeight = $(container).find(expandableSettings.contentClass).last().height();

                    $(container).data("expandable", {
                        expanded: ($(container).hasClass("show_opened")),
                        inProgress: false,
                        settings: expandableSettings,
                        firstHeight: firstHeight,
                        lastHeight: lastHeight
                    });

                    var settings = $(container).data("expandable").settings;

                    if ($(container).data("expandable").expanded == false) {

                        $(container).find(settings.contentClass).last().css("display", "none");

                        if (settings.alternateContent == true) {
                            $(container).find(settings.containerClass).first().height(settings.heightAdjustment + firstHeight);
                        } else {
                            $(container).find(settings.containerClass).first().height(settings.heightAdjustment);
                        }
                    } else {

                        if (settings.alternateContent == true) {
                            $(container).find(settings.contentClass).first().css("display", "none");
                        }

                        $(container).find(settings.containerClass).last().height(settings.heightAdjustment + lastHeight);

                        switch (settings.controlAction.action) {
                            case "fadeOut":
                                $(container).find(settings.controlClass).first().css("display", "none");
                                break;
                            case "addClass":
                                $(container).find(settings.controlClass).first().addClass(settings.controlAction.addedClass);
                                break;
                        }
                    }

                    var selectedContainer = container;

                    $(container).find($(container).data("expandable").settings.controlClass).click(function (event) {
                        event.preventDefault();

                        if ($(selectedContainer).data("expandable").expanded == false) {

                            if ($(selectedContainer).data("expandable").settings.linkedBlocks == true) {

                                for (var i = 0; i < allBlocks.length; i++) {
                                    if (allBlocks.get(i) != selectedContainer) {
                                        expandableMethods.close(allBlocks.get(i));
                                    }
                                }
                            }

                            expandableMethods.expand(selectedContainer);
                        } else {
                            expandableMethods.close(selectedContainer);
                        }
                    });

                    $(container).find($(container).data("expandable").settings.controlClass).focusin(function () { $(this).click(); });

                    if ($(container).hasClass("start_in_expanded_mode"))
                    {
                      expandableMethods.expand(selectedContainer);
                    }
                });
            });
        },

        expand: function (container) {

            if ($(container).data("expandable").inProgress == false) {
                $(container).data("expandable").inProgress = true;
            } else {
                return;
            }

            var settings = $(container).data("expandable").settings;

            function animateControl() {
                switch (settings.controlAction.action) {
                    case "fadeOut":
                        $(container).find(settings.controlClass).first().fadeOut(settings.speed);
                        break;
                    case "addClass":
                        $(container).find(settings.controlClass).first().addClass(settings.controlAction.addedClass);
                        break;
                }
            }

            function animateContainer(newHeight) {
                $(container).find(settings.containerClass).first().animate({ height: newHeight }, settings.speed, function () {
                    $(container).find(settings.contentClass).last().fadeIn(settings.speed, function () {
                        $(container).data("expandable").expanded = true;
                        $(container).data("expandable").inProgress = false;
                    });
                });
            }

            if ($(container).data("expandable").settings.alternateContent == true) {
                $(container).find(settings.contentClass).first().fadeOut(settings.speed, function () {
                    animateControl();
                    animateContainer(settings.heightAdjustment + $(container).data("expandable").lastHeight);
                });
            } else {
                animateControl();
                animateContainer(settings.heightAdjustment + $(container).data("expandable").lastHeight);
            }
        },

        close: function (container) {

            if ($(container).data("expandable").inProgress == false) {
                $(container).data("expandable").inProgress = true;
            } else {
                return;
            }

            var settings = $(container).data("expandable").settings;

            function animateControl() {
                switch (settings.controlAction.action) {
                    case "fadeOut":
                        $(container).find(settings.controlClass).first().fadeIn(settings.speed);
                        break;
                    case "addClass":
                        $(container).find(settings.controlClass).first().removeClass(settings.controlAction.addedClass);
                        break;
                }
            }

            $(container).find(settings.contentClass).last().fadeOut(settings.speed, function () {
                animateControl();

                if ($(container).data("expandable").settings.alternateContent == true) {
                    var newHeight = settings.heightAdjustment + $(container).data("expandable").firstHeight;

                    $(container).find(settings.containerClass).first().animate({ height: newHeight }, settings.speed, function () {
                        $(container).find(settings.contentClass).first().fadeIn(settings.speed, function () {
                            $(container).data("expandable").expanded = false;
                            $(container).data("expandable").inProgress = false;
                        });
                    });
                } else {
                    var newHeight = settings.heightAdjustment;

                    $(container).find(settings.containerClass).first().animate({ height: newHeight }, settings.speed, function () {
                        $(container).data("expandable").expanded = false;
                        $(container).data("expandable").inProgress = false;
                    });
                }
            });
        }
    };

    $.fn.expandable = function (method) {

        if (expandableMethods[method]) {
            return expandableMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if ((typeof method === "object") || !method) {
                return expandableMethods.init.apply(this, arguments);
            } else {
                $.error("Method " + method + " does not exist on jQuery.expandable");
            }
        }
    };

})(jQuery);