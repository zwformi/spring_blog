package com.xin.web;


import com.xin.model.Comment;
import com.xin.model.Post;
import com.xin.model.User;
import com.xin.service.SpringBlogService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.codehaus.jackson.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Author: Xin
 * Date: 14-5-5
 * Time: 上午10:10
 */

@Controller
public class SpringBlogController {

    @Autowired
    private SpringBlogService springBlogService;
    public static JsonGenerator jsonGenerator = null;
    private static ObjectMapper mapper = new ObjectMapper();
    @RequestMapping("/")
    public ModelAndView index(){
        return new ModelAndView("blog.index");
    }


    @RequestMapping(value = "/posts/{typeorvalue}", method = RequestMethod.GET)
    public @ResponseBody Map<String,Object> findPost(@PathVariable String typeorvalue) throws IOException {
       Map<String,Object> resultMap = new HashMap<String, Object>();
       String value= URLDecoder.decode(typeorvalue, "UTF-8");
        Map<String, Object> maps = mapper.readValue(value, Map.class);
        System.out.println(maps.size());
        System.out.println(maps.get("type"));
        String val=(String)maps.get("type");
        if(val.equals("Whole"))
        {
            resultMap.put("posts",this.springBlogService.findAllPost());
        }
        else if(val.equals("Search"))
        {
            resultMap.put("posts",this.springBlogService.findSearchPost((String)maps.get("value")));
        }
        else
        {
            resultMap.put("posts",this.springBlogService.findfilterPost(Long.parseLong((String)maps.get("value"))));
        }
        return resultMap;

    }


    @RequestMapping(value = "/view/post/{postId}", method = RequestMethod.GET)
    public ModelAndView findPost(@PathVariable Long postId){

        Map<String,Object> model = new HashMap<String, Object>();

        Post post = this.springBlogService.findPostById(postId);
        User author = this.springBlogService.findUserById(post.getAuthorId());
        SimpleDateFormat dateformat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss E");
        String postDate = dateformat.format(post.getPostDate());


        model.put("post",post);
        model.put("author",author.getUserName());
        model.put("postDate",postDate);

        return new ModelAndView("blog.post", model);
    }

    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    public @ResponseBody Map<String,Object> findAllCategory(){

        Map<String,Object> resultMap = new HashMap<String, Object>();
        resultMap.put("categories",this.springBlogService.findAllCategory());
        return resultMap;

    }

    @RequestMapping(value = "/post/{postId}/comment", method = RequestMethod.POST)
    public @ResponseBody Map<String,Object> saveComment(@PathVariable Long postId, @RequestParam String name, @RequestParam String commentContent){

        Map<String,Object> resultMap = new HashMap<String, Object>();

        Comment comment = new Comment();
        comment.setCommentContent(commentContent);
        comment.setPostId(postId);
        comment.setCommentAuthor(name);
        comment.setCommentDate(new Date());

        this.springBlogService.saveComment(comment);

        return resultMap;

    }

    @RequestMapping(value = "/post/{postId}/comments", method = RequestMethod.GET)
    public @ResponseBody Map<String,Object> findCommentByPostId(@PathVariable Long postId){

        Map<String,Object> resultMap = new HashMap<String, Object>();

        resultMap.put("comments",this.springBlogService.findCommentByPostId(postId));

        return resultMap;

    }

}
