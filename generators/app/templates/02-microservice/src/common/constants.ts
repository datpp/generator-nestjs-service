<% if (usePubSub) { %>
export const PUBSUB_SERVICE = 'PUBSUB_SERVICE';
<% } %>
<% if (useKafka) { %>
export const KAFKA_SERVICE = 'KAFKA_SERVICE';
<% } %>
<% if (useRabbitmq) { %>
export const RABBITMQ_SERVICE = 'RABBITMQ_SERVICE';
<% } %>
