<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="row">
    <div class="col-lg-12">
        <div id="blog-back"><span class="glyphicon glyphicon-circle-arrow-left"></span></div>
        <div class="scroll-content2" style="overflow-x: hidden;overflow-y: auto">
        <div class="bloglist">
            <div class="blog-post-container">
                <c:if test="${post != null}">
                    <h1 class="blog-post-title" data-key="${post.postId}"><c:out value="${post.postTitle}"/></h1>

                    <p class="lead">by <span><c:out value="${author}"/></span>
                    </p>
                    <hr>
                    <p>
                        <span class="glyphicon glyphicon-time"></span>Posted on <c:out value="${postDate}"/>
                    </p>
                    <hr>

                    <p class="post-content">${post.postContent}</p>
                    <hr>
                </c:if>
            </div>

            <div class="blog-post-comment-box">

                <!-- the comment box -->
                <div class="well">
                    <h4>Leave a Comment:</h4>
                    <div>
                        <div class="form-group">
                            <input class="form-control comment-box-name" placeholder="Name"></input>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control  comment-box-content" rows="3" placeholder="Please input"></textarea>
                        </div>
                        <button class="btn btn-primary comment-box-submit-btn">Submit</button>
                    </div>
                </div>

                <hr>

            </div>

            <div class="blog-post-comments-container">
            </div>
            </div>
    </div>
    </div>
</div>

<script src="/resources/js/blog-post.js"/>