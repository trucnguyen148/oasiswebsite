<template>
  <div v-if="!$apolloData.queries.bookings_progress.loading" class="content">
    <div class="md-layout">
      <md-card>
        <md-card-header data-background-color="black">
          <h3 class="title">Waiting Bills</h3>
        </md-card-header>
        <md-card-content>
          <!-- Showing part -->
          <div
            class="md-layout-item md-size-100"
            v-for="booking in bookings_progress"
            v-bind:key="booking.id"
          >
            <md-field>
              <md-table md-card>
                <md-table-row>
                  <md-table-cell md-label="ID">{{booking.id}}</md-table-cell>
                  <md-table-cell md-label="Customer">{{booking.cus.name}} - {{booking.cus.phone}}</md-table-cell>
                  <md-table-cell md-label="Emp">{{booking.emp.name}}</md-table-cell>
                  <md-table-cell md-label="Datetime">{{booking.date_time}}</md-table-cell>
                  <md-table-cell md-label="remove" class="edit_button">
                    <sui-button @click.native="toggle(booking)">
                      <font-awesome-icon icon="edit" />
                    </sui-button>
                    <sui-button>
                      <font-awesome-icon icon="times-circle" />
                    </sui-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-field>
          </div>

          <!-- Modal to open details of waiting bills -->
          <div v-if="!is_selected_booking_empty">
            <sui-modal v-model="open">
              <sui-modal-header>PROCESS TO PAYMENT</sui-modal-header>
              <sui-modal-content image>
                <sui-modal-description>
                  <sui-header>{{selected_booking.id}} | {{selected_booking.cus.name}} - {{selected_booking.cus.phone}}</sui-header>
                  <sui-modal-content>
                    <div class="md-layout-item md-size-100">
                      <md-field>
                        <label>Services:</label>
                        <sui-dropdown
                          fluid
                          multiple
                          placeholder="Select service"
                          selection
                          :options="service_list"
                          v-model="selected_service"
                          style="margin-top: 2.5rem"
                        />
                      </md-field>
                    </div>
                    <!-- Products -->
                    <div class="md-layout-item md-size-100">
                      <md-field>
                        <label>Products:</label>
                        <sui-dropdown
                          fluid
                          multiple
                          placeholder="Select product"
                          selection
                          :options="product_list"
                          v-model="selected_product"
                          style="margin-top: 2.5rem"
                        />
                      </md-field>
                    </div>
                    <!-- Show Services -->
                    <div class="samerow">
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <md-table md-card>
                            <md-table-toolbar>
                              <h3>Services</h3>
                            </md-table-toolbar>
                            <md-table-row
                              v-for="product in get_products(selected_booking.products, 1)"
                              v-bind:key="product.id"
                            >
                              <md-table-cell md-label="Name of service">{{ product.name }}</md-table-cell>
                              <md-table-cell
                                md-label="Price"
                                md-sort-by="price"
                              >{{ product.unit_price}}</md-table-cell>
                            </md-table-row>
                          </md-table>
                        </md-field>
                      </div>

                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <md-table md-card>
                            <md-table-toolbar>
                              <h3>Products</h3>
                            </md-table-toolbar>

                            <md-table-row
                              v-for="product in get_products(selected_booking.products, 2)"
                              v-bind:key="product.id"
                            >
                              <md-table-cell
                                md-label="Name of service"
                                md-sort-by="service"
                              >{{ product.name }}</md-table-cell>
                              <md-table-cell
                                md-label="Price"
                                md-sort-by="price"
                              >{{ product.unit_price }}</md-table-cell>
                            </md-table-row>
                          </md-table>
                        </md-field>
                      </div>
                    </div>
                    <!-- Discount -->
                    <div class="md-layout-item md-size-100">
                      <md-title style="float: left">Discount by:</md-title>
                    </div>
                    <div class="samerow">
                      <!--(cash) -->
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <label>Cash</label>
                          <md-input
                            @mouseleave="reset_to_zero()"
                            v-model="discount_cash"
                            type="number"
                          ></md-input>
                        </md-field>
                      </div>
                      <!-- % -->
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <label>%</label>
                          <md-input
                            @mouseleave="reset_to_zero()"
                            v-model="discount_percent"
                            type="number"
                          ></md-input>
                        </md-field>
                      </div>
                      <div>
                        <md-field class="md-layout-item md-small-size-100 md-size-50">
                          <label>Total: {{ total_value }}</label>
                          <md-input disabled></md-input>
                        </md-field>
                      </div>
                    </div>
                  </sui-modal-content>
                </sui-modal-description>
              </sui-modal-content>
              <sui-modal-actions>
                <sui-button positive @click.native="update_booking(selected_booking.id)">Pay</sui-button>
              </sui-modal-actions>
            </sui-modal>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
  <div v-else>
    <div class="md-layout">
      <h2>is loading...</h2>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const UPDATE_BOOKING = gql`
  mutation($id: ID!, $progress: Int!, $products: [ID!]) {
    updateBooking(input: { id: $id, progress: $progress, products: {sync: $products} }) {
      id
    }
  }
`;

export default {
  name: "waiting-bills",
  data() {
    return {
      open: false,
      is_selected_booking_empty: true,
      selected_booking: "",
      selected_service: "",
      selected_product: "",
      discount_cash: 0,
      discount_percent: 0
    };
  },
  computed: {
    total_value() {
      let total_value = this.selected_booking.products.reduce(
        (total, product) => total + product.unit_price,
        0
      );

      if (this.discount_cash > 0 && total_value > 0) {
        return total_value - this.discount_cash;
      } else if (this.discount_percent > 0) {
        return (total_value * (100 - this.discount_percent)) / 100;
      }
      return total_value;
    },
    product_list() {
      return this.$apollo.data.products
        .filter(product => {
          return product.type == 1;
        })
        .map(product => {
          return {
            value: product.id,
            text: product.name + " - " + product.unit_price
          };
        });
    },
    service_list() {
      return this.$apollo.data.products
        .filter(product => {
          return product.type == 2;
        })
        .map(product => {
          return {
            value: product.id,
            text: product.name + " - " + product.unit_price
          };
        });
    },
    all_products_and_services() {
      const old_products_and_service = this.selected_booking.products.map(
        product => {
          return product.id;
        }
      );
      let new_products_and_service = [];
      if (this.selected_product === "") {
        new_products_and_service = this.selected_service;
      } else if (this.new_products_and_service === "") {
        new_products_and_service = this.selected_product;
      } else {
        new_products_and_service = this.selected_product.concat(
          this.selected_service
        );
      }

      if (new_products_and_service === "") {
        return old_products_and_service;
      } else {
        return [
          ...new Set(old_products_and_service.concat(new_products_and_service))
        ];
      }
    }
  },
  methods: {
    update_booking(id) {
      const products = this.all_products_and_services;

      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: UPDATE_BOOKING,
          variables: {
            id: id,
            progress: 2,
            products: products
          }
        })
        .then(data => {
          this.open = !this.open;
          this.$apollo.queries.bookings_progress.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    toggle(booking) {
      this.selected_booking = booking;
      this.is_selected_booking_empty = false;
      this.open = !this.open;
    },
    is_Null_or_Undefined(array) {
      return array === null || array === undefined ? true : false;
    },
    get_products(products, type) {
      return products.filter(product => {
        return product.type === type;
      });
    },
    reset_to_zero() {
      if (this.discount_percent == "") {
        this.discount_percent = 0;
      }
      if (this.discount_cash == "") {
        this.discount_cash = 0;
      }
    }
  },
  apollo: {
    bookings_progress: gql`
      {
        bookings_progress(progress: 1) {
          id
          date_time
          cus {
            name
            phone
          }
          emp {
            name
          }
          products {
            id
            type
            name
            unit_price
          }
        }
      }
    `,
    products: gql`
      {
        products {
          id
          name
          type
          unit_price
        }
      }
    `
  }
};
</script>


