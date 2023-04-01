migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ndobsu8hd5usx4w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d3uf8u1u",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ndobsu8hd5usx4w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d3uf8u1u",
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
