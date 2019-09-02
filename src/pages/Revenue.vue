<template>
  <div class="content">
    <div class="md-layout">
      <md-card>
        <md-card-header data-background-color="black">
          <h3 class="title">TOTAL REVENUE</h3>
        </md-card-header>
        <md-card-content>
          <!-- Revenue in all branches -->
          <div class="md-layout-item md-size-100">
            <chart-card
              :chart-data="{
                labels: this.generate_month_list(),
                series: [
                 this.get_sale_or_service_revenue('SALE'),
                ]
              }"
              :chart-options="dailySalesChart.options"
              :chart-type="'Line'"
              data-background-color="pink"
            >
              <template slot="content">
                <h4>Total revenue</h4>
              </template>

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
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
            >
              <chart-card
                :chart-data="{
                    labels: this.generate_month_list(),
                    series: [
                    this.get_sale_or_service_revenue('SERVICE'),
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
                  [443, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
                ]
              }"
              :chart-options="revenueBranchChart.options"
              :chart-responsive-options="revenueBranchChart.responsiveOptions"
              :chart-type="'Bar'"
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
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },

      bookings: [],
      branches: [],
      selected_branch_id: "1",
    };
  },
  watch: {
    selected_branch_id: function (){
      // let data_array = [];
      // let current_month = (new Date()).getMonth()+1;

      // let branch = (this.branches).filter(filtered_branch => {
      //     return filtered_branch.id == this.selected_branch_id
      // });

      // (branch.employees).forEach(employee => {
      //   for(let i = current_month; i > 0; i--){
      //     let bookings_each_month = employee.bookings.filter(booking => {
      //       return new Date(booking.date_time).getMonth()+1 == i
      //     });

      //     let revenue_each_month = 0;

      //     bookings_each_month.forEach(booking => {
      //       (booking.products).forEach(product => {
      //         revenue_each_month += product.unit_price;
      //       });
      //     });
      //     data_array.push(revenue_each_month);
      //   }
      // });
      
      // return data_array.reverse();
    }
  },
  methods: {
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

      for(let i = current_month; i > 0; i--){
        let bookings_each_month = this.bookings.filter(booking => {
          return new Date(booking.date_time).getMonth()+1 == i
        });

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

        data_array.push(revenue_each_month);
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

      (this.bookings).forEach(booking => {
        let filtered_products = (booking.products).filter(filtered_product => {
          return (filtered_product.type) == type
        });
        filtered_products.forEach(product => {
          revenue += product.unit_price
        });
      });
      return revenue;
    },
    
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
  },
};
</script>
