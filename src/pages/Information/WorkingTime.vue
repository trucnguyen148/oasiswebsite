<template>
    <md-card>
        <md-card-header data-background-color="black">
            <h3 class="title">Working time</h3>
        </md-card-header>
        <md-card-content>
            <div class="setting">
                <p style="margin: 0 2rem 0 3rem"> Add </p>  
                <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle" /></sui-button>
                <sui-modal v-model="open">
                    <sui-modal-header class="form-header" >Add new working time</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                            <!-- Working time -->
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                <label>Working Time</label>
                                <md-input 
                                v-model="workingTime" 
                                type="text"
                                required></md-input>
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
            <!-- Show after add working time -->
            <ul 
                v-for="data in myJson"
                v-bind:key="data.id"
                v-bind:time="data.time"
                v-bind:pictures="data.pictures"
            >
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <md-table md-card>
                            <md-table-row>
                                <md-table-cell md-label="Picture"><li style="margin: 0 2rem">{{data.time}}</li></md-table-cell>
                                <md-table-cell md-label="remove" class="edit_button" >
                                    <sui-button @click.native="toggleEdit">
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
            <!-- Show edit -->
            <sui-modal v-model="openEdit">
                    <sui-modal-header class="form-header" >Add new working time</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                            <!-- Working time -->
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                <label>Working Time</label>
                                <md-input 
                                v-model="workingTime" 
                                type="text"
                                required></md-input>
                                </md-field>
                            </div>
                            
                        </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button positive @click.native="toggle">Change</sui-button>
                    </sui-modal-actions>
                </sui-modal>
                
            
        </md-card-content>
    </md-card>
</template>
<script>
import json from "./../../data/workingtime.json"
export default {
    name: "working-time",
    data(){
        return{
            open: false,
            openEdit: false,
            myJson: json
        };
        
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        toggleEdit(){
            this.openEdit = !this.openEdit
        }
    },
}
</script>

