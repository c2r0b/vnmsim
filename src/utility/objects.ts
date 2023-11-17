export const strToObj = (parts, val) => {
  if (!Array.isArray(parts)) {
    parts = parts.split(".")
  }
  if (!parts.length) {
    return val
  }
  return {
    [parts.shift()]: strToObj(parts, val)
  }
}

export const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}