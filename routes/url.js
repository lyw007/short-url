/**
 * Created by arvin on 2017/3/7 0007.
 */
var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var UrlService = require("../services/UrlService");
var Utils = require("../services/Utils");
var moment = require("moment");
/*转化一个长url*/
router.post('/create',function(req,res,next){
    var src_url = req.param('src_url');
    if(!(src_url && src_url != '')){
        return res.status(200).json({success:false,data:null,msg:'缺少参数'});
    }
    if(!Utils.isURL(src_url)){
        return res.status(200).json({success:false,data:null,msg:'url不合法'});
    }

    var src_url_hash = crypto.createHash("sha256").update(src_url).digest("hex");

    var urlObj = {
        src_url : src_url,
        src_url_hash : src_url_hash,
        createdAt : moment().format('YYYY-MM-DD hh:mm:ss'),
        updatedAt : moment().format('YYYY-MM-DD hh:mm:ss')
    };
    /*先查找有没有记录*/
    UrlService.findBySrcUrlHash(src_url_hash,function(err,vals,fields){
        if(err){
            return res.status(200).json({success:false,data:null,msg:'请求失败'});
        }
        if(vals.length > 0){
            vals[0].short_url = req.protocol + '://' + req.headers.host + '/' + vals[0].url_key;
            return res.status(200).json({success:true,data:vals[0],msg:'请求成功'});
        }else{
            UrlService.create(urlObj,function(cerr,result){
                if(cerr){
                    return res.status(200).json({success:false,data:null,msg:'请求失败'});
                }
                result[0].short_url = req.protocol + '://' + req.headers.host + '/' + result[0].url_key;
                return res.status(200).json({success:true,data:result[0],msg:'请求成功'});
            });
        }
    });

});

module.exports = router;