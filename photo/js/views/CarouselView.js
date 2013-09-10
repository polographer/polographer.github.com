var App = App || {};
App.Views = App.Views || {};

$(function () {

App.Views.CarouselView = Backbone.View.extend({
	tagName:'div',
	model:App.Models.Gallery,
	current_index: 1,

	el: $("#nav-menu-bb"),

	events: {
		"click #prev_photo": "previous",
		"click #next_photo": "next"
	},

	initialize: function() {
		this.model.bind('change', this.preload, this);
	},

	previous: function(){
		this.current_index--;
		if (this.current_index < 1 ){
			this.current_index = (this.model.photos.length);
		}
		this.load_resource();
	},

	next: function(){
		this.current_index++;
		if (this.current_index > this.model.photos.length ){
			this.current_index = 1;
		}
		this.load_resource();
	},
	
	switch_to:function(id){
		if (id > 0 && id < this.model.photos.length ){
			this.current_index = id;
		}else{
			this.current_index = 1;
		}
		this.load_resource();
	},

	trackPageView: function(){
		if ( window.location.hostname.indexOf('warstories') >= 0){
			//console.log("rtrack called");
			_gaq.push(["_trackPageview", location.pathname+location.search+location.hash]);
		}
	},

	load_resource: function(){
		App.Extras.Spinner.spin();
		//console.log('ola ke ase');
		var requested = this.model.photos.at(this.current_index -1);
		//$("#img-placeholder").attr("src","./images/" + requested.get("url") );

		$("#img-placeholder").attr("src","./images/" + requested.get("url") ).load(function(){
			App.Extras.Spinner.stop();
		});

		//$("#img-placeholder").load("./images/" + requested.get("url") );
		app_router.navigate("#/gallery/"+this.model.get("short_name")+"/image/" + this.current_index);
		this.trackPageView();
	},

	preload: function() {
		var preloaded_array = this.model.photos.map(function(p) {
			return "images/" + p.get("url");
		}, this);
		preloaded_array.shift();
		setTimeout(function(){
			$({}).imageLoader({
			    images: preloaded_array,
			    async: false,
			    timeout: 5000
			});
		}, 2000);
	}
	
});
});
