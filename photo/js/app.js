var App = App || {};
App.Views = App.Views || {};
var app_router;

$(function () {

	//this is supposed to be server side, buuuut
	//I don't have server !

	function bootstrap(){
		App.Extras.Spinner.spin();

		app_router = new App.Router();
		var view = new App.Views.GalleryView({model:gallery_data});

		Backbone.history.start();
		if(window.location.hash==""){
			app_router.navigate("#/gallery/default/image/1" );
		}
	};

	var gallery_data = new App.Models.PortfolioCollection;
	
	gallery_data.fetch({ success: function(data) { 
		bootstrap();
		App.Extras.Spinner.stop();
	}});	

	//IE fun !
	if ($.browser.msie  ){
		alert("Sorry this site don't work on internet explorer; lo sentimos este sitio no funciona bien en Internet Explorer");
	}


	/*
	$("#img-placeholder").load(function(){
		console.log("e");
		App.Extras.Spinner.stop();
	});
	*/
});

