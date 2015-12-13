'use strict';

// Home component
var Footer = React.createClass({

	getInitialState: function () {
		return {};
	},

	render: function () {
		return (
			<footer className="center-align">
	            <p>Made with <i className="fa fa-heart red-text"></i> and low <i className="fa fa-clock-o"></i> by <i className="fa fa-twitter blue-text"></i><a href="http://twitter.com/danjavia">Danjavia</a></p>
	        </footer>
		);
	}
});

// Export component
window.Footer = Footer;