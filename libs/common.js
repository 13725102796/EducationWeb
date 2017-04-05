const crypto = require('crypto');

module.exports = {
    MD5_SUFFIX: 'jsankjdas!@#%$^%sdfdsas',
    md5: function (str) {
        var obj = crypto.createHash('md5');
        obj.update('str' + 'MD5_SUFFIX');

        return obj.digest('hex');
    }
}
