"use strict";
const users = [];
function createUser(email, isAdmin) {
    const user = {
        id: users.length + 1,
        email,
        isAdmin
    };
    users.push(user);
    return user;
}
const user = createUser('admin@inc.be', true);
console.log(user);
