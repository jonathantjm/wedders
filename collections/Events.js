import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
SimpleSchema.extendOptions(['autoform']);

Events = new Mongo.Collection("events");

if ( Meteor.isServer ) {
  Events._ensureIndex( { author: 1, startDate: -1 } );
}

Events.allow({
	insert: function(userId,doc){
		return !!userId;
	},
	update: function(userId,doc){
		return !!userId;
	}
});

EventSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Event Name",
		autoform: {
			placeholder: "e.g. My Beautiful Wedding"
		}
	},
	address: {
		type: String,
		label: "Address",
		autoform: {
			placeholder: "e.g. 13 Computing Drive, Singapore 117417"
		}
	},
	startDate: {
		type: Date,
		label: "Date",
		autoform: {
         	type: 'bootstrap-datepicker',
         	datePickerOptions: {
                format: "dd/mm/yyyy",
            }
      	},
	},
	desc: {
		type: String,
		label: "Description",
		autoform: {
      		afFieldInput: {
        		type: 'summernote',
        		class: 'editor'
      		}
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
	deleteEvent: function(id){
		Events.remove(id);
	}
});

Events.attachSchema(EventSchema);