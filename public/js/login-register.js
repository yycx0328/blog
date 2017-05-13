/*
 *
 * login-register modal
 * Autor: 小皮蛋
 * 
 */

$(function () {
    $loginBox = $('#loginBox');
    $registerBox = $('#registerBox');
    $userInfoBox = $('#userInfoBox');

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
                if(data.code){
                    shakeLoginModal(data.message);
                }
                else {
                    window.location.reload();
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
                console.log(data);
                if(!data.code){
                    showLoginForm();
                    $loginBox.find('[name="username"]').val(data.username);
                }
                else{
                    shakeLoginModal(data.message);
                }
            }
        });
    });

    $userInfoBox.find('img').on('click',function () {
        $.ajax({
            type:'get',
            url:'/api/logout',
            dataType:'json',
            success:function (data) {
                console.log(data);
                if(!data.code){
                    window.location.reload();
                }
            }
        });
    });
});

// 显示用户注册窗体
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('用户注册');
        $('#registerBox').find('[name="username"]').val('');
        $('#registerBox').find('[name="password"]').val('');
        $('#registerBox').find('[name="repassword"]').val('');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}

// 显示用户登录窗体
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        $('.modal-title').html('用户登录');

        $('#loginBox').find('[name="username"]').val('');
        $('#loginBox').find('[name="password"]').val('');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

// 点击用户头像打开登录窗体
function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

// 抖窗提示
function shakeLoginModal(msg){
    $('#loginModal .modal-dialog').addClass('shake');
    $('.error').addClass('alert alert-danger').html(msg);
    setTimeout( function(){
        $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );
}

   