drop table if exists category;

drop table if exists comment;

drop table if exists hello;

drop table if exists post;

drop table if exists user;

/*==============================================================*/
/* Table: category                                              */
/*==============================================================*/
create table category
(
  cat_id               bigint(20) not null auto_increment,
  cat_name             varchar(64),
  cat_description      longtext,
  cat_parent           bigint(20),
  primary key (cat_id)
);

alter table category comment 'categorytable';

/*==============================================================*/
/* Table: comment                                               */
/*==============================================================*/
create table comment
(
  comment_id           bigint(20) not null auto_increment,
  post_id              bigint(20),
  comment_author       tinytext,
  comment_author_email varchar(100),
  comment_date         datetime,
  comment_content      text,
  comment_parent       bigint(20),
  user_id              bigint(20),
  primary key (comment_id)
);

alter table comment comment 'comment table';

/*==============================================================*/
/* Table: hello                                                 */
/*==============================================================*/
create table hello
(
  id                   int not null auto_increment,
  name                 varchar(256),
  remarks              varbinary(256),
  primary key (id)
);

alter table hello comment 'hello table for test ';

/*==============================================================*/
/* Table: post                                                  */
/*==============================================================*/
create table post
(
  post_id              bigint(20) not null auto_increment,
  author_id            bigint(20),
  post_date            datetime,
  post_content         longtext,
  post_title           text,
  post_status          int(8) comment '0:draft
            1:publish
            2:private

            ',
  comment_status       int(8) comment '0:closed
            1:open
            3:registered_only',
  category_id          bigint(20),
  post_modified_date   datetime,
  comment_count        int(128),
  primary key (post_id)
);

alter table post comment 'post table';

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
  user_id              bigint(20) not null auto_increment,
  user_name            varchar(64),
  user_email           varchar(64),
  user_qq              varchar(16),
  password             varchar(32),
  user_status          int(12),
  primary key (user_id)
);

alter table user comment 'user table';


INSERT INTO user (user_id, user_name, password) VALUES ('1', 'admin', '123456');