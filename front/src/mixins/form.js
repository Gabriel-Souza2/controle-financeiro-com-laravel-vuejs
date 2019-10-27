import * as moment from 'moment'
moment.locale('pt_br')

const formMixins = {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: false,
      data: {
        due_date: moment().format('YYYY/MM/DD')
      },
    }
  },
  methods: {
    validate() {
      let hasError = false

      _.forEach(this.$refs, (ref, key) => {
        ref.hasOwnProperty('validate') ? ref.validate() : ''
        return ref.hasError ? hasError = true : ''
      })

      return !hasError
    },
    async add() {
      if (this.validate()) {
        await this.$store.dispatch(this.state + '/add', this.data).then(() => {
          this.closeDialog()
        })
      }
    },
    closeDialog() {
      this.open = false
      this.data = { due_date: moment().format('YYYY/MM/DD') }
      this.$emit('close-dialog', false)
    }
  },
  watch: {
    show() {
      this.open = this.show
    }
  }
}

export default formMixins
