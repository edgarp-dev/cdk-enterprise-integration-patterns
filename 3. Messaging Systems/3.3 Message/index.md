# Message

Applications using messaging are connected through message channels and send data via messages.

Any data to be transmitted via a messaging system must be converted into one or more messages that can be sent through messaging channels.

A message consists of two basic parts:
1. **Header**: Metadata used by the messaging system. It describes the data being transmitted, its origin, its destination, and more.
2. **Body**: The actual data being transmitted, which is generally ignored by the messaging system.

Messaging allows for the marshalling of data from senders components and unmarshalling it in the destination component.
