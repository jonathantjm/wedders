Template.GuestSingle.onCreated(function(){
	Session.set('editMode', false);
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleGuest', id);
		self.subscribe('events');
	});
});

Template.GuestSingle.helpers({
	guest: ()=> {
		var id = FlowRouter.getParam('id');
		return Guests.findOne({_id: id});
	}
});

Template.GuestSingle.events({
	'click .fa-window-close' : function(){
		if (confirm("Are you sure you want to delete this guest?\nYou cannot undo this change afterwards.") == true) {
    		Session.set('editMode', false);
    		var id = FlowRouter.getParam('id');
			Meteor.call('deleteGuest', id);
			FlowRouter.go('master-guests-list');
		} 
	},
	'click .fa-pencil-square' : function(){
		Session.set('editMode', !Session.get('editMode'));
	}
});

AutoForm.hooks({
  	updateGuest: {
    	onSuccess: function (insertDoc, updateDoc, currentDoc) {
    		var id = FlowRouter.getParam('id');
    		Session.set('editMode', !Session.get('editMode'));
     		FlowRouter.go('/guests');
     		FlowRouter.go('/guest/'+id);
  		}
  	},
});

Template.GuestSingle.rendered = function() {
   $('i[class="fa fa-window-close"]').tooltip();
   $('i[class="fa fa-pencil-square"]').tooltip();
};