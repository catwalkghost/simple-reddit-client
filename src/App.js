import React from 'react';
// import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Layout from './views/layout'
import Posts from './views/posts'
import FullPost from './views/fullpost'
import {Helmet} from 'react-helmet'
import * as c from './shared/const'

import './styles/main.scss'


function App() {

    const routes = (
        <>
            <Helmet defaultTitle={c.TITLE}/>
            <Switch>
                <Route path='/posts/:id' exact render={(props) => <FullPost {...props} />} />
                <Route path='/' component={Posts} />
                {/* redirect for unknown pages */}
                <Redirect to='/' />
            </Switch>
        </>
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
