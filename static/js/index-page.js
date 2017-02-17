(() => {
  const client = io();

  const events = ['connect', 'connect_error', 'connect_timeout', 'error', 'disconnect', 'reconnect', 'reconnect_attempt',
    'reconnecting', 'reconnect_error', 'reconnect_failed', 'msg'];

  events.forEach(e => {
    client.on(e, evt => {
      console.log(e, evt);
    });
  });
})();