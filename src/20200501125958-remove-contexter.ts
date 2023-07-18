/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */

import { createMigration } from "./utils";

/**
 * Removes all rows & permissions from the database that were used by the Contexter module
 * THIS IS AN IRREVERSIBLE MIGRATION!
 */
createMigration(exports, {
  up: async (db) => {
    await db.dropTable("context_route_parameter");
    await db.dropTable("context_route");
    await db.dropTable("context");
    await db.runSql(`DELETE FROM permission WHERE name LIKE "contexter.%"`);
  },
});
