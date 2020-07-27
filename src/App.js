import React from 'react';
// import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Layout from './views/layout'
import Posts from './views/posts'
import FullPost from './views/fullpost'

function App() {

    const routes = (
        <Switch>
            <Route path='/posts/:id' exact render={(props) => <FullPost {...props} />} />
            <Route path='/' component={Posts} />
            {/* redirect for unknown pages */}
            <Redirect to='/' />
        </Switch>
    )

  return (
    <div>
      <Layout>
          {routes}
      </Layout>
    </div>
  );
}

export default withRouter(App);
