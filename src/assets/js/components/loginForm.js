'use strict';

var OAUTH = 'WbekgyPe55xRsg6GeQwnSM4J4rYk2WXVn80uXDw2';

// Home component
var LoginForm = React.createClass({

    getInitialState: function () {
        return {
            refUrl: 'https://imaginarium.firebaseio.com' 
        };
    },

    handleSubmit: function ( e ) {

        e.preventDefault();

        var ref = new Firebase( this.state.refUrl );

        ref.authWithPassword({

            email    : this.refs.email.value.trim(),
            password : this.refs.password.value.trim()
        
        }, function( error, authData ) {

            if ( error ) {

                Materialize.toast( 'Login Failed!', 4000 );
        
            } else {

                localStorage.auth = true;

                // Woopra track identifier
                woopra.identify({
                    email: authData.password.email,
                    name: authData.password.email,
                });

                // The identify code should be added before the "track()" function
                woopra.track( "Access to app", {
                    user: authData.password.email
                });

                // KissMetrics event
                _kmq.push([ 'record', 'Access to app', { 'userId' : authData.uid }]);

                // intercom code
                window.Intercom( 'boot', {
                    app_id: "y36fm6q4",
                    email: authData.password.email, // TODO: The current logged in user's email address.
                });

                window.Intercom( 'update' );

                // if exist login modal
                if ( document.getElementById( 'loginModal' )  ) {
                
                    $( '#loginModal' ).closeModal();

                    globalState.callback( true );

                    // console.log( this.state.refUrl + '/users/' + authData.uid ); return;

                    // set Favorites
                    var favorites;

                    // Get user data
                    var user = new Firebase( this.state.refUrl + '/users/' + authData.uid );

                    // Get user favorites
                    user.child( "favorites" ).on( "value", function( snapshot ) {

                        if ( snapshot.val() != null ) {

                            favorites = snapshot.val();

                            favorites.push( localStorage.fav );
                        }

                        else {

                            favorites = [];

                            favorites.push( localStorage.fav );
                        }                 

                    }.bind( this ));

                    // set simple timeout to prevent async data
                    setTimeout( function () {

                        // Unique array
                        favorites = $.grep( favorites, function( v, k ) {
                            return $.inArray( v ,favorites ) === k;
                        });

                        // Save the array into firebase
                        ref.child( "users" ).child( authData.uid ).set({
                            favorites: favorites,
                        });

                        // Display message
                        Materialize.toast( 'Saved into favorites.', 4000 );

                    }, 300 );

                    return;

                }

                location.href = '/#/favorites';

            }
        }.bind( this ));

    },

    registerUser: function ( e ) {

        e.preventDefault();

        var ref = new Firebase( this.state.refUrl );

        ref.createUser({

            email    : this.refs.email.value.trim(),
            password : this.refs.password.value.trim()

        }, function( error, userData ) {

            if ( error ) {

                console.log( 'Error creating user:', error );
                Materialize.toast( error, 4000 );

            } else {

                $( '#loginModal' ).closeModal();

                localStorage.auth = true;

                globalState.callback( true );

                Materialize.toast( 'Welcome to Imaginarium.', 4000 );

                // Woopra track identifier
                woopra.identify({
                    userId: userData.uid
                });

                // The identify code should be added before the "track()" function
                woopra.track( "Access to app", {
                    userId: userData.uid
                });

                // KissMetrics event
                _kmq.push(['record', 'Access to app', { 'userId' : userData.uid }]);

                if ( document.getElementById( 'loginModal' )  ) {

                    // set Favorites
                    var favorites;

                    // Get user data
                    var user = new Firebase( this.state.refUrl + '/users/' + userData.uid );

                    // Get user favorites
                    user.child( "favorites" ).on( "value", function( snapshot ) {

                        if ( snapshot.val() != null ) {

                            favorites = snapshot.val();

                            favorites.push( localStorage.fav );
                        }

                        else {

                            favorites = [];

                            favorites.push( localStorage.fav );
                        }                 

                    }.bind( this ));

                    // set simple timeout to prevent async data
                    setTimeout( function () {

                        // Unique array
                        favorites = $.grep( favorites, function( v, k ) {
                            return $.inArray( v ,favorites ) === k;
                        });

                        // Save the array into firebase
                        ref.child( "users" ).child( userData.uid ).set({
                            favorites: favorites,
                        });

                        $( '.signin' ).trigger( 'click' );

                    }, 300 );
                }
            }
        }.bind( this ));

    },

    render: function () {
        return (
            <div className="col x12 m6 l3" id="login-form">
                <div className="row center-align">
                    <form className="col s12 m12 l12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <h3>Sign In</h3>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">account_box</i>
                                <input id="email" ref="email" type="email" className="validate"/>
                                <label for="email" data-error="Check ur email" data-success="right">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">lock</i>
                                <input id="password" ref="password" type="password" className="validate"/>
                                <label for="password" data-error="wrong" data-success="right">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <button className="btn waves-effect waves-light action-button signin" type="submit" name="action" onClick={this.handleSubmit}>Sign in
                                    <i className="material-icons right">lock</i>
                                </button>
                                <button className="btn blue waves-effect waves-light action-button" type="submit" name="action" onClick={this.registerUser}>Sign up
                                    <i className="material-icons right">account_circle</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                
        );
    }
});

// Export component
window.LoginForm = LoginForm;