<template>
  <div class="content">
    <div class="md-layout">
      <md-card>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field>
                <label>Search customer:</label>
                <sui-dropdown
                  fluid
                  :options="customer_list"
                  placeholder="Select customer"
                  search
                  selection
                  v-model="selected_cus_id"
                  style="margin-top: 2.5rem"
                />
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-content>
          <ul
            v-for="customer in selected_customer"
            v-bind:key="customer.id"
          >
            <li>
              <p>Name: {{customer.name}}</p>
              <p v-if="customer.gender == 2">Gender: Female</p>
              <p v-else>Gender: Male</p>
              <p>Phone: {{customer.phone}}</p>
              <p>Email: {{customer.email}}</p>
              <p>Facebook: {{customer.facebook}}</p>
              <p>Date of Birth: {{customer.dob}}</p>
              <p>Address: {{customer.address}}</p>
              <div class="sameRow">
                <p>Used Service(s) and Bought Product(s):</p>
                <sui-button style="width: 5%" @click.native="toggle" icon="angle down"></sui-button>
              </div>
              <sui-modal v-model="open">
                <sui-modal-header>Purchase history</sui-modal-header>
                <sui-modal-content>
                  <md-table v-if="customer.bookings.length > 0" md-card>
                    <md-table-row
                      v-for="booking in customer.bookings"
                      v-bind:key="booking.id"
                    >
                      <md-table-cell md-label="Bill ID">{{booking.id}}</md-table-cell>
                      <md-table-cell md-label="Date">{{booking.date_time}}</md-table-cell>
                      <md-table-cell md-label="Used Services">
                        <p 
                          v-for="product in booking.products"
                          v-bind:key="product.id"
                          >
                          {{ product.name }}
                        </p>
                      </md-table-cell>
                      <md-table-cell md-label="Bought Product"></md-table-cell>
                    </md-table-row>
                  </md-table>
                  <md-table v-else md-card>
                    Empty
                  </md-table>
                </sui-modal-content>
                <sui-modal-actions>
                  <sui-button positive @click.native="toggle">OK</sui-button>
                </sui-modal-actions>
              </sui-modal>
            </li>
          </ul>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { UserCard, AddUser } from "@/pages";
import json from "./../../data/bills.json";
import gql from "graphql-tag";

export default {
  name: "customers",
  components: {
    UserCard,
    AddUser
  },
  data() {
    return {
      myJson: json,
      open: false,
      selected_cus_id: "",
      customers: []
    };
  },
  computed: {
    customer_list(){
      let customer_list = this.customers.map(cus => {
        return {
          text: cus.name + ' - ' + cus.phone,
          value: cus.id
        }
      });

      return customer_list;
    },
    selected_customer(){
      if (this.selected_cus_id !== ""){
        let customer = this.customers.filter(cus => {
          return cus.id == this.selected_cus_id
        });

        return customer
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  },
  apollo: {
    customers: gql`{
        customers {
          id
          name
          phone
          gender
          facebook
          email
          dob
          address
          bookings {
            id 
            date_time
            products {
              id 
              type
              name
            }
          }
        }
    }`
  }
};
</script>

<style>
.width {
  width: 100%;
}
.sameRow {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.widthButton {
  width: 30%;
}
</style>
