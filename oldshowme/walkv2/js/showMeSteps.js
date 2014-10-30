/*======================================================================================

Filename: showMeSteps.js
Description: Javascript to load and display content for the "Show Me Steps" help pages

======================================================================================*/

function getData(xmlFile) {
	var myFile = 'content/stepLists/'+xmlFile+'.xml';
	$.ajax({
		async: false,
		type: "GET",
		url: myFile,
		dataType: "xml",
		success: function(xml) {
			$(xml).find('contextInfo').each(function() {
				var title = $(this).find('title').text();
				var myTitle = '<h1>'+title+'</h1>'
				$(".showMeSteps_title").append(myTitle);
				window.myID = $(this).find('id').text();
				window.myParent = $(this).find('parent').text();
				window.prevTitle = $(this).find('previousTitle').text();
				window.prevLink = $(this).find('previousLink').text();
				window.nextTitle = $(this).find('nextTitle').text();
				window.nextLink = $(this).find('nextLink').text();
			});
			$(xml).find('content').each(function() {
				var contentCode = $(this).find('code').text();
				$(".showMeSteps_content").append(contentCode);
				var myLinkText = window.myParent;
				var upper = myLinkText.charAt(0);
				upper = upper.toUpperCase();
				var loseFirst = myLinkText.substr(1);
				myLinkText = upper + loseFirst;
				var myLink = '<br><br><p><a href="javaScript:loadPage()">View all help content for '+myLinkText+'</a></p>';
				$(".showMeSteps_content").append(myLink);
			});
		},
		error: function() {
		window.location.href = "error.html";
		alert('XML file not loaded or does not exist!');
		}
	});
};

function buildNav() {
	var prevExist = (window.prevTitle).length;
	var nextExist = (window.nextTitle).length;
	if (prevExist > 0) {
		var backButton =  '<a href="showMeSteps.html?'+window.myParent+'?'+window.prevLink+'"><img src="images/steps/navButtonBack.png" style="border:none" /></a>';
		$(".showMeSteps_backButton").append(backButton);
		var prevDesc = 'previous step list:<br>'+window.prevTitle;
		$(".showMeSteps_prevText").append(prevDesc);
	};
	if (nextExist > 0) {
		var nextButton = '<a href="showMeSteps.html?'+window.myParent+'?'+window.nextLink+'"><img src="images/steps/navButtonNext.png" style="border:none" /></a>';
		$(".showMeSteps_nextButton").append(nextButton);
		var nextDesc = 'next step list:<br>'+window.nextTitle;
		$(".showMeSteps_nextText").append(nextDesc);
	};
};

function loadPage() {
	myNewLink = 'onThisPage.html?'+window.myParent+'?'+window.myID;
	window.open(myNewLink, '_blank','width=450,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
	window.close();
}
	
$(document).ready(function() {	
	//alert ('Doc Ready!');
	var pathName = (window.location + '').split('?');
	var xmlFile = pathName[1]+'/'+pathName[2];
	getData(xmlFile);
	buildNav();
});