import { v4 as uuid } from 'uuid'

export function generateId() {
  return uuid()
}