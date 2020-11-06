## Building and serving
### Starting position
This task starts off where we left the react-todo-app we "dockerized" during the lecture.
Basically, you have a working application with front-end and backend.

### The problem
The team working on this project would like to have different images for front-end and backend.
They also need images built for production. Production image for front-end should only contain static files that are served from nginx.

### Desired solution
After resolving the problems you should be left with an updated project structure.
You should have 2 folders, each containing a `Dockerfile.dev` that allows you to build an image for local development.
Each folder should contain a `Dockerfile` file that allows us to build
production image.

Server image should not serve html for index location.
