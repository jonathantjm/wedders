Template.EventSingle.onCreated(function(){
	Session.set('editMode', false);
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleEvent', id);
		self.subscribe('guests');
	});
});

Template.EventSingle.helpers({
	event: ()=> {
		var id = FlowRouter.getParam('id');
		return Events.findOne({_id: id});
	}
});

Template.EventSingle.events({
	'click .fa-window-close' : function(){
		if (confirm("Are you sure you want to delete this event?\nYou cannot undo this change afterwards.") == true) {
    		Session.set('editMode', false);
    		var id = FlowRouter.getParam('id');
			Meteor.call('deleteEvent', id);
			FlowRouter.go('events-list');
		}
	},
	'click .fa-address-book' : function(){
		var id = FlowRouter.getParam('id');
		FlowRouter.go('/guest-list/'+id);
	},
	'click .fa-pencil-square' : function(){
		Session.set('editMode', !Session.get('editMode'));
	}
});

Template.registerHelper("prettifyDate", function(timestamp) {
    var curr_date = timestamp.getDate();
    var curr_month = timestamp.getMonth();
    curr_month++;
    var curr_year = timestamp.getFullYear();
    result = curr_date + "/" + curr_month + "/" + curr_year;
    return result;
});

AutoForm.hooks({
  	updateEvent: {
    	onSuccess: function (insertDoc, updateDoc, currentDoc) {
    		var id = FlowRouter.getParam('id');
    		Session.set('editMode', !Session.get('editMode'));
     		FlowRouter.go('/events');
     		FlowRouter.go('/event/'+id);
  		}
  	},
});

Template.EventSingle.rendered = function() {
   $('i[class="fa fa-window-close"]').tooltip();
   $('i[class="fa fa-address-book"]').tooltip();
   $('i[class="fa fa-pencil-square"]').tooltip();
};