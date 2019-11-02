<template>
  <div v-if="!$apolloData.queries.hotdeals.loading">
    <md-card>
      <md-card-header
        style="background-color: black; color: white; text-align: center; font-size: 1.5rem"
      >Hot deals</md-card-header>
      <md-card-content>
        <div class="setting">
          <p style="margin: 0 2rem 0 3rem">Add</p>
          <sui-button @click.native="toggle">
            <font-awesome-icon icon="plus-circle" />
          </sui-button>
          <sui-modal v-model="open">
            <sui-modal-header class="form-header">Create hotdeal</sui-modal-header>
            <sui-modal-content image>
              <div class="md-layout">
                <!-- Photo -->
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Photo</label>
                    <input
                      class="photoInput"
                      type="file"
                      @change="onFileSelectedCreate($event)"
                      accept="image/*"
                      required
                    />
                  </md-field>
                </div>
                <!-- Name -->
                <div class="md-layout-item md-smal-size-100 md-size-50">
                  <md-field>
                    <label>Name</label>
                    <md-input v-model="createHotdealParams.name" type="text" required></md-input>
                  </md-field>
                </div>
                <!-- Descriptions -->
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Descriptions</label>
                    <md-textarea
                      v-model="createHotdealParams.description"
                      md-autogrow
                      md-counter="250"
                      required
                    ></md-textarea>
                  </md-field>
                </div>
                <!-- Customer Rank -->
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Customer rank:</label>
                    <sui-dropdown
                      fluid
                      selection
                      :options="cus_rank_list"
                      v-model="createHotdealParams.cus_rank_id"
                      style="margin-top: 2.5rem"
                    />
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <label>Select start date and end date</label>
                </div>
                <!-- Start date -->
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <vue-ctk-date-time-picker
                      id="RangeDatePicker"
                      label="Select start date"
                      color="pink"
                      buttonColor="black"
                      format="YYYY-MM-DD"
                      formatted="ll"
                      buttonNowTranslation="Today"
                      :onlyDate="true"
                      :right="true"
                      :noLabel="true"
                      v-model="createHotdealParams.start_date"
                    ></vue-ctk-date-time-picker>
                  </md-field>
                </div>
                <!-- End date -->
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <vue-ctk-date-time-picker
                      id="RangeDatePicker"
                      label="Select end date"
                      color="pink"
                      buttonColor="black"
                      format="YYYY-MM-DD"
                      formatted="ll"
                      buttonNowTranslation="Today"
                      :onlyDate="true"
                      :right="true"
                      :noLabel="true"
                      v-model="createHotdealParams.end_date"
                    ></vue-ctk-date-time-picker>
                  </md-field>
                </div>
              </div>
            </sui-modal-content>
            <sui-modal-actions>
              <sui-button
                data-background-color="pink"
                positive
                @click.native="createHotdeal"
                class="ui button size middle"
              >Add</sui-button>
            </sui-modal-actions>
          </sui-modal>
        </div>

        <!-- Show after add HOT DEAL-->
        <div class="md-layout-item md-size-100">
          <md-table md-card>
            <md-table-row v-for="hotdeal in $apolloData.data.hotdeals" v-bind:key="hotdeal.id">
              <md-table-cell md-label="Description">{{hotdeal.name}}</md-table-cell>
              <md-table-cell md-label="Discount">{{hotdeal.description}}</md-table-cell>
              <md-table-cell md-label="Level">{{hotdeal.c_rank.name}}</md-table-cell>
              <md-table-cell md-label="Start date">{{hotdeal.start_date}}</md-table-cell>
              <md-table-cell md-label="End date">{{hotdeal.end_date}}</md-table-cell>
              <md-table-cell md-label="remove" class="edit_button">
                <sui-button @click.native="edit(hotdeal)">
                  <font-awesome-icon icon="edit" />
                </sui-button>
                <sui-button @click.native="deleteHotdeal(hotdeal.id)">
                  <font-awesome-icon icon="times-circle" />
                </sui-button>
              </md-table-cell>
            </md-table-row>
          </md-table>

          <!-- Show after click edit button -->
          <div v-if="updateHotdealParams.id !== null">
            <sui-modal v-model="openEdit">
              <sui-modal-header class="form-header">Update hotdeal</sui-modal-header>
              <sui-modal-content image>
                <div class="md-layout">
                  <!-- Photo -->
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>Photo</label>
                      <input
                        class="photoInput"
                        type="file"
                        @change="onFileSelectedUpdate($event)"
                        accept="image/*"
                        required
                      />
                    </md-field>
                  </div>
                  <!-- Name -->
                  <div class="md-layout-item md-smal-size-100 md-size-50">
                    <md-field>
                      <label>Name:</label>
                      <md-input type="text" required v-model="updateHotdealParams.name"></md-input>
                    </md-field>
                  </div>
                  <!-- Descriptions -->
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>Descriptions</label>
                      <md-textarea
                        md-autogrow
                        md-counter="250"
                        required
                        v-model="updateHotdealParams.description"
                      ></md-textarea>
                    </md-field>
                  </div>

                  <!-- Customer rank -->
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>Customer rank:</label>
                      <sui-dropdown
                        fluid
                        placeholder="Select customer rank"
                        selection
                        :options="cus_rank_list"
                        v-model="updateHotdealParams.cus_rank_id"
                        style="margin-top: 2.5rem"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <label>Select start date and end date</label>
                  </div>
                  <!-- Start date -->
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <vue-ctk-date-time-picker
                        id="RangeDatePicker"
                        label="Select start date"
                        color="pink"
                        buttonColor="black"
                        format="YYYY-MM-DD"
                        formatted="ll"
                        buttonNowTranslation="Today"
                        :onlyDate="true"
                        :right="true"
                        :noLabel="true"
                        v-model="updateHotdealParams.start_date"
                      ></vue-ctk-date-time-picker>
                    </md-field>
                  </div>
                  <!-- End date -->
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <vue-ctk-date-time-picker
                        id="RangeDatePicker"
                        label="Select end date"
                        color="pink"
                        buttonColor="black"
                        format="YYYY-MM-DD"
                        formatted="ll"
                        buttonNowTranslation="Today"
                        :onlyDate="true"
                        :right="true"
                        :noLabel="true"
                        v-model="updateHotdealParams.end_date"
                      ></vue-ctk-date-time-picker>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-30">
                    <md-card-media md-medium>
                      <img :src="updateHotdealParams.image" />
                    </md-card-media>
                  </div>
                </div>
              </sui-modal-content>
              <sui-modal-actions>
                <sui-button positive @click.native="updateHotdeal">Update</sui-button>
              </sui-modal-actions>
            </sui-modal>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
  <div v-else>
    <div class="md-layout">
      <h2>is loading...</h2>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { URL, makeRequest } from "../../components/api";

export default {
  name: "hot-deal",
  data() {
    return {
      open: false,
      openEdit: false,
      createHotdealParams: {
        description: null,
        selectedPhoto: null,
        name: null,
        cus_rank_id: null,
        start_date: null,
        end_date: null
      },
      updateHotdealParams: {
        id: null,
        description: null,
        selectedPhoto: null,
        name: null,
        cus_rank_id: null,
        start_date: null,
        end_date: null,
        image: null
      }
    };
  },
  watch: {
    openEdit: function() {
      if (this.openEdit === false) {
        this.updateHotdealParams = {
          id: null,
          description: null,
          selectedPhoto: null,
          name: null,
          cus_rank_id: null,
          start_date: null,
          end_date: null,
          image: null
        };
      }
    }
  },
  computed: {
    cus_rank_list() {
      if (this.$apolloData.data.customerRanks !== undefined) {
        return this.$apolloData.data.customerRanks.map(rank => {
          return {
            value: rank.id,
            text: rank.name
          };
        });
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    edit(hotdeal) {
      this.updateHotdealParams = {
        id: hotdeal.id,
        description: hotdeal.description,
        name: hotdeal.name,
        cus_rank_id: hotdeal.c_rank.id,
        start_date: hotdeal.start_date,
        end_date: hotdeal.end_date,
        image: hotdeal.image
      };

      this.openEdit = !this.openEdit;
    },
    onFileSelectedCreate(event) {
      return (this.createHotdealParams.selectedPhoto = event.target.files[0]);
    },
    onFileSelectedUpdate(event) {
      return (this.updateHotdealParams.selectedPhoto = event.target.files[0]);
    },
    createHotdeal() {
      let data = new FormData();
      data.append("imageFile", this.createHotdealParams.selectedPhoto);
      data.append("name", this.createHotdealParams.name);
      data.append("description", this.createHotdealParams.description);
      data.append("cus_rank_id", this.createHotdealParams.cus_rank_id);
      data.append(
        "image",
        "http://oasisvn.tk:8888/uploads/hotdeals/" +
          this.createHotdealParams.selectedPhoto.name
      );
      data.append("start_date", this.createHotdealParams.start_date);
      data.append("end_date", this.createHotdealParams.end_date);

      makeRequest("POST", URL + "hotdeal/create", data)
        .then(response => {
          this.toggle();
          this.$apollo.queries.hotdeals.refetch();
        })
        .catch(err => {
          console.error("There was an error in hotdeal!", err.statusText);
        });
    },
    updateHotdeal() {
      let data = new FormData();
      if (this.updateHotdealParams.selectedPhoto !== null) {
        data.append("imageFile", this.updateHotdealParams.selectedPhoto);
      }
      data.append("name", this.updateHotdealParams.name);
      data.append("description", this.updateHotdealParams.description);
      data.append("cus_rank_id", this.updateHotdealParams.cus_rank_id);
      data.append(
        "image",
        "http://oasisvn.tk:8888/uploads/hotdeals/" +
          this.updateHotdealParams.selectedPhoto.name
      );
      data.append("start_date", this.updateHotdealParams.start_date);
      data.append("end_date", this.updateHotdealParams.end_date);

      makeRequest(
        "POST",
        URL + "hotdeal/update/" + this.updateHotdealParams.id,
        data
      )
        .then(response => {
          (this.openEdit = false), this.$apollo.queries.hotdeals.refetch();
        })
        .catch(err => {
          console.error("There was an error in hotdeal!", err.statusText);
        });
    },
    deleteHotdeal(id) {
      makeRequest(
        "POST",
        URL + "hotdeal/delete/" + id,
      )
        .then(response => {
          this.$apollo.queries.hotdeals.refetch();
        })
        .catch(err => {
          console.error("There was an error in hotdeal!", err.statusText);
        });
    }
  },
  apollo: {
    hotdeals: gql`
      {
        hotdeals {
          id
          name
          image
          c_rank {
            id
            name
          }
          description
          start_date
          end_date
        }
      }
    `,
    customerRanks: gql`
      {
        customerRanks {
          id
          name
        }
      }
    `
  }
};
</script>
<style>
</style>


