Template.ToDoWidget.onCreated(function(){
   var self = this;
   self.autorun(function(){
      self.subscribe('tasks');
   });
});

Template.ToDoWidget.helpers({
   tasks: ()=> {
      return Tasks.find({});
   },
   checked: function(){
      return this.isChecked;
   }
});

Template.ToDoWidget.events({ 
   'click .fa-trash-o': function () {
      Meteor.call("deleteTask", this._id);
   },
   'click .fa-check': function () {
      Meteor.call("setChecked", this._id, !this.isChecked);
   },
});