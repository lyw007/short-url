/**
 * Created by arvin on 2017/3/7 0007.
 */
/*生成包含数字和字母区分大小写的随机字符串*/
exports.createRandomStrA = function(n){
    var rnd = '';
    var arr_str = ['0','1','2','3','4','5','6','7','8','9',
        'a','b','c','d','e','f','g','h','i','j','k','l','m','o','n','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','O','N','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var length = arr_str.length;
    for (var i = 0; i < n; i++) {
        var id = Math.floor(Math.random() * length);
        if (i === 0 && id === 0) id = 1;
        rnd += arr_str[id];
    }
    return rnd;
}
//将十进制的数字转为62禁止的字符串
exports.decToSixtyTwoStr = function(num){
    var arr_str = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m','o','n','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','O','N','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9'];
    var val = parseInt(num);
    var str = '';
    var i = 0;
    var ll = arr_str.length;
    while ((i == 0) || (val > 0)){
        str = arr_str[val % ll] + str;
        val = parseInt(val / ll);
        i++;
    }
    if(str.length < 8){
        var n = 8 - str.length;
        for(var i = 0; i < n;i++){
            str = arr_str[0] + str;
        }
    }
    return str;
}
exports.isURL = function(url) {// 验证url
    var urlRegExp=/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    return urlRegExp.test(url);
}