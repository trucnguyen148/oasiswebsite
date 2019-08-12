<template>
        <!-- PRICE LIST -->
        <div id="pricelist">
            <md-card>
                <md-card-header data-background-color="black">
                    <h3 class="title">Services</h3>
                </md-card-header>
                <md-card-content>
                    <div class="setting">
                        <p style="margin: 0 2rem 0 3rem"> Add </p>  
                        <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle" /></sui-button>
                        <sui-modal v-model="open">
                            <sui-modal-header class="form-header" >Add new service</sui-modal-header>
                            <sui-modal-content image>
                                <div class="md-layout">
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
                                </div>
                            </sui-modal-content>
                            <sui-modal-actions>
                                <sui-button data-background-color="pink" positive @click.native="toggle"  class="ui button size middle">Add
                                </sui-button>
                            </sui-modal-actions>
                        </sui-modal>
                    </div>

                    <!-- Show after add PRICE LIST-->
                    <ul 
                        v-for="data in myJsonCategories"
                        v-bind:key="data.name"
                        v-bind:picture="data.name"
                        
                    >
                        <div class="setting">
                            <li style="margin: 0 2rem"><label>{{data.name}}</label></li>  
                            <sui-button @click.native="toggleService"><font-awesome-icon icon="plus-circle" /></sui-button>
                        </div>
                        <sui-modal v-model="openService">
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
                                                placeholder="Select service"
                                                selection
                                                :options="options"
                                                v-model="current"
                                                style="margin-top: 2.5rem"
                                            />
                                        </md-field>
                                    </div>
                                </div>
                            </sui-modal-content>
                            <sui-modal-actions>
                                <sui-button data-background-color="pink" positive @click.native="toggle"  class="ui button size middle">Add</sui-button>
                            </sui-modal-actions>
                        </sui-modal>
                        <div class="md-layout-item md-size-100">
                        <md-field>
                            <md-table md-card>
                                <md-table-row
                                    v-for="data in myJsonNails"
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
                </md-card-content>
            </md-card>
        </div>
</template>

<script>
import json1 from './../../data/pricelistNails.json';
import json2 from './../../data/categories.json'


export default {
    name: "service",
    data(){
        return{
            open: false,
            openService: false,
            myJsonNails: json1,
            myJsonCategories: json2
        };
        
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        toggleService(){
            this.openService = !this.openService
        }
    }
}
</script>
<style></style>


