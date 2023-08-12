const ShowIncommingRequest = (req, res, next) => {
  console.log(
    `Incomming Request:  "${req.headers.origin}${req.url}"   /${req.method} `
  );
  next();
};
module.exports = { ShowIncommingRequest };
