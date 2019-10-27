import * as moment from 'moment'

moment.locale('pt-br')

export class MomentWrap { //Classe para facilitar o uso do moment

  static now(format = 'YYYY-MM-DD') { //Pega a data atual
    return moment().format(format)
  }

  static get(out_format = 'YYYY-MM-DD', date = this.now(), in_format = 'YYYY-MM-DD') { //formata uma data
    return moment(date, in_format).format(out_format)
  }

  static operatorMonths(month, operator = 'add', value = 1, format = "MMMM-YYYY") { //Faz operações nos meses
    //Verifica se a operção recebida é de add ou sub, caso não retorna null
    if (operator != 'add' && operator != 'sub') return null
    //pega um objeto moment
    let newDate = moment(month, format)
    //Add ou sub um valor do mes
    newDate = operator == 'add' ? newDate.add(value, 'months') : newDate.subtract(value, 'months')
    //Retorna o resultado
    return newDate.format(format)
  }

  static isBetween(date, date_init, date_end) { //Verifica se uma data está entre um intervalo fechado
    return moment(date).isBetween(moment(date_init), moment(date_end), 'month', '[]')
  }

  static isThisMothOrAfter(date) { //Verifica se uma data deste mês ou depois
    let obj = moment(date)
    return (obj.isSameOrAfter(moment()) || obj.month() == moment().month())
  }
}

export default class MonthsManager { //classe para gerenciar lista de meses
  constructor(init, end, lenght = 2, month) {
    //Tamanho da lista de meses, sendo 2 antes e 2 depois do mês definido o valor default
    this.lenght = lenght
    //Formato dos meses. ex: Janeiro-2019
    this.format = 'MMMM-YYYY'
    //Limite do previus()
    this.init = MomentWrap.get(this.format, init)
    //Limite do next()
    this.end = MomentWrap.get(this.format, end)
    //Formata o mês fornecido ou pega o atual
    this.month = MomentWrap.get(this.format, month)
    //Lista dos meses
    this._months = this.listMonths()
  }

  get months() { //Getter do _months
    return this._months
  }

  set months(value) { //Setter do _months
    this._months = value
  }

  getMonths(type) { //Pega os meses antes (before) ou depois (after) do mês definido
    //Define se será adicionado ou subtraido um mês
    let op = type == 'before' ? 'sub' : 'add'
    //Inica a lista dos meses
    let collection = [this.month]
    for (let i = 0; i < this.lenght; i++) {
      //Pega o ultimo mês adicionado, faz a operação (add ou sub) e adiciona o resultado na collection
      collection.push(MomentWrap.operatorMonths(collection.slice(-1)[0], op))
    }
    return collection
  }

  listMonths() { //Gera a lista dos meses completa
    //Pega os meses anteriores
    let before = this.getMonths('before')
    //Pega os meses depois
    let after = this.getMonths('after')
    //Retorna a lista completa
    return [...before.reverse(), ...after.slice(1)]
  }

  previus() { //Atualiza a lista voltando os meses
    //Verifica se ja atingiu o limite inicial
    if (this.months[0] == this.init) return this
    //Pega o primeiro item da lista e pega o mês anterior a ele
    let pMonth = MomentWrap.operatorMonths(this.months[0], 'sub')
    //remove o ultimo mês da lista, para manter o tamanho definido
    this.months.pop()
    //atualiza lista de meses
    this.months = [pMonth, ...this.months]
    return this //retorna a instancia
  }

  next() { //Atualiza a lista prosseguindo os meses
    //pega o ultimo mês da lista
    let month = this.months.slice(-1)[0]
     //Verifica se ja atingiu o limite inicial
    if (month == this.end) return this
    //Pega o ultimo item da lista e pega o mês a seguir a ele
    let nMonth = MomentWrap.operatorMonths(month, 'add')
    //Adiciona o novo mês na lista
    this.months.push(nMonth)
    //Atualiza a lista removendo o primeiro mês
    this.months = this.months.slice(1)
    return this //retorna a instancia
  }
}
