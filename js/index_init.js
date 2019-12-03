// var phone = getCookie("phone");
//     // console.log(phone);
//     var user = $(".userName");
//     // console.log(user);
//     if(phone){
//         user.html("地瓜");
//         $(".userImg").attr("src","image/index/userImg.jpg");
//         $(".exit").html("退出登录");
//     }

//     $(".exit").click(function(){
       
//         setCookie("phone",phone,-1, path = "/");
//         location.reload();
//     })

    $.ajax({
        type:'POST',
        url:'php/indexSearch.php',
        dataType:'json',
        success:function(data){
            // console.log(data);
            html = "";
            for(let i = 0;i<data.length;i++){
                let item = data[i];
                // console.log(item);
                
                var {ID,showname,showspace,showtime,showprice,showimg,itemid}=item;
                html+=` <div class="item" showID="${ID}"  itemid="${itemid}">
                <div class="item_img">
                    <img src="${showimg}" alt="">
                </div>
                <div class="item_info">
                        <div class="item_name item_message">${showname}...</div>
                        <div class="item_place item_message">${showspace} </div>
                        <div class="item_time item_message">${showtime}</div>
                        <div class="item_price">${showprice} <span>起</span></div>
                </div>
        </div>`
            }
            $(".goodList_left").html(html);
           var showList =$(".item");
            // console.log(showList);
            showList.click(function(){
               var showID =  $(this).attr("showID");
               var itemid = $(this).attr("itemid");
            //    console.log(itemid);
            location.href = `detail.html?showID=${showID}&itemid=${itemid}`
            }) 
        }
    })