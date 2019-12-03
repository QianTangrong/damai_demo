<?php
  @require_once("common.php");


    /* if($res){
        echo "success!";

    }else{
        echo "fail";
    } */

    $sqlStr = 'select * from `show` where showtype="演唱会"';

    //！！！！！！！！！！！！！ 查询的时候  需要接受 mysql_query 执行的结果
    $result = mysql_query($sqlStr);//查询的结果 (数据的集合)

    // 想要解析数据$result 需要通过方法  mysql_fetch_array => 注意 mysql_fetch_array($result) 每次只解析一条

    // 数据解析  
    // 1. 如果只有一条或0条   直接用  $item = mysql_fetch_array($result);
    // 2. 如果数据比较多  选择用 while 循环配合  mysql_fetch_array($result);

    /* $item = mysql_fetch_array($result);
    print_r($item);
    echo "<br/>";

    $item = mysql_fetch_array($result);
    print_r($item);
    echo "<br/>";
    
    $item = mysql_fetch_array($result);
    print_r($item);
    echo "<br/>";

    $item = mysql_fetch_array($result);
    print_r($item);
    echo "<br/>";

    $item = mysql_fetch_array($result);   //最终数据解析不出来的话,$item 为false
    print_r($item==false);
    echo "<br/>"; */

    $all = array(); // 用于存放所有的数据
    // 1.数据解析 用于解析 mysql查询的多条数据
    while($item = mysql_fetch_array($result)){

        // print_r($item);
        // echo "<br/>";

        //2. 新建数组,自定义数据(可以选择数据,添加键值对)
        $arr = array();
        $arr["ID"] = $item[0];
        $arr["showname"]=$item[1];
        $arr["showspace"]=$item[2];
        $arr["showtime"]=$item[3];
        $arr["pricebetween"]=$item[8];
        $arr["shower"] = $item[5];
        $arr["showcity"] = $item[6];
        $arr["showimg"]=$item[9];
        $arr["itemid"] = $item[11];
        // $arr["showtime"]=$item[3];
        // print_r($arr);
        // echo "<br/>";

        // 3. 把解析的数据放到一个总的集合中去
        $all[] = $arr;// 相当于js中的 all[all.length]  数组的递增赋值
        
    }

    // print_r($all);


    echo json_encode($all);  //输出 JSON类型的字符串







?>
