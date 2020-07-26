import React from 'react';
// import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Layout from './views/layout'
import Posts from './views/posts'
import FullPost from './views/fullpost'

function App() {

    const routes = (
        <Switch>
            <Route path='/posts/:id' exact component={FullPost} />
            <Route path='/' component={FullPost} />
            {/* redirect for unknown pages */}
            <Redirect to='/' />
        </Switch>
    )

  return (
    <div>
      <Layout>
        <FullPost />
      </Layout>
    </div>
  );
}

export default App;
