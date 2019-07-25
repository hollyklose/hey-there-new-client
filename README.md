List unsolved problems which would be fixed in future iterations.
 Document your planning, process and problem-solving strategy
 Link to wireframes and user stories
 An embedded screenshot of the app
 Set up and installation instructions for front end application

 # Hey There: Contact Management

### Application Description
This is the backend of the Hey There application which is designed to allow the user to manage their contacts,
and specifically to use the app's proprietary sorted list to easily see at a
glance which contacts are highest priority and/or most overdue to be contacted. This
could be useful for business networking, keeping track of sales leads, or managing
contacts in a job search. The hiring manager at your job of choice should probably
be contacted with higher priority!

In this app, contacts belong to the user and can be added, deleted, edited, viewed,
and have their last contacted date updated.

### List of Technologies Used
-graphql
-Ruby on Rails
-graphiql

### Database and Routes
The database is comprised of two tables: User, and Contacts which belong to the User.
The authorization has separate routes, but all the contact POST, PATCH, GET and
DELETE use the same Graphql controller.

### Authentication

  | Verb   | URI Pattern            | Controller#Action |
  |--------|------------------------|-------------------|
  | POST   | `/sign-up`             | `users#signup`    |
  | POST   | `/sign-in`             | `users#signin`    |
  | PATCH  | `/change-password/`    | `users#changepw`  |
  | DELETE | `/sign-out/`           | `users#signout`   |

### Contacts

  | Verb   | URI Pattern            | Query/Mutation    |
  |--------|------------------------|-------------------|
  | GET    | `/graphql`             | `contacts_query`  |
  | GET    | `/graphql`             | `contact_query`   |
  | POST   | `/graphql`             | `create_contact`  |
  | DELETE | `/graphql`             | `delete_contact`  |
  | PATCH  | `/graphql`             | `update_contact`  |
  | PATCH  |  `/graphql`            | `update_last_contacted` |

  [Front and Back End deployed sites]

  [Back end] (https://murmuring-dawn-91418.herokuapp.com/)

  [Front end](https://hollyklose.github.io/hey-there-new-client/)



  [Front End Repository](https://github.com/hollyklose/Hey-There-React-Client)

  [Back End Repository](https://github.com/hollyklose/Hey-There-Rails-API)

  ### Wireframe

  (https://imgur.com/PJz9Ko4)

  Entity Relationship Diagram:

[Actual] (https://imgur.com/kXsgT68)
[Stretch] (https://imgur.com/BpucYV1)
