## Social Media Platform APIs
This project implements APIs for a social media platform using NodeJS/Python and PostgreSQL/MongoDB as the database. The APIs support various features like user authentication, following/unfollowing users, posting and deleting posts, liking and commenting on posts, and retrieving user profiles and posts.

### Requirements
 - Node.js
- MongoDB/Postgres database
### Installation
- Clone the repository
```
git clone https://github.com/MeetaHaldar/Back-End-Assignment---REUNION.git
```
- Install dependencies with
```
npm install
```
- Create a .env file based on the example .env.example file and set your environment variables
- Start the server with 
``` 
npm run dev 
```


## API Endpoints
The following are the available endpoints for the API:

### Authentication
- POST 
 ```
 /api/authenticate
```
Authenticate a user with their email and password. Returns a JWT token for use in subsequent API calls.
### User Profile
- GET 
```
/api/user
```
Get the user profile for the authenticated user, including their name, number of followers, and number of followings.

- POST 
```
/api/follow/{id}
```
Follow the user with the given {id}.

- POST
```
/api/unfollow/{id}
```
Unfollow the user with the given {id}.

### Posts
- POST 
 ```
 /api/posts 
```
Create a new post for the authenticated user.
Input: Title, Description
Returns: Post-ID, Title, Description, Created Time (UTC).

- DELETE 
```
/api/posts/{id}
```
Delete the post with the given {id} created by the authenticated user.

- POST 
```
/api/like/{id}
```
Like the post with the given {id} by the authenticated user.

- POST 
```
/api/unlike/{id}
```
Unlike the post with the given {id} by the authenticated user.

- POST
```
/api/comment/{id}
```
Add a comment to the post with the given {id} by the authenticated user.
Input: Comment
Returns: Comment-ID.

- GET
```
/api/posts/{id}
```
Get a single post with the given {id}, including the number of likes and comments.

- GET 
``` 
/api/all_posts
```
Get all posts created by the authenticated user, sorted by post time.
Returns: For each post, return the following values

  - id: ID of the post
  - title: Title of the post
  -  desc: Description of the post
  - created_at: Date and time when the post was created
  - comments: Array of comments for the particular post
  - likes: Number of likes for the particular post


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://meeta.dns.army/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/meeta-haldar-601b41203/?locale=en_US)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Meeta_boss)
