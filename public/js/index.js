/**
 * Created by lyh_o on 2017/5/7.
 */

function send_comment() {
    var contentid = $('[name="contentid"]').val();
    var comment = $('[name="comment"]').val();
    $.ajax({
        type:'post',
        url:'send_comment',
        data:{contentid:contentid,comment:comment},
        dataType:'json',
        success:function (data) {
            console.log(data);
            if(!data.code) {
                $('[name="comment"]').val('');
            }
        }
    });
}