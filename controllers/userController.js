const users =  require('../data/users.js');
class UserController {
    // Get all users
    static getAllUsers(req, res) {
          return res.status(200).json({
                users,
                message: "All the students",
          });
    }
    // Get a single student
    static getSingleUser(req, res) {
           const findUser = users.find(student => student.id === parseInt(req.params.id, 10));
           if (findUser) {
               return res.status(200).json({
                     user: findUser,
                     message: "A single student record",
               });
           }
           return res.status(404).json({
                 message: "User record not found",
           });
    }
}
module.exports = UserController;