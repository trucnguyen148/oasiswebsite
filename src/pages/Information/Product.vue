<template>
    <md-card>
        <md-card-header data-background-color="black">
            <h3 class="title">Product</h3>
        </md-card-header>
        <md-card-content>
            <!-- Add categories for products -->
            <div class="setting">
                <p style="margin: 0 2rem 0 3rem"> Add </p>  
                <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle"/></sui-button>
                <sui-modal v-model="open">
                    <sui-modal-header class="form-header" >Add new categories</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                                <!-- Name -->
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <label>Name</label>
                                    <md-input 
                                        v-model="name" 
                                        type="text"
                                        required>
                                    </md-input>
                                </md-field>
                            </div>
                        </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button positive @click.native="toggle" >
                        Add
                        </sui-button>
                    </sui-modal-actions>
                </sui-modal>
            </div>

            <!-- Show after add PRODUCTS-->
            <detail></detail>
            
        </md-card-content>
        
    </md-card>

</template>
<script>

import {Detail} from "@/pages";

export default {
    components: {
        Detail
    },
    name: "product",
    data(){
        return{
            open: false,
        };
    },
    methods: {
        toggle() {
        this.open = !this.open;
        },
    }
}
</script>

