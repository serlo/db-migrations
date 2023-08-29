"use strict";

// src/utils/database.ts
function createDatabase(db) {
  return {
    runSql: async (query, ...params) => {
      return new Promise((resolve, reject) => {
        db.runSql(query, ...params, (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      });
    },
    dropTable: async (table) => {
      return new Promise((resolve, reject) => {
        db.dropTable(table, (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    }
  };
}

// node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};

// node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// node_modules/ramda/es/trim.js
var hasProtoTrim = typeof String.prototype.trim === "function";

// src/utils/create-migration.ts
function createMigration(exports, {
  up,
  down
}) {
  exports._meta = {
    version: 1
  };
  exports.up = (db, cb) => {
    up(createDatabase(db)).then(() => {
      cb(void 0);
    }).catch((error) => {
      cb(error);
    });
  };
  exports.down = (db, cb) => {
    if (typeof down === "function") {
      down(createDatabase(db)).then(() => {
        cb();
      }).catch((error) => {
        cb(error);
      });
    } else {
      cb();
    }
  };
}

// src/2023082921270000-add-status-to-comment-table.ts
createMigration(module.exports, {
  up: async (db) => {
    await db.runSql(`
      CREATE TABLE IF NOT EXISTS comment_status (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);
    await db.runSql(`
      INSERT INTO comment_status (id, name)
      VALUES
        (1, "no_status"),
        (2, "open"),
        (3, "done");
    `);
    await db.runSql(`
      ALTER TABLE comment
      ADD COLUMN comment_status_id INT DEFAULT 2 NOT NULL;
    `);
    await db.runSql(`
      ALTER TABLE comment
      ADD CONSTRAINT fk_comment_status FOREIGN KEY (comment_status_id) REFERENCES comment_status (id);
    `);
    await db.runSql(`
      UPDATE comment SET comment_status_id = 1 WHERE date <= Date("2023-07-19")
    `);
  }
});
