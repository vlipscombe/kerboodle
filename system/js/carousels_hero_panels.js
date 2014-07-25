
extraJQueryFunctions.push(function ($) {

    // Carousel for content blocks

    function createCarousel(container, pageSize, isVertical) {

        if ($(container).find("ul li").length > pageSize) {

            $(container).append("<div class='carousel_pager'></div>");

            var totalItems = $(container).find("ul li").length;
            var currentItem = 1;

            while (currentItem <= totalItems) {
                $(container).find(".carousel_pager").first().append("<a href='#'><span>" + currentItem + "</span></a>");
                currentItem += pageSize;
            }

            if (isVertical == false) {
                $(container).find("ul li").css("width", "153px").css("padding", "8px 4px 8px 3px");
            }

            $(container).find("ul").addClass("jcarousel-skin-tango");

            var parentBlock = container;

            $(container).find("ul").first().jcarousel({
                scroll: pageSize,
                vertical: isVertical,
                initCallback: function (carousel) {
                    $(parentBlock).find(".carousel_pager a").bind("click", function (event) {
                        event.preventDefault();
                        carousel.scroll($.jcarousel.intval($(this).find("span").first().html()));
                    });
                },
                itemLastInCallback: function (carousel, item, index, state) {
                    $(parentBlock).find(".carousel_pager a").removeClass("selected");

                    var selectedFound = false;

                    $($(parentBlock).find(".carousel_pager a").get().reverse()).each(function (event) {
                        if (selectedFound == false) {
                            if (parseInt($(this).find("span").first().html()) <= index) {
                                $(this).addClass("selected");
                                selectedFound = true;
                            }
                        }
                    });
                }
            });
        }
    }

    $(".full_width .carousel").each(function () {
        createCarousel(this, 3, false);
    });

    $(".column_width .carousel").each(function () {
        createCarousel(this, 4, true);
    });

    // Hero panel rotating banners

//DO not use this her panel use the batch 4 one
/*
    $("#hero_panel_container").cycle({
        fade: "fade",
        speed: 1000,
        timeout: 3000,
        pager: "#hero_panel_pager",
        pagerEvent: "mouseover",
        pagerAnchorBuilder: function (index, slide) {
            var bannerURL = $(slide).find("a").first().attr("href");
            var bannerAlt = $(slide).find("img").first().attr("alt");
            var bannerClear = $(slide).find("img").first().attr("src").replace(/_banner/, "_clear");
            var bannerHover = $(slide).find("img").first().attr("src").replace(/_banner/, "_hover");

            var pagerLink = "<a href='" + bannerURL + "'>";
            pagerLink += "<img class='pager_clear' src='" + bannerClear + "' alt='" + bannerAlt + "' />";
            pagerLink += "<img class='pager_hover' src='" + bannerHover + "' alt='" + bannerAlt + "' />";
            pagerLink += "</a>";

            return pagerLink;
        }
    });*/

 	//Taken from oup-extras-scripts.js from batch 4 -Please use this one
    $("#hero_panel_container").cycle({
        fade: "fade",
        speed: 1000,
        timeout: 3000,
        pager: "#hero_panel_pager",
        pagerEvent: "mouseover",
        pagerAnchorBuilder: function (index, slide) {
            var bannerURL = $(slide).find("a").first().attr("href");
            var bannerAlt = $(slide).find("img").first().attr("alt");
			var bannerClear = $(slide).find("input").first().attr("value");
			var bannerHover = $(slide).find("input").last().attr("value");			

            var pagerLink = "<a href='" + bannerURL + "'>";
            pagerLink += "<img class='pager_clear' src='" + bannerClear + "' alt='" + bannerAlt + "' />";
            pagerLink += "<img class='pager_hover' src='" + bannerHover + "' alt='" + bannerAlt + "' />";
            pagerLink += "</a>";

            return pagerLink;
        }
    });

    // Accessiblility features for hero panel pager links (tabbing through links, and following when enter pressed)
    $("#hero_panel_pager a").focusin(function () { $(this).mouseover(); });

    $("#hero_panel_pager a").keydown(function (event) {
        if (event.keyCode == "13") {
            window.location = $(this).attr("href");
        }
    });

});