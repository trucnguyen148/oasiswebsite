<template>
  <div class="content">
    <div class="md-layout">
      <md-card>
        <md-card-header data-background-color="black">
          <h3 class="title">Waiting Bills</h3>
        </md-card-header>
        <md-card-content>
          <!-- Showing part -->
          <div class="md-layout-item md-size-100" 
            v-for="data in myJson"
            v-bind:key="data.customer_name"
            v-bind:customer_name="data.customer_name"
            v-bind:phone="data.phone"
            v-bind:used_services="data.bills"> 
            <md-field>
              <md-table md-card>
                <md-table-row>
                  <md-table-cell md-label="Customer name">{{data.customer_name}}</md-table-cell>
                  <md-table-cell md-label="Phone">{{data.phone}}</md-table-cell>
                  <md-table-cell md-label="Used Services">{{data.bills[0].used_services[0].name}}</md-table-cell>
                  <md-table-cell md-label="Bought Products">{{data.bills[0].bought_products[0].name}}</md-table-cell>     
                  <md-table-cell md-label="remove" class="edit_button" >
                    <sui-button @click.native="toggle">
                      <font-awesome-icon icon="edit" />
                    </sui-button>
                    <sui-button>
                      <font-awesome-icon icon="times-circle" />
                    </sui-button> 
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-field>
            <!-- Modal to open details of waiting bills -->
            <sui-modal v-model="open">
              <sui-modal-header>PROCESS TO PAYMENT</sui-modal-header>
              <sui-modal-content image>
                <sui-modal-description>
                  <sui-header>{{data.bills[0].bill_id}} | {{data.customer_name}} - {{data.phone}}</sui-header>
                  <sui-modal-content>
                      <div class="md-layout-item md-size-100">
                        <md-field>
                          <label>Services:</label>
                          <sui-dropdown
                              fluid
                              multiple
                              placeholder="Select service"
                              selection
                              :options="product"
                              v-model="current"
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
                            placeholder="Select product"
                            selection
                            :options="product"
                            v-model="current"
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
                            <md-table-row>
                              <md-table-cell md-label="Name of service" >{{data.bills[0].used_services[0].name}}</md-table-cell>
                              <md-table-cell md-label="Price" md-sort-by="price">{{data.bills[0].used_services[0].price}}</md-table-cell>
                            </md-table-row>
                          </md-table>
                        </md-field>
                      </div>
                      <!-- Show Products -->
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <md-table v-model="users" md-card>
                            <md-table-toolbar>
                              <h3>Products</h3>
                            </md-table-toolbar>
                            <md-table-row slot="md-table-row">
                              <md-table-cell md-label="Name of service" md-sort-by="service">{{ data.bills[0].bought_products[0].name }}</md-table-cell>
                              <md-table-cell md-label="Quantities" md-numeric><md-input v-model="quantity" type="number" required></md-input></md-table-cell>
                              <md-table-cell md-label="Price" md-sort-by="price">{{ data.bills[0].bought_products[0].price }}</md-table-cell>
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
                          <md-input v-model="cash" type="number" ></md-input>
                        </md-field>
                      </div>
                      <!-- % -->
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <label>%</label>
                          <md-input v-model="percentage" type="text"></md-input>
                        </md-field>
                      </div>
                    </div>
                    
                    
                  </sui-modal-content>

                </sui-modal-description>
              </sui-modal-content>
              <sui-modal-actions>
                <sui-button positive @click.native="toggle" >
                  Pay
                </sui-button>
              </sui-modal-actions>
            </sui-modal>
          </div>
          
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import json from "./../../data/bills.json"
export default {
    name: "waiting-bills",
    data(){
      return{
        open: false,
        myJson : json
      };
    },
    methods: {
        toggle() {
        this.open = !this.open;
        },
    },
   
};
</script>


