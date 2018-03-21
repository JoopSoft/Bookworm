import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => (
    <div>
        <h1>Home Page</h1>

        {isAuthenticated ? (
            <Button onClick={() => logout()} primary>Logout</Button>
        ) : (
                <div>
                    <Link to="/login" className="ui primary button">Login</Link>
                    <Link to="/signup" className="ui primary button">Sign up</Link>
                </div>
            )}
    </div>
);

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);