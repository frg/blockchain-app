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
      "min": null,
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
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
