<template>
    <div class="content">
        <md-card>
        <sui-tab style="margin: 2rem"  :menu="{ secondary: true }">
            <sui-tab-pane title="Hot Deals" icon="hourglass half">
            <hot-deal></hot-deal>
            </sui-tab-pane>
            <sui-tab-pane title="Collections" icon="plus circle">
            <collection></collection>
            </sui-tab-pane>
            
        </sui-tab>
        </md-card>
    </div>
</template>

<script>
import { HotDeal, Collection } from "@/pages";

export default {
    components: {
        HotDeal,
        Collection
    }
};
</script>

<style>
    #add-branch{
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: baseline;

    }

    
    
</style>

