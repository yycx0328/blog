/**
 * Created by lyh_o on 2017/5/7.
 */
function categoryClick(categoryid,categoryname) {
    console.log(categoryid+" "+categoryname);
    $.ajax({
        type:'post',
        url:'/index/category_index',
        data:{categoryid:categoryid,categoryname:name},
        dataType:'json',
        success:function (data) {
        }
    });
}