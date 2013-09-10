var App = App || {};
App.Extras = App.Extras || {};

$(function () {

  var opts = {
    lines: 9, // The number of lines to draw
    length: 4, // The length of each line
    width: 3, // The line thickness
    radius: 4, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#fff', // #rgb or #rrggbb
    speed: 1.3, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: true, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };

  App.Extras.Spinner = new Spinner(opts).spin();
  //target.appendChild(spinner.el);
  document.getElementById('spinner').appendChild(App.Extras.Spinner.el);
});