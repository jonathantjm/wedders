Template.NewGuest.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('events');
	});
});

Template.NewGuest.onDestroyed(function () {
  AutoForm.resetForm('newGuestForm');
});

AutoForm.hooks({
  newGuestForm: {
    onSuccess: function (insertDoc, updateDoc, currentDoc) {
      Session.set('addSuccess', true);
      FlowRouter.go('/guests');
      Session.set('addSuccess', false);
  	}
  }
});