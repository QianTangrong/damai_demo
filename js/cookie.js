/* 
    name    string      键
    value   string      值
    day     number      有效事件
    path    string      路径
*/

function setCookie(name, value, day, path = "/") {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + "=" + value + ";expires=" + date.toGMTString() + ";path=" + path;
}



function getCookie(name) {
    var cookie = document.cookie;
    var dataList = cookie.split("; ");//用"; "分割
    var obj = {}
    for (var i = 0; i < dataList.length; i++) {
        var item = dataList[i].trim();// 去除首尾空格
        var key = item.split("=")[0];
        var val = item.split("=")[1];
        if (name == key) {
            return val;
        }
    }
    return "";
}