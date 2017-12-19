import React, { Component } from 'react';
import SearchBar from './Search_bar';

class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Landing Page!</h1>
        <SearchBar />
      </div>
    );
  }
}

export default Landing;
