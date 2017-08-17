Template.UpcomingEvent.onCreated(function(){
	var self = this;
	var eventId = "";

	self.autorun(function(){
		self.subscribe('eventByDate');
		self.subscribe('allGuests');
	});
});

Template.UpcomingEvent.helpers({
	event: ()=> {
		Template.instance().eventId = Events.findOne({})._id;
		return Events.findOne({});
	},
	noOfGuests: () => {
		var id = Template.instance().eventId;
		return Guests.find({
			"invitedEvents": id
		}).count();
	},
	eventExists: ()=> {
		if (Events.find().count() === 0){
			return false;
		}
		return true;
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