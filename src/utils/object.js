export const get = (object, field, defaultValue) => {
  return object && object.hasOwnProperty(field) ? options[field] : defaultValue
}
