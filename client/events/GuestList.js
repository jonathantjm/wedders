Template.GuestList.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleEvent', id);
		self.subscribe('allGuests');
	});
});

Template.GuestList.helpers({
	event: ()=> {
		var id = FlowRouter.getParam('id');
		return Events.findOne({_id: id});
	},
	guestList: ()=> {
		var id = FlowRouter.getParam('id');
		return Guests.find({
			"invitedEvents": id
		});
	},
	guestExists: ()=> {
		var id = FlowRouter.getParam('id');
		if (Guests.find({"invitedEvents": id}).count() == 0){
			return false;
		}
		return true;
	}
});