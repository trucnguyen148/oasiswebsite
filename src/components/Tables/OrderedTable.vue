<template>
  <div>
    <md-table v-model="employees" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Branch">{{ item.branch.name }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Total Booking">{{ item.bookings.length }}</md-table-cell>
      </md-table-row>
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
    }
  },
  data() {
    return {
      employees: [],
    };
  },
  apollo: {
      employees: gql`{
          employees {
            id
            name
            email
            branch {
              id 
              name
            }
            bookings {
              id
            }
          }
      }`
  },
};
</script>
