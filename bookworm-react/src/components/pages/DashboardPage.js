import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmedEmailMessage from '../messages/ConfirmedEmailMessage';
import books from '../../reducers/books';
import { allBooksSelector } from '../../reducers/books';
import AddBookCtA from '../ctas/AddBookCtA';


const DashboardPage = ({ isConfirmed }) => (

    <div>
        {!isConfirmed && <ConfirmedEmailMessage />}

    {books.length === 0 && <AddBookCtA />}
    </div>
);

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired).isRequired
};

function mapStateToProps(state){
    return {
        isConfirmed: !!state.user.confirmed,
        books: allBooksSelector(state)
    }
}

export default connect(mapStateToProps)(DashboardPage);