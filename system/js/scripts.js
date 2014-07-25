Number.prototype.formatMoney = function (c, d, t) {
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

// For linking in scripts from optional files
var extraJQueryFunctions = [];

// jQuery for interactive elements used on all pages
function documentReady($) {

    var userAgentString = navigator.userAgent.toLowerCase();

    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) { //fix for iOS automatically changing text sizes
        $("body").css("-webkit-text-size-adjust", "none");
    }

    if (navigator.userAgent.toLowerCase().indexOf("msie 6") != -1) {

        // IE6 code for primary navigation hover state (without drop-down)
        $("#primary_nav ul").first().children().mouseover(function () { $(this).addClass("menu_hover"); });
        $("#primary_nav ul").first().children().mouseout(function () { $(this).removeClass("menu_hover"); });

        // IE6 code for primary navigation hover state (with drop-down)
        $("#primary_nav li.three_column, #primary_nav li.four_column").mouseover(function () { $(this).addClass("menu_tab_hover"); });
        $("#primary_nav li.three_column, #primary_nav li.four_column").mouseout(function () { $(this).removeClass("menu_tab_hover"); });

        // IE6 code for linking CSS attribute selector replacements
        $(":text").addClass("text");
        $("input[type=email]").addClass("email");
        $(":password").addClass("password");
        $(":submit").addClass("submit");

        // IE6 code to substitute for ignored CSS rules
        $("#page_content .inset_text_block > p:first-child").css("margin-top", "4px");
        $("#page_content .inset_text_block > p:last-child").css("margin-bottom", "4px").after("<div class='clearer'></div>");

        // IE6 code to substitute for misinterpreted combined-class rules
        $(".tech_support_expandable.bg_colour_primary h2.control").addClass("tech_support_heading_primary");
        $(".tech_support_expandable.bg_colour_secondary h2.control").addClass("tech_support_heading_secondary");
    }

    $("a.refresh_page_link").click(function (event) {
        event.preventDefault();
        window.location.reload();
    });

    // Remove and replace the default CSS fallback for showing primary navigation drop-downs
    // Two separate classes are required so that the jquery version can be used with a time delay, without the fallback interfering
    $("#primary_nav ul").first().children().removeClass("menu_default").addClass("menu_jquery");

    var primaryNavTimeout = null;

    // Replace the fallback with jQuery which triggers after a time delay
    $("#primary_nav ul").first().children().hover(
        function () {
            $("#primary_nav ul").first().children().removeClass("menu_hover");

            $(this).addClass("menu_hover");

            if (($(this).hasClass("three_column") == true) || ($(this).hasClass("four_column") == true)) {
                // On IE6 the default :hover CSS does not work, so the hover class is added immediately
                if (userAgentString.indexOf("msie 6") != -1) {
                    $(this).addClass("menu_tab_hover");
                } else {
                    var listElement = $(this);
                    primaryNavTimeout = window.setTimeout(function () { $(listElement).addClass("menu_tab_hover"); }, 500);
                }
            }
        },
        function () {

            if (primaryNavTimeout != null) {
                window.clearTimeout(primaryNavTimeout);
                primaryNavTimeout = null;
            }

            $(this).removeClass("menu_hover");
            $(this).removeClass("menu_tab_hover");
        }
    );

    // Opens drop-downs when tabbing through primary navigation
    $("#primary_nav li.three_column, #primary_nav li.four_column").each(function () {

        var resetTimeout = null;
        var listElement = this;

        function resetDropDown() {

            $(listElement).removeClass("menu_tab_focus");

            window.clearTimeout(resetTimeout);
            resetTimeout = null;

            $(this).find("a").first().focus();
        }

        $(this).find("a").focusin(function () {

            if ($(this).parents("li.three_column, li.four_column").hasClass("menu_tab_focus") == false) {
                $(this).parents("li.three_column, li.four_column").addClass("menu_tab_focus");
            }

            if (resetTimeout != null) {
                window.clearTimeout(resetTimeout);
            }
            resetTimeout = window.setTimeout(resetDropDown, 5000);
        });

        $(this).find("a").last().focusout(function () {

            $(this).parents("li.three_column, li.four_column").removeClass("menu_tab_focus");

            window.clearTimeout(resetTimeout);
            resetTimeout = null;
        });
    });

    // Submit buttons for search filters (e.g. on Oxford Reading Tree page) are hidden, but still used to trigger the update of the search results for convenience.
    $(".filters .submit_button").css("display", "none");

    if ($(".filters input, .filters select").length > 0) {
        if (navigator.userAgent.toLowerCase().indexOf("msie 6") != -1) {
            $("body").css({ "height": "100%" });
        }

        $("body").append("<div class='transparent_overlay' /><div class='spinner' />");
        $(".transparent_overlay").css("opacity", "0.6");
    }

    $(".filters input, .filters select").change(function () {
        $(this).parents(".filters").first().find(".submit_button").first().click();

        if (navigator.userAgent.toLowerCase().indexOf("msie 6") != -1) {
            $("html").first().scrollTop(0);
        }

        $(".transparent_overlay, .spinner").fadeIn(100);
    });

    // 'Add to basket' button functionality
    //$(".action_container").each(function () {
    //    var actionContainer = $(this);
	//
    //    $(actionContainer).find(".action_trigger input:submit").click(function () {
    //        $(actionContainer).find(".action_trigger").hide();
    //        $(actionContainer).find(".action_response").show();
    //    });
    //});
	$(".action_container").each(function () {
		var actionContainer = $(this);
		$(actionContainer).find(".action_trigger input:submit").each(function () {
			var actionButton = $(this);
			var name = actionButton.attr("name");
			if (name.indexOf('evaluate') == -1) {
				actionButton.click(function () {
					addToBasket(actionContainer);
				});
			}
			else {
				actionButton.click(function () {
					evaluateProduct(actionContainer);
				});
			}
		});
	}); 

    // Showing and hiding & disabling elements for when javascript is enabled
    $(".js_hide").hide();
    $(".js_show").show();
    $(".js_disable").prop("disabled", true);
    
    // Used by IE6, to provide a substitute class for ignored 'disabled' CSS rules
    $("input.form_submit[disabled]").each(function () {
        $(this).addClass("submit_disabled");
    });

    // Run any optional scripts which have been included
    if (extraJQueryFunctions.length > 0) {
        for (var i = 0; i < extraJQueryFunctions.length; i++) {
            extraJQueryFunctions[i]($);
        }
    }
}

function windowLoaded($) {

    // To use this, add a div with class 'equal_height_row' around a set of half-width content blocks
    function equaliseBlockHeight() {

        $(".equal_height_row").each(function () {

            var maxHeight = 0;

            $(this).find(".enclosed .inner_block").each(function () {
                if ($(this).height() > maxHeight) { maxHeight = $(this).height() }
            });

            if (maxHeight <= 0) { return; }

            $(this).find(".enclosed .inner_block").each(function () {
                if ($(this).find(".review_list").length > 0) {
                    $(this).css("min-height", maxHeight + "px");
                }

                $(this).height(maxHeight);
            });
        });
    }

    equaliseBlockHeight();

    function equaliseImageHeight() {

        // Loops through all full-width content blocks with columns that contain images above a block of text,
        // and sets all of the image containers to the height of the tallest one
        $(".full_width .image_text_columns").each(function () {

            var maxHeight = 0;

            $(this).find(".image").each(function () {
                if ($(this).height() > maxHeight) { maxHeight = $(this).height() }
            });

            if (maxHeight <= 0) { return; }

            $(this).find(".image").each(function () {
                $(this).height(maxHeight);
            });

            // Fixes IE7 bug where height of content block container is incorrect (bottom of block is cut off)
            if (maxHeight > 0) {
                $(this).parent(".content_block").append("<div class='clearer'></div>");
            }
        });
    }

    equaliseImageHeight();

    // Fixes above mentioned IE7 bug for vertical carousels
    $(".column_width .carousel").each(function () {
        $(this).parent(".content_block").append("<div class='clearer'></div>");
    });
	
	$("#search_input").keyup(function() {
		var input = $("#search_input").val();
		if(input.length > 2) {
			getSugestion(input);
		} else {
			$("#suggestion").removeClass("diplaysuggestion");
			$("#suggestion").addClass("hidesuggestion");		
		}
	});

	$("#account_post_code").keyup(function() {
		var input = $("#account_post_code").val();
		if(input.length >= 2) {
			getSuggestion(input);
		} else {
			$("#postcodeSuggestion").removeClass("diplaysuggestion");
			$("#postcodeSuggestion").addClass("hidesuggestion");		
		}
	});

	$("#school_city_name").keyup(function() {
		var input = $("#school_city_name").val();
		var cc = $("#country").val();
		
		if(input.length > 2 && cc.length == 2) {
			getCityNameSuggestion(input, cc);
		} else {
			$("#nameCitySuggestion").removeClass("diplaysuggestion");
			$("#nameCitySuggestion").addClass("hidesuggestion");		
		}
	});
		
	$("#suggestion").find("li").live('click',function() {
		$("#search_input").val($(this).text());
		$("#suggestion").removeClass("diplaysuggestion");
		$("#suggestion").addClass("hidesuggestion");
		submitForm("masthead_search");
	});

	$("#suggestion").find("li").live('mouseenter',function() {
		$(this).addClass("highlight");
	});	
	
	$("#suggestion").find("li").live('mouseleave',function() {
		$(this).removeClass("highlight");
	});

	$("#postcodeSuggestion").find("li").live('click',function() {
		$("#account_post_code").val($(this).text());
		$("#postcodeSuggestion").removeClass("diplaysuggestion");
		$("#postcodeSuggestion").addClass("hidesuggestion");
		submitForm("postcode_search");
	});

	$("#postcodeSuggestion").find("li").live('mouseenter',function() {
		$(this).addClass("highlight");
	});	
	
	$("#postcodeSuggestion").find("li").live('mouseleave',function() {
		$(this).removeClass("highlight");
	});

	$("#nameCitySuggestion").find("li").live('click',function() {
		$("#school_city_name").val($(this).text());
		$("#nameCitySuggestion").removeClass("diplaysuggestion");
		$("#nameCitySuggestion").addClass("hidesuggestion");
		submitForm("city_schoolname_search");
	});

	$("#nameCitySuggestion").find("li").live('mouseenter',function() {
		$(this).addClass("highlight");
	});	
	
	$("#nameCitySuggestion").find("li").live('mouseleave',function() {
		$(this).removeClass("highlight");
	});
	
	$("body").click(
		function(event) {
			if (!$(event.target).parent().parent().hasClass('diplaysuggestion')) {			
				$("#suggestion").removeClass("diplaysuggestion");
				$("#suggestion").addClass("hidesuggestion");
				$("#postcodeSuggestion").removeClass("diplaysuggestion");
				$("#postcodeSuggestion").addClass("hidesuggestion");
				$("#nameCitySuggestion").removeClass("diplaysuggestion");
				$("#nameCitySuggestion").addClass("hidesuggestion");
			}
		}
	);
}