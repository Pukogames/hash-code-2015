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