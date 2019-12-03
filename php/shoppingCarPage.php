<?php
     @require_once("common.php");

     $phone = $_POST["phone"];
    

    $sqlStr = "select * from `shopping` where phone='$phone'";

    //！！！！！！！！！！！！！ 查询的时候  需要接受 mysql_query 执行的结果
    $result = mysql_query($sqlStr);//查询的结果 (数据的集合)

    
    $all = array(); // 用于存放所有的数据
    // 1.数据解析 用于解析 mysql查询的多条数据
    while($item = mysql_fetch_array($result)){

        // print_r($item);
        // echo "<br/>";

        //2. 新建数组,自定义数据(可以选择数据,添加键值对)
        $arr = array();
        $arr["ID"] = $item[0];
        $arr["showname"]=$item[6];
        $arr["showimg"]=$item[5];
        $arr["showprice"]=$item[4];
        $arr["itemid"] = $item[2];
        $arr["shownumber"] = $item[3];
        // $arr["showtime"]=$item[3];
        // print_r($arr);
        // echo "<br/>";

        // 3. 把解析的数据放到一个总的集合中去
        $all[] = $arr;// 相当于js中的 all[all.length]  数组的递增赋值
        
    }

    // print_r($all);


    echo json_encode($all);  //输出 JSON类型的字符串







?>
