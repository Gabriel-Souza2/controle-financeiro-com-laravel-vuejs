import _ from 'lodash'

const setEntries = (state, entries) => {
    state.entries = entries.data
}

const addEntry = (state, entry) => {
    state.entries.push(entry.data)
}

const removeEntries = (state, ids) => {
    state.entries = _.filter(state.entries, (entry) => !ids.includes(entry.id))
}

const removeEntriesByCategories = (state, categories) => {
    state.entries = _.filter(state.entries, (entry) => !categories.includes(entry.category))
}

export {
    setEntries,
    addEntry,
    removeEntries,
    removeEntriesByCategories
}