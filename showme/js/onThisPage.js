/*======================================================================================

Filename: onThisPage.js
Description: Javascript to load and display content for the "On This Page" help pages

======================================================================================*/

//function to get Page Data 
function getData(xmlFile) {
	$.ajax({
		async: false,
		type: "GET",
		url: "content/otpTopics/"+xmlFile,
		dataType: "xml",
		success: function(xml) {
			$(xml).find('topicInfo').each(function() {
				var title = $(this).find('title').text();
				var title = '<h1>'+title+'</h1>';
				$(".onThisPage_topicTitle").append(title);
				var introText = $(this).find('intro').text();
				$(".onThisPage_topicInfo").append(introText);
			});
			$(xml).find('content').each(function() {
				window.accPath = $(this).find('accPath').text();
				var mainContent = $(this).find('mainContent').text();
				$(".onThisPage_content").append(mainContent);
				window.relatedTopics = $(this).find('related').text();
				window.count = 0;
				window.accContents = [];
				$(xml).find('accContent').each(function() {
					window.count++;
					window.accContents[window.count] = $(this).find('steps').text();
				});
			});
		},
		error: function() {
		window.location.href = "error.html";
		alert('XML file not loaded or does not exist!');
		}
	});
};

// function to get Accordion Data 
function getAccData() {
	$('#onThisPage_accordion').accordion("destroy");
	$('#onThisPage_accordion').empty();
	for (i = 1; i < window.count + 1; i++) {
		var accXML = window.accContents[i];
		var myXMLFile = window.accPath+'/'+accXML+'.xml';
		$.ajax({
			async: false,
			type: "GET",
			url: "content/stepLists/"+myXMLFile,
			dataType: "xml",
			success: function(xml) {
				$(xml).find('step').each(function() {
					var stepTitle = $(this).find('title').text();
					var stepID = $(this).find('id').text();
					var addTitle = '<h3 id="'+stepID+'"><a href="#"><b>'+stepTitle+'</b></a></h3>'
					var stepContent = $(this).find('code').text();
					var addContent = '<div>'+stepContent+'</div>';
					var newItems = addTitle + addContent;
					$("#onThisPage_accordion").append(newItems);
				});
			},
			error: function() {
			window.location.href = "error.html";
			alert('XML file not loaded or does not exist!');
			}
		});
	};
	if (window.relatedTopics.length > 1) {
		var addRelatedTitle = '<h3><a href="#"><b>Related Topics</b></a></h3>';
		var addRelatedContent = '<div>'+window.relatedTopics+'</div>';
		var addRelated = addRelatedTitle + addRelatedContent;
	};
	$("#onThisPage_accordion").append(addRelated);
	if (window.activeAcc == "undefined") {
		var myActive = false;
	} else {
		var myActive = '#'+window.activeAcc;
	};
	$("#onThisPage_accordion").accordion({
		autoHeight: false,
		collapsible: true,
		active: myActive
	});
};

function nonAccPage() {
	if (window.relatedTopics.length > 1) {
		var addRelatedTitle = '<h3><b>Related Topics</b></h3>';
		$(".onThisPage_content").append(addRelatedTitle);
		$(".onThisPage_content").append(window.relatedTopics);
	};
};

//calls Menu function on page load & sets accordion (xml)
//menu required accoringing to argument passed from the URL
$(document).ready(function() {	
	var pathName = (window.location + '').split('?');
	var xmlFile = pathName[1]+'.xml';
	window.activeAcc = pathName[2];
	getData(xmlFile);
	if (window.accPath.length > 0) {
		getAccData();
	} else {
		nonAccPage();
	};
});