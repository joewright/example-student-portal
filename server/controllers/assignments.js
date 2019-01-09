const uuidv4 = require('uuid/v4');

class Assignment {
  list(query, callback) {
    callback(null, [{
      _uuid: uuidv4()
    }]);
  }
  detail(id, callback) {
    callback(null, {
      _uuid: id
    });
  }
}

module.exports = new Assignment();