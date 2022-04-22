const allowedCors = [
  'http://localhost:3000/',
  '192.168.31.235:3000/',
  'https://api.0R8-9dzcl.nomoredomains.work',
  'http://api.0R8-9dzcl.nomoredomains.work',
  'localhost:3000',
  'localhost:3500',
  'http://localhost:3500/',
  'http://192.168.31.235:3000/',
  'http://192.168.31.235:3500/',
];
// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  console.log(req.headers);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    console.log('domen is coorect');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    console.log(req.headers.origin);
    res.status(200).send();
    return;
  }
  next();
};

module.exports = cors;
