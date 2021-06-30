import {
  get,
} from './object.js'

describe('get', () => {
  it('returns correct value if field exists', () => {
    const object = {
      field: 5,
    }
    const fieldName = 'field'
    const defaultValue = 10

    expect(get(object, fieldName, defaultValue)).toBe(5)
  })

  it('returns correct value if field exists and has falsy value 0', () => {
    const object = {
      field: 0,
    }
    const fieldName = 'field'
    const defaultValue = 10

    expect(get(object, fieldName, defaultValue)).toBe(0)
  })

  it('returns correct value if field exists and has falsy value null', () => {
    const object = {
      field: null,
    }
    const fieldName = 'field'
    const defaultValue = 10

    expect(get(object, fieldName, defaultValue)).toBe(null)
  })

  it('returns default value if is provided and field does not exist', () => {
    const object = {
      field: 5,
    }
    const fieldName = 'nonExistingField'
    const defaultValue = 10

    expect(get(object, fieldName, defaultValue)).toBe(10)
  })

  it('returns correct value if field exists and has falsy value undefined', () => {
    const object = {
      field: undefined,
    }
    const fieldName = 'field'
    const defaultValue = 10

    expect(get(object, fieldName, defaultValue)).toBe(undefined)
  })

  it('throws an error if there is no field and no default value', () => {
    const object = {
      field: 'value',
    }
    const fieldName = 'nonExistingField'
    expect(
      () => get(object, fieldName)
    ).toThrowError('Required arg "nonExistingField" was not provided')
  })
})
