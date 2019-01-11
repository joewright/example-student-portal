import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

// TODO: determine what denotes a failing grade
const failingGradeMax = 79;

class AssignmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      currentAssignment: null,
      currentFilename: null
    };
    this.loadData();
  }

  render() {
    return (
      <div>
        <h1>Assignments</h1>
        <p><strong>Total:</strong> {this.state.assignmentsTotal}</p>
        <p><strong>Passed:</strong> {this.state.assignmentsPassed}</p>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Submitted</th>
              <th align="right">Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.assignments.map((item, index) => {
              return (
                <tr key={index}>
                  <td><Link to={item.linkTo}>{item.title}</Link></td>
                  <td>{item.submitted && '√'}</td>
                  <td align="right">{item.result}</td>
                  <td>
                    {
                      item.submittable ?
                        <button onClick={() => {this.selectAssignment(item)}}>Submit</button>
                        :
                        ''
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          {
            this.state.currentAssignment ?
            <div>
            <h4>Submit: {this.state.currentAssignment.title}</h4>
              <form onSubmit={(event) => {this.submitFile(event)}}>
                <fieldset>
                  <label>Select file</label>
                  <input type="file" name="submit" onChange={(event) => {this.fileSelected(event)}} />
                  <br />
                  {
                    this.state.submitResult ?
                      <p>{this.state.submitResult}</p>
                      :
                      <button type="submit">Upload</button>
                  }
                </fieldset>
              </form>
            </div>
            : ''
          }
        </div>
      </div>
    );
  }

  // submit the selected file to the server
  submitFile(event) {
    console.log(this.state, event);
    event.preventDefault();
    var formData = new FormData();
    formData.append('file', this.state.currentFile);
    axios.post(`/api/assignments/${this.state.currentAssignment._uuid}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
      this.setState({submitResult: 'Success!'});
    }, err => {
      console.error(err);
      this.setState({submitResult: 'Failed!'});
    });
  }

  // set the current file
  fileSelected(event) {
    let reader = new FileReader();
    this.fileInput = event.target;
    let filename = event.target.value;
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        currentFile: file,
        currentFilename: filename
      });
    };

    reader.readAsDataURL(file);
  }

  // show the file selector for the selected assignment
  selectAssignment(item) {
    if (this.fileInput) {
      this.fileInput.value = '';
    }
    this.setState({
      currentAssignment: item,
      currentFilename: null,
      currentFile: null,
      submitResult: null
    });
  }

  // load assignments
  loadData(params) {
    axios.get('/api/assignments')
      .then((response) => {
        let passed = 0;
        const formattedAssignments = response.data.map(assignment => {
          assignment.linkTo = '/assignments/' + assignment._uuid;

          if (assignment.submitted && assignment.score >= 80) {
            assignment.result = `${assignment.score} (Passed)`;
            passed++;
          } else if (assignment.submitted && assignment.score === undefined) {
            assignment.result = 'N/A';
          } else if (assignment.submitted && assignment.score <= failingGradeMax){
            assignment.failed = true;
            assignment.result = `${assignment.score} (Failed)`;
          }
          if (!assignment.submitted || assignment.failed) {
            assignment.submittable = true;
          }

          return assignment;
        });
        this.setState({
          assignments: formattedAssignments,
          assignmentsPassed: passed,
          assignmentsTotal: formattedAssignments.length
        });
      }, (err) => {
        console.error(err);
      });
  }
}

export default AssignmentsList;