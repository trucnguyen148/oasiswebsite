<template>
  <div class="content">
    <md-card>
      <sui-tab style="margin: 2rem"  :menu="{ secondary: true }">
        <sui-tab-pane title="Waiting Bills" icon="hourglass half">
          <waiting-bills></waiting-bills>
        </sui-tab-pane>
        <sui-tab-pane title="Create Bills" icon="plus circle">
          <create-bill></create-bill>
        </sui-tab-pane>
        <sui-tab-pane title="Bookings" icon="search">
          <search-bill></search-bill>
        </sui-tab-pane>
      </sui-tab>
    </md-card>
  </div>
</template>

<script>
import { WaitingBills, CreateBill, SearchBill } from "@/pages";
export default {
    components: {
        WaitingBills,
        CreateBill,
        SearchBill
    }
};
</script>


