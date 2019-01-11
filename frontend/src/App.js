import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AssignmentsList from './assignments/list';
import AssignmentDetail from './assignments/detail';

// TODO: prod setup
axios.defaults.baseURL = `http://localhost:5000`;

const loadDataOnEnter = (nextState, replace, callback) => {
    const nRoutes = nextState.routes.length;
    const component = nextState.routes[nRoutes-1].component;
    const params = nextState.params;
    component.loadData(params, () => callback());
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/assignments">Assignments</Link></li>
          </ul>
          <Route exact path="/assignments" component={AssignmentsList} onEnter={loadDataOnEnter} />
          <Route path="/assignments/:assignmentId" component={AssignmentDetail} onEnter={loadDataOnEnter} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;