export const serialize = (obj) => {
    return JSON.stringify(obj, (_key, value) => {
      if (typeof value === 'bigint') {
        return value.toString()
      }
      return value
    })
}