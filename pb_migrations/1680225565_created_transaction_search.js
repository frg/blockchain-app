migrate((db) => {
  const collection = new Collection({
    "id": "gcdfhca3r664qrg",
    "name": "transaction_search",
    "type": "base",
    "system": false,
    "schema": [
      {
        "id": "8w05mhvz",
        "name": "transaction_id",
        "type": "text",
        "system": false,
        "required": true,
        "options": {
          "min": null,
          "max": 64,
          "pattern": ""
        }
      },
      {
        "id": "taswpbqu",
        "name": "searched_count",
        "type": "number",
        "system": false,
        "required": true,
        "options": {
          "min": 0,
          "max": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_xOBYOza` ON `transaction_search` (`transaction_id`)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg");

  return dao.deleteCollection(collection);
})
