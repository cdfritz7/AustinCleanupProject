# Bug List

# Known Bugs



# Fixed Bugs
## Error When Trying to Run Rest API in development

Description:
An exception occurred while running. null: InvocationTargetException: Error creating bean with name 'entityManagerFactory' defined in class path resource [org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaConfiguration.class]: Invocation of init method failed; nested exception is org.hibernate.service.spi.ServiceException: Unable to create requested service [org.hibernate.engine.jdbc.env.spi.JdbcEnvironment]: Access to DialectResolutionInfo cannot be null when 'hibernate.dialect' not set -> [Help 1]

Fix:
Improper mapping from mysql in application.properties
changed
spring.datasource.url=jdbc:mysql://mysql:3306/austincleanup
to
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/austincleanup

##Error when trying to access frontend pages in dev

Description:
The following error is given when trying to acces Production Pages such as
production_url.com/MapPage

404 Not Found

    Code: NoSuchKey
    Message: The specified key does not exist.
    Key: MapPage

Fix:
https://stackoverflow.com/questions/51218979/react-router-doesnt-work-in-aws-s3-bucket
Redirect s3 error page to index.html
