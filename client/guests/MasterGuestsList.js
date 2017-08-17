Template.MasterGuestsList.onCreated(function(){
	let self = Template.instance();

  	self.searchQuery = new ReactiveVar();
  	self.searching   = new ReactiveVar( false );

	self.autorun(function(){
		self.subscribe( 'guests', self.searchQuery.get(), () => {
      		setTimeout( () => {
        		self.searching.set( false );
      		}, 300 );
		});
	});
});

Template.MasterGuestsList.helpers({
	guests() {
		let guests = Guests.find({});
		if (guests) {
			return guests;
		}
	},
	searching() {
		return Template.instance().searching.get();
	},
	query(){
    	return Template.instance().searchQuery.get();
  	}
});

Template.MasterGuestsList.events({
	'keyup [name="search"]' ( event, template ) {
	    let value = event.target.value.trim();

	    if ( value !== '' && event.keyCode === 13 ) {
	    	template.searchQuery.set( value );
	    	template.searching.set( true );
	    }

	    if ( value === '' ) {
	      	template.searchQuery.set( value );
	    }
  	}
});