<template>
    <div id="search-bill">
        <md-card class="md-card-profile">
          <md-card-header data-background-color="black">
            <h3 class="title">Search Bills</h3>
          </md-card-header>
          <md-card-content>     
              <div class="md-layout">
                  <div class="md-layout-item">
                      <md-field>
                      <label>Search bill number:</label>
                      <sui-dropdown
                          fluid
                          :options="bill_id"
                          placeholder="Select bill"
                          search
                          selection
                          v-model="current"
                          style="margin-top: 2.5rem"
                          />
                      </md-field>
                  </div>

                  <!-- Show bill details -->
                  <div class="md-layout-item md-size-100">
                  <md-field>
                      <md-table 
                        md-card 
                        >
                        <ul
                        v-for="data in myJson"
                        v-bind:key="data.bill_id"
                        v-bind:bill_id="data.bill_id"
                        v-bind:date="data.date"
                        v-bind:branch="data.branch"
                        v-bind:used_services="data.used_services"
                        v-bind:bought_products="data.bought_products"
                        >
                          <li>
                            <md-table-toolbar>
                              <h3>{{data.bill_id}}</h3>
                          </md-table-toolbar>
                          </li>
                          <md-table-row slot="md-table-row">
                              <md-table-cell md-label="Date" md-sort-by="service">Date: {{ data.date }}</md-table-cell>
                              <md-table-cell md-label="Branch" md-sort-by="service">Branch: {{ data.branch }}</md-table-cell>
                              <md-table-cell md-label="Staff" md-sort-by="service">Staff: {{ data.staff }}</md-table-cell>
                          </md-table-row>
                          <!-- Show services -->
                          <div class="md-layout-item md-size-100">
                            <md-field>
                                <md-table md-card>
                                    <md-table-toolbar>
                                        <h3>Services</h3>
                                    </md-table-toolbar>

                                    <md-table-row slot="md-table-row">
                                        <md-table-cell md-label="Name of service">{{data.used_services[0].name}}</md-table-cell>
                                        <md-table-cell md-label="Price">{{ data.used_services[0].price }}</md-table-cell>
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
                                      >
                                        <md-table-cell md-label="Name of service">{{data.bought_products[0].name}}</md-table-cell>
                                        <md-table-cell md-label="Price">{{ data.bought_products[0].price }}</md-table-cell>
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
</template>

<script>
import json from "./../../data/bill_details.json";
export default {
    name: "search-bill",
    data(){
      return{
        myJson: json
      }
    }
};
</script>

