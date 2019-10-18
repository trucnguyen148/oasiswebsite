<template>
  <div v-if="!$apolloData.queries.branches.loading" class="content">
    <div class="md-layout">
      <md-card>
        <md-card-header data-background-color="black">
          <h3 class="title">TOTAL REVENUE</h3>
        </md-card-header>
        <md-card-content>
          <!-- Revenue in all branches -->
          <div class="md-layout-item md-size-100">
            <!-- <sui-button @click="rerender" ref="myBtn">Click</sui-button> -->
            <chart-card
              :chart-data="{
                  labels: this.generate_month_list(),
                  series: [
                  this.get_sale_revenue()
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
          <div style="display: flex; flex-direction: row">
            <!-- Revenue of services -->
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
              <chart-card
                :chart-data="{
                    labels: this.generate_month_list(),
                    series: [
                    this.get_service_revenue(),
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
                :options="branch_list()"
                v-model="selected_branch_id"
                style="margin-top: 2.5rem"
              />
            </md-field>
          </div>

          <div v-if="show_branch" class="md-layout-item md-size-100">
            <chart-card
              :chart-data="{
                labels: this.generate_month_list(),
                series: [
                 this.get_branch_revenue,
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
  <div v-else class="content">
    <div class="md-layout"><h2>is loading...</h2></div>
  </div>
</template>

<script>
import { StatsCard, ChartCard, OrderedTable } from "@/components";
import gql from "graphql-tag";
import { $user } from "../components/user_info";

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
      selected_branch_id: "3",
      show_branch: true
    };
  },
  mounted() {
    console.log($user)
  },
  watch: {
    selected_branch_id: function() {
      this.show_branch = false;
      setTimeout(this.change_state, 700);
    }
  },
  computed: {
    branch() {
      return this.$apolloData.data.branches.filter(branch => {
        return branch.id == this.selected_branch_id;
      })[0];
    },
    get_branch_revenue() {
      let data_array = [];

      if (!this.is_Null_or_Undefined(this.branch)) {
        for (let i = 1; i <= CURRENT_MONTH; i++) {
          var revenue = this.get_revenue_each_month(
            this.get_bookings_each_month(
              i,
              this.get_bookings_from_branch(this.branch)
            )
          );
          if (this.is_Null_or_Undefined(revenue)) data_array.push(0);
          else data_array.push(revenue);
        }
      }
      return data_array;
    }
  },
  methods: {
    get_sale_revenue() {
      let data_array = [];

      for (let i = 1; i <= CURRENT_MONTH; i++) {
        var revenue = this.get_revenue_each_month(
          this.get_bookings_each_month(i, this.$apolloData.data.bookings)
        );
        if (this.is_Null_or_Undefined(revenue)) data_array.push(0);
        else data_array.push(revenue);
      }
      return data_array;
    },
    get_service_revenue() {
      let data_array = [];

      for (let i = 1; i <= CURRENT_MONTH; i++) {
        var revenue = this.get_revenue_each_month(
          this.get_bookings_each_month(i, this.$apolloData.data.bookings),
          2
        );
        if (this.is_Null_or_Undefined(revenue)) data_array.push(0);
        else data_array.push(revenue);
      }

      return data_array;
    },
    get_category_revenue(id) {
      let products = this.get_products_from_bookings(
        this.$apolloData.data.bookings
      );

      return products
        .filter(product => {
          return product.category.id == id;
        })
        .reduce((total, product) => total + product.unit_price, 0);
    },
    get_product_revenue(type) {
      let bookings = this.get_bookings_from_branch(this.branch);
      let products = this.get_products_from_bookings(bookings);

      return products
        .filter(product => {
          return product.type == type;
        })
        .reduce((total, product) => total + product.unit_price, 0);
    },
    get_revenue_each_month(bookings_each_month, type) {
      let products = this.get_products_from_bookings(bookings_each_month);

      if (type === undefined) {
        return products.reduce(
          (total, product) => total + product.unit_price,
          0
        );
      } else {
        return products
          .filter(product => {
            return product.type == type;
          })
          .reduce((total, product) => total + product.unit_price, 0);
      }
    },
    get_bookings_from_branch(branch) {
      let bookings = [];

      if (
        !this.is_Null_or_Undefined(branch) &&
        !this.is_Null_or_Undefined(branch.employees)
      ) {
        branch.employees.forEach(employee => {
          if (!this.is_Null_or_Undefined(employee.bookings)) {
            return employee.bookings.forEach(booking => {
              bookings.push(booking);
            });
          }
        });
      }

      return bookings;
    },
    get_bookings_each_month(month, bookings) {
      if (!this.is_Null_or_Undefined(bookings)) {
        return bookings.filter(booking => {
          return new Date(booking.date_time).getMonth() + 1 == month;
        });
      } else return [];
    },
    get_products_from_bookings(bookings) {
      let products = [];
      if (!this.is_Null_or_Undefined(bookings)) {
        bookings.forEach(booking => {
          booking.products.forEach(product => {
            products.push(product);
          });
        });
      }
      return products;
    },
    generate_month_list() {
      let current_month_array = [];

      for (let i = 1; i <= CURRENT_MONTH; i++) {
        current_month_array.push(MONTH_ARRAY[i - 1]);
      }

      return current_month_array;
    },
    branch_list() {
      if (!this.is_Null_or_Undefined(this.$apolloData.data.branches)) {
        return this.$apolloData.data.branches.map(branch => {
          return {
            value: branch.id,
            text: branch.name
          };
        });
      }
    },
    is_Null_or_Undefined(array) {
      return array === null || array === undefined ? true : false;
    },
    change_state() {
      this.show_branch = true;
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
    `
  }
};
</script>
