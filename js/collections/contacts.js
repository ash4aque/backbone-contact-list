var app = app || {};

(function () {
	'use strict';

	var Contacts = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('contacts-backbone'),
	});

	app.contacts = new Contacts();
})();
