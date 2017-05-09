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