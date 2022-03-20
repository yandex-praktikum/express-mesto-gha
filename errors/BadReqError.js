class BadReqError extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = 400;
  }
}

module.exports = BadReqError;
