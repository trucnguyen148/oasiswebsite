<template>
  <div v-if="!$apolloData.queries.customers.loading" class="content">
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
              <p>Name: {{ customer.name }}</p>
              <p>Gender: {{ customer.gender | gender  }}</p>
              <p>Phone: {{ customer.phone }}</p>
              <p>Email: {{ customer.email }}</p>
              <p>Facebook: {{ customer.facebook }}</p>
              <p>Date of Birth: {{ customer.dob }}</p>
              <p>Address: {{ customer.address }}</p>
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
                      <md-table-cell md-label="Date">{{ booking.date_time }}</md-table-cell>
                      <md-table-cell md-label="Used Services">
                        <p 
                          v-for="product in booking.products"
                          v-bind:key="product.id"
                          >
                          {{  product.name  }} - {{  product.type | product_type }}
                         </p>
                      </md-table-cell>
                      <md-table-cell md-label="Ratings">{{ booking.ratings }}</md-table-cell>
                      <md-table-cell md-label="Progress">{{ booking.progress | progress }}</md-table-cell>
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
  <div v-else class="content">
    <div class="md-layout"><h2>is loading...</h2></div>
  </div>
</template>

<script>
import { UserCard, AddUser } from "@/pages";
import gql from "graphql-tag";

export default {
  name: "customers",
  components: {
    UserCard,
    AddUser
  },
  data() {
    return {
      open: false,
      selected_cus_id: "",
    };
  },
  computed: {
    customer_list(){
      return this.$apolloData.data.customers.map(cus => {
        return {
          text: cus.name + ' - ' + cus.phone,
          value: cus.id
        }
      });
    },
    selected_customer(){
      if (this.selected_cus_id !== ""){
        return this.$apolloData.data.customers.filter(cus => {
          return cus.id == this.selected_cus_id
        });
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  },
  filters: {
    product_type: type => {
      return type == 1 ? "Product" : "Service"
    },
    gender: gender => {
      return gender == 1 ? "Male" : "Female"
    },
    progress: progress => {
      return progress == 1 ? "Waiting" 
            : progress == 2 ? "Done"
            : "Cancel";
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
            ratings
            progress
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
