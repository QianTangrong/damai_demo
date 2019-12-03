<?php
 @require_once("common.php"); 
//select * from `show` where showtype='演唱会' Order By showprice
//获取前端传送的  city   type   sortBy
    $showtype = $_POST["showtype"];
    $showcity = $_POST["showcity"];
    $sortBy = $_POST["sortBy"];
   
    if($showtype=='*'&&$showcity=='*'){
        $sqlStr = "select * from `show`  Order By $sortBy";
    }else if($showtype!='*'&&$showcity!='*'){

        $sqlStr = "select * from `show` where showtype='$showtype' and showcity='$showcity'  Order By $sortBy";
    }else if($showcity=='*'&&$showtype!='*'){
        $sqlStr = "select * from `show` where showtype='$showtype'  Order By $sortBy";
    }else if($showcity!='*'&&$showtype=='*'){
        $sqlStr = "select * from `show` where showcity='$showcity'  Order By $sortBy";
    }

   
    $result = mysql_query($sqlStr);

    

    $all = array(); 
    while($item = mysql_fetch_array($result)){

       
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
        $all[] = $arr;
        
    }



    echo json_encode($all); 







?>
