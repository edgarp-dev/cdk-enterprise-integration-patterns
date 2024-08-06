# Message Router

A message router is a component that takes a message from a message channel and republishes it to another filter based on a set of conditions.

It connects to multiple output channels without modifying the message contents. Its sole concern is the destination of the message.

## Message Router Variants

- **Content-Based Router**: Determines the message destination based on the properties of the message itself, such as the message type or the values of specific message fields.

- **Context-Based Router**: Determines the message's destination based on environmental conditions.

Many message routers are stateless, meaning they only look at one message at a time to make the routing decision. Other routers consider the content of previous messages when making a routing decision. For example, a router that eliminates duplicate messages by keeping a list of all previously reviewed messages is stateful.
