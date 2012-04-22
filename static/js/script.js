/*
  @author: Zach Wick
  @description: On click event for header buttons. Loads the page content via ajax
  @param: string name of page to GET
*/
function load_tab_content(get_page) {
    if (get_page == "home") {
	activate_button("home-button");
	display_error("Not implemented yet.");
    } else if (get_page == "order") {
	activate_button("order-button");
	jQuery(".cc-inner-page-wrapper").fadeOut("fast",function() {
	    jQuery.ajax({
		type:"GET",
		url:"../order",
		success:function(html) {
		    jQuery(".cc-inner-page-wrapper").html(html);
		}
	    });
	});
	jQuery(".cc-inner-page-wrapper").fadeIn("fast");
    } else if (get_page == "story") {
	activate_button("story-button");
	display_error("Not implemented yet.");
    } else if (get_page == "menu") {
	activate_button("menu-button");
	display_error("Not implemented yet.");
    } else if (get_page == "info") {
	activate_button("info-button");
	display_error("Not implemented yet.");
    } else {
	display_error("Unrecognized page.");
    }
}

/*
  @author: Zach Wick
  @description: Resets all .cc-header-button's to non-active except id
  @param: id of button to make .active
*/
function activate_button(activeId) {
    jQuery(".cc-header-button").each(function() {
	jQuery(this).removeClass("active");
	if (jQuery(this).attr("id") == activeId) {
	    jQuery(this).addClass("active");
	}
    });
}


/*
  @author: Zach Wick
  @description: Displays an error message at the bottom of the page
  @param: Error message to display
*/
function display_error(msg) {
    jQuery("#error-message-wrapper").html(msg).show();
    jQuery("#error-message-wrapper").fadeOut(5000);
}

/*
  @author: Zach Wick
  @description: Toggles the 2nd step of the order process
  @param: Type of order to begin
*/
function start_order(orderType) {
    if (orderType == "singular") {
	display_error("Not implemented yet.");
    } else if (orderType == "multiple") {
	jQuery("#multiple-order-content").fadeOut("fast",function() {
	    jQuery.ajax({
		type:"GET",
		url:"../multi_order",
		success:function(html) {
		    jQuery("#multiple-order-content").html(html);
		}		
	    });
	});
	jQuery("#multiple-order-content").fadeIn("fast");
    } else {
	display_error("Unrecognized order type.");
    }
}

/*
  @author: Zach Wick
  @description: This function performs the validation on the zipcode input
*/
function validate_zipcode() {
    var testValue = jQuery("#delivery-zipcode").val();
    var allowedZips = new Array("01460");
    var validates = (jQuery.isNumeric(testValue) && (allowedZips.indexOf(testValue) != -1) && testValue.length < 6);
    if (validates) {
	jQuery("#delivery-zipcode-img").attr("src","/static/img/checkmark-small.png").show();
	jQuery("#delivery-zipcode-location-wrapper > .city-state-text").html("Littleton, Massachusetts").removeClass("error");
	jQuery("#delivery-zipcode-location-wrapper > .delivery-details").html("We'll ask for your delivery details later on!");
    } else {
	jQuery("#delivery-zipcode-img").attr("src","/static/img/crossout-small.png").show();
	if (!jQuery.isNumeric(testValue) || testValue.length>5) {
	    jQuery("#delivery-zipcode-location-wrapper > .city-state-text").html("Invalid Zipcode").addClass("error");
	    jQuery("#delivery-zipcode-location-wrapper > .delivery-details").html("You've entered an invalid zipcode. Zipcodes are 5 digits long and contain no numbers");
	} else {
	    jQuery("#delivery-zipcode-location-wrapper > .city-state-text").html("Albany, New York").addClass("error");
	    jQuery("#delivery-zipcode-location-wrapper > .delivery-details").html("Sorry! We only deliver with a 10-mile radius of Westford, Massachusetts.<img src='/static/img/icon-popup.png'/><a href='#'>Look up coffeeshops near Albany, New York</a>");
	}
    }
}

/*
  @author: Zach Wick
  @description: This function toggles the checked/unchecked state of the .styled-radio button
*/
function toggle_radio(radio) {
    jQuery(".styled-radio[name='"+jQuery("#"+radio.id).attr("name")+"']").each(function() {
	jQuery(this).empty().removeClass("checked");
    });
    if (!jQuery("#"+radio.id).hasClass("checked")) {
	jQuery("#"+radio.id).append("<div class='styled-radio-checked'></div>").addClass("checked");
    }
}