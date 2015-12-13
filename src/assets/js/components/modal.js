'use strict';

// Home component
var Modal = React.createClass({

    getInitialState: function () {
        return {

        };
    },

    render: function () {
        return (
            <div className="modal-box">
                <div id="loginModal" className="modal">
                    <div className="modal-content">
                        <LoginForm/>
                    </div>
                </div>
            </div>
        );
    }
});

// Export component
window.Modal = Modal;