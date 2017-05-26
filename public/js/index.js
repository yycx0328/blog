/**
 * Created by lyh_o on 2017/5/7.
 */

function send_comment() {
    var content_id = $('#content_id').val();
    var text = $('#text_comment').val();
    console.log(content_id+'    '+text);
    $.ajax({
        type:'post',
        url:'send_comment',
        data:{content_id:content_id,text:text},
        dataType:'json',
        success:function (data) {
            console.log(data);
        }
    });
}