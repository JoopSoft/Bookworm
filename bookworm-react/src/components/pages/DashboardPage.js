import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmedEmailMessage from '../messages/ConfirmedEmailMessage';

const DashboardPage = ({ isConfirmed }) => (

    <div>
        {!isConfirmed && <ConfirmedEmailMessage />}
    </div>
);

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state){
    return {
        isConfirmed: !!state.user.confirmed
    }
}

export default connect(mapStateToProps)(DashboardPage);