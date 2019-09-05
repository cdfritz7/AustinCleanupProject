## Project Overview

This overarching idea of this project is to provide users with a means
of finding low commitment volunteer opportunities. The site is still very
much in development, but the end goal is to create an app where users can
designate areas that need to be cleaned up.
Other users may then respond to these events, and provide proof of their work
to receive credit in the form of volunteer hours.

##Project Implementation

The project is divided into two parts, ReactFrontend and SprintBootRestAPI.

###ReactFrontend

This holds the code responsible for creating the single page application
front end for this project.
It communicates with the RESTful API created by the code in /SprintBootRestAPI/
to get user and event information.

###SprintBootRestAPI

This holds the code responsible for creating the backend of the project.
The Spring Boot API interacts with a mySQL database on port 3306 to create
tables for users, events, and user-event interactions.

More specific documentation and instructions for running each part of the
project are included in /ReactFrontend/ and /SpringBootRestAPI/
