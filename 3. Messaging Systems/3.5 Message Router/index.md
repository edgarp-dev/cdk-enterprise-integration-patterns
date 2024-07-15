# Message Router
A message router is a component that takes a message from a message channel and repulish it to another filter based on a set of conditions.

It connects to multiple output channels aned it does not modify the message contents. It only concerns itself with the destination of the message.

## Message router variants
Content-Based Router: Decide the message destination only on properties of the message itself, for example the message type of the values of specific message fields.

Context-Based Router: Decide message's destination based on environment conditions.

Many message routers are stateless, i.e they only look at one message at a time to make the routing decision. Other routers take the content of the previous messages into account when making a routing decision. For example a router that eliminates duplicate messages by keeping a list of all messages it already review. These routers are stateful.
