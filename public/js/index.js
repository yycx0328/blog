/**
 * Created by lyh_o on 2017/5/7.
 */
$(function () {
    $loginBox = $('#loginBox');
    $registerBox = $('#registerBox');
    $userInfo = $('#userInfo');

    // 显示注册模块
    $loginBox.find('a.colMint').on('click',function () {
        $registerBox.show();
        $loginBox.hide();
        $userInfo.hide();
    });

    // 显示登录模块
    $registerBox.find('a.colMint').on('click',function () {
        $loginBox.show();
        $registerBox.hide();
        $userInfo.hide();
    });

    // 登录按钮
    $loginBox.find('button').on('click',function () {
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val()
            },
            dataType:'json',
            success:function (data) {
                if(!data.code)
                    $loginBox.find('.colWarning').html(data.message);
                else {
                    setTimeout(function () {
                        $loginBox.hide();
                        $userInfo.show();

                        $userInfo.find('.username').html(data.userInfo.username);
                        $userInfo.find('.info').html('你好，欢迎光临我的博客！');
                    }, 1000);
                }
            }
        })
    });

    // 注册按钮
    $registerBox.find('button').on('click',function () {
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val()
            },
            dataType:'json',
            success:function (data) {
                $registerBox.find('.colWarning').html(data.message);
                if(!data.code){
                    setTimeout(function () {
                        $loginBox.show();
                        $registerBox.hide();
                    },1000);
                }
            }
        });
    });
});