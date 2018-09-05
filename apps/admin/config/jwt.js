const jwt = require('jwt-simple');

module.exports = {
    encode: ( payload, secret ) => {
        return jwt.encode( payload, secret );
    },
    decode: ( token, secret ) => {
        return jwt.decode( token, secret );
    }
}