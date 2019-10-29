<template>
  <div v-if="!content_permission"></div>
  <div v-else>
    <div class="content">
      <md-card>
        <sui-tab style="margin: 2rem" :menu="{ secondary: true }">
          <sui-tab-pane title="Hot Deals" icon="hourglass half">
            <hot-deal></hot-deal>
          </sui-tab-pane>
          <sui-tab-pane title="Collections" icon="plus circle">
            <collection></collection>
          </sui-tab-pane>
        </sui-tab>
      </md-card>
    </div>
  </div>
</template>

<script>
import { HotDeal, Collection } from "@/pages";
import { $user } from "../components/user_info";

export default {
  components: {
    HotDeal,
    Collection
  },
  mounted() {
    if (!$user.permissions.includes(3)) {
      this.$router.push("/bills");
    }
  },
  computed: {
    content_permission() {
      return $user.permissions.includes(3);
    },
  }
};
</script>

<style>
#add-branch {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
}
</style>

