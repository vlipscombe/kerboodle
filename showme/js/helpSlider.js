/*===============================================

Filename: slider.js
Description: Javascript for the Slider Function

===============================================*/

$.fn.helpSlider = function () {

    function repeat(str, num) {
        return new Array( num + 1 ).join( str );
    }
  
    return this.each(function () {
        var $wrapper = $('> div', this).css('overflow', 'hidden'),
            $slider = $wrapper.find('> ul'),
            $items = $slider.find('> li'),
            $single = $items.filter(':first'),
            
            singleWidth = $single.outerWidth(), 
            visible = Math.ceil($wrapper.innerWidth() / singleWidth), // note: doesn't include padding or border
            currentPage = 1,
            pages = Math.ceil($items.length / visible);            


        // 1. Pad so that 'visible' number will always be seen, otherwise create empty items
        if (($items.length % visible) != 0) {
            $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
            $items = $slider.find('> li');
        }

        // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
        $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
        $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
        $items = $slider.find('> li'); // reselect
        
        // 3. Set the left position to the first 'real' item
        $wrapper.scrollLeft(singleWidth * visible);
        
        // 4. paging function
        function gotoPage(page) {
            var dir = page < currentPage ? -1 : 1,
                n = Math.abs(currentPage - page),
                left = singleWidth * dir * visible * n;
            
            $wrapper.filter(':not(:animated)').animate({
                scrollLeft : '+=' + left
            }, 500, function () {
                if (page == 0) {
                    $wrapper.scrollLeft(singleWidth * visible * pages);
                    page = pages;
                } else if (page > pages) {
                    $wrapper.scrollLeft(singleWidth * visible);
                    // reset back to start position
                    page = 1;
                } 
                currentPage = page;
            });                
            //alert('Current: '+currentPage+'  Pages: '+pages+'  page:'+page);
            return false;
        }
				
        $wrapper.after('<a class="arrow back">&lt;</a><a class="arrow forward">&gt;</a>');
       
        // 5. Bind to the forward and back buttons
        $('a.back', this).click(function () {
			//alert('BACK! Current: '+currentPage+'  Pages: '+pages);
			$('.navLeftHide').css({'display' : 'block'});
			$('.navRightHide').css({'display' : 'none'});
			if ((currentPage-1) > 1 && (currentPage-1) < pages) {
					$('.navLeftHide').css({'display' : 'none'});
					$('.navRightHide').css({'display' : 'none'});
			}
			if (currentPage == 1) {
			return gotoPage(currentPage);
			} else {
            return gotoPage(currentPage - 1);    
			}
        });
        
        $('a.forward', this).click(function () {
			//alert('FORWARD! Current: '+currentPage+'  Pages: '+pages);
			$('.navLeftHide').css({'display' : 'none'});
			$('.navRightHide').css({'display' : 'block'});
			if ((currentPage+1) < pages && (currentPage+1) > 1) {
					$('.navLeftHide').css({'display' : 'none'});
					$('.navRightHide').css({'display' : 'none'});
			}
			if (currentPage == pages) {
			return gotoPage(currentPage);
			} else {
            return gotoPage(currentPage + 1);
			}
        });		
		
        // create a public interface to move to a specific page
        $(this).bind('goto', function (event, page) {
            gotoPage(page);
			
        });
    });  
};