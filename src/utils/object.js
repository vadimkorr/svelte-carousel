export const get = (object, fieldName, defaultValue) => {
  if (object && object.hasOwnProperty(fieldName)) {
    return object[fieldName]
  }
  if (defaultValue === undefined) {
    throw new Error(`Required arg "${fieldName}" was not provided`)
  }
  return defaultValue
}

export const switcher = (description) => (key) => {
  description[key] && description[key]()
}
