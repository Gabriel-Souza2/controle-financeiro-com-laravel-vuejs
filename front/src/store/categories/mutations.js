import _ from 'lodash'

const setCategories = (state, categories) => { 
    state.categories = categories.data
}

const addCategory = (state, category) => {
    state.categories.push(category.data)
}

const removeCategories = (state, ids) => {
    state.categories = _.filter(state.categories, (category) => !ids.includes(category.id))
}
export {
    setCategories,
    addCategory,
    removeCategories
}