import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './Search_bar';
import { LANDING_PAGE_COUNTER } from '../actions/types';

class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Landing Page!</h1>
        <div>Counter: {this.props.counter} </div>
        <div onClick={this.props.addCounter}>Click me</div>
        <SearchBar />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  counter: state.landingPage.counter
});

const mapDispatchToProps = (dispatch) => ({
  addCounter: () => {
    debugger;
    dispatch({
      type: LANDING_PAGE_COUNTER
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

