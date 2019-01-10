import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

// TODO: determine what denotes a failing grade
const failingGradeMax = 79;
class AssignmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {assignments: []};
    this.loadData();
  }
  render() {
    return (
      <div>
        <h1>Assignments</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Submitted</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {this.state.assignments.map((item, index) => {
              return (
                <tr key={index}>
                  <td><Link to={item.linkTo}>{item.title}</Link></td>
                  <td>{item.submitted && '√'}</td>
                  <td>{item.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  loadData(params) {
    axios.get('/api/assignments')
      .then((response) => {
        const formattedAssignments = response.data.map(assignment => {
          assignment.linkTo = '/assignments/' + assignment._uuid;
          if (assignment.submitted && assignment.score >= 80) {
            assignment.result = 'Passed';
          } else if (assignment.submitted && assignment.score === undefined) {
            assignment.result = 'N/A';
          } else if (assignment.submitted && assignment.score <= failingGradeMax){
            assignment.failed = true;
            assignment.result = 'Failed';
          }
          if (!assignment.submitted || assignment.failed) {
            assignment.submittable = true;
          }
          return assignment;
        });
        this.setState({assignments: formattedAssignments});
      }, (err) => {
        console.error(err);
      });
  }
}

export default AssignmentsList;