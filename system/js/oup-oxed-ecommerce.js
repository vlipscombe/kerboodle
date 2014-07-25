function addToBasket(container) {
	var isbn = $(container).find(".action_trigger input:hidden").attr("value");
	var quantity = 1;
	var quantityInput = $(container).find(".action_trigger input:text");
	if (quantityInput != null) {
		var quantityValue = quantityInput.attr("value");
		if (isNumber(quantityValue)) {
			quantity = quantityValue;
		}
	}
	
	var url= window.basePath + 'store/basketservice/add/' + isbn + '/quantity/' + quantity;	
	addProductByUrl(container, url);
	dcsMultiTrack('dcsuri','/AddToBasket' ,'WT.ti', 'Add To Basket','WT.si_n','Purchase Process','WT.si_x','2','WT.tx_e','a','WT.tx_u',quantity,'WT.pn_sku', isbn);
}

function evaluateProduct(container) {	
	var isbn = $(container).find(".action_trigger input:hidden").attr("value");
	var url= window.basePath + 'store/basketservice/evaluate/' + isbn;
	addProductByUrl(container, url);
	dcsMultiTrack('dcsuri','/AddToBasket' ,'WT.ti', 'Add To Basket','WT.si_n','Purchase Process','WT.si_x','2','WT.tx_e','a','WT.tx_u','1','WT.pn_sku', isbn+'e');
}

function addProductByUrl(container, url) {
	showWait(container);
	url += '/' + generateUUID();
	$.ajax({
		type: 'GET',
		url: url,
		complete: function(data) {
			updateBasketSummary();
		},
		success: function(data) {
			showSuccess(container);
		},
		error: function(data, status, error) {
			//alert('Error\nReadyState: ' + data.readyState + '\nStatus: ' + status);
			showError(container);
		}
	});
}

function showWait(container) {
	container.find(".action_trigger").hide();
	container.find(".action_response").show();
}

function showSuccess(container) {
	container.find(".action_response").hide();
	container.find(".action_result").show();
}

function showError(container) {
	container.find(".action_response").hide();
	container.find(".action_trigger").show();	
}

function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

function submitFormSync(form) {
	$('#'+form).submit();
} 

function updateBasketSummary() {
	var url= window.basePath + 'store/basketservice/total/' + generateUUID();
	$.get(url, function(data) {
		$('span#basketSummary').html(data);
	}); 
}

/*function addMultipleToBasket(isbns) {
	
	var isbn=isbns.split(",");

	for(var y = 0; y < isbn.length; y++) {
		var url= window.basePath + 'store/basketservice/add/' + isbn;
		//clearMessages();
		$.ajax({
			type: 'GET',
			url: url,
			complete: function(data) {			
				//showMessage(data.responseText, true);
				//updateCart();
			},
			error: function(data, status, error) {
				alert('Error\nReadyState: ' + data.readyState + '\nStatus: ' + status);
			}
		});
	}
}*/

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};