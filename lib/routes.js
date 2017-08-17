// START OF ACCOUNTS ROUTING

Accounts.onLogin(function(){
	FlowRouter.go('logged-in');
});

Accounts.onLogout(function(context, redirect){
	FlowRouter.go('home');
});

FlowRouter.triggers.enter([function(context, redirect){	
	if (!Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/logged-in',{
	name: 'logged-in',
	action(){
		BlazeLayout.render('RedirectLayout', {main: 'LoggedInRedirect'});
	}
});

// END OF ACCOUNTS ROUTING



// START OF MAIN PAGES ROUTING /

FlowRouter.route('/',{
	name: 'home',
	action(){
		if (Meteor.userId()){ // Logged In
			BlazeLayout.render('LandingPage', {accounts: 'LoggedIn'});
		}
		else { // Not Logged In
			BlazeLayout.render('LandingPage', {accounts: 'LoggedOut'});
		}
	}

});

FlowRouter.route('/dashboard',{
	name: 'dashboard',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Dashboard', side: 'SideNav'});
	}
});

// END OF MAIN PAGES ROUTING



// START OF EVENTS ROUTING

FlowRouter.route('/create-event',{
	name: 'create-event',
	action(){
		BlazeLayout.render('MainLayout', {main: 'CreateEvent', side: 'SideNavEvent'});
	},
	triggersExit: [function(context, redirect, stop) {
		if (Session.get('addSuccess') != true){
	    	if (confirm("Are you sure you want to leave this page?\nAny changes made will not be saved.") != true){
	    		stop(true);
	    	}
    	}
  	}],
});

FlowRouter.route('/events',{
	name: 'events-list',
	action(){
		BlazeLayout.render('MainLayout', {main: 'EventsList', side: 'SideNavEvent'});
	}
});

FlowRouter.route('/event/:id',{
	name: 'event',
	action(){
		BlazeLayout.render('MainLayout', {main: 'EventSingle', side: 'SideNavEvent'});
	},
	triggersExit: [function(context, redirect, stop) {
    	if (Session.get('editMode') == true){
    		if (confirm("Are you sure you want to leave this page?\nAny changes made will not be saved.") != true){
    		stop(true);
    		}
    	}
  	}],
});

FlowRouter.route('/guest-list/:id',{
	name: 'guest-list',
	action(){
		BlazeLayout.render('MainLayout', {main: 'GuestList', side: 'SideNavGuest'});
	}
});

// END OF EVENTS ROUTING



// START OF GUESTS ROUTING

FlowRouter.route('/create-guest',{
	name: 'create-guest',
	action(){
		BlazeLayout.render('MainLayout', {main: 'CreateGuest', side: 'SideNavGuest'});
	},
	triggersExit: [function(context, redirect, stop) {
		if (Session.get('addSuccess') != true){
    		if (confirm("Are you sure you want to leave this page?\nAny changes made will not be saved.") != true){
    			stop(true);
    		}
    	}
  	}],
});

FlowRouter.route('/guests',{
	name: 'master-guests-list',
	action(){
		BlazeLayout.render('MainLayout', {main: 'MasterGuestsList', side: 'SideNavGuest'});
	}
});

FlowRouter.route('/guest/:id',{
	name: 'guest',
	action(){
		BlazeLayout.render('MainLayout', {main: 'GuestSingle', side: 'SideNavGuest'});
	},
	triggersExit: [function(context, redirect, stop) {
    	if (Session.get('editMode') == true){
    		if (confirm("Are you sure you want to leave this page?\nAny changes made will not be saved.") != true){
    		stop(true);
    		}
    	}
  	}],
});

// END OF GUESTS ROUTING