import _ from 'lodash'
import readFile from './readFile.js'
import { jsonParse, yamlParse } from './parse.js'
import makeDefault from './options/makeStylish.js'
import makePlain from './options/makePlain.js'
import makeJson from './options/makeJson.js'

const addingObjects = (firstObj, secondObj) => {
  const allKeys = _.union(Object.keys(firstObj), Object.keys(secondObj)).sort()

  return allKeys.reduce((acc, key) => {
    const hasFirst = Object.hasOwn(firstObj, key)
    const hasSecond = Object.hasOwn(secondObj, key)

    const val1 = firstObj[key]
    const val2 = secondObj[key]

    if (hasFirst && hasSecond) {
      const bothAreObjects = _.isPlainObject(val1) && _.isPlainObject(val2)

      if (bothAreObjects) {
        acc[key] = { newOldValue: addingObjects(val1, val2) }
      } 
      else if (_.isEqual(val1, val2)) {
        acc[key] = { newOldValue: val1 }
      } 
      else {
        acc[key] = { oldValue: val1, newValue: val2 }
      }
    } 
    else if (hasFirst) {
      acc[key] = { oldValue: val1 }
    } 
    else {
      acc[key] = { newValue: val2 }
    }

    return acc
  }, {})
}

export default (firstFilePath, secondFilePath, option = 'stylish') => {
  const firstFile = readFile(firstFilePath)
  const firstObj = firstFilePath.split('.')[1] === 'json' ? jsonParse(firstFile) : yamlParse(firstFile)
  const secondFile = readFile(secondFilePath)
  const secondObj = secondFilePath.split('.')[1] === 'json' ? jsonParse(secondFile) : yamlParse(secondFile)

  const combinedObj = addingObjects(firstObj, secondObj)
  const options = {
    stylish: makeDefault(combinedObj),
    plain: makePlain(combinedObj),
    json: makeJson(combinedObj),
  }
  return options[option]
}
