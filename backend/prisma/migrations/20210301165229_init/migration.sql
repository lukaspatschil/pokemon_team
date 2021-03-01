/*
  Warnings:

  - You are about to drop the column `pokeapiId` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `pokeapiUrl` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "pokeapiUrl" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL,
    "ownerId" INTEGER,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("id", "name", "description", "creationDate", "ownerId") SELECT "id", "name", "description", "creationDate", "ownerId" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
