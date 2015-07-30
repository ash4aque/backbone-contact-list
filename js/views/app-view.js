var app = app || {};

(function ($, Handlebars) {
	'use strict';

	app.AppView = Backbone.View.extend({

		el: '#contact-app',
		appTemplate: Handlebars.compile($('#app-template').html()),

		events: {
			"click .js-delete-row": "deleteRowData",
			"click .js-edit-row": "editRowData",
			"click #add-new": "renderAddNewForm",
			"click #delete-all": "clearData"
			
		},

		initialize: function () {
			app.contacts = new Backbone.Collection([{
					id:1,
					name: "Mr Darin",
					companyname: "Facebook",
					email:"darin@facebook.com",
					contanctnumber:"98895-98956",
					remark:"AWS Event"
				},{
					id:2,
					name: "Mr Mike",
					companyname: "Facebook",
					email:"mike@gumgumm.com",
					contanctnumber:"98895-98956",
					remark:"Friend"
				},{
					id:3,
					name: "Mr Michael",
					companyname: "BA",
					email:"michael@ba.com",
					contanctnumber:"98895-98956",
					remark:""
				}
			]);
			this.$addnew = this.$('#add-new');
			this.$deleteAll = this.$('#delete-all');
			this.$contactform = $("#add-contact-form");
			this.listenTo(app.contacts,'add', this.render);
			this.listenTo(app.contacts, 'all', this.render);
			this.render();
		},

		render: function () {
			$(this.el).empty();
			$(this.el).html(this.appTemplate({contact:app.contacts.toJSON()}));	
		},

		renderAddNewForm: function (){
			var view = new app.FormView({Collection: app.contacts});
			var el = $("#add-contact-form");
			el.empty();
			el.append(view.render().el);
		},

		deleteRowData: function (event) {
			var rowID  = $(event.target).data('rowid');
			var candidateModel = app.contacts.get(rowID);
			app.contacts.remove(candidateModel);
		},

		editRowData: function (event) {
			var rowID  = $(event.target).data('rowid');
			var candidateModel = app.contacts.get(rowID);

			var view = new app.FormView({collection: app.contacts});
			var el = $("#add-contact-form");
			el.empty();
			el.append(view.render(rowID).el);
		},

		clearData: function () {
			app.contacts.reset();
		}
	});
})(jQuery, Handlebars);
