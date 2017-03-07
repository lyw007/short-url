/**
 * Created by arvin on 2017/3/7 0007.
 */
var db = require('mysql');
var pool = db.createPool({
    host : '',
    port : 3306,
    database : '',
    user : '',
    password : ''
});
module.exports = pool;