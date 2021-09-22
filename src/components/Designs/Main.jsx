import React from 'react';
import { Main as Dashboard } from './Dashboard/Main';
// import Screen from './Screens';
import './bootstrap.min.css';
import './styles/Main.css';
import { Main as Shop } from './Screens/Shop/Main';
import LinearProgress from '@material-ui/core/LinearProgress';

// import Shop from './Screens/Shop/Shop';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

const GlassDesign = () => {
  let { path } = useRouteMatch();
  console.log(path);
  return (
    <div>
      <main>
        <LinearProgress />
        <section className="glass">
          <Router>
            <Dashboard />
            <div className="screen">
              <Switch>
                <Route exact path={path}>
                  Welcome
                </Route>
                <Route path={`${path}/shop`} component={Shop} />
                <Route path={`${path}/events`}>Events</Route>
              </Switch>
            </div>
          </Router>
        </section>
      </main>
      <div className="circle1" />
      <div className="circle2" />
    </div>
  );
};

export default GlassDesign;
