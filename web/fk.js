/**
 * Created by Benco on 2015/5/1.
 */

window.wechat = {};

wechat.client = {};
wechat.client.ws = null;
wechat.client.url = 'ws://127.0.0.1:8080/fkjava/websocket';
wechat.client.callback = {};

wechat.fuck = {};
wechat.fuck.login = false;
wechat.fuck.register = false;
wechat.fuck.nickname = null;
wechat.fuck.user_id = null;
wechat.fuck.status = function (json) {
    switch (json.type) {
        case "login" :
            if (json.status == "true") {
                wechat.fuck.login = true;
                wechat.fuck.nickname = json.nickname;
                wechat.fuck.user_id = json.user_id;
            }
            break;
        case "register" :
            if (json.status == "true") {
                wechat.fuck.register = true;
            }
            break;
    }
}

wechat.client.init=function () {
    wechat.client.ws = new WebSocket(wechat.client.url);
    wechat.client.ws.onopen = wechat.client.callback.onopen;
    wechat.client.ws.onmessage = wechat.client.callback.onmessage;
    wechat.client.ws.onclose = wechat.client.callback.onclose;
    wechat.client.ws.onerror = wechat.client.callback.onerror;
}

wechat.client.callback.onopen = function () {
    console.log("ws is opened");
}

wechat.client.callback.onmessage = function (event) {
    console.log("ws received :" +event.data);
    var json = JSON.parse(event.data);
    switch (json.type) {
        case "login" :
            /*
                �ж�json.status �Ƿ�Ϊ��,wechat.client.
                �����Ϸ��ĵ�½,ע��ѡ��,��ʾnickname��ע����ť
            * */
            if (json.status== "true") {
                wechat.fuck.status(json);
                $('.nav-collapse ul').hide();
                $('#form-login').hide();
                $('#form-register').hide();
            }
            else {
                alert("Please Login in with a appropriate nickname and password")
            }
            break;
        case "register" :
            /*
             �ж�json.status �Ƿ�Ϊ��
             ����ע��ҳ�棬show����½ҳ��
            * */
            if (json.status == "true") {
                wechat.fuck.status(json);
                alert("Register successful , Please Login in");
                $('#form-login').show();
                $('#form-register').hide();
            }
            else {
                alert("Please Register with a appropriate nickname and password")
            }
            break;
        case "sendmsg" :
            /*
             �ж�wechat.status.login�Ƿ�Ϊ��
             ������Ϣ�������
            * */
            if (wechat.fuck.login == true && wechat.fuck.register == true) {
                    if (json.content!="") {
                        wechat.client.sendmsg(json);
                    }
            }
            else {
                alert("Please Login or Register First");
            }
            break;
    }
};
wechat.client.callback.onclose = function () {
    console.log("ws is closed");
};
wechat.client.callback.onerror = function () {
    console.log("ws is error");
};
wechat.client.sendmsg = function (json) {
    //alert(json);
    var message = json;
    var messageItem = '<li class="am-comment '
        + (message.isSelf ? 'am-comment-flip' : 'am-comment')
        + '">'
        + '<a href="javascript:void(0)" ><img src="assets/images/'
        + (message.user_id+'.jpg')
        //+ (message.isSelf ? 'self.png' : 'others.jpg')
        + '" alt="" class="am-comment-avatar" width="48" height="48"/></a>'
        + '<div class="am-comment-main"><header class="am-comment-hd"><div class="am-comment-meta">'
        + '<a href="javascript:void(0)" class="am-comment-author">'
        + message.nickname +'</a> <time>' + message.date
        + '</time></div></header>'
        + '<div class="am-comment-bd">' + message.content
        + '</div></div></li>';
    $(messageItem).appendTo('#message-list');
    $(".chat-content-container").scrollTop($(".chat-content-container")[0].scrollHeight);
    // �����Ϣ�����
    um.setContent('');
    // ��Ϣ������ȡ����
    um.focus();
}

function trim (str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function regex (str) {
    return str.replace(/<[^>]*>/g,"");
}

$(document).ready(function() {
    console.log("init");
    wechat.client.init();
    $('#sendmsg').on('click',function() {

        var um = UM.getEditor('myEditor');
        var msg = regex(um.getContent());
        var symbol = null;
        var username = null;
        try {
            msg = msg.split(" ")[0].match(/^@\S+/g)[0];
            symbol = msg[0];
            username = msg.substring(1,msg.length);
        }
        catch(e) {
        }

        if (!um.hasContents()) {	// �ж���Ϣ������Ƿ�Ϊ��
            // ��Ϣ������ȡ����
            um.focus();
            // ��Ӷ���Ч��
            $('.edui-container').addClass('am-animation-shake');
            setTimeout("$('.edui-container').removeClass('am-animation-shake')", 1000);
        }
        else {
            if (symbol == null || username == null) {
                wechat.client.ws.send(JSON.stringify({
                    "type":"sendmsg",
                    "content": um.getContent()
                }));
            }
            else {
                wechat.client.ws.send(JSON.stringify({
                    "type":"whisper",
                    "username" : username,
                    "content": um.getContent()
                }));
            }
        }
        // �����Ϣ�����
        um.setContent('');
        // ��Ϣ������ȡ����
        um.focus();
    });

    $('#form-register').submit(function(event) {
        var nickname = $('#nickname-reg').val();
        var passwd = $('#passwd-reg').val();
        var passwd2 = $('#passwd2-reg').val();

        if (!nickname || !passwd || !passwd2) {
            alert("This options can not be empty");
        }
        else if (passwd != passwd2) {
            alert("Should Comfirm your password");
        }
        else {
            wechat.client.ws.send(JSON.stringify({
                "type":"register",
                "nickname":nickname,
                "passwd":passwd
            }));
        }
    });

    $('#form-login').submit( function(event) {
        var nickname = $('#nickname').val();
        var passwd = $('#passwd').val();
        if(!nickname || !passwd) {
            alert("This options can not be empty");
        }
        else {
            wechat.client.ws.send(JSON.stringify({
                "type":"login",
                "nickname":nickname,
                "passwd":passwd
            }));
        }
    });
    $('.login').click(function() {
        if($('#form-login').is(':visible')) {
            $('#form-login').hide();
        }else {
            $('#form-login').show();
            $('#form-register').hide();
        }
    });
    $('.register').click(function() {
        if($('#form-register').is(':visible')) {
            $('#form-register').hide();
        }else {
            $('#form-login').hide();
            $('#form-register').show();
        }
    });
});