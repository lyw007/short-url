/**
 * Created by arvin on 2017/3/7 0007.
 */
var pool = require('./dbpool');
var Utils = require('./Utils');
module.exports = {
    /*创建一个有url*/
    create : function(obj,callback){
        var _self = this;
        var keys = [];
        var values = [];
        for(p in obj){
            if(typeof ((obj[p]) != 'function') && (p != 'sign') && (obj[p] != '')){
                keys.push(p);
                values.push("'" + obj[p] + "'");
            }
        }
        var sql = 'INSERT INTO url_map (' + keys.join(',') + ') VALUES (' + values.join(',') + ');';

        _self.query(sql,function(err,vals,fields){
            if(err){
                return callback(err,null,null);
            }
            _self.updateUrlKeyById(vals.insertId,function(uerr,vals1,fields1){


                _self.findById(vals.insertId,callback);
            });
        });
    },
    /*按照id查找一条记录*/
    findById : function(id,callback){
        var sql = "SELECT * FROM url_map WHERE id = '" + id + "'";
        this.query(sql,callback);
    },
    /*按照id更新urlKey*/
    updateUrlKeyById : function(id,callback){
        var url_key = Utils.decToSixtyTwoStr(id);
        var sql = "UPDATE url_map SET url_key = '" + url_key + "' WHERE id = '" + id + "'";
        this.query(sql,callback);
    },
    /*查找一个url*/
    findByUrlKey : function(url_key,callback){
        var sql = "SELECT * FROM url_map WHERE url_key = '" + url_key + "'";
        this.query(sql,callback);
    },
    findBySrcUrlHash : function(src_url_hash,callback){
        var sql = "SELECT * FROM url_map WHERE src_url_hash = '" + src_url_hash + "'";
        this.query(sql,callback);
    },
    query : function(sql,callback){
        pool.getConnection(function(err,conn){
            if(err){
                console.log(err);
                callback(err,null,null);
                conn.release();
            }else{
                conn.query(sql,function(qerr,vals,fields){
                    conn.release();
                    if(qerr){
                        console.log(qerr);
                        callback(qerr);
                    }else{
                        callback(null,vals,fields);
                    }
                });
            }

        });
    }
}
