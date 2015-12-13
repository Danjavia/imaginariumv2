'use strict';

// Home component
var Home = React.createClass({

    mixins: [ReactFireMixin],

	getInitialState: function () {
		return {
			items: [],
			refUrl: "https://imaginarium.firebaseio.com"
		};
	},

	componentWillMount: function() {

	  	var ref = new Firebase( this.state.refUrl + '/items' );
  		this.bindAsArray( ref, "items" );
	},

	componentDidMount: function () {

		// before unload
		$( window ).bind( 'beforeunload', function () {

		    ga( 'send', {
	            hitType: 'event',
	            eventCategory: 'Window Events',
	            eventAction: 'close',
	            eventLabel: 'Site Closed'
	        });

		});
	},

	render: function () {

		return (
			<div className="home">
				<Navbar/>
				<Cards data={this.state.items} />
				<Footer/>
				<Modal />
			</div>
		);
	}
});

// Export component
window.Home = Home;