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
                    window.location = '/';
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

// 添加文章
function addContent() {
    $contentAddBox = $('#contentAddBox');
    $.ajax({
        type:'post',
        url:'/admin/content/add',
        data:{
            category:$('#category option:selected').val(),
            title:$('#title').val(),
            abstract:$('#abstract').val(),
            text:$('.nicEdit-main').html()
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
                    window.location.href='/admin/contents';
                }, 1000);
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}


// 修改用户
function updateUser() {
    $userUpdateBox = $('#userUpdateBox');
    $.ajax({
        type:'post',
        url:'/admin/user/update',
        data:{
            userid:$userUpdateBox.find('[name="userid"]').val(),
            isAdmin:$('#slctUserType option:selected').val()
        },
        dataType:'json',
        success:function (data) {
            if(data.code){
                displayAlert(false,data.message);
            }
            else {
                displayAlert(true,data.message);
                setTimeout(function () {
                    window.location.href='/admin/users';
                }, 1000);
            }
        },
        error:function (err) {
            console.log(err);
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
        // $(".alert-danger").animate({opacity:0},2000);
        setTimeout(function () {
            $('.alert-danger').html('');
            $('.alert-danger').css('display','none');
        }, 1000);
    }
}