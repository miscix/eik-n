define([
	'jquery',
	'underscore',
	'backbone',
	'views/lastfont',
	'collections/lastglyphs'
], function($, _, Backbone, FontView, Glyphs) {
	var Model = Backbone.Model.extend({
			defaults: {
				name: 'Eicon'
			},
			initialize: function(){
				this.view = new FontView(this);

				this.glyphs = new Glyphs();
			},
			toggleGlyph: function(glyph){
				var g = this.glyphs.get(glyph.id);
				if (g) {
					g.destroy();
				} else {
					this.glyphs.add(glyph);
				}
			},
			editGlyph: function(glyph){

			},
			source: function(){
				var glyphs = this.glyphs.toJSON();
				return _.extend(this.toJSON(), {
						glyphs: glyphs
					});
			},
			save: function(){
				var data = this.source();
				$.ajax({
					url: '/api/generate',
					data: data,
					type: 'post',
					dataType: 'json',
					complete: function(a, b){
						console.log(a, b);
					}

				});

			}
		});
	return Model;
});