import React from 'react';
import PropTypes from 'prop-types';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Menu, Dropdown, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../actions/auth';
import { allBooksSelector } from '../../reducers/books';
// import NavLink from 'react-router-dom/NavLink';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { setLocale } from '../../actions/locale';

class TopNavigation extends React.Component {

    state = {
        isOpen: false
    };

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const { user, logout, hasBooks } = this.props;

        return (
            <Navbar light expand="sm" color="faded">
                <NavbarBrand
                    tag={RouterNavLink}
                    activeClassName="active"
                    to="/">
                    AlHub
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                tag={RouterNavLink}
                                activeClassName="active"
                                to="/dashboard">
                                <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard" />
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <img
                                    className="img-fluid rounded-circle"
                                    src={gravatarUrl(user.email, { size: 40 })}
                                    alt="Gravatar"
                                />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>My Account</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>

                <Menu secondary pointing>
                    <Menu.Item as={Link} to="/">
                        <FormattedMessage id="nav.home" defaultMessage="Home" />
                    </Menu.Item>
                    <Menu.Item as={Link} to="/dashboard">
                        <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard" />
                    </Menu.Item>
                    {hasBooks && <Menu.Item as={Link} to="/books/new">
                        <FormattedMessage id="nav.addNewBook" defaultMessage="Add New Book" />
                    </Menu.Item>}


                    <Button onClick={() => this.props.setLocale('en')}>EN</Button>
                    <Button onClick={() => this.props.setLocale('ru')}>RU</Button>

                    <Menu.Menu position="right">
                        <Dropdown trigger={<Image avatar src={gravatarUrl(user.email, { size: 40 })} />}>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => logout()}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            </Navbar>
        )
    }
}

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    hasBooks: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        hasBooks: allBooksSelector(state).length > 0
    }
}

export default connect(mapStateToProps, { logout: actions.logout, setLocale }, null, {
    pure: false
})(TopNavigation);