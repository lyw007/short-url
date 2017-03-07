/**
 * Created by arvin on 2017/3/7 0007.
 */
var db = require('mysql');
var pool = db.createPool({
    host : '121.196.194.237',
    port : 3306,
    database : 'short_url_base',
    user : 'arvin',
    password : 'mysql'
});
module.exports = pool;