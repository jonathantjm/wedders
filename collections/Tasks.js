import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
SimpleSchema.extendOptions(['autoform']);

Tasks = new Mongo.Collection("tasks");

Tasks.allow({
	insert: function(userId,doc){
		return !!userId;
	},
	update: function(userId,doc){
		return !!userId;
	}
});

TaskSchema = new SimpleSchema({
	desc: {
		type: String,
		label: "Task Description",
		autoform: {
			placeholder: "📝 Enter task description"
		}
	},
	isChecked: {
		type: Boolean,
		autoform: {
			type: "hidden"
		},
		optional: true,
	},
	author: {
		type: String,
		label: "User Id",
		autoform: {
			type: "hidden"
		},
		autoValue: function(){
			return this.userId;
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoform: {
			type: "hidden"
		},
		autoValue: function(){
			return new Date();
		}
	},
},{ tracker: Tracker });

Meteor.methods({
	deleteTask: function (taskId) {
      	var task = Tasks.findOne(taskId);
      	Tasks.remove(taskId);
   	},
   	setChecked: function (taskId, setChecked) {
      	Tasks.update(taskId, { $set: { isChecked: setChecked }});
   	}
});

Tasks.attachSchema(TaskSchema);