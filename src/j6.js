j6 = {
  datepicker: {
    init: function(selector) {
      $(selector).datepicker();      
    }            
  },

  dialog: {
    init: function(selector) {
      var target = $(selector);
      target.dialog({ modal: true, 
                      width: parseInt(target.css("width")),
                      height: parseInt(target.css("height")),
                      draggable: false });
    }        
  },

  slider: {
    init: function(selector) {
      var element = $(selector);
      element.slider({step: element.data("step"), 
                      max: element.data("max"), 
                      min: element.data("min"),
                      value: element.data("value"),
                      slide: j6.slider.update});
    },

    update: function(event, ui) {
      $($(this).data("target")).val(ui.value);
    }
  }
}

$(function() {
  $.fn._target = function() {
    return $($(this).attr("href"));
  }
  
  $("li.swapable input").focus(function() {
     $(this).siblings("label").hide(); 
  }).blur(function() {
    $(this).siblings("label").toggle($(this).val() == "");
  }).blur();

  $("a.trigger").click(function(event) {
    if ((target = $(this)._target()).hasClass("dialog")) {
      j6.dialog.init(target);
    } else {
      target.slideToggle();
    }
    event.preventDefault();
  });

  $("a.filter").live('click', function(event) {
    var href = $(this).attr("href");
    var siblings = href.indexOf(" > ") > -1 ? $(href.split(" > ")[0]).children() : $(this)._target().siblings();
    siblings.hide();
    $(this)._target().show();
    $(this).parent("li").addClass("selected").siblings().removeClass("selected");
    event.preventDefault();
  });

  j6.slider.init(".slider");

  $(".calendar").datepicker();
});
