
var app = app || {};

(function ($, Handlebars) {
	'use strict';

	app.FormView = Backbone.View.extend({

		template: Handlebars.compile($('#form-template').html()),

		events: {
			 "click .js-cancel": "closeForm",
			 "click .js-clear": "resetForm",
			 "click .js-save": "updateData"
		},

		render: function (id) {
			if (id !== undefined) {
				var candidateModel = app.contacts.get(id);
				this.$el.html(this.template(candidateModel.toJSON()));
			} else {
				this.$el.html(this.template({}));
			}
			return this;
		},

		closeForm: function () {
			this.$el.empty();
		},

		resetForm: function (event) {
			var myForm = $(event.target).closest('form');
			myForm.find("input[type=text],input[type=email], textarea").val("");
		},

		updateData: function(event){
			var self = this;
			var data =  _.object($("#contact-form").serializeArray().map(function(v) {return [v.name, v.value];}));
			var uniqueId;
			var isUpdateID = $(event.target).data('updateid');
			if(isUpdateID === ""){
				uniqueId = Math.floor((Math.random() * 100000000) + 1);
			} else {
				uniqueId = isUpdateID;
			}
			data.id = uniqueId;

			var contactModel = Backbone.Model.extend({
			    defaults: {
			        'email': '',
			        'name': '',
			        'companyname': '',
			        'contanctnumber': '',
			        'remark': '',
			    },
			    validate: function (attrs) {
			    	
			        var errors = {};
		            if (undefined == typeof attrs.name || attrs.name.length == 0) {
		            	var $el = $('[name=name]'), 
			            $group = $el.closest('.form-group');
			      		$group.addClass('has-error');
			       		$group.find('.help-block').removeClass('hidden');
		            	errors.name = 'you must enter your last name';
		            }
		            
		            if (undefined == typeof attrs.companyname || attrs.companyname.length == 0) {
		            	var $el = $('[name=companyname]'), 
			            $group = $el.closest('.form-group');
			      		$group.addClass('has-error');
			       		$group.find('.help-block').removeClass('hidden');
		                errors.companyname = 'you must enter your last name';
		            }

		            if (undefined == typeof attrs.contanctnumber || attrs.contanctnumber.length == 0) {
		            	var $el = $('[name=contanctnumber]'), 
			            $group = $el.closest('.form-group');
			      		$group.addClass('has-error');
			       		$group.find('.help-block').removeClass('hidden');
		                errors.contanctnumber = 'you must enter your last name';
		            }

		            if (undefined == typeof attrs.email || attrs.email.length == 0) {
		            	var $el = $('[name=email]'), 
			            $group = $el.closest('.form-group');
			      		$group.addClass('has-error');
			       		$group.find('.help-block').removeClass('hidden');
		                errors.name = 'you must enter your first name';
		                errors.email = 'you must enter your email address';
		            }
		            else if (attrs.email.indexOf('@') == -1 || attrs.email.split('@').length < 2) {
		            	var $el = $('[name=email]'), 
			            $group = $el.closest('.form-group');
			      		$group.addClass('has-error');
			       		$group.find('.help-block').removeClass('hidden');
		                errors.name = 'you must enter your first name';
		                errors.email = 'you must enter a valid email  ddress';
		            }
		            
		            if (_.keys(errors).length > 0){               
		    	    	return errors;   
		            }
				}
			});
			var contact = new contactModel();
			contact.set(data,{ validate: true });
			if (!contact.validationError){
                app.contacts.add(contact,{merge:true});
			    self.closeForm();
            }
		}	
	});
})(jQuery, Handlebars);

