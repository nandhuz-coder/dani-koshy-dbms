const Db = require("../database/sql");
const connection = Db;

//Find User by emailId
function findUserByEmail(userEmail) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [userEmail], (error, results) => {
      if (error) {
        console.error("error");
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

//Sub function for user registration
function doesUserExist(userEmail) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [userEmail], (error, results) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}
// Function to register a new user
function registerUser(userEmail, userName, userType, password) {
  return new Promise((resolve, reject) => {
    doesUserExist(userEmail)
      .then((userExists) => {
        if (userExists) {
          reject(new Error("User already exists"));
        } else {
          const query =
            "INSERT INTO users (email, name, user_type, password) VALUES (?, ?, ?, ?)";
          connection.query(
            query,
            [userEmail, userName, userType, password],
            (error, results) => {
              if (error) {
                console.error(error);
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

module.exports = {
  findUserByEmail,
  registerUser,
};
