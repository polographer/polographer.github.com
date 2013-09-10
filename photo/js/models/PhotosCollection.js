var App = App || {};
App.Models = App.Models || {};

App.Models.PhotosCollection = Backbone.Collection.extend({ 
	model:App.Models.Photo,
});