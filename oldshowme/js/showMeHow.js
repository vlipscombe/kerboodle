/*======================================================================================

Filename: showMeHow.js
Description: Javascript to load and display content for the Show Me How help pages

======================================================================================*/

//function to clear all data and reset global variables
//called when a new XML file is loaded
function clearData() {
	window.count = 0;
	window.pages = 0;
	window.visited = 0;
	window.currentPage = 1;
	$(".showMeHow_Title").empty();
	$(".dialogBoxText").empty();
	$(".content").empty();
	$(".showMeHow_Nav").empty();
	$(".showMeHow_Screen").empty();
	$("#showMe_Screen").empty();
	$(".showMeHow_Screen").remove();
	$(".showMeHow_FootLeft").empty();
	$(".showMeHow_FootRight").empty();
	$(".showMeHow_TextTip").empty();
	$(".showMeHow_TextTip").remove();
	$(".showMeHow_slideshowToggle").empty();
	$(".showMeHow_textTipToggle").empty();
};

//function to clear page, called when navigating between pages
function clearScreen() {
	$(".showMeHow_Nav").empty();
	$(".showMeHow_Screen").empty();
	$("#showMe_Screen").empty();
	$(".showMeHow_Screen").remove();
	$(".showMeHow_FootLeft").empty();
	$(".showMeHow_FootRight").empty();
	$(".showMeHow_TextTip").empty();
	$(".showMeHow_TextTip").remove();
	$(".showMeHow_ShowMe").empty();
	$(".showMeHow_ShowMe").remove();
	$(".showMeHow_slideshowToggle").empty();
	$(".showMeHow_textTipToggle").empty();
};

//function to build the menu in accordion format
function buildMenu() {
	window.myIDs = []
	var idcount = 0;
	var myCheck = true;
	//destroy accordion and remove contents before creating one
	$('#ShowMeMenu').accordion("destroy");
	$('#showMeMenu').empty();
	$.ajax({
		//load synchronously or Menu won't render correctly
		async: false,
		type: "GET",
		//if the XML files get moved change this path
		url: "content/showMenu/"+window.xmlMenuFile,
		dataType: "xml",
		success: function(xml) {
			//loads and displays text for welcome screen
			$(xml).find('welcomeText').each(function() {
				var welText = $(this).find('text').text();
				$(".showMeHow_welcomeText").append(welText);
			});
			//loads menuItems for jQuery Accordion
			$(xml).find('menuItem').each(function() {
				var menuTitle = $(this).find('menuTitle').text();
				var id = menuTitle.split(' ');
				var myID = id[0];
				window.myIDs[idcount] = myID;
				idcount++;
				var addMenuTitle = "<h3 id='"+myID+"'><a href='#'>"+menuTitle+"</a></h3>"
				$("#showMeMenu").append(addMenuTitle);
					var menuString = "";
					$(this).find('subMenuItem').each(function(){
					var subTitle = $(this).find('subTitle').text();
					var link = $(this).find('link').text();
					var newLink = '"'+link+'"';
					var newSubItem = "<p><a href='javascript:loadItem("+newLink+")'>"+subTitle+"</a></p>"
					// create long HTML code with all subMenu items in
					menuString = menuString+newSubItem;
				});
				//wrap HTML code in a Div and append to #showMeMenu div
				var newItems = "<div>"+menuString+"</div>";
				$("#showMeMenu").append(newItems);
			});
			//render accordion based on contents of #showMeMenu div
			if (window.activeMenu == '#undefined') {
				window.activeMenu = '#'+window.myIDs[0];
			} else if (window.activeMenu == '#') {
				window.activeMenu = '#'+window.myIDs[0];
			};
			$("#showMeMenu").accordion({
					autoHeight: true,
					collapsible: false,
					active: window.activeMenu
				});
		},
		// if XML file error, load error page and alert
		error: function() {
		window.location.href = "error.html";
		alert('XML file not loaded or does not exist!');
		}
	});
};

//called from the menu items, loads the XML file and builds the first page
function loadItem(xmlfile) {
	window.count=0;
	getData(xmlfile);
	buildPage(1);
};

//function to get page data uses AJAX in synchronous mode
//populates the <content> div with XML data
function getData(xmlfile) {
	clearData();
	//if the XML files are moved, this path will need to be updated.
	myURL = "content/showXML/"+xmlfile;
	$.ajax({
		async: false,
		type: "GET",
		url: myURL,
		dataType: "xml",
		success: function(xml) {
			$(xml).find('topic').each(function() {
				//load and render page title, load content for jQueryUI "welcome" dialog box
				var pageTitle = $(this).find('topicTitle').text();
				var pageDialog = $(this).find('topicDialog').text();
				$(".showMeHow_Title").append(pageTitle);
				$(".dialogBoxText").append(pageDialog);
			});
			$(xml).find('step').each(function(){
				//load content for each step into a separate div into the content div
				window.count++;
				$(".content").append("<div class=step"+window.count+"></div>");
				var stepTitle = $(this).find('stepTitle').text();
				var stepDialog = $(this).find('stepTextTip').text();
				var stepScreen = $(this).find('stepScreen').text();
				var stepHotspot = $(this).find('stepHotspot').text();
				$('<div class="stepTitle"></div>').html(stepTitle).appendTo('.step'+window.count);
				$('<div class="stepDialog"></div>').html(stepDialog).appendTo('.step'+window.count);
				$('<div class="stepScreen"></div>').html(stepScreen).appendTo('.step'+window.count);
				$('<div class="stepHotspot"></div>').html (stepHotspot).appendTo('.step'+window.count);
			});
		},
		// if XML file error, load error page and alert
		error: function() {
		window.location.href = "error.html";
		alert('XML file not loaded or does not exist!');
		}
	});
};

//function to display the dialog box with "welcome to this How To" text
function dialogBox() {
	var dialogTitle = $(".showMeHow_Title").text();
	$(".dialogBoxText").dialog({
		title: dialogTitle,
		autoOpen: false,
		resizable: false,
		position: [300,200],
		width: 400,
		height: 'auto',
		modal: true,
		buttons: { "Ok": function() {
			$(this).dialog('close');
			}
		}
	});	
};

//function to start slideshow mode
function slideShowOn() {
	window.slideShow = true;
	$(".showMeHow_slideshowToggle").empty();
	buildPage(window.currentPage);
};

//function to exit slideshow mode
function slideShowOff() {
	if (window.slideshowPlay == true) {
		window.slideshowPlay = false;
		clearInterval (window.myTimer);
	};
	window.slideShow = false;
	$(".showMeHow_slideshowToggle").empty();
	buildPage(window.currentPage);
};

//function to change Page
function changePage(newPage) {
	window.textTipDisplay = true;
	buildPage(newPage);
};

//function to build main navigation for interactive mode
function buildNav() {
	$('.showMeHow_Nav').css({'display': 'block'});
	$('.showMeHow_showControls').css({'display': 'none'});
	//first build the nav bar, retrieves necessary data 
	//from <content> div and populates <showMeHow_Nav> div
	for (i = 1; i < (window.pages+1); i++) {
		var location = ".content > .step"+i+" > .stepTitle";
		var linkTitle = $(location).text();
		if (i == 1 && i == window.currentPage) {
			var link = "<a href=javascript:changePage("+i+")><img src='images/show/bookmarkLeftHi.png' title='"+linkTitle+"' border='0'></a>"
			} else if (i == 1) {
			var link = "<a href=javascript:changePage("+i+")><img src='images/show/bookmarkLeft.png' title='"+linkTitle+"' border='0'></a>"
			} else if (i == window.pages && i == window.currentPage) {
			var link = "<a href=javascript:changePage("+i+")><img src='images/show/bookmarkRightHi.png' title='"+linkTitle+"' border='0'></a>"
			} else if (i == window.pages) {
			var link = "<a href=javascript:changePage("+i+")><img src='images/show/bookmarkRight.png' title='"+linkTitle+"' border='0'></a>"
			} else if (i == window.currentPage) {
			var link = "<a href=javascript:changePage("+i+")><img src='images/show/bookmarkHi.png' title='"+linkTitle+"' border='0'></a>"
			} else {
			var link = "<a href=javascript:changePage("+i+")><img src='images/show/bookmark.png' title='"+linkTitle+"' border='0'></a>"
		};
		$(".showMeHow_Nav").append(link);
	};
	//adds navigation buttons at the foot of the main screen dependent on current page
	if (window.currentPage > 1) {
		var prevLocation = ".content > .step"+(window.currentPage-1)+" > .stepTitle";
		var prevLoc = $(prevLocation).text();
		var newBackButton = "<a href=javascript:changePage("+(window.currentPage-1)+")><img src='images/show/navButtonBack.png' title='Back to: "+prevLoc+"' border='0'></a>";
		$(".showMeHow_FootLeft").append(newBackButton);
	};
	if (window.currentPage < window.pages) {
		var nextLocation = ".content > .step"+(window.currentPage+1)+" > .stepTitle";
		var nextLoc = $(nextLocation).text();
		var newNextButton = "<a href=javascript:changePage("+(window.currentPage+1)+")><img src='images/show/navButtonNext.png' title='Next: "+nextLoc+"' border='0'></a>";
		$(".showMeHow_FootRight").append(newNextButton);
	};
};

//function to start playback
function showPlay() {
	if (window.currentPage < window.pages) {
		window.slideshowPlay = true;
		buildControls();
		var truSpeed = (window.showSpeed * 1000);
		window.myTimer = window.setInterval(function() {
			changePage(window.currentPage+1);
		}, truSpeed);
	};
};

//function to stop playback
function showPause() {
	window.textTipDisplay = true;
	window.slideshowPlay = false;
	buildControls();
	clearInterval (window.myTimer);
};

//function to rewind to beginning
function showFirstPage() {
	showPause();
	buildPage(1);
};

//function to skip to end
function showLastPage() {
	showPause();
	buildPage(window.pages);
};

//function to display previous Step on click
function showPrevPage() {
	window.textTipDisplay = true;
	clearInterval (window.myTimer);
	buildPage(window.currentPage - 1);
	if (window.slideshowPlay == true) {
		showPlay();
	};
};

//function to display next Step on click
function showNextPage() {
	window.textTipDisplay = true;
	clearInterval (window.myTimer);
	buildPage(window.currentPage + 1);
	if (window.slideshowPlay == true) {
		showPlay();
	};
};

//function to decrease slideshow speed
function slowDown() {
	window.showSpeed = window.showSpeed - 1;
	if (window.showSpeed < 4) {
		window.showSpeed = 4;
	};
	if (window.slideshowPlay == true) {
		clearInterval (window.myTimer);
		showPlay();
	} else {
		buildControls();
	};
};

//function to increase slideshow speed
function speedUp() {
	window.showSpeed = window.showSpeed +1;
	if (window.showSpeed > 12) {
		window.showSpeed = 12;
	};
	if (window.slideshowPlay == true) {
		clearInterval (window.myTimer);
		showPlay();
	} else {
		buildControls();
	};
};

// function to render slideshow controls
function buildControls() {
	$('.showMeHow_showControls').empty();
	$('.showMeHow_Nav').css({'display': 'none'});
	$('.showMeHow_showControls').css({'display': 'block'});
	$('.showMeHow_showControls').append('<div class="showMeHow_controlsBack" onclick="showFirstPage()" title="back to Step 1"></div>');
	$('.showMeHow_showControls').append('<div class="showMeHow_controlsPrev" onclick="showPrevPage()" title="previous Step"></div>');
	$('.showMeHow_showControls').append('<div class="showMeHow_controlsPlay" onclick="showPlay()" title="play"></div>');
	$('.showMeHow_showControls').append('<div class="showMeHow_controlsPause" onclick="showPause()" title="pause"></div>');
	$('.showMeHow_showControls').append('<div class="showMeHow_controlsNext" onclick="showNextPage()" title="next Step"></div>');
	$('.showMeHow_showControls').append('<div class="showMeHow_controlsEnd" onclick="showLastPage()" title="to final Step"></div>');
	$('.showMeHow_showControls').append('<div class="showMeHow_controlsSpeed"><h5>Speed (seconds)</h5></div>');
	$('.showMeHow_controlsSpeed').append('<div class="showMeHow_speedDown" onclick="slowDown()" title="slow down"></div>');
	$('.showMeHow_controlsSpeed').append('<div class="my_speedUp" onclick="speedUp()" title="speed up"></div>');
	$('.showMeHow_controlsSpeed').append('<div class="showMeHow_speedo"><b>'+window.showSpeed+'</b></div>');
	//display pause or play button dependent on state
	if (window.slideshowPlay == true) {
		$('.showMeHow_controlsPause').css({'display': 'block'});
		$('.showMeHow_controlsPlay').css({'display': 'none'});
	} else {
		$('.showMeHow_controlsPause').css({'display': 'none'});
		$('.showMeHow_controlsPlay').css({'display': 'block'});
	};	
};

//function to display TextTips
function textTipOn() {
	window.textTipDisplay = true;
	buildPage(window.currentPage);
};

function textTipOff() {
	window.textTipDisplay = false;
	buildPage(window.currentPage);
};

//function to build the dynamic page
function buildPage(newPage) {
	clearScreen();
	window.pages = window.count;
	//check current page maximum
	if (newPage > window.pages) {
		newPage = window.pages;
	};
	//check current page minimum
	if (newPage < 1) {
		newPage = 1;
	};
	//if on last page and in slideshow mode, stop slideshow
	if (newPage == window.pages && window.slideshowPlay == true) {
		showPause();
	};
	//set current page to called page
	window.currentPage = newPage;
	//add slideshow button with correct state
	if (window.slideShow == false) {
		var slideShowLink = '<div class="showMeHow_showOnButton" onclick="slideShowOn()" title="view as a Slideshow"></div>';
		buildNav();
	} else if (window.slideShow == true) {
		var slideShowLink = '<div class="showMeHow_showOffButton" onclick="slideShowOff()" title="Interactive Mode"></div>';
		buildControls();
	};
	$(".showMeHow_slideshowToggle").append(slideShowLink);
	//adds TextTip Toggle button, with correct state
	if (window.textTipDisplay == false) {
		$(".showMeHow_textTipToggle").append('<div class="showMeHow_textTipOn" onclick="textTipOn()" title="display TextTip"></div>');
	} else if (window.textTipDisplay == true) {
		$(".showMeHow_textTipToggle").append('<div class="showMeHow_textTipOff" onclick="textTipOff()" title="hide TextTip"></div>');
	};
	//builds the main screenshot and image map again data 
	//retrieved from <content> div and html code appended to <showMeHow_Main>
	var currentScreen = ".content > .step"+window.currentPage+" > .stepScreen";
	var screenLink = $(currentScreen).text();
	var newScreen = "<img src="+screenLink+" border='0'/>"; 
	var currentHotspot = ".content > .step"+window.currentPage+" > .stepHotspot";
	var hotspotLink = $(currentHotspot).text();
	$('<div id="showMe_Screen" class="showMeHow_Screen"></div>').html(newScreen).appendTo(".showMeHow_Main");
	// determine co-ordinates from the hotspot link for the
	// TextTip arrow and Highlight Box
	var whereArray = hotspotLink.split(",");
	var posX1s = whereArray[0]
	var posX2s = whereArray[2]
	var posX1 = parseInt(posX1s);
	var posX2 = parseInt(posX2s);
	//posX is middle of the hotspot
	var posX = ((posX2 - posX1)/2);
	//centreHotspot is absolute centre of hotspot on screen
	var centreHotspot = (posX + posX1);
	var posY1s = whereArray[1];
	var posY2s = whereArray[3];
	var posY1 = parseInt(posY1s);
	var posY2 = parseInt(posY2s);
	//start calculations for the TextTip positioning
	//tipDivX is the left side of the div  
	//lines up centre of the div to the centre of the hotspot
	var tipDivX = centreHotspot - 130;
	//set default value for positioning of the arrow
	//arrow is 30px wide therefore 130-15 = 115
	var marLeftX = 115;
	//sets Y pos 
	var tipDivY = posY2 + 40;
	var tipContentLoc = ".content > .step"+window.currentPage+" > .stepDialog";
	var tipContent = $(tipContentLoc).html();
	//determine if textTip should be displayed
	if (window.textTipDisplay == true) {
		// dependent on Y position format TextTip boxes and populate with content
		// anything less that pixel 239 is a arrow on top, more than or equal 239, arrow on bottom
		if (posY1 < 212) {
			var marLeftX = 0;
			$(".showMeHow_Main").append('<div class="showMeHow_TextTip"></div>');
			$(".showMeHow_TextTip").append('<div class="showMeHow_TextTipArrowUp"></div>');
			$(".showMeHow_TextTip").append('<div class="showMeHow_TextTipTop"></div>');
			$('<div class="showMeHow_TextTipMid"></div>').html(tipContent).appendTo('.showMeHow_TextTip');
			$(".showMeHow_TextTip").append('<div class="showMeHow_TextTipBtm"></div>');
		} else if (posY2 >= 212) {
			$(".showMeHow_Main").append('<div class="showMeHow_TextTip"></div>');
			$(".showMeHow_TextTip").append('<div class="showMeHow_TextTipTop"></div>');
			$('<div class="showMeHow_TextTipMid"></div>').html(tipContent).appendTo('.showMeHow_TextTip');
			$(".showMeHow_TextTip").append('<div class="showMeHow_TextTipBtm"></div>');
			$(".showMeHow_TextTip").append('<div class="showMeHow_TextTipArrowDown"></div>');
			// get div height and move div up by that amount
			tipDivY = posY1 + 40;
			var tipHeight = $('.showMeHow_TextTip').height();
			tipDivY = (tipDivY - tipHeight);
		} else {
			// if null returned (no hotspot on page) place dialog in centre of page
			var tipDivX = 150;
			var tipDivY = 150;
			$(".showMeHow_Main").append('<div class="showMeHow_TextTip"></div>');
			$(".showMeHow_TextTip").append('<div class="showMeHow_TextTipTop"></div>');
			$('<div class="showMeHow_TextTipMid"></div>').html(tipContent).appendTo('.showMeHow_TextTip');
			$(".showMeHow_TextTip").append('<div class="showMeHow_TextTipBtm"></div>');
		};
		//check X value of left margin of TextTip if it's off the page move it
		//back on and move the arrow accordingly
		//first check for negative values
		if (tipDivX < 1){
			var oldLeft = tipDivX;
			tipDivX = 1;
			var arrowPos = oldLeft;
			var xDiff = -arrowPos;
			var marLeftX = 115 - xDiff;
			$('.showMeHow_TextTipArrowUp').css("left", marLeftX+'px');
			$('.showMeHow_TextTipArrowDown').css("left", marLeftX+'px');
		};
		//next check for positive values
		if (tipDivX > 299) {
			var oldLeft = tipDivX;
			tipDivX = 299;
			var arrowPos = oldLeft;
			var xDiff = (oldLeft - tipDivX);
			var marLeftX = (115+xDiff);
			$('.showMeHow_TextTipArrowUp').css("left", marLeftX+'px');
			$('.showMeHow_TextTipArrowDown').css("left", marLeftX+'px');
		};
		//place TextTip div in correct position using CSS
		$('.showMeHow_TextTip').css({
			left: tipDivX,
			top: tipDivY
		});
	};
	//place the Highlight Box
	//creates a new Div based on a styled class and positions it on screen
	$(".showMeHow_Screen").append('<div class="showMeHow_ShowMe"></div>');
	var boxHeight = (posY2 - posY1);
	var boxWidth = (posX2 - posX1);
	$('.showMeHow_ShowMe').css({
		// -3 compensates for the 3px border
		left: (posX1-3),
		top: (posY1-3),
		width: boxWidth,
		height: boxHeight
	});
	if (window.currentPage == window.pages) {
		$('.showMeHow_ShowMe').css({'display' : 'none'});
	};
	//if not in slideshow mode have a click function on highlight box
	if	(window.slideShow == false) {
		$('.showMeHow_ShowMe').click(function() {
		buildPage(window.currentPage+1);
		});
		$('.showMeHow_ShowMe').css({'cursor' : 'pointer'});
	};
	
	//calls the welcome dialog box function if on page 1 for the first time
	if (window.currentPage == 1 && window.visited == 0) {
	window.visited++;
	dialogBox();
	$(".dialogBoxText").dialog('open');
	};
};

//calls Menu function on page load & sets accordion (xml)
//menu required accoringing to argument passed from the URL
$(document).ready(function() {	
	//set global variables
	window.slideShow = false;
	window.slideshowPlay = false;
	window.showSpeed = 7;
	window.textTipDisplay = true;
	//get arguments from URL and load correct menu
	var pathName = (window.location + '').split('?');
	var newPathName = pathName[1];
	window.activeMenu = pathName[2];
	var activeXML = pathName[3];
	if (newPathName == "students") {	
	} else if (newPathName == "admins") {
	} else if (newPathName == "teachers"){
	} else {
	window.location.href = "error.html";
	};
	window.activeMenu = '#'+window.activeMenu;
	window.xmlMenuFile = (newPathName)+"Menu.xml";
	buildMenu();
	if (activeXML.length > 0) {
		activeXML = activeXML+('.xml');
		loadItem(activeXML);
	};
});