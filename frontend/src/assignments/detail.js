import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

// TODO: determine what denotes a failing grade
class AssignmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {assignment: {}};
    this.loadData(props.match.params);
  }
  render() {
    return (
      <div>
        <code>Viewing assignment: {this.state.assignment._uuid}</code>
        <br />
        <Link to="/assignments">Back</Link>
      </div>
    );
  }
  loadData(params) {
    axios.get('/api/assignments/' + params.assignmentId)
      .then((response) => {
        this.setState({assignment: response.data});
      }, (err) => {
        console.error(err);
      });
  }
}

export default AssignmentDetail;