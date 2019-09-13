<template>
  <div v-if="!$apolloData.queries.bookings.loading" id="search-bill">
    <md-card class="md-card-profile">
      <md-card-header data-background-color="black">
        <h3 class="title">Bookings</h3>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <label>Search Booking number:</label>
              <sui-dropdown
                fluid
                :options="booking_list"
                placeholder="Select bill"
                search
                selection
                v-model="selected_booking_id"
                style="margin-top: 2.5rem"
              />
            </md-field>
          </div>

          <!-- Show bill details -->
          <div class="md-layout-item md-size-100">
            <md-field>
              <md-table md-card>
                <ul v-for="booking in booking_info" v-bind:key="booking.bill_id">
                  <li>
                    <md-table-toolbar>
                      <h3>{{ booking.id }}</h3>
                    </md-table-toolbar>
                  </li>
                  <md-table-row slot="md-table-row">
                    <md-table-cell
                      md-label="Date"
                      md-sort-by="service"
                    >Date: {{ booking.date_time }}</md-table-cell>
                    <md-table-cell
                      md-label="Branch"
                      md-sort-by="service"
                    >Branch: {{ booking.emp.branch.name }}</md-table-cell>
                    <md-table-cell
                      md-label="Staff"
                      md-sort-by="service"
                    >Staff: {{ booking.emp.name }}</md-table-cell>
                  </md-table-row>
                  <!-- Show services -->
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <md-table md-card>
                        <md-table-toolbar>
                          <h3>Services</h3>
                        </md-table-toolbar>

                        <md-table-row
                          slot="md-table-row"
                          v-for="service in service_info"
                          v-bind:key="service.id"
                        >
                          <md-table-cell md-label="Name of service">{{ service.name }}</md-table-cell>
                          <md-table-cell md-label="Price">{{ service.unit_price }}</md-table-cell>
                        </md-table-row>
                      </md-table>
                    </md-field>
                  </div>
                  <!-- Show products -->
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <md-table md-card>
                        <md-table-toolbar>
                          <h3>Products</h3>
                        </md-table-toolbar>

                        <md-table-row
                          slot="md-table-row"
                          v-for="product in product_info"
                          v-bind:key="product.id"
                        >
                          <md-table-cell md-label="Name of service">{{ product.name }}</md-table-cell>
                          <md-table-cell md-label="Price">{{ product.unit_price }}</md-table-cell>
                        </md-table-row>
                      </md-table>
                    </md-field>
                  </div>
                </ul>
              </md-table>
            </md-field>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
  <div v-else class="content">
    <div class="md-layout"><h2>is loading...</h2></div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "search-bill",
  data() {
    return {
      selected_booking_id: ""
    };
  },
  computed: {
    booking_list() {
      return this.$apolloData.data.bookings.map(booking => {
        return {
          text: booking.date_time + " - " + booking.cus.name,
          value: booking.id
        };
      });
    },
    booking_info() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.bookings)) {
        return this.$apolloData.data.bookings.filter(booking => {
          return booking.id == this.selected_booking_id;
        });
      } else return [];
    },
    service_info() {
      if (!this.is_Null_or_Undefined(this.booking_info[0].products)) {
        return this.booking_info[0].products.filter(product => {
          return product.type == 2;
        });
      } else return [];
    },
    product_info() {
      if (!this.is_Null_or_Undefined(this.booking_info[0].products)) {
        return this.booking_info[0].products.filter(product => {
          return product.type == 1;
        });
      } else return [];
    }
  },
  methods: {
    is_Null_or_Undefined(array) {
      return array === null || array === undefined ? true : false;
    }
  },
  apollo: {
    bookings: gql`
      {
        bookings {
          id
          date_time
          cus {
            id
            name
          }
          emp {
            id
            name
            branch {
              name
            }
          }
          products {
            id
            type
            name
            unit_price
          }
        }
      }
    `
  }
};
</script>

