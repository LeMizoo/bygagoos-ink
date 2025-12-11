// backend/models/User.js
class User {
  constructor(id, username, password, role, name, email = '') {
    this.id = id;
    this.username = username;
    this.password = password; // En production: hash avec bcrypt
    this.role = role;
    this.name = name;
    this.email = email;
    this.createdAt = new Date().toISOString();
    this.lastLogin = null;
  }
}

module.exports = User;