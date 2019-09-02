<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <template v-if="branch !== null"> 
        <md-table-row  v-for="employee in branch.employees"
                      v-bind:key="employee.id">
          <md-table-cell md-label="ID">{{ employee.id }}</md-table-cell>
          <md-table-cell md-label="Name">{{ employee.name }}</md-table-cell>
          <md-table-cell md-label="Email">{{ employee.email }}</md-table-cell>
          <md-table-cell md-label="Total Booking">{{ employee.bookings.length }}</md-table-cell>
        </md-table-row>
      </template>
    </md-table>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    selected_branch_id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      branch: []
    };
  },
  watch: {
    selected_branch_id: function(){
      this.$apollo.queries.branch.refetch()
    }
  },
  apollo: {
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
