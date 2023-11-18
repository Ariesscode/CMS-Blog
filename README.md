# 14 Model-View-Controller CMS BLOG APP

## Your Task

CMS Blog App gives users the opportunity to share blog posts with one another. Each user willl be able to create an account and sign in with their login credentials. The bycrypt package https://www.npmjs.com/package/bcrypt makes the user's password secure and unreadable so that potential hackers are not able to login with their credentials. Anyone viewing the app will be able to see all of the different user's posts, but only user's that are logged in will be able to interact with blog posts, such ass leaving a comment, updating posts, removing content, and lots more. One functionality that will be added in the future are updating passwords if a user forget their login password or email. This will make it more accessible for users, so that they continue to use the app. If the user tries to leave a comment or continue to scope the app, such ass viewing the dashboard view, it will redirect the user to the register or login page. Once the user is logged in, then they will be able to use the workbench page known as the dashboard to create posts, update, delete and view their recent created posts. The post history table keeps track of any new posts that have been added or updated, including the date they made any changes. Users have unique usernames, so that when a user leaves a comment under a post, the username of the user and their comment will show on blog page. Another functionality that will be added is a profile page, which will contain the users email, image of the user, and a image uploader system for users to be able to upload profile pictures and images for posts created. Any post that is created, updated, deleted, or is shown in the post history table and blog page are fetched from the MYSQL database [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for your Models, and create an Express.js API for the controllers. Each model is set to have different properties that are used in the handlebar views template created [express-handlebars](https://www.npmjs.com/package/express-handlebars) to render different data from the database. A [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables, and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication and to keep private sessions and passwords hidden from view in client side. 

--Follow Steps below , then Register as a NEW USER or use pre-logins:

"email": calebM@email.com
"password": basketball42

"email": karina127@email.com
"password": suspenders78



## GET STARTED 
-Set up your connection js file to connect to the MYSQL database :
require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL);
module.exports = sequelize;
**We will use dotenv to make sure our sensitive information is not in plain view**
-set up your database enviornment variables :
MYSQL_URL =mysql://root:docker@localhost:3306/user_db
DB_NAME =user_db
DB_USER =root
DB_PASSWORD =
SESSION_SECRET = 
**Make sure to add your password and session secret password**
-After you have created those files, install all dependencies :
npm i
-After you have installed all dependencies:
npm run seeds
npm start 
**Notification in terminal that you are listening on PORT 3001**
Go to browser and type localhost 3001 
**Dependencies you should have downloaded** : 

    "bcrypt": "^5.1.1",
    "connect-session-sequelize": "^7.1.7",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-handlebars": "^7.1.2",
    "express-session": "^1.17.3",
    "mysql2": "^3.6.2",
    "sequelize": "^6.33.0"




## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts
```

## Mock-Up

The following animation demonstrates the application functionality:

![Animation cycles through signing into the app, clicking on buttons, and updating blog posts.](./Assets/14-mvc-homework-demo-01.gif) 

