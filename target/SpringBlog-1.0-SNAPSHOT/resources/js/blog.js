(function($){

    var blogContainer = $('.blog-container-wrap-content');
    var searche=$("#SearchPost");

    function _init(){
         var type={"type":"Whole"};
        _listPost(type);
        _listCategory();
    }

    function _initEvent(){

        $('.blog-title-btn').each(function(){

            $(this).on('click',function(){

                var postId = $(this).parent().parent().attr('data-key');
                console.log(postId);
                _findPost(postId);

            });

        });
       //搜索事件绑定
        searche.on("click",function(){
            var searchval=$(this).parents(".form-group").find("input[type='text']").val();
            if($.trim(searchval)!="")
            {
                var type={"type":"Search","value":searchval};
                _SearchPost(type);
            }
            else
            {
                var type={"type":"Whole"};
                _SearchPost(type);
            }
        });



    }

    function _loadPostData(posts){
        var html = [];
        html.push('<div class="bloglist">');
        for(var i = 0; i < posts.length; i++){
            var post = posts[i];
            html.push('<div class="blog-container-wrap-content-blog" data-key="'+post.postId+'">');
            html.push('<h2 class=""><a class="blog-title-btn" href="#">'+post.postTitle+'</a></h2>');
            html.push('<hr>');
            html.push('</div>');
        }
        html.push('</div>');
        blogContainer.empty();
        blogContainer.append(html.join(''));
        _initEvent();

    }

    function _loadCategoryData(categories){
        var list=$(".list-unstyled");
        for(var i = 0; i < categories.length; i++){
            var category = categories[i];
            var html = [];
            if(i%2 == 0){
                html.push('<li data-key="'+category.catId+'" style="padding: 5px 15px;" class="blog-menu-category-right">');
            }else{
                html.push('<li data-key="'+category.catId+'" style="padding: 5px 15px;" class="blog-menu-category-left">');
            }
            html.push('<a href="#" style="color:#fff">'+category.catName+'</a>');
            html.push('</li>');
            list.append(html.join(''));
        }
        list.find("li").each(function (i) {
            $(this).on("click",function(){
                var filter={};
                filter.type="filter";
                filter.value= $(this).attr("data-key");
                _filterPost(filter);
            })

        });
    }


    //ajax
    //查找所有post
    function _listPost(val){
        var V=JSON.stringify(val);
        $.get('/posts/'+V, function(data){
            var posts = data.posts;
            _loadPostData(posts);
        });

    }
    //搜索post
    function _SearchPost(val){
        var V=JSON.stringify(val);
        var vale=encodeURI(encodeURI(V));
        $.get('/posts/'+vale, function(data){
            var posts = data.posts;
            _loadPostData(posts);
        });
    }
    //查找父级下的post
    function _filterPost(val){
        var V=JSON.stringify(val);
        var vale=encodeURI(encodeURI(V));
        $.get('/posts/'+vale, function(data){
            var posts = data.posts;
            _loadPostData(posts);
        });
    }

    function _findPost(postId){

        blogContainer.load('/view/post/'+postId);
    }

    function _listCategory(){
        $.get('/categories',function(data){
            var categories = data.categories;
           _loadCategoryData(categories);
        })
    }






    _init();



})(jQuery)