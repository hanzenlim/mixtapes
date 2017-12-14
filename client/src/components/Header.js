import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  // HELPER METHOD - Inspect this.props to see if user is logged in or not
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <NavItem eventKey={1} href="/auth/google">
            Login
          </NavItem>
        );
      default:
        return (
          <NavItem eventKey={2} href="/api/logout">
            Logout
          </NavItem>
        );
    }
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={this.props.auth ? '/videos' : '/'}>MixTapes</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className="pull-right">{this.renderContent()}</Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
