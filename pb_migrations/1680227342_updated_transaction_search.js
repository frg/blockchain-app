migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gcdfhca3r664qrg")

  collection.listRule = null

  return dao.saveCollection(collection)
})
