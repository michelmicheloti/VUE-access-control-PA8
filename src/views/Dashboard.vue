<template>
  <b-container class="main col-12">
    <b-row align-h="center">
      <b-card-group
        deck
        class="col-3 mt-5"
        v-for="card in cards"
        :key="card.id"
      >
        <b-card
          :bg-variant="
            card.isPresent ? 'success' : !card.access ? 'danger' : 'secondary'
          "
          text-variant="white"
          :header="
            card.isPresent
              ? 'Acesso Permitido'
              : !card.access
              ? 'Acesso Negado'
              : 'Sem Status'
          "
          class="card text-center"
        >
          <b-row class="info-card">
            <em class="fa fa-address-card fa-2x"></em>
            <strong>{{ card.uid }}</strong>
          </b-row>
          <template #footer>
            <b-row class="info-clock">
              <em class="fa fa-history fa-2x"></em>
              <strong class="pr-2">{{
                card.isPresent ? isPresent.yes : isPresent.no
              }}</strong>
              <strong>{{ card.accessDate }}</strong>
            </b-row>
          </template>
        </b-card>
      </b-card-group>
    </b-row>
  </b-container>
</template>

<script>
import axios from "@/config/axios";
import moment from "moment";

export default {
  name: "ScrapSource",
  data: () => {
    return {
      cards: [],
      isPresent: {
        yes: "Entrada: ",
        no: "Saída: ",
      },
    };
  },
  computed: {},
  methods: {
    async loadCards() {
      try {
        const response = await axios.get("/card");
        const { status, data } = await response;
        if (status === 200) {
          this.cards = data.map((x) => {
            return {
              id: x.id,
              uid: x.uid,
              access: x.access,
              isPresent: x.isPresent,
              accessDate: moment(x.accessDate).format("DD/MM/YY - hh:mm a"),
            };
          });
        }
      } catch {
        this.$toasted.global.defaultError();
        return;
      }
    },
  },
  async created() {
    await this.loadCards();
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.info-card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px, 15px;
}

.info-card em {
  padding: 0px 15px;
}

.info-clock {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px, 15px;
}

.info-clock em {
  padding: 0px 15px;
}

.card {
  width: 220px;
  height: 180px;
}
</style>