'use strict';

// Home component
var Navbar = React.createClass({

	getInitialState: function () {
		return {
            refUrl: "https://imaginarium.firebaseio.com",
            auth: null
		};
	},

	componentWillMount: function () {
	 	globalState.callback = (data) => {
	    	this.setState({
	    		auth: data
	    	});     
	  	};
	},

	componentDidMount: function () {
		var ref = new Firebase( this.state.refUrl ),
            authData = ref.getAuth();

        if ( this.isMounted() ) {

        	if ( authData && localStorage.auth ) {

        		this.setState({ auth: authData }); 
        	}
        }
	},

	logout: function ( e ) {

		e.preventDefault();

		var ref = new Firebase( this.state.refUrl ),
            authData = ref.getAuth();
        
        if ( authData ) {

	     	// Report user exit
            woopra.track( "Exit of application", {
                user: authData.password.email
            });

            // KissMetrics event
            _kmq.push([ 'record', 'Exit of application' ]);

        	ref.unauth();
        	delete localStorage.auth;
        	this.setState({ auth: null }); 
	        Materialize.toast( 'Your session has ended', 4000 );
        }
 
	},

	render: function () {
		return (
			<nav className="indigo darken-3">
	            <div className="nav-wrapper container">
	                <a href="#/" className="brand-logo">Imaginarium</a>
	                <ul className="right hide-on-med-and-down app-menu">
	                    <li><a href="#/">Home</a></li>
	                    <li><a href="#/login">My Favorites</a></li>
	                    { this.state.auth ? <li><a href="#/" onClick={this.logout}>Logout</a></li> : null }
	                </ul>
	            </div>
	        </nav>
		);
	}
});

// Export component
window.Navbar = Navbar;