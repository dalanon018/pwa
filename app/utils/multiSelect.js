export const getToggledOptions = (options, values) => {
  const toConsumableArray = (arr) => {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2
    } else {
      return Array.from(arr)
    }
  }

  var newOptions = [].concat(toConsumableArray(options))

  if (values.constructor !== Array) {
    values = [values]
  }

  values.forEach(function (value) {
    var pos = newOptions.indexOf(value)

    if (pos > -1) {
      newOptions.splice(pos, 1)
    } else {
      newOptions.push(value)
    }
  })

  return newOptions
}
