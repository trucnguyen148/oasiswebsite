<template>
  <div class="content">
    <div class="md-layout">
      <md-card >
        <md-card-content>
          <div class="md-layout">
                  <div class="md-layout-item">
                      <md-field>
                      <label>Search customer:</label>
                      <sui-dropdown
                          fluid
                          :options="customer_name"
                          placeholder="Select customer"
                          search
                          selection
                          v-model="current"
                          style="margin-top: 2.5rem"
                          />
                      </md-field>
                  </div>
              </div>   
        </md-card-content>
        <md-card-content>
            <ul
              v-for="data in myJson"
              v-bind:key="data.customer_name"
              v-bind:picture="data.picture"
              v-bind:customer_name="data.customer_name" 
              v-bind:phone="data.phone"
              v-bind:address="data.address"
              v-bind:email="data.email"
              v-bind:level="data.level"
              v-bind:bill_id="data.bill"
                 
            >
              <li>
                <p>Photo: {{data.picture}}</p>
                <p>Name: {{data.customer_name}}</p>
                <p>Phone: {{data.phone}}</p>
                <p>Email: {{data.email}}</p>
                <p>Address: {{data.address}}</p> 
                <div class="sameRow">
                <p>Used Service(s) and Bought Product(s): </p>
                <sui-button style="width: 5%" @click.native="toggle" icon="angle down"></sui-button>
                </div>
                <sui-modal v-model="open">
                  <sui-modal-header>Used Service(s) and Bought Product(s)</sui-modal-header>
                  <sui-modal-content>
                    <md-table md-card>
                        <md-table-row
                        v-for="item in data"
                        v-bind:key="item.bill_id"
                        v-bind:bill_id="item.bill_id"
                        v-bind:date="item.date"
                        v-bind:branch="item.branch"
                        v-bind:used_services="item.used_services"
                        v-bind:bought_products="item.bought_products">
                          <md-table-cell md-label="Bill ID">{{data.bills[0].bill_id}}</md-table-cell>
                          <md-table-cell md-label="Date">{{data.bills[0].date}}</md-table-cell>
                          <md-table-cell md-label="Branch" >{{data.bills[0].branch}}</md-table-cell>
                          <md-table-cell md-label="Used Services" >{{data.bills[0].used_services.name}}</md-table-cell>
                          <md-table-cell md-label="Bought Product" >{{data.bills[0].bought_products.name}}</md-table-cell>
                          <md-table-cell md-label="remove" class="edit_button" >
                              <sui-button>
                                  <font-awesome-icon icon="edit" />
                                  </sui-button>
                              <sui-button>
                                  <font-awesome-icon icon="times-circle" />
                              </sui-button>
                          </md-table-cell>
                        </md-table-row>
                      </md-table>
                  </sui-modal-content>
                  <sui-modal-actions>
                  <sui-button positive @click.native="toggle">
                    OK
                  </sui-button>
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
import json from "./../../data/bills.json"

export default {
  name: "customers",
  components: {
    UserCard,
    AddUser
  },
  data(){
    return{
      myJson: json,
      open: false
    }
  },
  methods: {
    toggle(){
      this.open = !this.open
    }
  }
};
</script>

<style>
  .width{
    width: 100%
  }
  .sameRow{
    display: flex;
    flex-direction: row;
    align-items: center
  }
  .widthButton{
    width: 30%;
  }
</style>
