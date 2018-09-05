const crypto = require('crypto');

module.exports = {
    encrypt: ( data, key ) => {
        let cipher = crypto.createCipher('aes192', key);
        let crypted = cipher.update(data, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt: ( encrypted, key) => {
        let decipher = crypto.createDecipher('aes192', key);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted = decipher.final('utf8');
        return decrypted;
    },
    random: ( min, max ) => {
        let Range = max - min;
        let Rand = Math.random();
        if( Math.round( Rand * Range ) == 0 ){
            return min + 1;
        }
        let num = min + Math.round( Rand * Range );
        return num;
    }
}