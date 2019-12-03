<?php
 @require_once("common.php");

    $showID = $_POST["showID"];
    $itemid = $_POST["itemid"];
    /* if($res){
        echo "success!";

    }else{
        echo "fail";
    } */

    $sqlStr = "select * from `show` where id='$showID' or itemid='$itemid'";

    //！！！！！！！！！！！！！ 查询的时候  需要接受 mysql_query 执行的结果
    $result = mysql_query($sqlStr);//查询的结果 (数据的集合)

   

    $all = array(); // 用于存放所有的数据
    // 1.数据解析 用于解析 mysql查询的多条数据
    while($item = mysql_fetch_array($result)){

       
        $arr = array();
        $arr["ID"] = $item[0];
        $arr["showcity"]=$item[6];
        $arr["showname"]=$item[1];
        $arr["showspace"]=$item[2];
        $arr["showtime"]=$item[3];
        $arr["showprice"]=$item[4];
        $arr["showimg"]=$item[9];
        $arr["maxprice"]=$item[10];
        $arr["itemid"] = $item[11];
        $all[] = $arr;
        
    }

    // print_r($all);


    echo json_encode($all); 







?>