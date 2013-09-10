var App = App || {};
App.Views = App.Views || {};

$(function () {

	App.Views.GalleryView = Backbone.View.extend({
		redraw:false,
		current_gallery_m:undefined,
		
		initialize: function() {
	        this.current_gallery_m = new App.Models.Gallery()
			this.carousel = new App.Views.CarouselView({model:this.current_gallery_m});
			this.init_gallery_menu();

			app_router.on("view", this.switch, this);
	  	},
		
		switch:function(name,id){
			var gallery = this.model.where({short_name:name});
			if(gallery.length){
				if (this.current_gallery_m.get("short_name") != gallery[0].get("short_name") ){
					this.current_gallery_m.photos.reset(gallery[0].photos.toJSON() );
					this.current_gallery_m.set("short_name", gallery[0].get("short_name"));
					this.carousel.switch_to(id);				
				}
			}
			else{
				var found = this.model.at(0);
				this.current_gallery_m.photos.reset(found.photos.toJSON() );
				this.current_gallery_m.set("short_name", found.get("short_name"));
				app_router.navigate("#/gallery/"+this.current_gallery_m.get("short_name")+"/image/"+id );
				this.carousel.switch_to(id);
			}
		},
		
		init_gallery_menu:function(){
			this.model.each(function(gal_data){
								
				var link_item = $("<a>",{
					text: gal_data.get("short_name"),
					href: "#/gallery/"+gal_data.get("short_name")+"/image/1"
				});
				
				$("#gallery_dropdown").append( $("<li></li>").append(link_item));
			})
		} 
		
	});
});
