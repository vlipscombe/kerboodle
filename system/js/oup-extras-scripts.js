// jQuery for interactive elements used on all pages

    // Hero panel rotating banners
   /* $("#hero_panel_container").cycle({
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
    });*/
	
// remove hero panel as in carousels_hero_panels.js
function switchUNField (elementId, formId, defaultValue) {
		var $elem = $('#'+formId).find('#'+elementId);		
		if(defaultValue) {			
			if($elem.val() == defaultValue) {
				$elem.val("");
			}
		} else {
			$elem.val("");		
		}
	}
	
	function navigateTo(url) {
		window.open(url, '_self');
	}
	
	function submitForm ( formId ) {
		$('#'+formId).submit();
		return false;
	}

	function getSugestion( userData ) {			
		var region = getParameterByName("region");		
		$.ajax({
		  type: "GET",
		  url: "/suggestions.view",
		  data: { search: userData, region: region }
		}).done(function( msg ) {
			var hasSuggestion = false;
			var innerData = "<div><h2>Try these Suggestions</h2></div><ul>";
			myData = JSON.parse(msg, function (key, value) {				
				if(key && value) {
					if(key != "suggestions") {							
							innerData = innerData + "<li>" + value + "</li>";
							hasSuggestion = true;
					}
				}
			});			
			innerData = innerData + "</ul>";
			innerData = innerData + "<div><p><a href='javascript:submitForm(\"masthead_search\");'>See all search results</a></p></div>";
		    if(hasSuggestion) {
				$("#suggestion").html(innerData);
				$("#suggestion").removeClass("hidesuggestion");
				$("#suggestion").addClass("diplaysuggestion");
			}
		});
	}

	function getSuggestion( userData ) {					
		$.ajax({
		  type: "GET",
		  url: "/postcodeSuggestions.view",
		  data: { search: userData }
		}).done(function( msg ) {
			var hasSuggestion = false;
			var innerData = "<div><h2>Try these Suggestions</h2></div><ul>";
			myData = JSON.parse(msg, function (key, value) {				
				if(key && value) {
					if(key != "suggestions") {							
						innerData = innerData + "<li>" + value + "</li>";
						hasSuggestion = true;
					}
				}
			});			
			innerData = innerData + "</ul>";
			innerData = innerData + "<div><p><a href='javascript:submitForm(\"postcode_search\");'>See all search results</a></p></div>";
		    if(hasSuggestion) {
				$("#postcodeSuggestion").html(innerData);
				$("#postcodeSuggestion").removeClass("hidesuggestion");
				$("#postcodeSuggestion").addClass("diplaysuggestion");
			}
		});
	}

	function getCityNameSuggestion( userData, countryCode) {
		//var $elem = $("#city_schoolname_search").find("#country");
		//var country = $elem.val();					
		$.ajax({
			type: "GET",
			url: "/nameCitySuggestions.view",
			data: { search: userData,country: countryCode}
		}).done(function( msg ) {
			var hasSuggestion = false;
			var innerData = "<div><h2>Try these Suggestions</h2></div><ul>";
			myData = JSON.parse(msg, function (key, value) {				
				if(key && value) {
					if(key != "suggestions") {							
						innerData = innerData + "<li>" + value + "</li>";
						hasSuggestion = true;
					}
				}
			});			
			innerData = innerData + "</ul>";
			innerData = innerData + "<div><p><a href='javascript:submitForm(\"city_schoolname_search\");'>See all search results</a></p></div>";
			if(hasSuggestion) {
				$("#nameCitySuggestion").html(innerData);
				$("#nameCitySuggestion").removeClass("hidesuggestion");
				$("#nameCitySuggestion").addClass("diplaysuggestion");
			}
		});
	}
	
	function getParameterByName(name) {		
		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}

  // used on basket pages to show a spinner when updating basket
	function showSpinner() {	
		 if (navigator.userAgent.toLowerCase().indexOf("msie 6") != -1) {
	            $("body").css({ "height": "100%" });
	     }

	     $("body").append("<div class='transparent_overlay' /><div class='spinner' />");
	     $(".transparent_overlay").css("opacity", "0.6");
	     
	     if (navigator.userAgent.toLowerCase().indexOf("msie 6") != -1) {
	            $("body").css({ "height": "100%" });
	     }

	     if (navigator.userAgent.toLowerCase().indexOf("msie 6") != -1) {
	        $("html").first().scrollTop(0);
	     }

	     $(".transparent_overlay, .spinner").fadeIn(100);
	}
