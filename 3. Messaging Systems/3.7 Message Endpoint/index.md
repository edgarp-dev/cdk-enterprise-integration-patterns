# Message Endpoint

A Message Endpoint is a client of the messaging system that the application can use to send and receive messages.

Message Endpoint code is custom to both the application and the messaging system's client API. The applicacion knows nothing about message formats, it just knows that it has a request or piece of data to send to another application, or is expecting those from another application. It's the messaing endpoint code that takes that commad or data, makes it into a message and sends it on a particular messaging channel. It is the endpoint that receives a message, extracts the contents and gives them to the application in a meaningful way.

The Message Endpoint encapsulates the mesaging system from the rest of the application, and customizes a general messaging API for a specific application and task.

A Message Endpoint can be used to send messages or receive them, but one instance does not do both.
