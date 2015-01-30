# TCP/redis-channels/API-polling test

## Starting servers in sequence

First, you need redis installed and running:

```
redis-server
```

Then start the TCP server:

```
node server.js
```

Then start the client:

```
node bvi-mocks
```

And eventually start the API poller:

```
node api-poller
```

## What's going on?

The API-poller is requesting the next departure for a certain bus at a certain stop. If the date changes, it will push the news to the redis channel called "pysae::traffic-update", if the date doesn't change it will not.

What happens next is that the node.js subcribed to the channel "pysae::traffic-update" will get the updated data and push it to the clients through an 'hex' buffer.
