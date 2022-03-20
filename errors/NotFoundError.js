class NotFoundError extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
