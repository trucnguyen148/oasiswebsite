<template>
    <div class="md-layout-item md-size-100">
        <ul 
            v-for="data in myJson1"
            v-bind:key="data.name"
            v-bind:picture="data.name"      
        >
            <div class="setting">
                <li style="margin: 0 2rem"><label>{{data.name}}</label></li>  
                <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle" /></sui-button>
            </div>
            <sui-modal v-model="open">
                <sui-modal-header class="form-header" >Add new price list</sui-modal-header>
                <sui-modal-content image>
                    <div class="md-layout">
                            <!-- Photo -->
                        <div class="md-layout-item md-size-100">
                            <md-field>
                                <label>Photo</label>
                                <md-file v-model="single" accept="image/*" required/>
                            </md-field>
                        </div>
                        <!-- Name -->
                        <div class="md-layout-item md-smal-size-100 md-size-50">
                            <md-field>
                            <label>Name</label>
                            <md-input 
                            v-model="name" 
                            type="text"
                            required></md-input>
                            </md-field>
                        </div>
                        <!-- Descriptions -->
                        <div class="md-layout-item md-size-100">
                            <md-field>
                                <label>Descriptions</label>
                                <md-textarea 
                                    v-model="autogrow" 
                                    md-autogrow 
                                    md-counter="250" 
                                    required></md-textarea>
                            </md-field>
                        </div>
                        <!-- Price -->
                        <div class="md-layout-item md-smal-size-100 md-size-50">
                            <md-field>
                            <label>Price</label>
                            <md-input 
                            v-model="discount" 
                            type="text"
                            required></md-input>
                            </md-field>
                        </div>
                        <!-- Categories -->
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Categories</label>
                                <sui-dropdown
                                    fluid
                                    placeholder="Select category"
                                    selection
                                    :options="categories"
                                    v-model="current"
                                    style="margin-top: 2.5rem"
                                />
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
            <div class="md-layout-item md-size-100">
                <md-field>
                    <md-table md-card>
                        <md-table-row
                            v-for="data in myJson"
                            v-bind:key="data.name"
                            v-bind:picture="data.name"
                            v-bind:name="data.name"
                            v-bind:description="data.description"
                            v-bind:price="data.price" 
                        >
                            <md-table-cell md-label="Picture">{{data.name}}</md-table-cell>
                            <md-table-cell md-label="Name">{{data.name}}</md-table-cell>
                            <md-table-cell md-label="Description" >{{data.description}}</md-table-cell>
                            <md-table-cell md-label="Price" >{{data.price}}</md-table-cell>
                            <md-table-cell md-label="remove" class="edit_button" >
                                <sui-button>
                                    <font-awesome-icon icon="edit" />
                                    </sui-button>
                                <sui-button>
                                    <font-awesome-icon icon="times-circle" />
                                </sui-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-field>
            </div>
        </ul>
    </div>
</template>
<script>
import json from "../../../data/products.json";
import json1 from "../../../data/productCategories.json";

export default {
    name: "detail",
    data(){
    return{
        open: false,
        myJson: json,
        myJson1: json1
    };
        
    },
    methods: {
        toggle() {
        this.open = !this.open;
        },
    }
}
</script>

