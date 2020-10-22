# Final Year Project Server.

Yuting Jing

## Overview.

This web application is designed for people who are interested in English/Chinese poetry, as well as artworks such as paintings and sculptures. In login function, I made a session-based authentication, which mainly learned from this link: https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359.

## API endpoints.

 + GET /users - Get all users.
 + GET /users/:id - Get a user by id.
 + GET /usersLogout - Get the logged in user.
 + GET /poems - Get all poems.
 + GET /poems/:id - Get all poems by id.
 + GET /poems/:title - Get all poems by it's title.
 + GET /mypoems - Get the poems created by the logged in user.
 + GET /authors - Get all authors.
 + GET /authors/:id - Get all authors by id.
 + POST /usersRegister - Let user register.
 + POST /users/login - Let user login.
 + POST /poems - Add a poem.
 + POST /authors - Add an author.
 + PUT /poems/:title - Edit a poem.
 + PUT /poems/:id/like - Add a thumb up for a poem.
 + PUT /poems/:id/unlike - Cancel a thumb up for a poem. 
 + PUT /authors/:id/like - Add a thumb up for an author.
 + PUT /authors/:id/unlike - Cancel a thumb up for an author.
 + PUT /authors/:id/work - Add a work for an author's works array.
 + PUT /authors/:id/deletework - Delete a work for an author's works array.
 + DELETE /users/:id - Delete a user from the database.
 + DELETE /poems/:id - Delete a poem from the database.
 + DELETE /authors/:id - Delete an author from the database.



