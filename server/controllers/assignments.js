const faker = require('faker');

class Assignment {
  constructor(options) {
    //TODO: pass in db connection here
    this.connection = options.dbConnection;
  }

  list(query, callback) {
    var assignments = [];
    for (var i = 0; i < 10; i++) {
      assignments.push(getFakeAssignment());
    }
    callback(null, assignments);
  }

  findById(id, callback) {
    callback(null, getFakeAssignment(id));
  }

  index() {
    return (req, res, next) => {
      this.list(req.query, (error, results) => {
        if (error) {
          console.error(error);
          req.error = {
            error: 'Unable to retrieve assignments'
          };
        } else {
          req.resource = results;
        }

        next();
      });
    };
  }

  get() {
    return (req, res, next) => {
      this.findById(req.params.assignmentId, (error, result) => {
        if (error) {
          console.error(error);
          req.error = {
            error: 'Unable to retrieve assignments'
          };
        } else {
          req.resource = result;
        }

        next();
      });
    };
  }
}

module.exports = Assignment;

function getFakeAssignment(_uuid) {
  var assignment = {
    _uuid: _uuid || faker.random.uuid(),
    title: faker.company.bs(),
    submitted: faker.random.boolean()
  };

  if (assignment.submitted && faker.random.boolean()) {
    assignment.score = getRandomInt(60, 100);
  }

  return assignment;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}