migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8w05mhvz",
    "name": "transaction_id",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 64,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8w05mhvz",
    "name": "transaction_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
