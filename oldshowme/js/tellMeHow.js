/*======================================================================================
Filename: tellMeHow.js
Description: Javascript to load and display content for the tellMeHow page
======================================================================================*/

//clear Open data, reset accordion views
function clearScreen() {
	for (i = 1; i < window.count + 1; i++) {
		var closeClass = "."+window.topicShort[i]; 
		var closeContent = "#"+window.topicShort[i]+"Content";
		$(closeClass).dialog('close');
		$(closeContent).accordion('destroy');
	};
};

//retrieve Data from XML file to setup page and slider
function getData() {
	$.ajax({
		// execute ajax sychronously or page will not load properly
		async: false,
		type: "GET",
		// if XML files are moved, this path will need to be changed
		url: "content/tellXML/"+window.xmlLevelFile,
		dataType: "xml",
		success: function(xml) {
			$(xml).find('pageDetails').each(function() {
				var pageTitle = $(this).find('pageTitle').text();
				var pageLink = $(this).find('pageLink').text();
				var lkText = $(this).find('linkText').text();
				window.linkText = lkText;
				var newPageTitle = "<h2>"+pageTitle+"</h2>";
				$(".tellMeHow_pageTitle").append(newPageTitle);
				if (pageLink.length != 0) {
					var newPageLink = '<a href="'+pageLink+'" target="_self"><h4><u>'+window.linkText+'</u></h4></a>';
					$(".tellMeHow_link").append(newPageLink);
				};
			});
			//window.count is used throughout as it defines the number of items 
			//there are in the XML file and therefore the slider list
			//stored in arrays for late processing
			window.count = 0;
			window.topicTitle = [];
			window.topicShort = [];
			window.topicFile = [];
			$(xml).find('topic').each(function(){
				window.count++;
			    window.topicTitle[window.count] = $(this).find('topicTitle').text();
				window.topicShort[window.count] = $(this).find('topicShort').text();
				window.topicFile[window.count] = $(this).find('topicFile').text();
				$('<div class="'+topicShort[window.count]+'"></div>').appendTo('.content');
			});
		},
		//if the XML file cannot be loaded, load the error page and alert
		error: function() {
		window.location.href = "error.html";
		alert('XML file not loaded or does not exist!');
		}
	});
};

//use arrays to populate the list and generate buttons and links
function createList() {
	for (i = 1; i < window.count + 1 ; i++) {
		// ensure i's true value is used
		(function (i) {
			var myNewItem = "."+window.topicShort[i]; 
			var newLink = $('<div class="buttonText">'+window.topicTitle[i]+'</div>');
				newLink.click(function() {
				clearScreen(); //clears any open dialog boxes
				$(myNewItem).dialog('open');
				return false;
			});
			//last button in the workflow should not have an arrow set png and width
			if (i == window.count) {
				var buttonType = "sliderEnd";
				var buttonWidth = "120";
			} else {
				var buttonType = "slider";
				var buttonWidth = "180";
			};
			//if in advanced view, colour the buttons blue if not defualt green
			if (window.linkText == "Standard View") {
				var buttonColour = "ButtonBlue";
			} else {
				var buttonColour = "ButtonGreen";
			};
			var myButton = buttonType+buttonColour;
			//creates new list item and appends it to #sliderlist
			var newListItem = $('<li />').append(
				$('<div class="buttonGraphic" />').append(
					'<a href="#" id="'+window.topicShort[i]+'_link"><img src="images/tell/'+myButton+'.png" height="120" width="'+buttonWidth+'" /></a>',
					newLink
					)
				);
			$("#sliderList").append(newListItem);
		})(i);
	};
};

//loads HTML content as defined in the XML file and the arrays created from it
function loadContent() {
	for (i = 1; i < window.count + 1; i++) {
		//ensure i's true value is used
		(function (i) {
			var myClass = "."+window.topicShort[i];
			var newDiv = "<div class='"+window.topicShort[i]+"'></div>";
			var myFile = "./content/tellHTML/"+window.topicFile[i]+".html";
			var myHTMLContent = "#"+window.topicShort[i]+"Content";
			//add a new div to body to hold the HTML content
			$('body').append(newDiv);
			//define the jQueryUI dialog box
			$(myClass).dialog({
				autoOpen: false,
				resizable: false,
				position: [10,245],
				width: 770,
				height: 340,
				modal: false,
				open: function(){
					//when the jQueryUI dialog box is opened render the loaded content as accordion
					var $myContent = $(myClass).load(myFile,
						function(){$(myHTMLContent).accordion();
					});
					$(myContent).accordion({ autoHeigh: true, fillSpace: true });
				}
			});	
		})(i);
	};
};

$(document).ready(function(){
	//get argument from URL - remove any # from end (can be caused through button presses)
	var pathName = (window.location + '').split('?');
	var newPathName = pathName[1].split('#');
	//if path name is not valid load error page
	if (newPathName[0] == "students") {	
	} else if (newPathName[0] == "admins") {
	} else if (newPathName[0] == "teachers"){
	} else if (newPathName[0] == "teachersAdv") {
	} else {
	window.location.href = "error.html";
	};
	//define XML file name from argument
	window.xmlLevelFile = (newPathName[0])+".xml";	
	//loads content
	getData();
	createList();
	loadContent();
	// initialise Slider function
	$('.helpSlider').helpSlider();
	// removes any open dialog boxes and destroys an active accordions
	// required on first init of an accordion
	clearScreen();
	// opens the first (Welcome) dialog box
	$("."+window.topicShort[1]).dialog('open');
});