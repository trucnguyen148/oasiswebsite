<template>
    <md-card>
        <md-card-header style="background-color: black; color: white; text-align: center; font-size: 1.5rem">Hot deals</md-card-header>
        <md-card-content>
            <div class="setting">
                <p style="margin: 0 2rem 0 3rem"> Add </p>  
                <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle" /></sui-button>
                <sui-modal v-model="open">
                    <sui-modal-header class="form-header" >Add new hot deal</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                                <!-- Photo -->
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <label>Photo</label>
                                    <md-file v-model="single" accept="image/*" required/>
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
                            <!-- Discount -->
                            <div class="md-layout-item md-smal-size-100 md-size-50">
                                <md-field>
                                <label>Discount</label>
                                <md-input 
                                v-model="discount" 
                                type="text"
                                required></md-input>
                                </md-field>
                            </div>
                            <!-- Level -->
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Member level:</label>
                                    <sui-dropdown
                                        fluid
                                        placeholder="Select level of member"
                                        selection
                                        :options="level"
                                        v-model="current"
                                        style="margin-top: 2.5rem"
                                    />
                                </md-field>
                            </div>
                            <div class="md-layout-item md-size-100">
                                <label>Select start date and end date</label>
                            </div>
                            <!-- Start date -->
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <vue-ctk-date-time-picker
                                        id="RangeDatePicker"
                                        label="Select start date"
                                        color="pink"
                                        buttonColor="black"
                                        format= "DD-MM-YYYY"
                                        formatted= "ll"
                                        buttonNowTranslation="Today"
                                        onlyDate="true"
                                        right="true"
                                        noLabel="true"
                                        v-model="valueStart"
                                    ></vue-ctk-date-time-picker>
                                </md-field>
                            </div>
                            <!-- End date -->
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <vue-ctk-date-time-picker
                                        id="RangeDatePicker"
                                        label="Select end date"
                                        color="pink"
                                        buttonColor="black"
                                        format= "DD-MM-YYYY"
                                        formatted= "ll"
                                        buttonNowTranslation="Today"
                                        onlyDate="true"
                                        right="true"
                                        noLabel="true"
                                        v-model="valueEnd"
                                    ></vue-ctk-date-time-picker>
                                </md-field>
                            </div>
                        </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button         data-background-color="pink" positive @click.native="toggle"  class="ui button size middle">Add</sui-button>
                    </sui-modal-actions>
                </sui-modal>
            </div>

            <!-- Show after add HOT DEAL-->
            <div class="md-layout-item md-size-100">
                <md-table md-card> 
                    <md-table-row
                        v-for="data in myJson"
                        v-bind:key="data.name"
                        v-bind:picture="data.picture"
                        v-bind:description="data.description"
                        v-bind:discount="data.discount"
                        v-bind:level="data.level"
                    >
                        <md-table-cell md-label="Picture">{{data.picture}}</md-table-cell>
                        <md-table-cell md-label="Description" >{{data.description}}</md-table-cell>
                        <md-table-cell md-label="Discount" >{{data.discount}}</md-table-cell>
                        <md-table-cell md-label="Level" >{{data.level}}</md-table-cell>
                        <md-table-cell md-label="Start date" >{{data.startDate}}</md-table-cell>
                        <md-table-cell md-label="End date" >{{data.endDate}}</md-table-cell>
                        <md-table-cell md-label="remove" class="edit_button" >
                            <sui-button @click.native="edit">
                                <font-awesome-icon icon="edit" />
                            </sui-button>
                            <!-- Show after click edit button -->
                            <sui-modal v-model="openEdit">
                                <sui-modal-header class="form-header" >Change content of hot deal</sui-modal-header>
                                <sui-modal-content image>
                                    <div class="md-layout">
                                            <!-- Photo -->
                                        <div class="md-layout-item md-size-100">
                                            <md-field>
                                                <label>Photo</label>
                                                <md-file v-model="single" accept="image/*" required/>
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
                                        <!-- Discount -->
                                        <div class="md-layout-item md-smal-size-100 md-size-50">
                                            <md-field>
                                            <label>Discount</label>
                                            <md-input 
                                            v-model="discount" 
                                            type="text"
                                            required></md-input>
                                            </md-field>
                                        </div>
                                        <!-- Level -->
                                        <div class="md-layout-item md-small-size-100 md-size-50">
                                            <md-field>
                                                <label>Member level:</label>
                                                <sui-dropdown
                                                    fluid
                                                    placeholder="Select level of member"
                                                    selection
                                                    :options="level"
                                                    v-model="current"
                                                    style="margin-top: 2.5rem"
                                                />
                                            </md-field>
                                        </div>
                                        <div class="md-layout-item md-size-100">
                                            <label>Select start date and end date</label>
                                        </div>
                                        <!-- Start date -->
                                        <div class="md-layout-item md-small-size-100 md-size-50">
                                            <md-field>
                                                <vue-ctk-date-time-picker
                                                    id="RangeDatePicker"
                                                    label="Select start date"
                                                    color="pink"
                                                    buttonColor="black"
                                                    format= "DD-MM-YYYY"
                                                    formatted= "ll"
                                                    buttonNowTranslation="Today"
                                                    onlyDate="true"
                                                    right="true"
                                                    noLabel="true"
                                                    v-model="valueStart"
                                                ></vue-ctk-date-time-picker>
                                            </md-field>
                                        </div>
                                        <!-- End date -->
                                        <div class="md-layout-item md-small-size-100 md-size-50">
                                            <md-field>
                                                <vue-ctk-date-time-picker
                                                    id="RangeDatePicker"
                                                    label="Select end date"
                                                    color="pink"
                                                    buttonColor="black"
                                                    format= "DD-MM-YYYY"
                                                    formatted= "ll"
                                                    buttonNowTranslation="Today"
                                                    onlyDate="true"
                                                    right="true"
                                                    noLabel="true"
                                                    v-model="valueEnd"
                                                ></vue-ctk-date-time-picker>
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
            </div>
        </md-card-content>
    </md-card>
  
</template>

<script>
import json from './../../data/hotdeal.json';


export default {
    name: "hot-deal",
    data(){
        return{
            open: false,
            myJson: json,
            openEdit: false,
            valueStart: null,
            valueEnd: null
        };
        
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        edit(){
            this.openEdit = !this.openEdit;
        }
    }
}
</script>
<style>
</style>


