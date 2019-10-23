run mvn spring-boot:run to start the server

you must have your mysql setup to mesh with the
./src/main/resources/application.properties
file

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

https://spring.io/guides/gs/accessing-data-mysql/
