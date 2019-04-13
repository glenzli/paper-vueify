interface IdObject {
  id: number
}

class IMap {
  private _id = 0
  private _map = new Map<number, any>()

  New(item: any) {
    this._map.set(++this._id, item)
    return this._id
  }

  Get<T>(id: number) {
    return this._map.get(id) as T | undefined
  }

  Delete(id: number) {
    this._map.delete(id)
  }
}

const $iMap = new IMap()

export { $iMap }
