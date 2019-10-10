import * as moment from 'moment'
import _ from "lodash"

const filtered = (state) => (filters) =>{
    moment.locale('pt-br')
    let collection =  state.entries

    collection = _.filter(collection, entry => {
      return filters.includes(entry.type)
    })

    if(!filters.includes('actives')) return collection

    return _.filter(collection, entry => {
      let due = moment(entry.due_date)
      return (due.isSameOrAfter(moment()) || due.month() == moment().month())
    })
}

const costs = (state, getters) => {
  return _.sumBy(getters.filtered(['costs', 'actives']), (entry) => parseFloat(entry.value))
}

const gains = (state, getters) => {
  return _.sumBy(getters.filtered(['gains', 'actives']), (entry) => parseFloat(entry.value))
}

export {
    filtered,
    costs,
    gains
}