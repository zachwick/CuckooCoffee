


/*
  @author: Zach Wick
  @description: On click event for header buttons. Loads the page content via ajax
  @param: string name of page to GET
*/
function load_tab_content(get_page) {
    if (get_page == "home") {

    } else if (get_page == "order") {
	jQuery.ajax({
	    type:"GET",
	    url:"../order",
	    success:function(html) {
		jQuery(".cc-inner-page-wrapper").html(html);
	    }
	});
    } else if (get_page == "story") {
	display_error("Not implemented yet.");
    } else if (get_page == "menu") {
	display_error("Not implemented yet.");
    } else if (get_page == "info") {
	display_error("Not implemented yet.");
    } else {
	display_error("Unrecognized page.");
    }
}

/*
  @author: Zach Wick
  @description: Displays an error message at the bottom of the page
  @param: Error message to display
*/
function display_error(msg) {
    jQuery("#error-message-wrapper").html(msg).show();
    alert(msg);
}