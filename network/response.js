const statusMessages = {
  "200": "Done",
  "201": "Created",
  "400": "Invalid",
  "500": "Internal error"
};

exports.success = function(req, res, message, status) {
  let statusCode = status;
  let statusMessage = message;
  if (!status) {
    status = 200;
  }
  if (!message) {
    statusMessage = statusMessages[status];
  }
  res.status(statusCode).send({
    error: "",
    body: statusMessage
  });
};

exports.error = function(req, res, message, status, detalis) {
  console.log("[response error] " + detalis);
  res.status(status || 500).send({
    error: message,
    body: ""
  });
};
