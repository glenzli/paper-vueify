class IMap {
  private _id = 0;
  private _map = new Map<number | string, any>();

  public New(item: any) {
    this._map.set(++this._id, item);
    return this._id;
  }

  public Bind(key: number | string, item: any) {
    this._map.set(key, item);
  }

  public Get<T>(id: number | string) {
    return this._map.get(id) as T | undefined;
  }

  public Delete(id: number | string) {
    this._map.delete(id);
  }
}

const $iMap = new IMap();

export { $iMap };
