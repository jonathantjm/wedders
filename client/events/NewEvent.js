AutoForm.hooks({
  newEventForm: {
    onSuccess: function (insertDoc, updateDoc, currentDoc) {
      Session.set('addSuccess', true);
      FlowRouter.go('/events');
      Session.set('addSuccess', false);
  	}
  },
});
