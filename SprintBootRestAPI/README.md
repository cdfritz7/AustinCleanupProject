run mvn spring-boot:run to start the server

you must have your mysql setup to mesh with the
./src/main/resources/application.properties
file

if you are getting an exception when tryin to run the maven file,
the issue may be that your mysql is not using a time zone that
spring-boot recognizes. try running the following in mysql

SET GLOBAL time_zone = "+0:00"
