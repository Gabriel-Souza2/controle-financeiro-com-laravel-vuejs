<template>
  <div class="row">
    <div class="col-12">
      <q-card>
        <q-card-section class="text-h5 text-primary">
          <HeaderComponent icon="account_balance_wallet" title="My Wallet" />
        </q-card-section>
        <q-card-section>
          <div class="row q-my-lg">
            <div
              class="col-xs-12 col-md-4 col-sm-12"
              v-for="(item, index) in moneyList"
              :key="index"
            >
              <div class="money-container">
                <div class="money-type text-h6">{{item.label}}</div>
                <div class="money-value text-h4 text-weight-bolder">
                  <span class="money-icon text-h5" :class="item.color">R$</span>
                  <ICountUp :options="options" :endVal="calculations(item.value)" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";
import HeaderComponent from "../generics/base/HeaderComponent";

export default {
  data() {
    return {
      data: [],
      moneyList: [
        {
          label: "Ganhos",
          color: "bg-green",
          value: "gains"
        },
        {
          label: "Gastos",
          color: "bg-red",
          value: "costs"
        },
        {
          label: "Saldo",
          color: "bg-blue",
          value: "balance"
        }
      ],
      options: {
        decimalPlaces: 2,
        separator: ".",
        decimal: ","
      }
    };
  },
  computed: {
    costs() {
      return this.$store.getters["entries/costs"];
    },

    gains() {
      return this.$store.getters["entries/gains"];
    },

    balance() {
      return this.gains - this.costs;
    }
  },
  methods: {
    calculations(value) {
      switch (value) {
        case "costs":
          return this.costs;
          break;
        case "gains":
          return this.gains;
          break;
        case "balance":
          return this.balance;
      }
    }
  },
  components: {
    ICountUp,
    HeaderComponent
  }
};
</script>

<style lang="stylus">
.money-container {
  width: 100%;
  max-width: 250px;
  margin: auto;
  text-align: center;
}

.money-icon {
  padding: 10px;
  color: #fff;
  border-radius: 50%;
  margin-right: 5px;
}

.money-type {
  color: #3a383859;
}

.text-value {
  font-size: 30px;
}
</style>
