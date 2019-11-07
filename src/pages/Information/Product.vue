<template>
        <!-- PRICE LIST -->
        <div v-if="!$apolloData.queries.positions.loading" id="pricelist">
            <md-card>
                <md-card-header data-background-color="black">
                    <h3 class="title">Products</h3>
                </md-card-header>
                <md-card-content>
                    <div class="setting">
                        <p style="margin: 0 2rem 0 3rem">Add</p>  
                        <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle" /></sui-button>
                        <sui-modal v-model="open">
                            <sui-modal-header class="form-header" >Add service</sui-modal-header>
                            <sui-modal-content >
                                <!-- Name -->
                                <div class="md-layout-item md-size-100">
                                    <md-field>
                                    <label>Name</label>
                                    <md-input 
                                    v-model="addCategoryPrams.name" 
                                    type="text"
                                    required></md-input>
                                    </md-field>
                                </div>
                            </sui-modal-content>
                            <sui-modal-actions>
                                <sui-button data-background-color="pink" positive @click.native="addCategory()"  class="ui button size middle">Add
                                </sui-button>
                            </sui-modal-actions>
                        </sui-modal>
                    </div>

                    <!-- Show after add PRICE LIST-->
                    <ul 
                        v-for="category in $apolloData.data.positions"
                        v-bind:key="category.id"
                        
                    >
                        <div class="setting">
                            <li style="margin: 0 2rem"><label>{{category.name}}</label></li>  
                            <sui-button @click.native="toggleService(category.id)"><font-awesome-icon icon="plus-circle" /></sui-button>
                        </div>
                        <sui-modal v-model="openService">
                            <sui-modal-header class="form-header" >Add new price list</sui-modal-header>
                            <sui-modal-content image>
                                <div class="md-layout">
                                    <!-- Name -->
                                    <div class="md-layout-item md-smal-size-100 md-size-50">
                                        <md-field>
                                        <label>Name</label>
                                        <md-input 
                                        v-model="addServicePrams.name" 
                                        type="text"
                                        required></md-input>
                                        </md-field>
                                    </div>
                                    <!-- Descriptions -->
                                    <div class="md-layout-item md-size-100">
                                        <md-field>
                                            <label>Descriptions</label>
                                            <md-textarea 
                                                v-model="addServicePrams.description" 
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
                                        v-model="addServicePrams.unit_price" 
                                        type="number"
                                        required></md-input>
                                        </md-field>
                                    </div>
                                </div>
                            </sui-modal-content>
                            <sui-modal-actions>
                                <sui-button data-background-color="pink" positive @click.native="addService()"  class="ui button size middle">Add</sui-button>
                            </sui-modal-actions>
                        </sui-modal>
                        <div class="md-layout-item md-size-100">
                        <md-field>
                            <md-table md-card>
                                <md-table-row
                                    v-for="product in category.products"
                                    v-bind:key="product.id"
                                >
                                    <md-table-cell md-label="Picture"></md-table-cell>
                                    <md-table-cell md-label="Name">{{product.name}}</md-table-cell>
                                    <md-table-cell md-label="Description" >{{product.description}}</md-table-cell>
                                    <md-table-cell md-label="Price" >EUR {{product.unit_price}}</md-table-cell>
                                    <md-table-cell md-label="remove" class="edit_button" >
                                        <sui-button @click.native="toggleEdit(product)">
                                            <font-awesome-icon icon="edit" />
                                        </sui-button>
                                        <sui-button @click.native="deleteService(product.id)">
                                            <font-awesome-icon icon="times-circle" />
                                        </sui-button>
                                    </md-table-cell>
                                </md-table-row>
                            </md-table>
                        </md-field>
                    </div>
                    </ul>
                    <!-- Show modal after click edit button -->
                    <sui-modal v-model="openEdit">
                        <sui-modal-header class="form-header" >Edit price list</sui-modal-header>
                        <sui-modal-content image>
                            <div class="md-layout">
                                <!-- Name -->
                                <div class="md-layout-item md-smal-size-100 md-size-50">
                                    <md-field>
                                    <label>Name</label>
                                    <md-input 
                                    v-model="updateServicePrams.name" 
                                    type="text"
                                    required></md-input>
                                    </md-field>
                                </div>
                                <!-- Descriptions -->
                                <div class="md-layout-item md-size-100">
                                    <md-field>
                                        <label>Descriptions</label>
                                        <md-textarea 
                                            v-model="updateServicePrams.description" 
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
                                    v-model="updateServicePrams.unit_price" 
                                    type="text"
                                    required></md-input>
                                    </md-field>
                                </div>
                            </div>
                        </sui-modal-content>
                        <sui-modal-actions>
                            <sui-button positive @click.native="updateService()" >
                            Update
                            </sui-button>
                        </sui-modal-actions>
                    </sui-modal>
                </md-card-content>
            </md-card>
        </div>
        <div v-else>
            <div class="md-photo-loading">
                <img src="@/../public/logo.png"/>
            </div>
        </div>
</template>


<script>
import gql from "graphql-tag";

const ADD_CATEGORY = gql`
    mutation(
        $type: Int!,
        $name: String!,
    ){
        createCategory(input: {
            type: $type,
            name: $name,
        }) {
            id 
            name
        }
    }
`
const ADD_SERVICE = gql`
    mutation(
        $name: String!,
        $description: String,
        $category_id: Int!,
        $type: Int!,
        $unit_price: Int,
    ){
        createProduct(input: {
            name: $name,
            description: $description,
            category_id: $category_id,
            type: $type,
            unit_price: $unit_price
        }) {
            id 
            name
        }
    }
`
const DELETE_SERVICE = gql`
    mutation(
        $id: ID!
    ){
        deleteProduct(id: $id) {
            id 
            name
        }
    }
`
const UPDATE_SERVICE = gql`
    mutation(
        $id: ID!
        $name: String!,
        $description: String!,
        $unit_price: Int!,
    ){
        updateProduct(
            id: $id,
            input: {
                name: $name,
                description: $description,
                unit_price: $unit_price,
            }) {
                id
            }
    }
`

export default {
    name: "product",
    data(){
        return{
            open: false,
            openService: false,
            openEdit: false,
            
            addCategoryPrams: {
                name: "",
            },
            addServicePrams: {
                name: "",
                description: "",
                category_id: "",
                unit_price: ""
            },
            updateServicePrams: {
                id: "",
                name: "",
                description: "",
                unit_price: "",
            }
        }
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        toggleEdit(product){
            this.updateServicePrams.id = product.id
            this.updateServicePrams.name = product.name
            this.updateServicePrams.description = product.description
            this.updateServicePrams.unit_price = product.unit_price

            this.openEdit = !this.openEdit;
        },
        toggleService(category_id){
            this.addServicePrams.category_id = category_id
            this.openService = !this.openService
        },
        addCategory() {
            const name = this.addCategoryPrams.name
            // We clear it early to give the UI a snappy feel
            this.addCategoryPrams = {
                name: "",
            } 
            // Call to the graphql mutation
            this.$apollo.mutate({
                mutation: ADD_CATEGORY,
                variables: {
                    name: name,
                    type: 1,
                }
            }).then((data) => {
                console.log(data)
                this.open = !this.open
                this.$apollo.queries.positions.refetch()
            }).catch((error) => {
                console.log(error)
            })
        },
        addService() {
            const name = this.addServicePrams.name
            const description = this.addServicePrams.description
            const category_id = this.addServicePrams.category_id
            const unit_price = this.addServicePrams.unit_price
            // We clear it early to give the UI a snappy feel
            this.addServicePrams = {
                name: "",
                description: "",
                unit_price: "",
            } 
            // Call to the graphql mutation
            this.$apollo.mutate({
                mutation: ADD_SERVICE,
                variables: {
                    name: name,
                    description: description,
                    category_id,
                    unit_price,
                    type: 1
                }
            }).then((data) => {
                console.log(data)
                this.openService = !this.openService
                this.$apollo.queries.positions.refetch()
            }).catch((error) => {
                console.log(error)
            })
            
        },
        deleteService(id) {
            // Call to the graphql mutation
            this.$apollo.mutate({
                mutation: DELETE_SERVICE,
                variables: {
                    id: id
                }
            }).then((data) => {
                console.log(data)
                this.$apollo.queries.positions.refetch()
            }).catch((error) => {
                console.log(error)
            })
        },
        updateService() {
            const id = this.updateServicePrams.id
            const name = this.updateServicePrams.name
            const description = this.updateServicePrams.description
            const unit_price = this.updateServicePrams.unit_price
            // We clear it early to give the UI a snappy feel
            this.updateServicePrams = {
                id: "",
                name: "",
                description: "",
                unit_price: "",
            } 
            // Call to the graphql mutation
            this.$apollo.mutate({
                mutation: UPDATE_SERVICE,
                variables: {
                    id: id,
                    name: name,
                    description: description,
                    unit_price: unit_price,
                }
            }).then((data) => {
                console.log(data)
                this.openEdit = !this.openEdit
                this.$apollo.queries.positions.refetch()
            }).catch((error) => {
                console.log(error)
            })
            
        },
    },
    apollo: {
        positions: {
            query: gql`query($type: Int!){
                positions(type: $type){
                    id 
                    name
                    products {
                        id 
                        name
                        description
                        unit_price
                    }
                }
            }`,
            variables: {
                type: 1,
            },
        },
    }
}
</script>

