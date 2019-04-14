class IMap {
  private _id = 0
  private _map = new Map<number | string, any>()

  New(item: any) {
    this._map.set(++this._id, item)
    return this._id
  }

  Bind(key: number | string, item: any) {
    this._map.set(key, item)
  }

  Get<T>(id: number | string) {
    return this._map.get(id) as T | undefined
  }

  Delete(id: number | string) {
    this._map.delete(id)
  }
}

const $iMap = new IMap()

export { $iMap }
