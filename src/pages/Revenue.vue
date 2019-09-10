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
          <sui-button positive @click="rerender">OK</sui-button>
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
                <md-icon>access_time</md-icon>updated just now
              </div>
            </template>
          </div>
          <div v-if="show" style="display: flex; flex-direction: row">
            <!-- Revenue of services -->
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
              <chart-card
                :chart-data="{
                    labels: this.generate_month_list(),
                    series: [
                    this.get_sale_or_service_revenue('SERVICE'),
                    ]
                  }"
                :chart-options="dailySalesChart.options"
                :chart-type="'Line'"
                data-background-color="orange"
              >
                <template slot="content">
                  <h4>Revenue of service</h4>
                  <p class="category">
                    <span class="text-success">
                      <i class="fas fa-long-arrow-alt-up"></i> 55%
                    </span>
                    increase in today sales.
                  </p>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>access_time</md-icon>updated 26 minutes ago
                  </div>
                </template>
              </chart-card>
            </div>
            <!-- Revenue of Nails -->
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-22">
              <stats-card data-background-color="orange">
                <template slot="header">
                  <md-icon>store</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Nails</p>
                  <h3 class="title">€ {{ get_category_revenue(9) }}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>Just Updated
                  </div>
                </template>
              </stats-card>
            </div>
            <!-- Revenue of products -->
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-22">
              <stats-card data-background-color="red">
                <template slot="header">
                  <md-icon>shopping_basket</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Tattoo</p>
                  <h3 class="title">€ {{ get_category_revenue(10) }}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>Just Updated
                  </div>
                </template>
              </stats-card>
            </div>

            <!-- Revenue of tattoo -->
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-22">
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
                    <md-icon>update</md-icon>Just Updated
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
          <div class="md-layout-item md-size-100">
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
          <div v-if="show_branch" class="md-layout-item md-size-100">
            <chart-card
              :chart-data="{
                labels: this.generate_month_list(),
                series: [
                 this.get_branch_revenue(),
                ]
              }"
              :chart-options="dailySalesChart.options"
              :chart-type="'Line'"
              data-background-color="red"
            >
              <template slot="footer">
                <div class="stats">
                  <md-icon>access_time</md-icon>updated just now
                </div>
              </template>
            </chart-card>
          </div>

          <div style="display: flex; flex-direction: row">
            <!-- Revenue of services -->
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
              <stats-card data-background-color="orange">
                <template slot="header">
                  <md-icon>store</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Services</p>
                  <h3 class="title">€ {{ get_product_revenue(2) }}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>Just Updated
                  </div>
                </template>
              </stats-card>
            </div>
            <!-- Revenue of products -->
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
              <stats-card data-background-color="red">
                <template slot="header">
                  <md-icon>shopping_basket</md-icon>
                </template>

                <template slot="content">
                  <p class="category">Products</p>
                  <h3 class="title">€ {{ get_product_revenue(1) }}</h3>
                </template>

                <template slot="footer">
                  <div class="stats">
                    <md-icon>update</md-icon>Just Updated
                  </div>
                </template>
              </stats-card>
            </div>

            <!-- Revenue of courses -->
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
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
                    <md-icon>update</md-icon>Just Updated
                  </div>
                </template>
              </stats-card>
            </div>
          </div>
          <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
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
import gql from "graphql-tag";

const CURRENT_MONTH = new Date().getMonth() + 1;
const MONTH_ARRAY = [
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
];

export default {
  components: {
    StatsCard,
    ChartCard,
    OrderedTable
  },
  data() {
    return {
      show: true,
      show_branch: true,
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

      bookings: [],
      branches: [],
      selected_branch_id: "3",
      branch: [],
      test: ""
    };
  },
  watch: {
    selected_branch_id: function() {
      this.$apollo.queries.branch.refetch();
      this.show_branch = false;
      setTimeout(this.change_state, 700);
    },
    show: function() {
      this.open = false;
    }
  },
  methods: {
    change_state() {
      this.show_branch = true;
    },
    rerender() {
      this.show = false;
      this.show_branch = false;
      this.$nextTick(() => {
        this.show = true;
        this.show_branch = true;
      });
    },
    generate_month_list() {
      let current_month_array = [];

      for (let i = 1; i <= CURRENT_MONTH; i++) {
        current_month_array.push(MONTH_ARRAY[i - 1]);
      }

      return current_month_array;
    },
    list_branches() {
      return this.branches.map(branch => {
        return {
          value: branch.id,
          text: branch.name
        };
      });
    },
    get_sale_or_service_revenue(SALE_or_SERVICE) {
      let data_array = [];

      for (let i = CURRENT_MONTH; i > 0; i--) {
        if (SALE_or_SERVICE == "SALE") {
            var revenue = this.get_revenue_each_month(
              this.get_bookings_each_month(i, this.bookings)
            )[0]
            if (revenue === undefined) data_array.push(0)
            else data_array.push(revenue);
        } else {
          var revenue = this.get_revenue_each_month(
              this.get_bookings_each_month(i, this.bookings),
              2
            )[0]
            if (revenue === undefined) data_array.push(0);
            else data_array.push(revenue);
        }
      }

      return data_array.reverse();
    },
    get_category_revenue(id) {
      const revenue = this.bookings.map(booking => {
        return booking.products
          .filter(filtered_product => {
            return filtered_product.category.id == id;
          })
          .reduce((total, product) => total + product.unit_price, 0);
      });

      return revenue[0] === undefined ? 0 : revenue[0];
    },
    get_product_revenue(type, bookings) {
      if (bookings === undefined) {
        bookings = this.get_bookings_from_branch(this.branch);
      }

      const revenue = bookings.map(booking => {
        return booking.products
          .filter(filtered_product => {
            return filtered_product.type == type;
          })
          .reduce((total, product) => total + product.unit_price, 0);
      });

      return revenue[0] === undefined ? 0 : revenue[0];
    },
    get_branch_revenue() {
      let data_array = [];

      if (this.is_not_null_or_undefined(this.branch)) {
        for (let i = CURRENT_MONTH; i > 0; i--) {
          var revenue = this.get_revenue_each_month(
              this.get_bookings_each_month(
                i,
                this.get_bookings_from_branch(this.branch)
              )
            )[0]
          if (revenue === undefined) data_array.push(0);
          else data_array.push(revenue);
        }
        return data_array.reverse();
      } else {
        return [];
      }
    },
    get_bookings_from_branch(branch) {
      let bookings = [];

      if (
        this.is_not_null_or_undefined(branch) &&
        this.is_not_null_or_undefined(branch.employees)
      ) {
        branch.employees.map(employee => {
          if (this.is_not_null_or_undefined(employee.bookings)) {
            return employee.bookings.map(booking => {
              bookings.push(booking);
            });
          }
        });
      }

      return bookings;
    },
    get_bookings_each_month(month, bookings) {
      return bookings.filter(booking => {
        return new Date(booking.date_time).getMonth() + 1 == month;
      });
    },
    get_revenue_each_month(bookings_each_month, type) {
      if (type === undefined) {
        return bookings_each_month.map(booking => {
          return booking.products
            .map(product => {
              return product.unit_price;
            })
            .reduce((a, b) => a + b, 0);
        });
      } else {
        return bookings_each_month
          .map(booking => {
            return booking.products
              .filter(filtered_product => {
                return filtered_product.type == type;
              })
              .map(product => {
                return product.unit_price;
              });
          })
          .reduce((a, b) => a + b, 0);
      }
    },
    is_not_null_or_undefined(array) {
      return (array !== null && array !== undefined) ? true : false
    }
  },
  apollo: {
    bookings: gql`
      {
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
      }
    `,
    branches: gql`
      {
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
      }
    `,
    branch: {
      query: gql`
        query($id: ID!) {
          branch(id: $id) {
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
        }
      `,
      variables() {
        return {
          id: this.selected_branch_id
        };
      }
    }
  }
};
</script>
