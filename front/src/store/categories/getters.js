import _ from "lodash"

const categoriasWithTotal = (state) => (entries) => {
    return _.forEach(state.categories, (category) => {
        let sum = 0
        _.forEach(entries, (entry) => {
            if(entry.category == category.name){
                sum += parseFloat(entry.value)
            }
        })
        category.total = sum
        return category
    })

}

const categoriasWithfilters = (state, getters) => (entries, filters) => {
    let categories = getters.categoriasWithTotal(entries)
    categories = _.filter(categories, category => {
        return filters.includes(category.type)
    })

    if(!filters.includes('actives')) return categories

    return _.filter(categories, category => category.total > 0)
}

export {
    categoriasWithTotal,
    categoriasWithfilters
}