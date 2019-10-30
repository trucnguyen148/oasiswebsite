<template>
  <div v-if="!$apolloData.queries.bookings_progress.loading">
    <!-- PRICE LIST -->
    <md-card>
      <md-card-header
        style="background-color: black; color: white; text-align: center; font-size: 1.5rem"
      >Collections</md-card-header>
      <md-card-content>
        <div class="setting">
          <p style="margin: 0 2rem 0 3rem">Add</p>
          <sui-button @click.native="toggle">
            <font-awesome-icon icon="plus-circle" />
          </sui-button>
          <sui-modal v-model="open">
            <sui-modal-header class="form-header">Add new collection</sui-modal-header>
            <sui-modal-content>
              <!-- Name -->
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label>Name</label>
                  <md-input v-model="name" type="text" required></md-input>
                </md-field>
              </div>
              <!-- Descriptions -->
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label>Descriptions</label>
                  <md-textarea v-model="autogrow" md-autogrow md-counter="250" required></md-textarea>
                </md-field>
              </div>
              <!-- Photo -->
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label>Photo</label>
                  <md-file v-model="multiple" multiple accept="image/*" required />
                </md-field>
              </div>
            </sui-modal-content>
            <sui-modal-actions>
              <sui-button
                data-background-color="pink"
                positive
                @click.native="toggle"
                class="ui button size middle"
              >Add</sui-button>
            </sui-modal-actions>
          </sui-modal>
        </div>

        <!-- Show after add PRICE LIST-->
        <ul v-for="booking in booking_list" v-bind:key="booking.id">
          <div class="md-layout-item md-size-100">
            <md-field>
              <md-table md-card>
                <md-table-row>
                  <md-table-cell md-label="ID">{{booking.id}}</md-table-cell>
                  <md-table-cell md-label="Description">{{booking.cus.name}}</md-table-cell>
                  <md-table-cell md-label="Date">{{booking.date_time}}</md-table-cell>
                  <md-table-cell md-label="Pictures">{{booking.collections.length | amount}}</md-table-cell>
                  <md-table-cell md-label="remove" class="edit_button">
                    <sui-button @click.native="edit(booking.id)">
                      <font-awesome-icon icon="edit" />
                    </sui-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-field>
          </div>
        </ul>

        <!-- Show after click edit button -->

        <sui-modal v-model="openEdit">
          <sui-modal-header class="form-header">Content of collection</sui-modal-header>
          <sui-modal-content image>
            <div class="md-layout">
              <!-- Photo -->
              <div class="md-layout-item md-size-100">
                <md-field>
                  <div v-if="selectedBooking.id !== null">
                    <label>Photo</label>
                    <div v-if="selectedBooking.id !== null">
                      <md-card-media
                        md-medium
                        v-for="image in selectedBooking.images"
                        v-bind:key="image.id"
                      >
                        <img :src="image.image" />
                      </md-card-media>
                    </div>
                    <div v-else>
                      <label>is Loading...</label>
                    </div>
                  </div>
                </md-field>
              </div>
            </div>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button positive @click.native="edit">Close</sui-button>
          </sui-modal-actions>
        </sui-modal>
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

const GET_COLLECTION = gql`
  query($booking_id: Int!) {
    collection_booking(booking_id: $booking_id) {
      id
      image
    }
  }
`;

export default {
  name: "collection",
  data() {
    return {
      open: false,
      openEdit: false,
      selectedBooking: {
        id: null,
        images: null
      }
    };
  },
  filters: {
    amount: function(length) {
        if (length == 1) {
            return "1 picture"
        }else{
            return length + " pictures"
        }
    }
  },
  computed: {
    booking_list() {
      if (this.$apolloData.data.bookings_progress !== undefined) {
        return this.$apolloData.data.bookings_progress.filter(booking => {
          return booking.collections.length > 0;
        });
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    edit(id) {
      if (id === undefined) {
        this.openEdit = !this.openEdit;
      } else {
        this.selectedBooking.id = id;
        this.get_collection(id);
        this.openEdit = !this.openEdit;
      }
    },
    get_collection(booking_id) {
      // Call to the graphql mutation
      this.$apollo
        .query({
          query: GET_COLLECTION,
          variables: {
            booking_id: booking_id
          }
        })
        .then(data => {
          return (this.selectedBooking.images = data.data.collection_booking);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  apollo: {
    bookings_progress: gql`
      {
        bookings_progress(progress: 2) {
          id
          date_time
          cus {
            name
          }
          collections {
            id
          }
        }
      }
    `
  }
};
</script>
<style></style>


