migrate((db) => {
  const collection = new Collection({
    "id": "j91ajaszm4ndiz7",
    "created": "2023-03-30 20:11:34.997Z",
    "updated": "2023-03-30 20:11:34.997Z",
    "name": "configurations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sqtidvwv",
        "name": "key",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "sadgvcr4",
        "name": "value",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "1odvu8tw",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "number",
            "string",
            "boolean"
          ]
        }
      },
      {
        "system": false,
        "id": "z1f9n7j5",
        "name": "deleted",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_b3Ag8i6` ON `configurations` (`key`)"
    ],
    "listRule": null,
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("j91ajaszm4ndiz7");

  return dao.deleteCollection(collection);
})
