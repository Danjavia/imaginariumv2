'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// Home component
var Footer = React.createClass({

	getInitialState: function () {
		return {};
	},

	render: function () {
		return (
			<footer className="center-align">
	            <p><i className="fa fa-quote-left blue-text"></i> The failure begins when ceases the force. <i className="fa fa-quote-right blue-text"></i> <br/> Made by <i className="fa fa-twitter blue-text"></i><a href="http://twitter.com/danjavia">Danjavia</a> With <i className="fa fa-heart red-text"></i></p>
	        </footer>
		);
	}
});

// Export component
module.exports = Footer;