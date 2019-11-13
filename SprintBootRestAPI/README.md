run mvn spring-boot:run to start the server

you must have your mysql setup to mesh with the
./src/main/resources/application.properties
file

the spring-boot application was set up using the following tutorial
therefore, dependencies listed in the tutorial must be met to run the server
https://spring.io/guides/gs/accessing-data-mysql/

## Potential Errors
-----
if you are getting an exception when tryin to run the maven file,
the issue may be that your mysql is not using a time zone that
spring-boot recognizes. try running the following in mysql

SET GLOBAL time_zone = "+0:00"

if this fixes the problem, you can change the default time zone of
your mysql server by adding the following line to the my.cnf file.

default-time-zone = '+00:00'

You can find the location of your my.cnf file by using the following command
$locate my.cnf

-----
if you get an error when you try to add a new user that says 
"Error in Add Account Component, response not ok"
and the database gives "table austincleanup.hibernate_sequence does not exist",
this is because of backwards compatability issues with spring/mysql. edit 
`SpringBootRestAPI/src/main/resources/application.properties`, from 
`spring.jpa.hibernate.ddl-auto=update` to `spring.jpa.hibernate.ddl-auto=create` and
try adding a user again. if that works, remember to change it back to `update`. 
