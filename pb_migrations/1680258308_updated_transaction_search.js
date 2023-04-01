migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "taswpbqu",
    "name": "searched_count",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "taswpbqu",
    "name": "searched_count",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
