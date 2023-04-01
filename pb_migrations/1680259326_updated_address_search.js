migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ndobsu8hd5usx4w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gnokqpop",
    "name": "address_id",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 62,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ndobsu8hd5usx4w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gnokqpop",
    "name": "address_id",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 35,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
