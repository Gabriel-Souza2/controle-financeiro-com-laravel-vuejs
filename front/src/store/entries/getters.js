import _ from 'lodash'
import { MomentWrap } from "../../helpers/DateHelpers";

const filtered = (state) => (filters) => {//Filtra as entradas
  let collection = state.entries

  collection = _.filter(collection, entry => { //Filtra por tipo (costs ou gains)
    return filters.includes(entry.type)
  })

  if (!filters.includes('actives')) return collection

  return _.filter(collection, entry => { //Filtra por ativas
    //Se a data de vencimento da entrada for no mês atual ou depois, a entranda ainda é ativa
    return MomentWrap.isThisMothOrAfter(entry.due_date)
  })
}

const costs = (state, getters) => {//Soma dos gastos (costs)
  return _.sumBy(getters.filtered(['costs', 'actives']), (entry) => parseFloat(entry.value))
}

const gains = (state, getters) => {//Soma dos ganhos (gastos)
  return _.sumBy(getters.filtered(['gains', 'actives']), (entry) => parseFloat(entry.value))
}

const firstAndLastEntries = (state) => { //Pega a primeira e a ultima entrada
  let entries = _.orderBy(state.entries, ['created', 'due_date'], ['asc', 'asc'])
  return { init: entries[0], end: entries.slice(-1)[0] }
}

const sumByMonths = (state, getters) => (type, months) => { //Soma os valores das entradas por mês
  let collection = getters.filtered([type]) //pega as entradas por tipo
  return months.map((month) => {
    let date = MomentWrap.get(null, month, 'MMMM-YYYY')//Formata o mês para comparação
    return collection.reduce((sum, item) => {
      //Se a mês estiver entre o mês em que a entrada foi criada e o mês que ela for vencer, ele soma o valor dela
      if (MomentWrap.isBetween(date, item.created, item.due_date)) {
        return sum + parseFloat(item.value)
      }
      return sum
    }, 0)
  })
}
export {
  filtered,
  costs,
  gains,
  firstAndLastEntries,
  sumByMonths
}
