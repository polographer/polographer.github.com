var App = App || {};

$(function () {
	App.Router = Backbone.Router.extend({
	    routes:{
	        "gallery/:name/image/:id":"view",
	    },
	
	    view:function (name, id) {
    		app_router.trigger("view",name,id);
		}
	});
});