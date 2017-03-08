/**
 * Created by arvin on 2017/3/7 0007.
 */
$(function(){
    var base = location.protocol + '://'+ location.hostname  + ':' + location.port;
    $('#js-btn-create').on('click',function(){
        var src_url = $('#js-url-input').val();
        if(src_url == ''){
            return;
        }
        if(!isURL(src_url)){
            alert('url不合法');
            return;
        }
        if(base.indexOf(src_url) >= 0){
            return;
        }
        getShortUrl(src_url);
    });

    var getShortUrl = function(src_url){
        var url = '/url/create';
        var data = {
            src_url : src_url
        };
        $.post(url,data,function(data,status,xhr){
            if(status == 'success'){
                if(data.success){
                    $('#js-url-input').val(data.data.short_url);
                }else{
                    $('#js-url-input').val(data.msg);
                }
            }else{
                alert('请求失败！');
            }
        });
    }
    var isURL = function(url) {// 验证url
        var urlRegExp=/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        return urlRegExp.test(url);
    }
});

$(document).ready(function() {
    $('#particles').particleground({
        dotColor: '#5cbdaa',
        lineColor: '#5cbdaa'
    });
    $('.intro').css({
        'margin-top': -($('.intro').height() / 2)
    });
});