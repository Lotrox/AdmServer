/*! 
* app.js
*/

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("SManagement client requires jQuery");
}

/* Server Management Client
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
 $.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
 $.AdminLTE.options = {
  //Add slimscroll to navbar menus
  //This requires you to load the slimscroll plugin
  //in every page before app.js
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
  navbarMenuHeight: "200px", //The height of the inner menu
  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 500,
  //Sidebar push menu toggle button selector
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  //Activate sidebar push menu
  sidebarPushMenu: true,
  //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: true,
  //Enable sidebar expand on hover effect for sidebar mini
  //This option is forced to true if both the fixed layout and sidebar mini
  //are used together
  sidebarExpandOnHover: false,
  //BoxRefresh Plugin
  enableBoxRefresh: true,
  //Bootstrap.js tooltip
  enableBSToppltip: true,
  BSTooltipSelector: "[data-toggle='tooltip']",
  //Enable Fast Click. Fastclick.js creates a more
  //native touch experience with touch devices. If you
  //choose to enable the plugin, make sure you load the script
  //before AdminLTE's app.js
  enableFastclick: false,
  //Control Sidebar Tree views
  enableControlTreeView: true,
  //Control Sidebar Options
  enableControlSidebar: true,
  controlSidebarOptions: {
    //Which button should trigger the open/close event
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    //The sidebar selector
    selector: ".control-sidebar",
    //Enable slide over content
    slide: true
  },
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'fa-minus',
      //Open icon
      open: 'fa-plus',
      //Remove icon
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]',
      //Collapse button selector
      collapse: '[data-widget="collapse"]'
    }
  },
  //Direct Chat plugin options
  directChat: {
    //Enable direct chat by default
    enable: true,
    //The button to open and close the chat contacts pane
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  //Define the set of colors to use globally around the website
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
 $(function () {
  "use strict";

  //Fix for IE page transitions
  $("body").removeClass("hold-transition");

  //Extend options if external options exist
  if (typeof AdminLTEOptions !== "undefined") {
    $.extend(true,
      $.AdminLTE.options,
      AdminLTEOptions);
  }

  //Easy access to options
  var o = $.AdminLTE.options;

  //Set up the object
  _init();

  //Activate the layout maker
  $.AdminLTE.layout.activate();

  //Enable sidebar tree view controls
  if (o.enableControlTreeView) {
    $.AdminLTE.tree('.sidebar');
  }

  //Enable control sidebar
  if (o.enableControlSidebar) {
    $.AdminLTE.controlSidebar.activate();
  }

  //Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth
    }).css("width", "100%");
  }

  //Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
  }

  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $('body').tooltip({
      selector: o.BSTooltipSelector,
      container: 'body'
    });
  }

  //Activate box widget
  if (o.enableBoxWidget) {
    $.AdminLTE.boxWidget.activate();
  }

  //Activate fast click
  if (o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }

  //Activate direct chat widget
  if (o.directChat.enable) {
    $(document).on('click', o.directChat.contactToggleSelector, function () {
      var box = $(this).parents('.direct-chat').first();
      box.toggleClass('direct-chat-contacts-open');
    });
  }

  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
   $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var group = $(this);
    $(this).find(".btn").on('click', function (e) {
      group.find(".btn.active").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });

  });
 });

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
 function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.AdminLTE.layout.activate()
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */
   $.AdminLTE.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $('body, html, .wrapper').css('height', 'auto');
      $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      // Remove overflow from .wrapper if layout-boxed exists
      $(".layout-boxed > .wrapper").css('overflow', 'hidden');
      //Get window height and the wrapper height
      var footer_height = $('.main-footer').outerHeight() || 0;
      var neg = $('.main-header').outerHeight() + footer_height;
      var window_height = $(window).height();
      var sidebar_height = $(".sidebar").height() || 0;
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - footer_height);
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
          if (controlSidebar.height() > postSetWidth)
            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }

      }
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      //Enable slimscroll for fixed layout
      if ($.AdminLTE.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //Destroy if it exists
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          //Add slimscroll
          $(".sidebar").slimScroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */
   $.AdminLTE.pushMenu = {
    activate: function (toggleBtn) {
      //Get the screen sizes
      var screenSizes = $.AdminLTE.options.screenSizes;

      //Enable sidebar toggle
      $(document).on('click', toggleBtn, function (e) {
        e.preventDefault();

        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
          }
        }
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
          }
        }
      });

      $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });

      //Enable expand on hover for sidebar mini
      if ($.AdminLTE.options.sidebarExpandOnHover
        || ($('body').hasClass('fixed')
          && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
    }
  },
  expandOnHover: function () {
    var _this = this;
    var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
      //Expand sidebar on hover
      $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
          && $("body").hasClass('sidebar-collapse')
          && $(window).width() > screenWidth) {
          _this.expand();
      }
    }, function () {
      if ($('body').hasClass('sidebar-mini')
        && $('body').hasClass('sidebar-expanded-on-hover')
        && $(window).width() > screenWidth) {
        _this.collapse();
    }
  });
    },
    expand: function () {
      $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function () {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    }
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.AdminLTE.tree('.sidebar')
   */
   $.AdminLTE.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.AdminLTE.options.animationSpeed;
    $(document).off('click', menu + ' li a')
    .on('click', menu + ' li a', function (e) {
        //Get the clicked link and the next element
        var $this = $(this);
        var checkElement = $this.next();

        //Check if the next element is a menu and is visible
        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
          //Close the menu
          checkElement.slideUp(animationSpeed, function () {
            checkElement.removeClass('menu-open');
            //Fix the layout in case the sidebar stretches over the height of the window
            //_this.layout.fix();
          });
          checkElement.parent("li").removeClass("active");
        }
        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
          //Get the parent menu
          var parent = $this.parents('ul').first();
          //Close all open menus within the parent
          var ul = parent.find('ul:visible').slideUp(animationSpeed);
          //Remove the menu-open class from the parent
          ul.removeClass('menu-open');
          //Get the parent li
          var parent_li = $this.parent("li");

          //Open the target menu and add the menu-open class
          checkElement.slideDown(animationSpeed, function () {
            //Add the class active to the parent li
            checkElement.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parent_li.addClass('active');
            //Fix the layout in case the sidebar stretches over the height of the window
            _this.layout.fix();
          });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
          e.preventDefault();
        }
      });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */
   $.AdminLTE.controlSidebar = {
    //instantiate the object
    activate: function () {
      //Get the object
      var _this = this;
      //Update options
      var o = $.AdminLTE.options.controlSidebarOptions;
      //Get the sidebar
      var sidebar = $(o.selector);
      //The toggle button
      var btn = $(o.toggleBtnSelector);

      //Listen to the click event
      btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
          && !$('body').hasClass('control-sidebar-open')) {
          //Open the sidebar
        _this.open(sidebar, o.slide);
      } else {
        _this.close(sidebar, o.slide);
      }
    });

      //If the body has a boxed layout, fix the sidebar bg position
      var bg = $(".control-sidebar-bg");
      _this._fix(bg);

      //If the body has a fixed layout, make the control sidebar fixed
      if ($('body').hasClass('fixed')) {
        _this._fixForFixed(sidebar);
      } else {
        //If the content height is less than the sidebar's height, force max height
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
          _this._fixForContent(sidebar);
        }
      }
    },
    //Open the control sidebar
    open: function (sidebar, slide) {
      //Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    //Close the control sidebar
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        if (_this.hasBindedResize) {
          return;
        }
        $(window).resize(function () {
          _this._fix(sidebar);
        });
        _this.hasBindedResize = true;
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      }
    },
    _fixForFixed: function (sidebar) {
      sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px'
      });
    },
    _fixForContent: function (sidebar) {
      $(".content-wrapper, .right-side").css('min-height', sidebar.height());
    }
  };

  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.AdminLTE.boxWidget.activate()
   *        Set all your options in the main $.AdminLTE.options object
   */
   $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      //Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      //Find the box parent
      var box = element.parents(".box").first();
      //Find the body and the footer
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
        .removeClass(_this.icons.collapse)
        .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass("collapsed-box");
        });
      } else {
        //Convert plus into minus
        element.children(":first")
        .removeClass(_this.icons.open)
        .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass("collapsed-box");
        });
      }
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents(".box").first();
      box.slideUp(this.animationSpeed);
    }
  };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
 (function ($) {

  "use strict";

  $.fn.boxRefresh = function (options) {

    // Render options
    var settings = $.extend({
      //Refresh button selector
      trigger: ".refresh-btn",
      //File source to be loaded (e.g: ajax/src.php)
      source: "",
      //Callbacks
      onLoadStart: function (box) {
        return box;
      }, //Right after the button has been clicked
      onLoadDone: function (box) {
        return box;
      } //When the source has been loaded

    }, options);

    //The overlay
    var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

    return this.each(function () {
      //if a source is specified
      if (settings.source === "") {
        if (window.console) {
          window.console.log("Please specify a source first - boxRefresh()");
        }
        return;
      }
      //the box
      var box = $(this);
      //the button
      var rBtn = box.find(settings.trigger).first();

      //On trigger click
      rBtn.on('click', function (e) {
        e.preventDefault();
        //Add loading overlay
        start(box);

        //Perform ajax call
        box.find(".box-body").load(settings.source, function () {
          done(box);
        });
      });
    });

    function start(box) {
      //Add overlay and loading img
      box.append(overlay);

      settings.onLoadStart.call(box);
    }

    function done(box) {
      //Remove overlay and loading img
      box.find(overlay).remove();

      settings.onLoadDone.call(box);
    }

  };

})(jQuery);

/*
 * EXPLICIT BOX CONTROLS
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded, toggle and remove box.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 * @usage $("#box-widget").toggleBox();
 * @usage $("#box-widget").removeBox();
 */
 (function ($) {

  'use strict';

  $.fn.activateBox = function () {
    $.AdminLTE.boxWidget.activate(this);
  };

  $.fn.toggleBox = function () {
    var button = $($.AdminLTE.boxWidget.selectors.collapse, this);
    $.AdminLTE.boxWidget.collapse(button);
  };

  $.fn.removeBox = function () {
    var button = $($.AdminLTE.boxWidget.selectors.remove, this);
    $.AdminLTE.boxWidget.remove(button);
  };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
 (function ($) {

  'use strict';

  $.fn.todolist = function (options) {
    // Render options
    var settings = $.extend({
      //When the user checks the input
      onCheck: function (ele) {
        return ele;
      },
      //When the user unchecks the input
      onUncheck: function (ele) {
        return ele;
      }
    }, options);

    return this.each(function () {

      if (typeof $.fn.iCheck != 'undefined') {
        $('input', this).on('ifChecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onCheck.call(ele);
        });

        $('input', this).on('ifUnchecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onUncheck.call(ele);
        });
      } else {
        $('input', this).on('change', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          if ($('input', ele).is(":checked")) {
            settings.onCheck.call(ele);
          } else {
            settings.onUncheck.call(ele);
          }
        });
      }
    });
  };
}(jQuery));

 /*Plots*/
 $(function () {
  /* jQueryKnob */

  $(".knob").knob({
      /*change : function (value) {
       //console.log("change : " + value);
       },
       release : function (value) {
       console.log("release : " + value);
       },
       cancel : function () {
       console.log("cancel : " + this.value);
     },*/
     draw: function () {

        // "tron" case
        if (this.$.data('skin') == 'tron') {

          var a = this.angle(this.cv)  // Angle
              , sa = this.startAngle          // Previous start angle
              , sat = this.startAngle         // Start angle
              , ea                            // Previous end angle
              , eat = sat + a                 // End angle
              , r = true;

              this.g.lineWidth = this.lineWidth;

              this.o.cursor
              && (sat = eat - 0.3)
              && (eat = eat + 0.3);

              if (this.o.displayPrevious) {
                ea = this.startAngle + this.angle(this.value);
                this.o.cursor
                && (sa = ea - 0.3)
                && (ea = ea + 0.3);
                this.g.beginPath();
                this.g.strokeStyle = this.previousColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                this.g.stroke();
              }

              this.g.beginPath();
              this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
              this.g.stroke();

              this.g.lineWidth = 2;
              this.g.beginPath();
              this.g.strokeStyle = this.o.fgColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
              this.g.stroke();

              return false;
            }
          }
        });
  /* END JQUERY KNOB */

    //INITIALIZE SPARKLINE CHARTS
    $(".sparkline").each(function () {
      var $this = $(this);
      $this.sparkline('html', $this.data());
    });

    /* SPARKLINE DOCUMENTATION EXAMPLES http://omnipotent.net/jquery.sparkline/#s-about */
    /*drawDocSparklines();
    drawMouseSpeedDemo();*/

  });

 var myApp;
 myApp = myApp || (function () {
  return {
    showPleaseWait: function() {
      $('#content').show();
      $('#loadingScreen').show();
    },
    hidePleaseWait: function () {
      $('#content').show();
      $('#loadingScreen').hide();
    },

  };
})();

myApp.showPleaseWait();



/*Obtener datos almacenados*/
var ip = localStorage.getItem("API_IP");
var port = localStorage.getItem("API_PORT");
/*Mostrar datos almacenados*/    


$(function() {
  $(".dial").knob();
  $(".dial2").knob();
});

$('.dial').trigger(
  'configure',
  {
    "min":10,
    "max":40,
    "fgColor":"#330000",
    "skin":"tron",
    "cursor":true
  }
  );
$('.dial2').trigger(
  'configure',
  {
    "min":10,
    "max":40,
    "fgColor":"#330000",
    "skin":"tron",
    "cursor":true
  }
  );

/* Status */
function status(){
  console.log("status");
  $.ajax({
    url: 'https://' + ip + ':' + port + '/system/status',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
      var obj = jQuery.parseJSON( output );
      $('.hostname').html(obj.host); 
      $('.so').html(obj.so);
      $('.kernel').html(obj.kernel);
      $('.arch').html(obj.arch);
      $('.ramGb').html(obj.ramGb);
      $('.mhzCPU').html(obj.mhzCPU);
      $('.model').html(obj.model);
      $('.numCPU').html(obj.numCPU);
      $('.uptime').html(obj.uptime);

      //Update dial for current CPU
      $('.dial')
      .val(obj.cuCPU)
      .trigger('change');
      $('.usageCPU').html("<b>CPU</b> " + obj.cuCPU + "%");

      $('.cpu').html("1 min: " + obj.loadAVG[0]);
      $('.cpu-two').html("5 min: " + obj.loadAVG[1]);
      $('.cpu-three').html("15 min: " + obj.loadAVG[2]);

      //Update dial for current MEM
      $('.dial2')
      .val(obj.cuMEM)
      .trigger('change');
      $('.usageMEM').html("<b>MEM</b> " + obj.cuMEM + "%");
    }
  });
}

/* WiFi */
function wifi(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/wireless/clients',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
     var obj = jQuery.parseJSON( output );
     $('.numWifi').html(obj.length); 
     var ul = $("<ul/>");
     $(obj).each(function(){
      $("<li/>").text(this.split(" ")[2] + "\n" + this.split(" ")[0]).appendTo(ul);

    });
     $('.ul').html(ul);
   },
   error: function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR.status)
  },
});
}


/*SAR CPU*/
function sarCPU(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/sar/cpu',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
      var j = JSON.parse(output);
      var data2 = [];
      for (i = 0; i < Object.keys(JSON.parse(output)).length; i++){
        data2.push({y: j[i].time, a: parseFloat(j[i].user), b: parseFloat(j[i].system), c: parseFloat(j[i].iowait), d: parseFloat(j[i].nice), e: parseFloat(j[i].steal)});
      }

      var bar = new Morris.Bar({
        element: 'bar-chart',
        resize: true,
        data: data2,
        barColors: ['#c34b2e', '#9c9b9a', '#851fa5', '#428dc7', '#4bb346'],
        xkey: 'y',
        ykeys: ['a', 'b', 'c', 'd', 'e'],
        labels: ['USER%', 'SYS%', 'IO%', 'NICE%', 'STEAL%'],
        hideHover: 'auto',
        stacked: true
      })
    },
    error: function () {
     console.log('Error')
   }
 });
}

/*SAR MEM*/
function sarMEM(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/sar/mem',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
      var j = JSON.parse(output);
      var data2 = [];
      for (i = 0; i < Object.keys(JSON.parse(output)).length; i++){
        var used = Math.round(parseFloat(j[i].used)/(parseFloat(j[i].free)+parseFloat(j[i].used))*10000)/100
        var used = Math.round(parseFloat(j[i].used)/1024/1024*100)/100
        data2.push({y: j[i].time, a: used});
      }
      var bar = new Morris.Area({
        element: 'bar-chart',
        resize: true,
        data: data2,
        lineColors: ['#00a65a'],
        xkey: 'y',
        ykeys: ['a'],
        labels: ['USED(GB)'],
        hideHover: 'auto',
        parseTime: false,
        pointSize: 0
      })
    },
    error: function () {
     console.log('Error')
   }
 });
}


/*SAR DISK*/
function sarDISK(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/sar/disk',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
      var j = JSON.parse(output);
      var data2 = [];
      for (i = 0; i < Object.keys(JSON.parse(output)).length; i++){
        used  = Math.round(parseFloat(j[i].used)*100)/100;
        tps   = Math.round(parseFloat(j[i].tps)*100)/100;
        read  = Math.round(parseFloat(j[i].read)*100)/100;
        write = Math.round(parseFloat(j[i].write)*100)/100;

        data2.push({y: j[i].time, a: used, b: tps, c: read, d: write });
      }
      var bar = new Morris.Area({ // Disk Usage
        element: 'bar-chart',
        resize: true,
        data: data2,
        lineColors: ['#FFa65a'],
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Used (%)'],
        hideHover: 'auto',
        parseTime: false,
        pointSize: 0
      })
      var bar2 = new Morris.Area({ // Disk Activity
        element: 'bar-chart2',
        resize: true,
        data: data2,
        lineColors: ['#FFa65a','#3c8dbc','#af28a1'],
        xkey: 'y',
        ykeys: ['b', 'c', 'd'],
        labels: ['Transfers per second', 'Sectors read (512B)', 'Sectors write (512B)'],
        hideHover: 'auto',
        parseTime: false,
        pointSize: 0
      })
    },
    error: function () {
     console.log('Error')
   }
 });
}


/* CURRENT TEMPERATURE */
function temperature(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/system/temperature',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
     $('.temp').html("<b>" + output + "°C</b>"); 
     $('.temp2').html( output ); 
     var elem = document.getElementById("temp2");
     elem.style.width =  output + "%";
   },
   error: function () {
     console.log('Error')
   }
 });
}

/* NETWORK AVG */
function netAVG(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/sar/net/avg',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
     var j = JSON.parse(output);
     $('.tx').html(j.tx); 
     $('.rx').html(j.rx);
   },
   error: function () {
     console.log('Error')
   }
 });
}


/* IPTables */
function firewall(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/system/firewall',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
     $('.firewall').html(output); 
   },
   error: function () {
     console.log('Error')
   }
 });
}


/* LOG */
function log(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/api/log',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
     var obj = jQuery.parseJSON( output ); 
     var st = "";
     for (i = Object.keys(JSON.parse(output)).length - 1; i > -1 ; i--){
      if (obj[i].check == "OK"){
        st = st + '<li><a href="#"><h4>' + obj[i].ip + ' <small><i class="fa fa-clock-o"></i> ' + obj[i].time + ' </small> <i class="fa fa-check-circle"></i>   </h4></a></li>'

      }else{
        st = st + '<li><a href="#"><h4>' + obj[i].ip + ' <small><i class="fa fa-clock-o"></i> ' + obj[i].time + ' </small> <i class="fa fa-times-circle"></i>   </h4></a></li>'
      }
    };
    $('.logList').html(st);
    $('.numLog').html(Object.keys(JSON.parse(output)).length);
  },
  error: function () {
   console.log('Error');
   if (window_focus){
    $(location).attr('href', '/index.html');
  }

}
});
}


/* Services list */
function services(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/services/list',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
      var obj = jQuery.parseJSON( output );
      data2 = []
      for (i = 0; i < Object.keys(JSON.parse(output)).length; i++){
        color = 'list-group-item-success'; 
        icon  = '<i style="float: right" class="fa fa-pencil-square-o"></i>'
        start  = ""
        if (obj[i].status === 'exited'){ color = 'list-group-item-warning'; icon  = '<i style="float: right" class="fa fa-pencil-square-o"></i>'};
        if (obj[i].status === 'dead')  { color = 'list-group-item-danger'; icon  = '<i style="float: right" class="fa fa-pencil-square-o"></i>'};
        data2.push('<div data-toggle="modal" data-target="#modalService" class="list-group-item list-group-item-action ' + color + '" id="' + start + obj[i].name +' ">' + obj[i].name + icon + '</div>');
      }
      $('.services').html(data2);
      myApp.hidePleaseWait();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.status)
    },
  });

  var ul = document.getElementById('listServices');

  ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'DIV'){
      nameService = e.target.id.split('.service')[0];
      localStorage.setItem("service", nameService);
      $('.service').html(nameService);

      $.ajax({
        url: 'https://' + ip + ':' + port + '/services/' + nameService,
        type: 'POST',
        data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
        success: function (output) {     
         newout = JSON.parse(output);
         $('.nameServiceInfo').html(newout.name); 
         $('.loadedServiceInfo').html(newout.loaded); 
         $('.statusServiceInfo').html(newout.status); 
         console.log(newout.name);
         localStorage.getItem(newout.name);
       },
       error: function () {
         console.log('Error')
       }
     });

    }
  });
}


function startService(){
  service = localStorage.getItem("service");
  $.ajax({
    url: 'https://' + ip + ':' + port + '/services/' + service + '/start',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
      location.reload();
    },
    error: function () {
      location.reload();
    }
  });
}

function stopService(){
  service = localStorage.getItem("service");
  $.ajax({
    url: 'https://' + ip + ':' + port + '/services/' + service + '/stop',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
      location.reload();
    },
    error: function () {
     location.reload();
   }
 });
}

function restartService(){
  service = localStorage.getItem("service");
  $.ajax({
    url: 'https://' + ip + ':' + port + '/services/' + service + '/restart',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
     location.reload();
   },
   error: function () {
     location.reload();
   }
 });
}


/*DISK SPACE*/
function diskSpace(){
  $.ajax({
    url: 'https://' + ip + ':' + port + '/system/disk',
    type: 'POST',
    data : JSON.stringify({ key: localStorage.getItem("API_KEY") }),
    success: function (output) {
      var j = JSON.parse(output);
      used  = Math.round(j.used/1024/1024*100)/100;
      avail = Math.round(j.avail/1024/1024*100)/100;
      total = used + avail;
      $('.folderDisk').html(j.folder + " [" + total + " GB]"); 
      //- PIE CHART -
      var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
      var pieChart = new Chart(pieChartCanvas);
      var PieData = [
      {
        value: avail,
        color: "#1b9122",
        highlight: "#1fba29",
        label: "available"
      },
      {
        value: used,
        color: "#645e64",
        highlight: "#878387",
        label: "used"
      }
      ];
      var pieOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke: true,
      //String - The colour of each segment stroke
      segmentStrokeColor: "#fff",
      //Number - The width of each segment stroke
      segmentStrokeWidth: 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 10, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps: 100,
      //String - Animation easing effect
      animationEasing: "easeOutBounce",
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate: true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);

  },
  error: function () {
   console.log('Error')
 }
});
}


/* ---------------- */

$(function(){
  $("#header").load("header.html"); 
  $("#sidebar").load("sidebar.html"); 
  $("#footer").load("footer.html"); 
});

var window_focus = true;

$(window).focus(function() {
  //console.log("true");
  window_focus = true;
  changeInterval(1);
})
.blur(function() {
  //console.log("false");
  window_focus = false;
  changeInterval(10);
});




