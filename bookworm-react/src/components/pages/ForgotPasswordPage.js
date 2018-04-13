import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest } from '../../actions/auth';
import { Link } from 'react-router-dom';

class ForgotPasswordPage extends React.Component {

    state = {
        success: false
    };

    submit = data =>
        this.props
            .resetPasswordRequest(data)
            .then(() => this.setState({ success: true }));

    render() {
        return (
            <div>
                {this.state.success ? (
                    <Message mail success outline icon>
                        <Icon name="mail" />
                        <Message.Content>
                            <Message.Header>Email has been sent.</Message.Header>
                            Please, visit your mail box
                        </Message.Content>
                        <Link to="/dashboard" className="ui primary button">Go to your dashboard</Link>
                    </Message>
                ) : (
                        <ForgotPasswordForm submit={this.submit} />
                    )}
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);