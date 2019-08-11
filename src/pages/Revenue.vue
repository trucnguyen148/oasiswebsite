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
                  updated 4 minutes ago
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
              <label>Branch</label>
              <sui-dropdown
                fluid
                multiple
                placeholder="Select branch"
                selection
                :options="branch"
                v-model="current"
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
              <template slot="content">
                <h4>Revenue in ....</h4>
                <p class="category">
                  <span class="text-success"
                    ><i class="fas fa-long-arrow-alt-down"></i> 25%
                  </span>
                  increase in today sales.
                </p>
              </template>

              <template slot="footer">
                <div class="stats">
                  <md-icon>access_time</md-icon>
                  updated 10 days ago
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
              class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
            >
              <stats-card data-background-color="red">
                <template slot="header">
                  <md-icon>shopping_basket</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Products</p>
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
          <div
            class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
          >
            <md-card>
              <md-card-header data-background-color="orange">
                <h4 class="title">Employees Stats</h4>
                <p class="category">New employees on 15th September, 2016</p>
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
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
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
      }
    };
  }
};
</script>
