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
              :chart-data="dailySalesChart.data"
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
                :chart-data="revenueOfServiceChart.data"
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
                  <h3 class="title">€ 6000</h3>
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
                  <p class="category">Eyelasher extension</p>
                  <h3 class="title">€ 6000</h3>
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
                  <p class="category">Permanent makeup</p>
                  <h3 class="title">€ 6000</h3>
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
                :options="list_branch_name_and_id_for_dropdown()"
                v-model="branch_selected_from_dropdown_id"
                style="margin-top: 2.5rem"
              />
            </md-field>
          </div>

          <!--Revenue in each branch-->
          <div class="md-layout-item md-size-100">
            <chart-card
              :chart-data="revenueBranchChart.data"
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
                  <h3 class="title">€ {{ calculate_revenue_service() }} </h3>
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
                  <h3 class="title">€ {{ calculate_revenue_product() }} </h3>
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
                  <h3 class="title">€ {{ calculate_revenue_course() }}</h3>
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
                <ordered-table table-header-color="orange"></ordered-table>
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
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [[800, 717, 127, 317, 253, 138, 438, 319, 251, 440, 221, 354]]
        },
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
        data: {
          labels: ["June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],

          series: [[230, 750, 450, 300, 280, 240, 200]]
        },

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

      revenueOfProductChart: {
        data: {
          labels: ["June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],

          series: [[111, 231, 450, 300, 280, 240, 50]]
        },

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
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            this.test_val
          ]
        },
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
      branch_selected_from_dropdown_id: [],
      test_val: []
    };
  },
  watch: {
    branch_selected_from_dropdown: function (){
      generate_props_for_branch_chart(this.branch_selected_from_dropdown_id);
    }
  },
  methods: {
    list_branch_name_and_id_for_dropdown(){
      var branch_list_for_dropdown = [];
      this.branches.forEach(branch => {
        branch_list_for_dropdown.push({
          value: branch.id,
          text: branch.name
        })
      });
      return branch_list_for_dropdown;
    },
    generate_props_for_branch_chart(branch_id){
      if(branch_id === undefined) {
        this.test_val = [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      else{
        this.test_val = [443, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895];
      }
    },
    calculate_revenue_service(){
      var revenue_product = 0;
      this.bookings.forEach(booking => {
        booking.products.forEach(product => {
          if(product.type == 2){
            revenue_product += product.unit_price;
          }
        });
      });
      return revenue_product;
    },
    calculate_revenue_product(){
      var revenue_product = 0;
      this.bookings.forEach(booking => {
        booking.products.forEach(product => {
          if(product.type == 1){
            revenue_product += product.unit_price;
          }
        });
      });
      return revenue_product;
    },
    calculate_revenue_course(){
      var revenue_product = 0;
      this.bookings.forEach(booking => {
        booking.products.forEach(product => {
          if(product.type == 3){
            revenue_product += product.unit_price;
          }
        });
      });
      return revenue_product;
    }
  },
  apollo: {
    bookings: gql`{
        bookings {
          id 
          products {
            id 
            name
            type
            unit_price
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
