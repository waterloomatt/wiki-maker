#Wiki-Maker by Matt Skelton

This application consists of Go backend and React frontend. The entire source code is included here and will be compiled during the build.

To start the application, navigate to the root of this directory and run:<br>
`docker build -t md-wiki:2019 .`<br>
`docker run -ti -p 8080:8080 md-wiki:2019`

Once completed, you should be able to view the application in the browser from [http://localhost:8080](http://localhost:8080).

To create wiki entries, issue the following request
`curl -X PUT http://localhost:8080/articles/wiki -d 'A wiki is a knowledge base website'`