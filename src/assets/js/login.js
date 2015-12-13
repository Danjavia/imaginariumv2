'use strict';

// Home component
var Login = React.createClass({

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
            <div className="login">
                <Navbar />
                <LoginForm />
                <Footer />
            </div>
        );
    }
});

// Export component
window.Login = Login;