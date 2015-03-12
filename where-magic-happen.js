// =============================================================================
// WHERE MAGIC HAPPEN
// by Gaelle et Jonathan
// =============================================================================

var data = {
  rows: [
    [-1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  pools: 2,
  unvailables: [
    {
      row: 0,
      slot: 0
    }
  ],
  servers: [
    {
      slots: 3,
      capacity: 10
    },
    {
      slots: 3,
      capacity: 10
    },
    {
      slots: 2,
      capacity: 5
    },
    {
      slots: 1,
      capacity: 5
    },
    {
      slots: 1,
      capacity: 1
    }
  ]
};

exports.foo = function (_data) {
  data = _data;
  // ...
  return 'magie';
};

// ------------------------------------------------------------------ 1. Servers
var servers = [];

function initServers() {
  var i = 0,
      server = {};
  for (i in data.servers) {
    server = {
      slots: data.servers[i].slots,
      capacity: data.servers[i].capacity,
      ratio: data.servers[i].capacity / data.servers[i].slots
    };
    servers.push(server)
  }
}

function sortServersByRatio() {
  var i = 0,
      j = 0,
      length = servers.length,
      tmp = null;
  for (i=0; i<length; i++) {
    for (j=0; j<length; j++) {
      if (servers[j].ratio > servers[i].ratio) {
        tmp = servers[i];
        servers[i] = servers[j];
        servers[j] = servers[i];
      }
    }
  }
}
