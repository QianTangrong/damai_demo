<?php
    @header("Content-type:text/html;charset=utf-8");
    @header("Access-Control-Allow-Origin:*"); // 所有人都可以访问
    // @header("Access-Control-Allow-Origin:http://127.0.0.1:5500");// // http://127.0.0.1:5500可以访问
    //  @header("Access-Control-Allow-Origin:http://192.168.50.17");

    /* mysql_connect("b-ujcwae0buv4z3o.bch.rds.gz.baidubce.com","b_ujcwae0buv4z3o","123456");
    $res = mysql_select_db("b_ujcwae0buv4z3o"); */

    
    mysql_connect("localhost","root","root");
    $res = mysql_select_db("1909");

    
    // if(res){
    //     echo "成功";
    // }

    mysql_query("set names utf8");  // 从数据库中取数据时将数据的编码格式转化为UTF-8  (解决数据库取数据时 中文乱码)
    mysql_query("set character set utf-8");  // 向数据库中 存储数据 时将编码转化为UTF-8  (解决向数据库存数据时 中文乱码)

    // 上述代码 经常要用 所以给它提出来作为公用的php


?>