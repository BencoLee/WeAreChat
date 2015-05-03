/**
 * Created by Benco on 2015/5/2.
 */
$("#form-register").submit(function(e){
    var username = $("#username-reg").val();
    var password = $("#password-reg").val();
    var password2 = $("#password2-reg").val();

    console.log("�û�����" + username + " ���룺" + password + " ȷ�����룺" + password2);

    if(password !== password2){
        alert("�����������벻һ�£�");
        return false;
    }

    if(username === '' || password === '' || password2 === ''){
        $(".nav-collapse .label-warning").html("���벻��Ϊ��!").show();
    }else{
        $.ajax({
            type: "post",
            url: "../Register",
            data: {
                "nickname" : nickname,
                "passwd" : passwd,
                "passwd2" : passwd2
            },
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data['state'] === "success"){
                    $(".nav-collapse .label-success").html(data['info']).show();
                }else if(data['state'] == "unsame"){
                    $(".nav-collapse .label-warning").html(data['info']).show();
                }else{
                    $(".nav-collapse .label-important").html(data['info']).show();
                }
            },
            error: function(){
                $(".nav-collapse .label-important").html("�������������Ժ�����...").show();
            }
        });
    }
    setTimeout('$(".nav-collapse .label").hide()', 3000);
})
