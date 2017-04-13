package com.xin.repository.impl;

import com.xin.model.Post;
import com.xin.repository.PostRepo;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import java.util.Collection;

/**
 * Author: Xin
 * Date: 14-5-7
 * Time: 下午3:23
 */
@Repository
public class PostRepoImpl implements PostRepo {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getCurrentSession(){
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public Long save(Post post) throws DataAccessException {

        Long id = post.getPostId();

        if(id == null){
            id = (Long) this.getCurrentSession().save(post);
        }else {
            this.getCurrentSession().update(post);
        }

        return id;
    }

    @Override
    public Post find(Long id) throws DataAccessException {
        System.out.println("获取blog表。。。");
//        hibernate中Session接口提供的get()和load()方法都是用来获取一个实体对象
        return (Post) this.getCurrentSession().get(Post.class, id);
    }

    @Override
//    你先写hql语句 然后用this.getsession.createquery(hql)
//    参数用query。setpartmeter（0,参数）
//     最后用query.list()就行了。得到的是集合对象。
    //查找首页所有post
    public Collection<Post> findAll() throws DataAccessException {

        Query query =  this.sessionFactory.getCurrentSession().createQuery("from Post");

        return  query.list();
    }
    //搜索输入的post
    public Collection<Post> findSearchPost(String val) throws DataAccessException {

        Query query =  this.sessionFactory.getCurrentSession().createQuery("from Post as P where P.postTitle like :name");
        query.setString("name", "%" + val + "%");
        return  query.list();
    }

     //查找父级下的post
     public Collection<Post> findfilterPost(Long val) throws DataAccessException {

         Query query =  this.sessionFactory.getCurrentSession().createQuery("from Post as P where P.categoryId =:categoryId");
         query.setLong("categoryId",val);
         return  query.list();
     }

    @Override
    public void delete(Long id) throws DataAccessException {

        Query query =  this.sessionFactory.getCurrentSession().createQuery("delete Post where postId=?");
        query.setLong(0,id);
        query.executeUpdate();
    }
}
