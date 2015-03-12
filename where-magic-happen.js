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
      index: 0,
      slots: 3,
      capacity: 10
    },
    {
      index: 1,
      slots: 3,
      capacity: 10
    },
    {
      index: 2,
      slots: 2,
      capacity: 5
    },
    {
      index: 3,
      slots: 1,
      capacity: 5
    },
    {
      index: 4,
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
      index: data.servers[i].index,
      slots: data.servers[i].slots,
      capacity: data.servers[i].capacity,
      ratio: data.servers[i].capacity / data.servers[i].slots,
      row: -1,
      slot: -1
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

// -------------------------------------------------------------------- 2. Pools
var pools = [];

function setPools() {
  var i = 0;
  while (i < data.pools) {
    pools.push({
      id: i,
      capacity: 0,
      servers: [],
      rows: [{id: 0, capacity: 0}],
    });
    i++;
  }
}

function setPoolCapacity(id) {
  var i = 0,
      capacity = 0;
  for (i in pool[id].servers) {
    capacity += pool[id].servers[i];
  }
  pool[id].capacity = capacity;
}

function getLowestPool() {
  if (pools.length === 1) {
    return 0;
  }
  var index = 0,
      i = 1;
  for (i in pools) {
    if (pools[i].capacity < pool[index].capacity) {
      index = i;
    }
  }
  return index;
}

function dispatchServersInPools() {
  var i = 0,
      lowestPool = getLowestPool();
  for (i in servers) {
    pools[lowestPool].servers.push(servers[i]);
    setPoolCapacity(lowestPool);
    lowestPool = getLowestPool();
  }
}

// --------------------------------------------------------------------- 3. Rows
var rows = data['rows'];

function sortPoolsRowsByCapacity(pId) {
  var i = 0,
      j = 0,
      length = pools[pId].rows.length,
      tmp = null;
  for (i=0; i<length; i++) {
    for (j=0; j<length; j++) {
      if (pools[pId].rows[j].capacity < pools[pId].rows[i].capacity) {
        tmp = pools[pId].rows[i];
        pools[pId].rows[i] = pools[pId].rows[j];
        pools[pId].rows[j] = pools[pId].rows[i];
      }
    }
  }
}

function setServerInRow(pId, sId, rId) {
  var i = 0,
      slots = pools[pId][sId].slots,
      needSlots = slots,
      slot = 0;
  for (i in rows[rId]) {
    if (rows[rId][i] === 0) {
      slots--;
    }
    else {
      slots = needSlots;
    }
    if (slots === 0) {
      pools[pId][sId].row = rId;
      pools[pId][sId].slot = i - (needSlots - 1);
      pools[pId].rows[rId].capacity += needSlots;
      return true;
    }
  }
  return false;
}

function dispatchPoolsInRows() {
  var pId = 0,
      rows = [],
      rId = 0;
  while (pools.length > 1) {
    for (pId in pools) {
      sortPoolsRowsByCapacity(pId);
      rId = 0;
      while (!setServerInRow(pId, 0, rId) || rId < pools[pId].rows.length) {
        rId++;
      }
      pools[pId].servers.splice(0, 1);
      if (pools[pId].servers.length === 0) {
        pools.splice(pId, 1);
      }
    }
  }
}