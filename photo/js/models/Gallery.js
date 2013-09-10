var App = App || {};
App.Models = App.Models || {};

App.Models.Gallery = Backbone.Model.extend({

	photos: undefined,
	initialize: function() {
		this.photos = new App.Models.PhotosCollection(this.get("photos_collection"));
	}	

});