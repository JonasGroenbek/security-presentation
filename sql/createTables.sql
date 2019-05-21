-- it works, ignore error
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id SERIAL, 
  username VARCHAR(20) NOT NULL UNIQUE,
  secret VARCHAR(100) NOT NULL,
  password VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE comments
(
  id SERIAL,
  content VARCHAR(255) NOT NULL,
  userId BIGINT(20) unsigned,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT fk_comments_has_user
  FOREIGN KEY (userId)
  REFERENCES test_db.users(id) 
  ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE secret
(
  id SERIAL,
  mostSecureSecretInTheWorld VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO secret(mostSecureSecretInTheWorld) VALUES ("You deserve a beer.");
INSERT into users(username, secret, password) VALUES("test", "I am just a test user..", "$2a$10$FGvdWYpBaa55vFNppK1OtunE3GD1vscczpfT0Xoie0zjXpCjxGdAO"); -- password is 1234
<<<<<<< HEAD
INSERT into comments(content, userId) VALUES("I am test's comment!", "1");
=======
INSERT into comments(content, userId) VALUES("I am test's comment!", "1");
>>>>>>> 76fe43b25a97aacdc3ab8766080d31c59574f950
