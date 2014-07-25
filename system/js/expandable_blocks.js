extraJQueryFunctions.push(function ($) {

    // Script to use custom 'Expandable' jQuery plugin on Keep Updated and Author FAQ pages

    if (navigator.userAgent.toLowerCase().indexOf("msie 6") != -1) {
        // IE6 code to substitute for ignored CSS rules on Keep Updated tables
        $("table.keep_updated_links tr td:first-child").addClass("image_column");
        $("table.keep_updated_links tr td:last-child").addClass("text_column");

        $(".faq_expandable .question_answer").each(function () { $(this).find("p").first().addClass("first"); });
    }

    if ((navigator.userAgent.toLowerCase().indexOf("msie 6") != -1) || (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1)) {
        // IE6/7 code to substitute for ignored CSS rules on Keep Updated tables
        $("table.keep_updated_links tr:last-child").addClass("last_row");
    }

    $(".keep_updated_expandable, .tech_support_expandable").expandable({
        controlClass: "h2.control", // Applies to the control that triggers opening and closing the element
        contentClass: ".inset_text_block", // Applies to each block of content
        containerClass: ".inner_block", // Applies to the div around the content blocks, which changes height
        controlAction: { action: "addClass", addedClass: "selected" }, // Change to be made to the control when element is selected
        linkedBlocks: true, // When one element expands, all others are closed
        heightAdjustment: 0 // Used where animating container block has vertical padding in addition to the height of the content
    });

    $(".faq_expandable").expandable({
        controlClass: ".control_wrapper",
        contentClass: ".question_answer",
        containerClass: ".question_container",
        controlAction: { action: "addClass", addedClass: "selected" },
        speed: 100 // Determines speed of all transitions
    });

    // Script for expanding lists to show more items using 'Read more' links on series pages

  /*  $(".series_list, .review_list").each(function () {

        if ($(this).hasClass("series_list")) {
            var closed_item_total = 3;
        } else {
            var closed_item_total = 1;
        }

        var closedHeight = 0;
        var openHeight = $(this).find("ul").first().height();

        $(this).find("ul").first().find("li").each(function () {

            if ($(this).parent("ul").find("li").index($(this)) < closed_item_total) {
                closedHeight += $(this).height() + 5; // Adjust this if the padding on the list items changes
            } else {
                $(this).css("display", "none");
            }
        });

        $(this).find(".series_list_control, .review_list_control").click(function (event) {

            event.preventDefault();

            if ($(this).hasClass("indented_link_down") == true) {

                if (($(this).parent(".review_list").length > 0) && ($(this).parents(".equal_height_row").length > 0)) {
                    $(this).parents(".inner_block").height("auto");
                }

                $(this).parent(".series_list, .review_list").find("ul").first().animate({ height: openHeight }, 200, function () {
                    $(this).find("li").each(function () {
                        if ($(this).css("display") == "none") {
                            $(this).fadeIn(100);
                        }
                    });
                });

                if ($(this).parent(".series_list").length > 0) {
                    $(this).removeClass("indented_link_down").addClass("indented_link_up").html("<strong>Read less</strong>");
                } else {
                    $(this).removeClass("indented_link_down").addClass("indented_link_up").html("<strong>See fewer reviews</strong>");
                }
            } else {

                $(this).parent(".series_list, .review_list").find("ul").first().find("li").each(function () {
                    if ($(this).parent("ul").find("li").index($(this)) >= closed_item_total) {
                        $(this).fadeOut(100);
                    }
                });

                $(this).parent(".series_list, .review_list").find("ul").first().animate({ height: closedHeight }, 200, function () {
                    if (($(this).parents(".review_list").length > 0) && ($(this).parents(".equal_height_row").length > 0)) {
                        $(this).parents(".inner_block").height($(this).parents(".inner_block").first().css("min-height"));
                    }
                });

                if ($(this).parent(".series_list").length > 0) {
                    $(this).removeClass("indented_link_up").addClass("indented_link_down").html("<strong>Read more</strong>");
                } else {
                    $(this).removeClass("indented_link_up").addClass("indented_link_down").html("<strong>See all reviews</strong>");
                }
            }
        });
    });
    */
    
 // Script to hide 'Read more' links when there are less than 3 list items
    
    var series_list_length = $(".series_list ul li").length;
    if (series_list_length <= 3){
        $(".series_list_control").css("display", "none");
    }
    
    var review_list_length = $(".review_list ul li").length;
    if (review_list_length <= 1){
        $(".review_list_control").css("display", "none");
    }
    
    var look_inside_list_length = $(".look_inside_list ul li").length;
    if (look_inside_list_length <= 6){
        $(".look_inside_control").css("display", "none");
    }
	

        // Script for expanding lists to show more items using 'Read more' links on series pages

    $(".series_list, .review_list, .look_inside_list").each(function () {

        if ($(this).hasClass("review_list")) {
            var closed_item_total = 1;
        } else if ($(this).hasClass("look_inside_list")) {
            var closed_item_total = 6;
        } else {
            var closed_item_total = 3;
        }

        var closedHeight = 0;
        var openHeight = $(this).find("ul").first().height();

        $(this).find("ul").first().find("li").each(function () {

            if ($(this).parent("ul").find("li").index($(this)) < closed_item_total) {
                closedHeight += $(this).height() + 5; // Adjust this if the padding on the list items changes
            } else {
                $(this).css("display", "none");
            }
        });

        $(this).find(".series_list_control, .review_list_control, .look_inside_control").click(function (event) {

            event.preventDefault();

            if ($(this).hasClass("indented_link_down") == true) {

                if (($(this).parent(".review_list").length > 0) && ($(this).parents(".equal_height_row").length > 0)) {
                    $(this).parents(".inner_block").height("auto");
                }

                $(this).parent(".series_list, .review_list, .look_inside_list").find("ul").first().animate({ height: openHeight }, 200, function () {
                    $(this).find("li").each(function () {
                        if ($(this).css("display") == "none") {
                            $(this).fadeIn(100);
                        }
                    });
                });

                if ($(this).parent(".series_list, .review_list, .look_inside_list").length > 0) {
                    $(this).removeClass("indented_link_down").addClass("indented_link_up").html("<strong>Read less</strong>");
                } else {                    
                    $(this).removeClass("indented_link_down").addClass("indented_link_up").html("<strong>"+$("#indented_link_down").val()+"</strong>");
                }
            } else {

                $(this).parent(".series_list, .review_list, .look_inside_list").find("ul").first().find("li").each(function () {
                    if ($(this).parent("ul").find("li").index($(this)) >= closed_item_total) {
                        $(this).fadeOut(100);
                    }
                });

                $(this).parent(".series_list, .review_list, .look_inside_list").find("ul").first().animate({ height: closedHeight }, 200, function () {
                    if (($(this).parents(".review_list").length > 0) && ($(this).parents(".equal_height_row").length > 0)) {
                        $(this).parents(".inner_block").height("auto");
                    }
                });

                if ($(this).parent(".series_list, .review_list, .look_inside_list").length > 0) {
                    $(this).removeClass("indented_link_up").addClass("indented_link_down").html("<strong>Read more</strong>");
                } else {
                    $(this).removeClass("indented_link_up").addClass("indented_link_down").html("<strong>"+$("#indented_link_up").val()+"</strong>");
                }
            }
        });
    });
    

});