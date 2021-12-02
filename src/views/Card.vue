<template>
  <div class="main-container">
    <div class="d-flex justify-content-center">
      <div id="dark-container" class="mt-5 p-4 bgd" style="width: 60%">
        <b-container class="mt-4" fluid>
          <b-row>
            <b-col sm="6" md="6" class="my-1 pl-0">
              <b-form-group
                label="Por Página"
                label-for="pageSelect"
                label-cols-sm="7"
                label-cols-md="5"
                label-cols-lg="4"
                label-cols-xl="3"
                label-align-sm="left pr-0"
                label-size="sm"
                class="mb-0 text-white lbl-page"
              >
                <b-form-select
                  class="selectPage"
                  id="pageSelect"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                >
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col sm="6" md="6" class="my-1 pr-0 pl-0">
              <b-form-group
                label="Filtrar:"
                label-for="filter-input"
                label-cols-sm="6"
                label-cols-md="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-3 text-white"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Pesquisar"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''"
                      ><em class="fa fa-refresh"></em
                    ></b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
        <b-table
          head-variant="dark"
          hover
          sticky-header
          striped
          :current-page="currentPage"
          :fields="fields"
          :filter="filter"
          :items="cards"
          :per-page="perPage"
        >
          <template #cell(action)="data">
            <b-button variant="light" @click="openModal(data.item)">
              <em class="fa fa-trash"></em>
            </b-button>
          </template>
        </b-table>
        <b-col
          sm="7"
          md="6"
          class="my-1"
          style="margin-left: auto; margin-right: auto"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </div>
    </div>

    <!--Modal Deseja Remover-->
    <b-modal
      id="modal-remove"
      ref="modal-remove"
      size="md"
      title="Deseja realmente remover ? "
      centered
    >
      <p class="my-1">Ao remover, não terá mais acesso a esse item</p>
      <template #modal-footer>
        <b-button size="md" variant="danger" @click="remove()"> Sim </b-button>
        <b-button
          size="md"
          variant="primary"
          @click="$bvModal.hide('modal-remove')"
        >
          Não
        </b-button>
      </template>
      <b-overlay :show="buttonLoad" no-wrap></b-overlay>
    </b-modal>

    <b-overlay :show="buttonLoad" no-wrap></b-overlay>
  </div>
</template>

<script>
import axios from "@/config/axios";
import moment from "moment";
export default {
  name: "ScrapSource",
  data: () => {
    return {
      addUser: "",
      buttonLoad: false,
      currentPage: 1,
      fields: [
        { key: "id", label: "Id", sortable: true },
        { key: "uid", label: "Cartão", sortable: true },
        { key: "access", label: "Possui Acesso", sortable: true },
        { key: "isPresent", label: "Esta Presente" },
        { key: "accessDate", label: "Data de Acesso" },
        { key: "action", label: "Ação" },
      ],
      filter: null,
      itemToRemove: null,
      pageOptions: [5, 10, 15, { value: 100, text: "Todas as páginas" }],
      perPage: 5,
      cards: [],
      totalRows: 1,
      options: [],
    };
  },
  computed: {},
  methods: {

    async loadCards() {
      try {
        this.buttonLoad = true;
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
          this.buttonLoad = false;
        }
      } catch {
        this.buttonLoad = false;
        this.$toasted.global.defaultError();
        return;
      }
    },

    openModal(item) {
      this.$refs["modal-remove"].show();
      this.itemToRemove = item;
    },

    async remove() {
      try {
        this.buttonLoad = true;
        const id = this.itemToRemove.id;
        const response = await axios.delete(`/card/${id}`);
        const { status } = await response;
        if (status === 200) {
          this.$toasted.global.defaultSuccess();
          this.$refs["modal-remove"].hide();
          await this.reset();
          this.buttonLoad = false;
        }
        this.buttonLoad = false;
      } catch {
        this.buttonLoad = false;
        this.$toasted.global.defaultError();
        return;
      }
    },

    async reset() {
      this.addUser = "";
      await this.loadCards();
    },

    async save() {
      try {
        this.buttonLoad = true;
        const response = await axios.post("/user", this.form);
        const { status } = await response;
        if (status === 201) {
          this.$toasted.global.defaultSuccess();
          await this.reset();
          this.buttonLoad = false;
        }
        this.buttonLoad = false;
      } catch {
        this.buttonLoad = false;
        this.$toasted.global.defaultError();
        return;
      }
    },
  },
  async mounted() {
    this.loadCards();
  },
  watch: {
    cards: function () {
      this.totalRows = this.cards.length;
    },
  },
};
</script>

<style scoped>
.selectPage {
  background: #fff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23fffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    right 0.75rem center/8px 10px no-repeat;
}
.search {
  display: flex;
  justify-content: flex-end;
}
.bgd {
  background: #1a202e;
  border-radius: 5px;
}
.bg-dark {
  --bs-bg-opacity: 1;
  background-color: #343a40 !important;
}
.circle {
  position: relative;
  top: 23px;
  cursor: pointer;
}
.circleBlue {
  background-image: linear-gradient(to right, #005486, #009add);
}
.customize {
  border-bottom: #707070 solid 2px !important;
  border-radius: 5px 5px 0 0;
}
.customize::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}
.customize:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #fff;
}
.main-input input {
  background-color: #343a40;
}
.plus-button button {
  text-align: center;
  width: 38px;
  height: 38px;
  position: relative;
  border: 0;
  outline: 0;
  border-radius: 30px;
  color: white;
  background-image: linear-gradient(to right, #009add, #005486);
}
.plus-button .fa {
  position: relative;
  display: table-cell;
  width: 60px;
  height: 36px;
  vertical-align: baseline;
  font-size: 20px;
  padding-top: 4px;
}
.plus-button.btn button:hover {
  background-image: linear-gradient(to right, #005486, #009add) !important;
}
.text-white {
  color: #fff !important;
}
.table {
  color: white !important;
}

@media (min-width: 1440px) {
  #pageSelect {
    width: 154px;
  }
  .lbl-page {
    width: 320px;
  }
}
</style>
