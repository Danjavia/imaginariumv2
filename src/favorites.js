'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// Firebase area
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var RootUrl = 'https://therion.firebaseIO.com/';

// Components
var Navbar = require( './components/navbar' );
var FavoritesList = require( './components/favoritesList' );
var Footer = require( './components/footer' );

// Home component
var Favorites = React.createClass({

    mixins: [ReactFire],

    getInitialState: function () {
        return {
            refUrl: RootUrl,
            items: [],
            authData: null
        };
    },

    componentWillMount: function() {

        var ref = new Firebase( this.state.refUrl + '/items' );
        this.bindAsArray( ref, "items" );
    }, 

    render: function () {
        return (
            <div className="favorites">
                <Navbar />
                <FavoritesList data={this.state.items} />
                <Footer />
            </div>
        );
    }
});

// Export component
module.exports = Favorites;