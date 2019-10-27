import { axiosInstance as axios } from '../../boot/axios'

const list = async (context) => {
  return await axios.get('/categories').then((response) => {
    context.commit('setCategories', response.data)
    return response.data.data
  })
}

const add = async (context, data) => {
  return await axios.post('/categories', data).then((response) => {
    context.commit('addCategory', response.data)
    return response.data.data
  })
}

const remove = async (context, categories) => {
  let ids = _.map(categories, (category) => category.id)
  let names = _.map(categories, (category) => category.name)

  return await axios.delete('/categories/delete/many', { params: ids }).then((data) => {
    context.commit('removeCategories', ids)
    context.commit('entries/removeEntriesByCategories', names, { root: true })
  })
}
export {
  list,
  add,
  remove
}
