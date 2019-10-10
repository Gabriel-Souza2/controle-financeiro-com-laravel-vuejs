<template>
  <q-dialog v-model="open" persistent>
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6 text-primary">Adicionar Entry</div>
      </q-card-section>

      <q-card-section>
        <q-input 
          class="q-mb-md" 
          :rules="[
            val => !!val || 'A identificação é obrigatoria!'  
          ]" 
          ref="identify" 
          v-model="data.identify" 
          label="Identificação" 
        />

        <q-input 
          class="q-mb-md" 
          ref="value"
          :rules="[
            val => !!val && val > 0 || 'O valor é obrigatoria e tem que ser maior que 0!'  
          ]" 
          v-model="data.value" 
          label="Valor"
        />
        <q-input 
          class="q-mb-md" 
          ref="due" 
          :rules="['date']" 
          v-model="data.due_date" 
          mask="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer"></q-icon>  
            <q-popup-proxy 
              ref="qDateProxy" 
              transition-show="scale" 
              transition-hide="scale">
              <q-date 
                v-model="data.due_date" 
                @input="() => $refs.qDateProxy.hide">
              </q-date>
            </q-popup-proxy>
          </template>  
        </q-input>     
        <q-select 
          class="q-mb-md" 
          ref="category"
          :rules="[
            val => !!val ||'A categoria é obrigatoria!'
          ]"
          option-label="name" 
          option-value="id" 
          map-options 
          emit-value 
          v-model="data.category_id" 
          :options="options" 
          label="Categoria" >
          <template v-slot:option="scope">
            <q-item v-if="scope.opt.group">
              <q-item-label header>{{scope.opt.group}}</q-item-label>
            </q-item>
            <q-item v-if="scope.opt.name" v-on="scope.itemEvents" v-bind="scope.itemProps">
              <q-item-section>
                {{scope.opt.name}}
              </q-item-section>
            </q-item>
          </template>  
        </q-select>   
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="closeDialog()" v-close-popup />
        <q-btn flat label="Add" @click="add()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import formMixins from '../../../mixins/form'
import _ from 'lodash'


export default {
  mixins: [formMixins],
  data(){
    return{
      state: 'entries'
    }
  },
  computed:{
    categories(){
      return this.$store.state.categories.categories
    },

    options()
    {
      let gains = [{group: 'Ganhos'}]
      let costs = [{group: 'Gastos'}]
      _.forEach(this.categories, (item, key) => {
        item.type == 'costs' ? costs.push(item) : gains.push(item)
      }) 

      return _.union(gains, costs)
    },
  },

}
</script>

<style>
</style>
