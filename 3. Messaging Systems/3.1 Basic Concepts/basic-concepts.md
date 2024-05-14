# Basic Messaging Concepts

### Channels
Channels, also known as message channels, are virtual pipes that connect a sender to a receiver, allowing applications to send data to each other.

### Messages
Messages are small pieces of data that are transmitted through a message channel.

### Multi-step Delivery
Sometimes, actions need to be performed on the message after it is sent or before it is received.

### Routing
Routing, also known as message routing, involves elements that take messages and route them to the correct destination. These elements may have rules to determine where to send the messages.

### Transformation
Transformation, also known as message translation, standardizes the conceptual data. If the receiver needs the message data in a particular format, transformations can ensure the message is formatted appropriately while leaving other messages in different formats.

### Endpoints
Endpoints connect applications that are not ready to interface with messaging systems. They understand both the application and the messaging system, allowing them to work together seamlessly.
