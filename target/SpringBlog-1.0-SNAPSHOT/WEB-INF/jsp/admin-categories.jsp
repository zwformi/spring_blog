<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
   
  </head>

  <body>

    <div class="row">
        <div class="col-lg-10">
            <h2>All Categories</h2>

            <table class="table table-hover admin-categories-table">
                <tbody>
                <c:if test="${categories != null}">

                    <c:forEach items="${categories}" var="item">
                        <tr data-key="${item.catId}">
                            <td>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" value="">
                                        <h4>${item.catName}</h4>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </c:forEach>
                </c:if>
                </tbody>
            </table>
            <div class="alert admin-categories-alert">
                <strong class="admin-categories-alert-msg">Well done!</strong>
                <span class="admin-categories-alert-msg-notice"></span>
            </div>

            <div class="btn-group categories-btn-group">

            </div>

            <!-- Modal -->
            <div class="modal fade" id="createCategoryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Create new category</h4>
                  </div>
                  <div class="modal-body">
                        <h5>Category Name</h5>
                        <input type="text" class="form-control category-name" placeholder="Category Name">

                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary save-category-btn">Save</button>
                  </div>
                </div><!-- /.modal-content -->
              </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

            <div class="modal fade" id="editCategoryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="editModalLabel">Edit category</h4>
                        </div>
                        <div class="modal-body">
                            <h5>Category Name</h5>
                            <input type="text" class="form-control category-name">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary edit-category-btn">Save changes</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->


        </div><!-- /.col-lg-6 -->
    </div><!-- /.row -->


    <script src="/resources/js/admin-categories.js"></script>
  </body>
</html>
