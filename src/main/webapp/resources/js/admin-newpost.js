(function($) {

    var POST_STATUS_DRAFT = 0;
    var POST_STATUS_PUBLISH = 1;
    var POST_STATUS_PRIVATE = 2;
    $.admin.container = $('.admin-container-inner-wrap');

    function _init(){

        _initEditor();
        _initCategorySelectMenu();
        _initEvent();
    }

    function _initEditor(){

        $('#new-post-content').wysihtml5({
            "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
            "emphasis": true, //Italics, bold, etc. Default true
            "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
            "html": false, //Button which allows you to edit the generated HTML. Default false
            "link": true, //Button to insert a link. Default true
            "image": true, //Button to insert an image. Default true,
            "color": true, //Button to change color of font
            "size": 'sm', //Button size like sm, xs etc.
            stylesheets: ["/resources/css/bootstrap3-wysiwyg5-color.css"]
        });

    }

    function _initCategorySelectMenu(){

        _listCategory();

    }
    function _loadCategoryData(categories){

        var html = '';
        var menu = $('.newpost-category-select-menu');

        for(var i = 0; i < categories.length; i++){
            var category = categories[i];
            html += '<li><a data-key="'+category.catId+'" href="#">'+category.catName+'</a></li>';
        }
        menu.append($(html));

        $('li','.newpost-category-select-menu').each(function(){
            $(this).on('click',function(){
                var category = $(this).find('a');
                $('.newpost-category-btn-name').html(category.html());
                $('.newpost-category-btn-name').attr('data-key',category.attr('data-key'));
                $('.dropdown-toggle').dropdown();

            });

        });

    }
    function _initEvent(){
        // var item=$('.sidebar').find('.list-group');
        // alert("1111");
        // alert(item.html());
        // if(item.hasClass("menu-btn-new"))
        // {
        //     alert("2222");
        //     $(".new-post-cancel-btn").html("Reset");
        // }


        $('.new-post-cancel-btn').on('click',function(){
            _cancelPosts();

        });


        $('.new-post-save-btn').on('click',function(){
            _savePosts();

        });
        $('.new-post-publish-btn').on('click',function(){
            _publishPosts();

        });

    }
    // 撤销按钮
   function _cancelPosts(){
       //  alert("123!");
        var activeitem=$(".list-group.admin-menu").find(".active");
        if(activeitem.hasClass("menu-btn-new")&&typeof($('.admin-new-post-title').attr('data-key'))!="undefined")
        {
            alert("您已经保存该博文，不可重置Reset");
        }
        else if(activeitem.hasClass("menu-btn-new")&&typeof($('.admin-new-post-title').attr('data-key'))=="undefined")
        {
            $('.admin-new-post-title').val("");
            document.getElementsByClassName('wysihtml5-sandbox')[0].contentWindow.document.getElementsByClassName('wysihtml5-editor')[0].innerHTML="";
        }
        else if(activeitem.hasClass("menu-btn-posts"))
        {
            $.admin.container.load('/admin/view/posts',function(){
                $('.menu-btn-posts').addClass('active');

            });
        }


   }


    //ajax
    function _savePosts(){

        var categoryId = $('.newpost-category-btn-name').attr('data-key');
        var postTitle = $('.admin-new-post-title').val();
        var postContent = $('#new-post-content').val();
        var postId =  $('.admin-new-post-title').attr('data-key');

        var url = '/admin/post';
        var data = {
            categoryId : categoryId,
            title : postTitle,
            content : postContent,
            postStatus : POST_STATUS_DRAFT
        };
        if(postId != undefined && postId != ''){
            data.postId = postId;
        }
        if($.trim(data.categoryId)!=""&&$.trim(data.title)!=""&&$.trim(data.content)!="")
        {
            $.post(url,data,function(data){
                console.log('save post success----'+data);
                if(data.returnCode == 1){

                    var postId = data.postId;
                    $('.admin-new-post-title').attr('data-key',postId);

                    $('.admin-new-post-alert').addClass('alert-success');
                    $('.admin-new-post-alert').css('display','block');
                }

            });
        }


    }

    function _publishPosts(){

        var categoryId = $('.newpost-category-btn-name').attr('data-key');
        var postTitle = $('.admin-new-post-title').val();
        var postContent = $('#new-post-content').val();
        var postId =  $('.admin-new-post-title').attr('data-key');


        var url = '/admin/post';
        var data = {
            categoryId : categoryId,
            title : postTitle,
            content : postContent,
            postStatus : POST_STATUS_PUBLISH
        };
        if(postId != undefined && postId != ''){
            data.postId = postId;
        }
        if($.trim(data.categoryId)!=""&&$.trim(data.title)!=""&&$.trim(data.content)!="") {
            $.post(url, data, function (data) {
                console.log('save post success----' + data);
                if (data.returnCode == 1) {

                    var postId = data.postId;

                    $.admin.container.load('/admin/view/post/' + postId, function () {

                    });

                }
            });
        }
    }
    function _listCategory(){
        $.get('/categories',function(data){
            _loadCategoryData(data.categories);

        });
    }



    _init();


})(jQuery);