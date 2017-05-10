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
                displayAlert(false,data.message);
            }
            else {
                displayAlert(true,data.message);
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

// 修改分类
function updateCategory() {
    $categoryUpdateBox = $('#categoryUpdateBox');
    $.ajax({
        type:'post',
        url:'/admin/category/update',
        data:{
            categoryid:$categoryUpdateBox.find('[name="categoryid"]').val(),
            categoryname:$categoryUpdateBox.find('[name="categoryname"]').val()
        },
        dataType:'json',
        success:function (data) {
            console.log(data);
            if(data.code){
                displayAlert(false,data.message);
            }
            else {
                displayAlert(true,data.message);
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

// 删除分类
function deleteCategoryBtn(id) {
    $.ajax({
        type:'post',
        url:'/admin/category/delete',
        data:{categoryid:id},
        dataType:'json',
        success:function (data) {
            alert(data.message);
            if(!data.code){
                window.location.reload();
            }
        }
    })
}

// 显示提示面板
function displayAlert(success,message) {
    if(success){
        $('.alert-danger').html('');
        $('.alert-danger').css('display','none');
        $('.alert-success').html(message);
        $('.alert-success').css('display','block');
    }
    else{
        $('.alert-danger').html(message);
        $('.alert-danger').css('display','block');
        $('.alert-success').html('');
        $('.alert-success').css('display','none');
    }
}