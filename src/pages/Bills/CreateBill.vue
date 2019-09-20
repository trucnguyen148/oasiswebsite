<template>
  <div
    v-if="!$apolloData.queries.employees.loading && !$apolloData.queries.products.loading && !$apolloData.queries.customers.loading"
    class="setting"
  >
    <md-card class="md-card-profile">
      <md-card-header data-background-color="black">
        <h3 class="title">Create Bills</h3>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <!-- Customer id -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Customer ID</label>
              <sui-dropdown
                fluid
                search
                placeholder="Select staff"
                selection
                :options="customer_list"
                v-model="selected_customer_id"
                style="margin-top: 2.5rem"
              />
            </md-field>
          </div>
          <!-- Name -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Name</label>
              <md-input v-model="customerid" type="number"></md-input>
            </md-field>
          </div>

          <!-- Phone number -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Phone Number</label>
              <md-input v-model="phonename" type="number" required></md-input>
            </md-field>
          </div>

          <!-- Staff -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Staff</label>
              <sui-dropdown
                fluid
                search
                placeholder="Select staff"
                selection
                :options="employee_list"
                v-model="selected_employee_id"
                style="margin-top: 2.5rem"
              />
            </md-field>
          </div>

          <!-- Services -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Services:</label>
              <sui-dropdown
                fluid
                search
                multiple
                placeholder="Select service"
                selection
                :options="service_list"
                v-model="selected_service_ids"
                style="margin-top: 2.5rem"
              />
            </md-field>
          </div>
          <!-- Products -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Products:</label>
              <sui-dropdown
                fluid
                search
                multiple
                placeholder="Select product"
                selection
                :options="product_list"
                v-model="selected_product_ids"
                style="margin-top: 2.5rem"
              />
            </md-field>
          </div>

          <!-- Show Services -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <md-table v-model="users" md-card>
                <md-table-toolbar>
                  <h1 class="md-title">Services</h1>
                </md-table-toolbar>

                <md-table-row
                  slot="md-table-row"
                  v-for="service in services"
                  v-bind:key="service.id"
                >
                  <md-table-cell md-label="Name of service">{{ service.name }}</md-table-cell>
                  <md-table-cell md-label="Price" md-sort-by="price">{{ service.unit_price }}</md-table-cell>
                </md-table-row>
              </md-table>
            </md-field>
          </div>

          <!-- Show Products -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <md-table v-model="users" md-card>
                <md-table-toolbar>
                  <h1 class="md-title">Products</h1>
                </md-table-toolbar>

                <md-table-row
                  slot="md-table-row"
                  v-for="product in products"
                  v-bind:key="product.id"
                >
                  <md-table-cell md-label="Name of product" md-sort-by="product">{{ product.name }}</md-table-cell>

                  <md-table-cell md-label="Price" md-sort-by="price">{{ product.unit_price }}</md-table-cell>
                </md-table-row>
              </md-table>
            </md-field>
          </div>

          <!-- Discount -->
          <div class="md-layout-item md-size-100">
            <md-title style="float: left">Discount by:</md-title>
          </div>
          <!--(cash) -->
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Cash</label>
              <md-input @mouseleave="reset_to_zero()" v-model="discount_cash" type="number"></md-input>
            </md-field>
          </div>
          <!-- % -->
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>%</label>
              <md-input @mouseleave="reset_to_zero()" v-model="discount_percent" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>{{ total_value }}</label>
              <md-input disabled></md-input>
            </md-field>
          </div>
          <!-- Button -->
          <div class="ui button biggersize middle samerow">
            <sui-button
              data-background-color="pink"
              positive
              @click.native="addBooking(1)"
            >Go to Staff</sui-button>
            <sui-button
              data-background-color="pink"
              positive
              @click.native="addBooking(2)"
            >Go to Payment</sui-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
  <div v-else class="content">
    <div class="md-layout">
      <h2>is loading...</h2>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const ADD_BOOKING = gql`
  mutation(
    $date_time: String!
    $cus_id: Int!
    $emp_id: Int!
    $connect: [Int]
    $progress: Int
  ) {
    createBooking(
      input: {
        date_time: $date_time
        cus_id: $cus_id
        emp_id: $emp_id
        progress: $progress
        products: { connect: $connect }
      }
    ) {
      id
    }
  }
`;

export default {
  name: "create-bill",
  props: ["forceRerender"],
  data() {
    return {
      selected_product_ids: [],
      selected_service_ids: [],
      selected_employee_id: "",
      selected_customer_id: "",
      discount_cash: 0,
      discount_percent: 0
    };
  },
  watch: {
    discount_cash: function() {
      if (this.discount_percent > 0 || this.discount_percent == "") {
        this.discount_percent = 0;
      }
    },
    discount_percent: function() {
      if (this.discount_cash > 0 || this.discount_cash == "") {
        this.discount_cash = 0;
      }
      if (this.discount_percent > 100) {
        this.discount_percent = 100;
      }
    }
  },
  computed: {
    total_value() {
      let total_value = this.total_product_value + this.total_service_value;

      if (this.discount_cash > 0 && total_value > 0) {
        return total_value - this.discount_cash;
      } else if (this.discount_percent > 0) {
        return (total_value * (100 - this.discount_percent)) / 100;
      }
      return total_value;
    },
    total_product_value() {
      return this.selected_products.reduce(
        (total, product) => total + product.unit_price,
        0
      );
    },
    selected_products() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.products)) {
        let products = [];

        this.selected_product_ids.forEach(selected_product_id => {
          products.push(
            this.$apolloData.data.products.filter(product => {
              return product.id == selected_product_id;
            })[0]
          );
        });

        return products;
      }
    },
    total_service_value() {
      return this.selected_services.reduce(
        (total, product) => total + product.unit_price,
        0
      );
    },
    selected_services() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.products)) {
        let services = [];

        this.selected_service_ids.forEach(selected_service_id => {
          services.push(
            this.$apolloData.data.products.filter(product => {
              return product.id == selected_service_id;
            })[0]
          );
        });

        return services;
      }
    },
    services() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.products)) {
        return this.$apolloData.data.products.filter(product => {
          return product.type == 2;
        });
      }
    },
    service_list() {
      if (!this.is_Null_or_Undefined(this.services)) {
        return this.services.map(service => {
          return {
            text: service.name + " - " + service.unit_price,
            value: service.id
          };
        });
      }
    },
    products() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.products)) {
        return this.$apolloData.data.products.filter(product => {
          return product.type == 1;
        });
      }
    },
    product_list() {
      if (!this.is_Null_or_Undefined(this.products)) {
        return this.products.map(product => {
          return {
            text: product.name + " - " + product.unit_price,
            value: product.id
          };
        });
      }
    },
    employee_list() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.employees)) {
        return this.$apolloData.data.employees.map(employee => {
          return {
            text: employee.name,
            value: employee.id
          };
        });
      } else return [];
    },
    customer_list() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.customers)) {
        return this.$apolloData.data.customers.map(customer => {
          return {
            text: customer.name,
            value: customer.id
          };
        });
      } else return [];
    },
    products_and_services_ids() {
      return this.selected_product_ids.concat(this.selected_service_ids);
    }
  },
  methods: {
    reset_to_zero() {
      if (this.discount_percent == "") {
        this.discount_percent = 0;
      }
      if (this.discount_cash == "") {
        this.discount_cash = 0;
      }
    },
    get_current_date_time() {
      let current_date_time = new Date();
      return (
        current_date_time.getFullYear() +
        "-" +
        ("0" + parseInt(current_date_time.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + current_date_time.getDate()).slice(-2) +
        " " +
        ("0" + current_date_time.getHours()).slice(-2) +
        ":" +
        ("0" + current_date_time.getMinutes()).slice(-2) +
        ":" +
        ("0" + current_date_time.getSeconds()).slice(-2)
      );
    },
    addBooking(val) {
      const date_time = this.get_current_date_time();
      const cus_id = this.selected_customer_id;
      const emp_id = this.selected_employee_id;
      const progress = val;
      const connect = this.products_and_services_ids;

      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: ADD_BOOKING,
          variables: {
            date_time: date_time,
            cus_id: cus_id,
            emp_id: emp_id,
            progress: progress,
            connect: connect
          }
        })
        .then(data => {
          console.log(data);
          alert('OK')
        })
        .catch(error => {
          console.log(error);
        });
    },
    is_Null_or_Undefined(array) {
      return array === null || array === undefined ? true : false;
    }
  },
  apollo: {
    employees: gql`
      {
        employees {
          id
          name
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
    `,
    customers: gql`
      {
        customers {
          id
          name
          phone
        }
      }
    `
  }
};
</script>



