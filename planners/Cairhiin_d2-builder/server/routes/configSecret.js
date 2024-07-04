var jwtSecret = {
  'secret': process.env.JWT_SECRET || 'D2BuilderAppSecret'
};

exports.jwtSecret = jwtSecret;
