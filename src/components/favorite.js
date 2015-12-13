'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var FavoriteImage = React.createClass({

    render: function () {
        return (
            <img src={this.props.image} alt="" width="400" className="circle materialboxed"/>
        );
    }
});

var FavoriteTitle = React.createClass({
    render: function () {
        return (
            <span className="title">{this.props.title}</span>
        );
    }
});

var FavoriteContent = React.createClass({
    render: function () {
        return (
            <p>
                {this.props.content}
            </p>
        );
    }
});

// Favorite component
var Favorite = React.createClass({

    getInitialState: function () {
        return {
            data: {
                item: this.props.data.id,
                title: this.props.data.title,
                description: this.props.data.description,
                link: this.props.data.img
            },
            refUrl: RootUrl
        };
    },

    componentWillMount: function () {
        $( '.materialboxed' ).materialbox();
    },

    render: function () {
        return (
            <li className="collection-item avatar">
                <FavoriteImage image={this.props.data.img} />
                <FavoriteTitle title={this.props.data.title} />
                <FavoriteContent content={this.props.data.description} />
            </li>
        );
    }
});

// Export component
module.exports = Favorite;