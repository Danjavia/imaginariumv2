var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashhistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

// Components
var Home = require( './home' );
var Login = require( './login' );
var Favorites = require( './favorites' );

// Firebase area
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var RootUrl = 'https://therion.firebaseIO.com/';

// Analytics
var Woopra = require( 'woopra' );
var ua = require( 'universal-analytics' );

// global variables
global[ 'globalState' ] = {};

// include analytics code here
var visitor = ua( 'UA-71033807-1' );

visitor.pageview("/").send();


// APP
var App = React.createClass({

  	render: function() {
		return (<div>
	  		{this.props.children ? this.props.children: <Home/>}
		</div>)
  	}
});

var Page2 = React.createClass({
	render: function () {
		return(
			<div>hola danjavia</div>
		);
	}
})

var routes = (
	<Router history={new HashHistory}>
	    <Route path="/" component={App}>
	      	<Route path="login" component={Login}/>
	      	<Route path="favorites" component={Page2}>
	      	</Route>
	      	<Route path="*" component={Home}/>
	    </Route>
	</Router>
);

ReactDOM.render(routes, document.getElementById('content'));
