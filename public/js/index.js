/**
 * Created by lyh_o on 2017/5/7.
 */

function send_comment() {
    var content_id = $('[name="content_id"]').val();
    var text_comment = $('[name="text_comment"]').val();
    $.ajax({
        type:'post',
        url:'send_comment',
        data:{content_id:content_id,text_comment:text_comment},
        dataType:'json',
        success:function (data) {
            console.log(data);
            var htmlComments = '';
            if(!data.code) {
                if (data.comments && data.comments.length > 0){
                    for (var i=0;i<data.comments.length;i++){
                        htmlComments += data.comments[i]+'\n';
                    }
                } else
                    htmlComments = '<p style="text-indent:2em;">该博文还没有评论，快去抢沙发吧</p>';
            }
            else
                htmlComments = '<p style="text-indent:2em;">该博文还没有评论，快去抢沙发吧</p>';
            $('#list-comments').html(htmlComments);
        }
    });
}