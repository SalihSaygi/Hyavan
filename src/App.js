import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlassDesign from './components/Glass/Main';

function App() {
  return (
    <Router>
      <div>
        <Route path="/glass">
          <GlassDesign />
        </Route>
        {/* <Route path="/about">
            <RedDesign />
          </Route>
          <Route path="/dashboard">
            <ClassicDesign />
          </Route> */}
      </div>
    </Router>
  );
}

export default App;
