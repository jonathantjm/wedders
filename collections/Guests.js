import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
SimpleSchema.extendOptions(['autoform']);

Guests = new Mongo.Collection("guests");

if ( Meteor.isServer ) {
  Guests._ensureIndex( { author: 1, name: 1, inivitedEvents: 1 } );
}

Guests.allow({
	insert: function(userId,doc){
		return !!userId;
	},
	update: function(userId,doc){
		return !!userId;
	}
});
	
GuestSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		autoform: {
			placeholder: "e.g. John Smith"
		}
	},
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		label: "Email",
		autoform: {
			placeholder: "e.g. John_Smith95@gmail.com"
		}
	},
	contactNo: {
		type: String,
		label: "Contact No.",
		autoform: {
			type: 'text',
			placeholder: "e.g. +65 9123 4567"
		}
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
	invitedEvents: {
     	type: Array	,
     	label: 'Invited Events',
     	minCount: 1,
     	autoform: {
     		type: 'select-multiple',
      		options: function(){
        		return Events.find({}, {
        			sort: {
          				name: 1
         			}
         		}).map(function(c){
            		return {
              			label: c.name,
              			value: c._id
           			};
       			})
      		}
    	},
    	optional: true,
    },
    'invitedEvents.$': String
},{ tracker: Tracker });

Meteor.methods({
	deleteGuest: function(id){
		Guests.remove(id);
	}
})

Guests.attachSchema(GuestSchema);