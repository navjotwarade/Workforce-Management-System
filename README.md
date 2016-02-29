

# WorkForce Management System

   Workforce Management System is designed to provide Security Services to the clients who register to WMS website. Client can request for security services for his buildings. Admins of the website are responsible for taking care of the client requests, creating guards, maintaining buildings, assigning guards, billing clients and scheduling the patrolling for each guards. Guards are responsible for creating alerts, which are sent to client via email and are used to create report that client/ admin, can view from their portal.
Workforce Management System is a 3-tier application. Views are created using AngularJS and Bootstrap. Model is MySQL database that stores the WMS information. Controller is created using Node.js and Express.js with RabbitMQ to make our application asynchronous and scalable. Redis is used to make the application efficient by caching the sql queries.

## Developing

RabbitMQ
	RabbitMQ is messaging broker used to make the application scalable and asynchronous. Client and Server are decoupled so that the request and the response are independent of each other. Multiple Message Queues are used to keep the code modular.
Redis
    	To implement caching and increase scalability as well as efficiency of the application Redis is used. It is a key-value cache and store used to store the most frequently used sql queries and their output as key value pair. Hence the query need not be executed every time the query is called.
	
Connection Pooling
	    In order to allow multiple connections to the database Connection pooling is used. To check the efficiency of connection pooling and as a part of test case our application is tested using MySQL inbuilt connection pool and self created connection pool. 
Connections are already created and are kept in the repository for future use. In normal scenario the connection has to be created every time the user want to make connection, which in turn reduces the response time. In connection pooling one uses the connections that are available and release it to the same pool after the operation. Hence the time needed to create connection will not be there.

Load Balancing
    Node JS uses non-blocking, event driven I/O to remain light weight. In traditional web services each connection requests a new thread and consumes RAM capacity and eventually increases the utilization of RAM.But NodeJS uses single thread with non blocking I/O calls  to support multiple concurrent connections. Below diagrams show how the heavy weight resources are handled.


### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
