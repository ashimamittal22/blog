import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import Articles from './containers/Articles/Articles';
import * as actions from './store/actions/index'
import NewArticle from './containers/NewArticle/NewArticle';
import Tags from './containers/Tags/Tags';


const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth.js'));
const AsyncFullArticle = React.lazy(() => import('./containers/FullArticle/FullArticle'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render() {
    let routesForBoth = (
      <React.Fragment>
        <Route path={/articles/ + ':slug'} render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <AsyncFullArticle />
          </Suspense>
        )} />
        <Redirect to="/articles" />
      </React.Fragment>
    )
    let routes = (
      <Switch>
        <Route path='/authenticate' render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <AsyncAuth />
          </Suspense>
        )} />
        {routesForBoth}
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/newArticle/:slug" component={NewArticle} />
          <Route path="/newArticle" component={NewArticle} />
          <Route path="/logout" component={Logout} />
          {routesForBoth}
        </Switch>
      );
    }

    return (
      <Layout>
        <Route path='/articles' exact render={()=>(
          <React.Fragment>
            <Articles/>
            <Tags/>
          </React.Fragment>
        )} />
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToPorps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToPorps)(App);
