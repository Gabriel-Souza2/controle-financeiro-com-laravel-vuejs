import _ from "lodash"

const categoriasWithTotal = (state) => (entries) => {
  return _.forEach(state.categories, (category) => {
    let sum = 0
    _.forEach(entries, (entry) => {
      if (entry.category == category.name) {
        sum += parseFloat(entry.value)
      }
    })
    category.total = sum
    return category
  })

}

export {
  categoriasWithTotal
}
