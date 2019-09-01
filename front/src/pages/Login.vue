<template>
  <q-page padding class="row content-center">
    <div class="fit column items-center">
      <q-card class="my-card">
        <q-card-section class="text-white bg-primary text-center q-mb-md">
          <div class="text-h4">Login</div>
        </q-card-section>
        <q-card-section>
          <transition name="fade">
            <q-banner inline-actions class="bg-red text-white" v-if="error.check">
              {{ error.message }}
              <template v-slot:action>
                <q-btn flat round icon="close" @click="error.check = false"/>
              </template>
            </q-banner>
          </transition>
        </q-card-section>
        <q-card-section>
          <q-form
            @reset="reset"
          >
            <q-input
              filled
              v-model="data.email"
              type="email"
              label="Email"
              lazy-rules
              :rules="[val =>  !!val || 'Digite seu email']"
            />
            <q-input
              filled
              v-model="data.password"
              type="password"
              label="Senha"
              lazy-rules
              :rules="[val =>  !!val || 'Digite sua senha']"
            />
            <div>
              <q-btn label="Login" :loading="loading" type="submit" @click="login" color="primary" class="q-mr-sm"/>
              <q-btn label="Reset" type="reset" color="primary" class="q-ml-sm"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      error: {
        check: false,
        message: ''
      },
      loading: false
    }
  },

  methods: {
    async login(){
      this.loading = true
      await this.$store.dispatch('auth/login', this.data).then(() => {
        this.$router.push({name: 'home'})
      }).catch((error) => {
        this.error.check = true
        if(error.response.status == 400){
          this.error.message = "O email ou senha fornecidos estão incorretos!"
        }else {
          this.error.message = "O login Falhou!"
        }
      })

      this.loading = false
    },
    reset(){
      this.data.email = "",
      this.data.password = ""

    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%;
    max-width 500px;

  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>
