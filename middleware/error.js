/* (Important)==> To use any middleware we have to mount it to server first then only it will work otherwise not. */

const errorHandler = (err, req, res, next) => {
  //Log to console for developer
  console.log(err.stack.bgWhite.red);

  res.status(500).json({ success: false, error: err.message });
};

module.exports = errorHandler;
