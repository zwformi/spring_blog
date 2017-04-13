package com.xin.repository;

import com.xin.model.Post;
import org.springframework.dao.DataAccessException;

import java.util.Collection;

/**
 * Author: Xin
 * Date: 14-5-5
 * Time: 上午9:44
 */
public interface PostRepo {

    Long save(Post post) throws DataAccessException;

    Post find(Long id) throws DataAccessException;
  //查找首页所有post
    Collection<Post> findAll() throws DataAccessException;
 //搜索输入的post
    Collection<Post> findSearchPost(String val) throws DataAccessException;
//查找父级下的post
    Collection<Post> findfilterPost(Long val) throws DataAccessException;
    void delete(Long id) throws DataAccessException;

}
