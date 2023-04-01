migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xOBYOza` ON `transaction_search` (`transaction_id`)"
  ]

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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "taswpbqu",
    "name": "searched_count",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xOBYOza` ON `transaction_search` (`transactionId`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8w05mhvz",
    "name": "transactionId",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "taswpbqu",
    "name": "searchedCount",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
