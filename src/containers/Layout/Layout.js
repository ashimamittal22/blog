import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar isAuthenticated={this.props.isAuthenticated} />
        <main className={styles.content}>
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