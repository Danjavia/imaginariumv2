'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// Components
var Navbar = require( './components/navbar' );
var Footer = require( './components/footer' );

// Home component
var Favorites = React.createClass({

    getInitialState: function () {
        return {
            refUrl: "https://imaginarium.firebaseio.com",
            authData: null
        };
    },

    componentWillMount: function () {

        var ref = new Firebase( this.state.refUrl ),
            authData = ref.getAuth();

        if ( authData && localStorage.auth )
            location.href = '/#/favorites'
    },  

    render: function () {
        return (
            <div className="favorites">
                <Navbar />
                <Footer />
            </div>
        );
    }
});

// Export component
module.exports = Favorites;