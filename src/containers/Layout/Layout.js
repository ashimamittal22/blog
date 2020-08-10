import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import classes from './Layout.module.css';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar isAuthenticated={this.props.isAuthenticated} />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);