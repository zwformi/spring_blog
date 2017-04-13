<%--
  Created by IntelliJ IDEA.
  User: Xin
  Date: 14-5-12
  Time: 上午9:23
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <title>SpringBlog</title>
    <!-- Bootstrap core CSS -->
    <link href="/resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="/resources/css/bootstrap3-wysiwyg5-color.css" rel="stylesheet">
    <link href="/resources/css/blog.css" rel="stylesheet">

</head>

<body>

  <tiles:insertAttribute name="header" />
  <div style="width: 1170px;margin:0 auto;">
      <div class="row">
      <div class="col-lg-6 form-group" style="margin-top: 2px">
      <input type="text" class="form-control" style="vertical-align:middle;border-radius:0px;width: 80%;display: inline-block;" placeholder="请输入关键词搜素..."/>
          <span class="input-group-btn" style="margin-left:-4px;display: inline-block;">
              <button id="SearchPost" class="btn btn-primary ng-binding" name="btn_search" type="button" style="border-radius:0px">
                  搜索
              </button>
          </span>
      </div>
      </div>
  </div>
  <div class="container blog-container-wrap" style="padding:0px">


    <div class="row">
      <div class="col-lg-8 blog-container-wrap-content scroll-content2">
          <!-- blog-->

      </div>
      <div class="col-lg-4">
        <tiles:insertAttribute name="menu"/>
      </div>
    </div>


  </div>
  <tiles:insertAttribute name="footer"/>


  <!-- JavaScript -->
  <script src="/resources/js/lib/jquery-1.10.2.js"></script>
  <script src="/resources/js/lib/bootstrap.js"></script>
  <script src="/resources/js/lib/json.min.js"></script>
  <script src="/resources/js/blog.js"></script>


</body>
</html>