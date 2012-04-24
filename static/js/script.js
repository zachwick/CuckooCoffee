/*
  @author: Zach Wick
  @description: On click event for header buttons. Loads the page content via ajax
  @param: string name of page to GET
*/
function load_tab_content(get_page) {
    jQuery(".cc-inner-page-wrapper").fadeOut("fast");
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
    jQuery("#error-message-wrapper > .message-text").html(msg);
    jQuery("#error-message-wrapper").css("left",(jQuery(window).width()/2) - 175);
    jQuery("#error-message-wrapper").show();
    jQuery("#error-message-wrapper").fadeOut(5000);
}

/*
  @author: Zach Wick
  @description: Toggles the 2nd step of the order process
  @param: Type of order to begin
*/
function start_order(orderType) {
    jQuery("#multiple-order-content").fadeOut("fast");
    if (orderType == "singular") {
	display_error("Not implemented yet.");
	jQuery("#multiple-order-type-box").removeClass("selected");
	jQuery("#multiple-order-type-box > .order-type-selected-img").hide();
    } else if (orderType == "multiple") {
	jQuery("#multiple-order-content").fadeOut("fast",function() {
	    jQuery.ajax({
		type:"GET",
		url:"../multi_order",
		success:function(html) {
		    jQuery("#multiple-order-content").html(html);
		    jQuery("#multiple-order-type-box").addClass("selected");
		    jQuery("#multiple-order-type-box > .order-type-selected-img").show();
		}		
	    });
	});
	jQuery("#multiple-order-content").fadeIn("fast");
	if (jQuery("#order-status-text").html().indexOf("Group") == -1) {
	    jQuery("#order-status-text").html(jQuery("#order-status-text").html()+"Group Order - ");
	}
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
	toggle_order_time_section("show");
	if (jQuery("#order-status-text").html().indexOf("Delivery") == -1) {
	    jQuery("#order-status-text").html(jQuery("#order-status-text").html()+"Delivery to "+jQuery("#delivery-zipcode-location-wrapper > .city-state-text").html()+" - ");
	}
    } else {
	jQuery("#delivery-zipcode-img").attr("src","/static/img/crossout-small.png").show();
	if (!jQuery.isNumeric(testValue) || testValue.length>5) {
	    jQuery("#delivery-zipcode-location-wrapper > .city-state-text").html("Invalid Zipcode").addClass("error");
	    jQuery("#delivery-zipcode-location-wrapper > .delivery-details").html("You've entered an invalid zipcode. Zipcodes are 5 digits long and contain no numbers");
	} else {
	    jQuery("#delivery-zipcode-location-wrapper > .city-state-text").html("Albany, New York").addClass("error");
	    jQuery("#delivery-zipcode-location-wrapper > .delivery-details").html("Sorry! We only deliver with a 10-mile radius of Westford, Massachusetts.<img src='/static/img/icon-popup.png'/><a href='#'>Look up coffeeshops near Albany, New York</a>");
	}
	toggle_order_time_section("hide");
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
	if (radio.id == "delivery-radio-option") {
	    toggle_zip("show");
	} else {
	    toggle_zip("hide");
	}
    }
}

/*
  @author: Zach Wick
  @description: This function shows the zipcode entrance section is delivery is chosen
*/
function toggle_zip(toState) {
    if (toState == "show") {
	jQuery("#delivery-zipcode-wrapper").fadeIn('fast',function() {});
    } else if (toState == "hide") {
	jQuery("#delivery-zipcode-wrapper").fadeOut('fast',function() {});
    } else {
	console.log("Error: Unrecognized toState for function toggle_zip");
    }
}

/*
  @author: Zach Wick
  @description: Toggle the display of the order_time section
*/
function toggle_order_time_section(toState) {
    if (toState == "hide") {
	jQuery("#order-time-section").hide();
    } else {
	jQuery("#order-time-section").fadeOut("fast",function() {
	    jQuery.ajax({
		type:"GET",
		url:"../order_time",
		success:function(html) {
		    jQuery("#order-time-section").html(html);
		    jQuery("#order-time-section").fadeIn("fast");
		}
	    });
	});
    }
}

/*
  
*/
function set_delivery_date(dateToSet) {
    if (dateToSet == "today") {
	display_error("Not yet implemented.");
    } else if (dateToSet == "future") {
	jQuery("#delivery-date-future-box").addClass("selected");
	jQuery("#delivery-date-future-box > .order-type-selected-img").show();
	jQuery("#order-time-picker-wrapper").show();
	jQuery("#order-time-picker").jqdate({
	    nextImg:"/static/img/arrow-nextbutton",
	    prevImg:"/static/img/arrow-calendarbutton",
	    dateImg:"/static/img/arrow-timeslot-button.png"
	});
	jQuery(".jqdate-time-table-col-0.active").live("click",function() {
	    get_selected_time();
	});
	jQuery(".jqdate-time-table-col-1.active").live("click",function() {
	    get_selected_time();
	});
	jQuery(".jqdate-time-table-col-2.active").live("click",function() {
	    get_selected_time();
	});
	jQuery(".jqdate-time-table-col-3.active").live("click",function() {
	    get_selected_time();
	});
    }
}

/*
  @author: Zach Wick
  @description: This function gets the selected date+time
*/
function get_selected_time() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = parseInt(jQuery(".jqdate-header-date.selected").children(".jqdate-header-num").html());
    var selectedDate = new Date(year,month,day);
    var timeStr = jQuery(".active.selected").html().substr(0,7);


    jQuery("#order-time-text > .delivery-date").html(selectedDate.toDateString());
    jQuery("#order-time-text > .delivery-time").html("Delivered by "+timeStr);
    jQuery("#order-time-text-img").show();
    jQuery("#next-step-wrapper-step-2").show();
    var orderStatus = jQuery("#order-status-text").html().split("-");
    orderStatus[2] = selectedDate.toDateString()+" by "+timeStr.replace("<","");
    jQuery("#order-status-text").html(orderStatus[0]+" - "+orderStatus[1]+" - "+orderStatus[2]);
}