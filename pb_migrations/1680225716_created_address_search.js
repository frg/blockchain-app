migrate((db) => {
  const collection = new Collection({
    "id": "ndobsu8hd5usx4w",
    "name": "address_search",
    "type": "base",
    "system": false,
    "schema": [
      {
        "id": "gnokqpop",
        "name": "address_id",
        "type": "text",
        "system": false,
        "required": true,
        "options": {
          "min": null,
          "max": 62,
          "pattern": ""
        }
      },
      {
        "id": "d3uf8u1u",
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
      "CREATE UNIQUE INDEX `idx_sbe908q` ON `address_search` (`address_id`)"
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
  const collection = dao.findCollectionByNameOrId("ndobsu8hd5usx4w");

  return dao.deleteCollection(collection);
})
