<template>
    <md-card>
        <md-card-header data-background-color="black">
            <h3 class="title">Branch</h3>
        </md-card-header>
        <md-card-content>
            <div class="setting">
                <p style="margin: 0 2rem 0 3rem"> Add </p>  
                <sui-button @click.native="toggle"><font-awesome-icon icon="plus-circle"/></sui-button>
                <sui-modal v-model="open">
                    <sui-modal-header class="form-header" >Add branch</sui-modal-header>
                    <sui-modal-content image>
                        <div class="md-layout">
                            <!-- Name -->
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                <label>Name</label>
                                <md-input v-model="addBranchParams.name" type="text" required></md-input>
                                </md-field>
                            </div>
                            
                            <!-- Address -->
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                <label>Adress</label>
                                <md-input v-model="addBranchParams.address" type="text"></md-input>
                                </md-field>
                            </div>

                            <!-- Phone number -->
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                <label>Phone Number</label>
                                <md-input v-model="addBranchParams.phone" type="number" required></md-input>
                                </md-field>
                            </div>
                        </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button data-background-color="purple" positive @click.native="addBranch" >
                        Create
                        </sui-button>
                    </sui-modal-actions>
                </sui-modal>
            </div>
            <!-- Show after add -->
            <div class="md-layout-item md-size-100 md-size-50">
                <md-field>
                    <md-table md-card>
                    <md-table-row
                    v-for="branch in branches"
                    v-bind:key="branch.id"
                    v-bind:name="branch.name"
                    v-bind:address="branch.address"
                    >
                        <md-table-cell md-label="Picture"></md-table-cell>
                        <md-table-cell md-label="Branch">{{ branch.name}}</md-table-cell>
                        <md-table-cell md-label="Address">{{ branch.address }}</md-table-cell>
                        <md-table-cell md-label="Phone">{{ branch.phone }}</md-table-cell>
                        <md-table-cell md-label="remove" class="edit_button">
                        <sui-button>
                            <font-awesome-icon icon="edit" />
                        </sui-button>
                        <sui-button @click.native="deleteBranch(branch.id)">
                            <font-awesome-icon icon="times-circle" />
                        </sui-button> 
                    </md-table-cell>
                    </md-table-row>
                    </md-table>
                </md-field>
            </div>
        </md-card-content>
    </md-card>
</template>

<script>
import gql from 'graphql-tag'

const ADD_BRANCH = gql`
    mutation(
        $name: String!,
        $phone: String!,
        $address: String,
    ){
        createBranch(input: {
            name: $name,
            phone: $phone,
            address: $address,
        }) {
            id 
            name
            phone
            address
        }
    }
`

const DELETE_BRANCH = gql`
    mutation(
        $id: ID!
    ){
        deleteBranch(id: $id) {
            id 
            name
            phone
            address
        }
    }
`

export default {
    name: "branch",
    data() {
        return { 
            addBranchParams: {
                name: "",
                address: "",
                phone: "",
            },
            open: false,
            branches: []
        };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    addBranch() {
        const name = this.addBranchParams.name
        const address = this.addBranchParams.address
        const phone = this.addBranchParams.phone
        // We clear it early to give the UI a snappy feel
        this.addBranchParams = {
            name: "",
            address: "",
            phone: "",
        } 
        // Call to the graphql mutation
        this.$apollo.mutate({
            mutation: ADD_BRANCH,
            variables: {
                name: name,
                address: address,
                phone: phone
            }
        }).then((data) => {
            console.log(data)
            this.open = !this.open
        }).catch((error) => {
            console.log(error)
        })
        
    },
    deleteBranch(id) {
        // Call to the graphql mutation
        this.$apollo.mutate({
            mutation: DELETE_BRANCH,
            variables: {
                id: id
            }
        }).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error)
        })
        
    },

  },
    apollo: {
        branches: gql`{
            branches {
                id 
                name 
                address
                is_active
            }
        }`,
    },
};
</script>

<style>


</style>

