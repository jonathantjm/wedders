Template.EventsList.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('events');
	});
});

Template.EventsList.helpers({
	events: ()=> {
		return Events.find({});
	}
});