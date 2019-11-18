const Model = require("./model");

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterChat !== null) {
      filter = { user: filterChat };
    }
    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
  });
}


module.exports = {
  add: addMessage,
  list: getMessages
};
