Meteor.publish ('events', function(){
	return Events.find({author: this.userId});
});

Meteor.publish ('eventByDate', function(){
	return Events.find(
		{
			author: this.userId
		},
		{
			sort: {"startDate": 1},
			limit: 1
		}
	);
});

Meteor.publish ('tasks', function(){
  return Tasks.find({author: this.userId});
});

Meteor.publish ('guests', function(search){
	check( search, Match.OneOf( String, null, undefined ) );

  	let query      = { author: this.userId },
    	projection = { limit: 10, sort: { name: 1 } };

  	if ( search ) {
    	let regex = new RegExp( search, 'i' );

    	query = {
      		$and: [
		        { name: regex },
		        { author: this.userId}
      		]
    	};

    	projection.limit = 100;
  	}
  	return Guests.find( query, projection );
});
 	
Meteor.publish ('allGuests', function(){
	return Guests.find({author: this.userId});
});

Meteor.publish ('singleEvent', function(id){
	check(id, String);
	return Events.find({_id: id});
});

Meteor.publish ('singleGuest', function(id){
	check(id, String);
	return Guests.find({_id: id});
});