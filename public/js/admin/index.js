/**
 * Created by luyh on 2017/5/9.
 */
$(function () {
    $('#logoutBtn').on('click',function () {
        $.ajax({
            type:'get',
            url:'/api/logout',
            dataType:'json',
            success:function (data) {
                if(!data.code){
                    window.location = '../';
                }
            }
        });
    });
});

// 添加分类
function addCategory() {
    $categoryAddBox = $('#categoryAddBox');
    $.ajax({
        type:'post',
        url:'/admin/category/add',
        data:{
            categoryname:$categoryAddBox.find('[name="categoryname"]').val()
        },
        dataType:'json',
        success:function (data) {
            console.log(data);
            if(data.code){
                $('.alert-danger').html(data.message);
                $('.alert-danger').css('display','block');
            }
            else {
                $('.alert-success').html(data.message);
                $('.alert-success').css('display','block');
                setTimeout(function () {
                    window.location.href='/admin/categories';
                }, 1000);
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}