var App = App || {};
App.Models = App.Models || {};

App.Models.PortfolioCollection = Backbone.Collection.extend({
    model: App.Models.Gallery,
	url: "./data/catalog.json?rand="+Math.round(Math.random()*100000)
});