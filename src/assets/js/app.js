window.globalState = {};

// Routes
routie({

    '': function() {
        
        // render the first page on a direct access
        ReactDOM.render(
            <Home/>,
            document.getElementById( 'content' )
        );
    },

	'/login': function() {
        
        // render the first page on a direct access
        ReactDOM.render(
            <Login/>,
            document.getElementById( 'content' )
        );
    },

    '*': function() {
        // default go to landing page
        routie( '' );
    }
})