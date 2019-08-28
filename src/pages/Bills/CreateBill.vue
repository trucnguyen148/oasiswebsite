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
                    <md-input v-model="customerid" type="number"></md-input>
                    </md-field>
                </div>
                    <!-- Name -->
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                    <label>Name</label>
                    <md-input v-model="name" type="text" required></md-input>
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
                        multiple
                        placeholder="Select staff"
                        selection
                        :options="staff"
                        v-model="current"
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
                        :options="product"
                        v-model="current"
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
                            placeholder="Select product"
                            selection
                            :options="product"
                            v-model="current"
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

                            <md-table-row slot="md-table-row" slot-scope="{ item }">
                                <md-table-cell md-label="Name of service" >{{ item.service }}</md-table-cell>
                                <md-table-cell md-label="Price" md-sort-by="price">{{ item.price }}</md-table-cell>
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

                            <md-table-row slot="md-table-row" slot-scope="{ item }">
                                <md-table-cell md-label="Name of service" md-sort-by="service">{{ item.service }}</md-table-cell>
                                <md-table-cell md-label="Quantities" ><md-input id="quantity" v-model="quantity" type="number" required></md-input></md-table-cell>
                                <md-table-cell md-label="Price" md-sort-by="price">{{ item.price }}</md-table-cell>
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
                <!-- Button -->
                <div class="ui button biggersize middle samerow">
                    <sui-button         data-background-color="pink" positive @click.native="toggle"  >Go to Staff</sui-button>
                    <sui-button         data-background-color="pink" positive @click.native="toggle"  >Go to Payment</sui-button>
                </div>
                
            </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
export default {
    name: "create-bill",
    data: () => ({
      users: [
        {
          service: 'Shawna Dubbin',
          price: '20e',
        },
        {
          service: 'Shawna Dubbin',
          price: '20e',
        },
        {
          service: 'Shawna Dubbin',
          price: '20e',
        },
        {
          service: 'Shawna Dubbin',
          price: '20e',
        },
        {
          service: 'Shawna Dubbin',
          price: '20e',
        },
      ]
    })
  
  
};
</script>

<style> 
    #quantity{
        text-align: center;
    }
</style>

