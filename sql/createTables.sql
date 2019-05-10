-- it works, ignore error
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id SERIAL, 
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE comments
(
  id SERIAL,
  content varchar(255) NOT NULL,
  userId BIGINT(20) unsigned,
  CONSTRAINT fk_comments_has_user
  FOREIGN KEY (userId)
  REFERENCES test_db.users(id) 
  ON DELETE CASCADE,
  PRIMARY KEY (id)
);
   