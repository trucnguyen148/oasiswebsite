<template>
  <div class="setting">
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
                placeholder="Select staff"
                selection
                :options="customer_list"
                v-model="selected_customer"
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
                placeholder="Select staff"
                selection
                :options="employee_list"
                v-model="selected_employee"
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
                multiple
                placeholder="Select service"
                selection
                :options="service_list"
                v-model="selected_services"
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
                multiple
                placeholder="Select product"
                selection
                :options="product_list"
                v-model="selected_products"
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
                  <md-table-cell md-label="Quantities">
                    <md-input id="quantity" v-model="quantity" type="number" required></md-input>
                  </md-table-cell>
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
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Cash</label>
              <md-input v-model="cash" type="number"></md-input>
            </md-field>
          </div>
          <!-- % -->
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>%</label>
              <md-input v-model="percentage" type="text"></md-input>
            </md-field>
          </div>
          <!-- Button -->
          <div class="ui button biggersize middle samerow">
            <sui-button data-background-color="pink" positive @click.native="toggle">Go to Staff</sui-button>
            <sui-button data-background-color="pink" positive @click.native="toggle">Go to Payment</sui-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "create-bill",
  data: () => ({
    selected_products: [],
    selected_services: [],
    selected_employee: "",
    selected_customer: "",
  }),
  computed: {
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
    }
  },
  methods: {
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

<style>
#quantity {
  text-align: center;
}
</style>

