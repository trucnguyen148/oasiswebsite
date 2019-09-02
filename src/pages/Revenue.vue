<template>
  <div class="content">
    <keep-alive>
      <sui-modal v-model="open">
        <sui-modal-header>Select a Photo</sui-modal-header>
        <sui-modal-content image>
          <sui-image wrapped size="medium" src="static/images/avatar/large/rachel.png" />
          <sui-modal-description>
            <sui-header>Default Profile Image</sui-header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </sui-modal-description>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click="rerender">
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </keep-alive>
    <div class="md-layout">
      <md-card>
        <md-card-header data-background-color="black">
          <h3 class="title">TOTAL REVENUE</h3>
        </md-card-header>
        <md-card-content>
          <!-- Revenue in all branches -->
          <div v-if="show" class="md-layout-item md-size-100">
              <!-- <sui-button @click="rerender" ref="myBtn">Click</sui-button> -->
              <chart-card
                :chart-data="{
                  labels: this.generate_month_list(),
                  series: [
                  this.get_sale_or_service_revenue('SALE')
                  ]
                }"
                :chart-options="dailySalesChart.options"
                :chart-type="'Line'"
                data-background-color="pink"
              />
              <template slot="content">
                <h4>Total revenue</h4>
              </template>

              <template slot="footer">
                <div class="stats">
                  <md-icon>access_time</md-icon>
                  updated just now
                </div>
              </template>

          </div>
          <div v-if="show" style="display: flex; flex-direction: row">
            <!-- Revenue of services -->
            <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
            >
              <chart-card
                :chart-data="{
                    labels: this.generate_month_list(),
                    series: [
                    this.get_sale_or_service_revenue('SALE'),
                    ]
                  }"
                :chart-options="revenueOfServiceChart.options"
                :chart-type="'Line'"
                data-background-color="orange"
              >
                <template slot="content">
                  <h4>Revenue of service</h4>
                  <p class="category">
                    <span class="text-success"
                      ><i class="fas fa-long-arrow-alt-up"></i> 55%
                    </span>
                    increase in today sales.
                  </p>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>access_time</md-icon>
                    updated 26 minutes ago
                  </div>
                </template>
              </chart-card>
            </div>
            <!-- Revenue of Nails -->
            <div
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-22"
            >
              <stats-card data-background-color="orange">
                <template slot="header">
                  <md-icon>store</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Nails</p>
                  <h3 class="title">€ {{ get_category_revenue(9) }} </h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>
                    Just Updated
                  </div>
                </template>
              </stats-card>
            </div>
            <!-- Revenue of products -->
            <div
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-22"
            >
              <stats-card data-background-color="red">
                <template slot="header">
                  <md-icon>shopping_basket</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Tattoo</p>
                  <h3 class="title">€ {{ get_category_revenue(10) }} </h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>
                    Just Updated
                  </div>
                </template>
              </stats-card>
            </div>

            <!-- Revenue of tattoo -->
            <div
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-22"
            >
              <stats-card data-background-color="blue">
                <template slot="header">
                  <md-icon>event_note</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Makeup</p>
                  <h3 class="title">€ {{ get_category_revenue(11) }}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>
                    Just Updated
                  </div>
                </template>
              </stats-card>
            </div>
          </div>
        </md-card-content>
      </md-card>


      <!-- Revenue in each branch -->
      <md-card>
        <md-card-header data-background-color="black">
          <h3 class="title">REVENUE BASED ON BRANCH</h3>
        </md-card-header>
        <md-card-content>
          <!-- Search branch -->
          <div class="md-layout-item md-size-100 ">
            <md-field>
              <label>Select Branch</label>
              <sui-dropdown
                fluid
                selection
                :options="list_branches()"
                v-model="selected_branch_id"
                style="margin-top: 2.5rem"
              />
            </md-field>
          </div>

          <!--Revenue in each branch-->
          <div class="md-layout-item md-size-100">
            <chart-card
              :chart-data="{
                labels: this.generate_month_list(),
                series: [
                 this.get_branch_revenue()
                ]
              }"
              :chart-options="revenueBranchChart.options"
              :chart-responsive-options="revenueBranchChart.responsiveOptions"
              :chart-type="'Line'"
              data-background-color="red"
            >

              <template slot="footer">
                <div class="stats">
                  <md-icon>access_time</md-icon>
                  updated just now
                </div>
              </template>
            </chart-card>
          </div>

          <div style="display: flex; flex-direction: row">
            <!-- Revenue of services -->
            <div
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
            >
              <stats-card data-background-color="orange">
                <template slot="header">
                  <md-icon>store</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Services</p>
                  <h3 class="title">€ {{ get_product_revenue(2) }} </h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>
                    Just Updated
                  </div>
                </template>
              </stats-card>
            </div>
            <!-- Revenue of products -->
            <div
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
            >
              <stats-card data-background-color="red">
                <template slot="header">
                  <md-icon>shopping_basket</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Products</p>
                  <h3 class="title">€ {{ get_product_revenue(1) }} </h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>
                    Just Updated
                  </div>
                </template>
              </stats-card>
            </div>

            <!-- Revenue of courses -->
            <div
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
            >
              <stats-card data-background-color="blue">
                <template slot="header">
                  <md-icon>event_note</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Course</p>
                  <h3 class="title">€ {{ get_product_revenue(3) }}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>
                    Just Updated
                  </div>
                </template>
              </stats-card>
            </div>
          </div>
          <div
            class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
          >
            <md-card>
              <md-card-header data-background-color="orange">
                <h4 class="title">Employees Stats</h4>
                <p class="category"></p>
              </md-card-header>
              <md-card-content>
                <ordered-table table-header-color="orange" :selected_branch_id="selected_branch_id"></ordered-table>
              </md-card-content>
            </md-card>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard, OrderedTable } from "@/components";
import gql from 'graphql-tag';

export default {
  components: {
    StatsCard,
    ChartCard,
    OrderedTable
  },
  data() {
    return {
      show: true,
      open: true,
      dailySalesChart: {
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },

      revenueOfServiceChart: {
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },

      revenueBranchChart: {
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },

      bookings: [],
      branches: [],
      selected_branch_id: "0",
      branch: [],
    };
  },
  watch: {
    selected_branch_id: function (){
      this.$apollo.queries.branch.refetch()
    },
    show: function(){
      this.open = false
    }
  },
  computed: {
  },
  mounted(){
    
  },
  methods: {
    rerender(){
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
      

  },        
    generate_month_list(){
      let data_array = [];
      let current_month = (new Date()).getMonth()+1;
      
      for(let i = current_month; i > 0; i--){
        if(i == 1) {
          data_array.push("Jan");
        }
        else if(i == 2) {
          data_array.push("Feb");
        }
        else if(i == 3) {
          data_array.push("Mar")
        }
        else if(i == 4) {
          data_array.push("Apr");
        }
        else if(i == 5) {
          data_array.push("May");
        }
        else if(i == 6) {
          data_array.push("June")
        }
        else if(i == 7) {
          data_array.push("July");
        }
        else if(i == 8) {
          data_array.push("Aug")
        }
        else if(i == 9) {
          data_array.push("Sep");
        }
        else if(i == 10) {
          data_array.push("Oct");
        }
        else if(i == 11) {
          data_array.push("Nov")
        }
        else if(i == 12) {
          data_array.push("Dec");
        }
        else{
          data_array.push("");
        }
      }
      
      return data_array.reverse();
    },
    list_branches(){
      let branch_list = [];
      this.branches.forEach(branch => {
        branch_list.push({
          value: branch.id,
          text: branch.name
        })
      });
      return branch_list;
    },
    get_sale_or_service_revenue(SALE_or_SERVICE){
      let data_array = [];
      let current_month = (new Date()).getMonth()+1;
      
      function get_bookings_each_month(month, bookings){
        let bookings_each_month = [];

        bookings_each_month = bookings.filter(booking => {
          return new Date(booking.date_time).getMonth()+1 == month
        });

        return bookings_each_month
      }

      function get_revenue_each_month(bookings_each_month){
          let revenue_each_month = 0;

          bookings_each_month.forEach(booking => {
            (booking.products).forEach(product => {
              if(SALE_or_SERVICE == "SERVICE"){
                if(product.type == 2){
                  revenue_each_month += product.unit_price;
                }
              }else if(SALE_or_SERVICE == "SALE"){
                revenue_each_month += product.unit_price;
              }
            });
          });

          return revenue_each_month
      }

      for(let i = current_month; i > 0; i--){
        data_array.push(get_revenue_each_month(get_bookings_each_month(i, this.bookings)) );
      }

      return data_array.reverse();
      
    },

    get_category_revenue(id){
      let revenue = 0;

      (this.bookings).forEach(booking => {
        let filtered_products = (booking.products).filter(filtered_product => {
          return (filtered_product.category.id) == id
        });
        filtered_products.forEach(product => {
          revenue += product.unit_price
        });
      });
    
      return revenue;
    },

    get_product_revenue(type){
      let revenue = 0;
      
      if(this.branch !== null && this.branch !== undefined){
        if(this.branch.employees !== null && this.branch.employees !== undefined){
          (this.branch.employees).forEach(employee => {
            if(employee.bookings !== null && employee.bookings !== undefined){
              (employee.bookings).forEach(booking => {
                let filtered_products = (booking.products).filter(filtered_product => {
                  return (filtered_product.type) == type
                });
                filtered_products.forEach(product => {
                  revenue += product.unit_price
                });
              });
            }
          });
        }
      }

      return revenue;
    },
    get_branch_revenue(){
      let data_array = [];
      let current_month = (new Date()).getMonth()+1;
      
      function get_bookings_from_branch(branch){
        let bookings = [];

        if(branch.employees !== null && branch.employees !== undefined){
          (branch.employees).forEach(employee => {
            if(employee.bookings !== null && employee.bookings !== undefined){
              (employee.bookings).forEach(booking => {
                bookings.push(booking);
              });
            }
          });
        }
        return bookings;
      }

      function get_bookings_each_month(month, bookings){
        let bookings_each_month = [];

        bookings_each_month = bookings.filter(booking => {
          return new Date(booking.date_time).getMonth()+1 == month
        });

        return bookings_each_month
      }

      function get_revenue_each_month(bookings_each_month){
          let revenue_each_month = 0;
          
          bookings_each_month.forEach(booking => {
            (booking.products).forEach(product => {
              revenue_each_month += product.unit_price;
            });
          });

          return revenue_each_month
      }

      if(this.branch !== null && this.branch !== undefined){
        for(let i = current_month; i > 0; i--){
          data_array.push(get_revenue_each_month(get_bookings_each_month(i, get_bookings_from_branch(this.branch))));
        }
        return data_array.reverse();
      }else{
       return []
      }
    }
  },
  apollo: {
    bookings: gql`{
        bookings {
          id 
          date_time
          products {
            id 
            name
            type
            unit_price
            category {
              id 
              name
            }
          }
        }
    }`,
    branches: gql`{
        branches {
          id
          name
          employees {
            name
            bookings {
              products {
                unit_price
              }
            }
          }
        }
    }`,
    branch: {
        query: gql`query($id: ID!){
          branch(id: $id){
            id 
            name
            employees {
              id
              name
              email
              bookings {
                id
                date_time
                products {
                  id 
                  type
                  unit_price
                }
              }
            }
          }
        }`,
        variables() {
          return {
            id: this.selected_branch_id,
          }
        },
      },
  },
};
</script>
