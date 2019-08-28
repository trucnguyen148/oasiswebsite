<template>
        <!-- PRICE LIST -->
    <md-card>
        <md-card-header style="background-color: black; color: white; text-align: center; font-size: 1.5rem">Collections</md-card-header>
        <md-card-content>
            <div class="setting">
                <p style="margin: 0 2rem 0 3rem"> Add </p>  
                <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle" /></sui-button>
                <sui-modal v-model="open">
                    <sui-modal-header class="form-header" >Add new collection</sui-modal-header>
                    <sui-modal-content>
                            <!-- Name -->
                            <div class="md-layout-item md-size-100">
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
                            <!-- Photo -->
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <label>Photo</label>
                                    <md-file v-model="multiple" multiple accept="image/*" required/>
                                </md-field>
                            </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                       <sui-button         data-background-color="pink" positive @click.native="toggle"  class="ui button size middle">Add</sui-button>
                    </sui-modal-actions>
                </sui-modal>
            </div>

            <!-- Show after add PRICE LIST-->
            <ul 
                v-for="data in myJson"
                v-bind:key="data.name"
                v-bind:description="data.description"
                v-bind:pictures="data.pictures"
                
            >
                <li style="margin: 0 2rem"><label>{{data.name}}</label></li>               
                <div class="md-layout-item md-size-100">
                <md-field>
                    <md-table md-card>
                        <md-table-row>
                            <md-table-cell md-label="Description" >{{data.description}}</md-table-cell>
                            <md-table-cell md-label="Pictures" >
                                {{data.pictures[0]}} 
                                {{data.pictures[1]}}
                                {{data.pictures[2]}}
                                {{data.pictures[3]}}
                                {{data.pictures[4]}}
                                {{data.pictures[5]}}
                            </md-table-cell>
                            <md-table-cell md-label="remove" class="edit_button" >
                                <sui-button @click.native="edit">
                                    <font-awesome-icon icon="edit" />
                                </sui-button>
                                <!-- Show after click edit button -->
                                <sui-modal v-model="openEdit">
                                    <sui-modal-header class="form-header" >Change content of collection</sui-modal-header>
                                    <sui-modal-content image>
                                        <div class="md-layout">
                                            <!-- Name -->
                                            <div class="md-layout-item md-size-100">
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
                                            <!-- Photo -->
                                            <div class="md-layout-item md-size-100">
                                                <md-field>
                                                    <label>Photo</label>
                                                    <md-file v-model="multiple" multiple accept="image/*" required/>
                                                </md-field>
                                            </div>
                                        </div>
                                    </sui-modal-content>
                                    <sui-modal-actions>
                                        <sui-button positive @click.native="edit" >
                                        Change
                                        </sui-button>
                                    </sui-modal-actions>
                                </sui-modal>
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


</template>

<script>
import json from './../../data/collections.json';


export default {
    name: "collection",
    data(){
        return{
            open: false,
            myJson: json,
            openEdit: false,
        };
        
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        edit(){
            this.openEdit = !this.openEdit
        }
    },
}
</script>
<style></style>


