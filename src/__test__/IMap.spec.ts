import { $iMap } from '../model/IMap'

describe('iMap', () => {
  test('New & Get', () => {
    let id1 = $iMap.New(32)
    expect($iMap.Get(id1)).toEqual(32)
  })

  test('Bind', () => {
    $iMap.Bind('res1', 33)
    expect($iMap.Get('res1')).toEqual(33)
  })

  test('Delete', () => {
    expect($iMap.Get('res1')).toEqual(33)
    $iMap.Delete('res1')
    expect($iMap.Get('res1')).toBeUndefined()
  })
})
