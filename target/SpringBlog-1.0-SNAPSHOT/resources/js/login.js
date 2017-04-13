(function($){



    function _init(){
        _initValidate();
        _initEvent();
    }



    function _initValidate(){

        $('#form-signin').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'The name is required and cannot be empty'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required and cannot be empty'
                        }
                    }
                }
            }

        });

    }

    function _initEvent(){
        $('#sign-in-btn').on('click',function(){
            _login();

        });

    }

    function _login(){
        var name = $('.form-signin-name').val();
        var password = $('.form-signin-password').val();
        var data = {
            name : name,
            password : password
        }

        $.post('/admin',data,function(data){
            if(data.resultCode == 1){
                location.href="/admin/index";
            }else{
                console.log(data.msg);
                $('.admin-login-alert').css('display','block');
                $('.admin-login-alert-msg').html(data.msg);
            }

        });
    }


    _init();

})(jQuery)