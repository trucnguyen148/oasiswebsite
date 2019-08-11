<template>
    <div id="add-user">
        <p style="margin-right: 2rem">ADD</p>     
        <sui-button @click.native="toggle" class=" ui primaly button"><font-awesome-icon icon="plus-circle" /></sui-button>
        <sui-modal v-model="open">
        <sui-modal-header class="form-header" >Add new customer</sui-modal-header>
        <sui-modal-content image>
            <div class="md-layout">
                <!-- Name -->
            <div class="md-layout-item md-size-100">
                <md-field>
                <label>Name</label>
                <md-input v-model="name" type="text" required></md-input>
                </md-field>
            </div>
            <!-- Email -->
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                <label>Email Address</label>
                <md-input v-model="emailadress" type="email"></md-input>
                </md-field>
            </div>
            <!-- Phone number -->
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                <label>Phone Number</label>
                <md-input v-model="phonename" type="number" required></md-input>
                </md-field>
            </div>
            <!-- Address -->
            <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                <label>Adress</label>
                <md-input v-model="address" type="text"></md-input>
                </md-field>
            </div>
            <!-- City -->
            <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                <label>City</label>
                <md-input v-model="city" type="text"></md-input>
                </md-field>
            </div>
            <!-- Country -->
            <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                <label>Country</label>
                <md-input v-model="country" type="text"></md-input>
                </md-field>
            </div>
            <!-- Postal code -->
            <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                <label>Postal Code</label>
                <md-input v-model="code" type="number"></md-input>
                </md-field>
            </div>
            <!-- Staff -->
            <div class="md-layout-item md-size-100">
                <md-field>
                <label>Staff:</label>
                <sui-dropdown
                    fluid
                    multiple
                    placeholder="Select staff"
                    selection
                    :options="staff"
                    v-model="current"
                    style="margin-top: 2.5rem"
                />
                </md-field>
            </div>
            <!-- Used services -->
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                <label>Used services:</label>
                <sui-dropdown
                    fluid
                    multiple
                    placeholder="Select service"
                    selection
                    :options="service"
                    v-model="current"
                    style="margin-top: 2.5rem"
                />
                </md-field>
            </div>
            <!-- Bought products -->
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                <label>Bought Products:</label>
                <sui-dropdown
                    fluid
                    multiple
                    placeholder="Select service"
                    selection
                    :options="service"
                    v-model="current"
                    style="margin-top: 2.5rem"
                />
                </md-field>
            </div>
            <!-- Photos -->
            <div class="md-layout-item md-size-100">
                <md-field>
                    <label>Photos</label>
                    <md-file v-model="photos" accept="image/*" required />
                </md-field>
            </div>
            </div>
        </sui-modal-content>
        <sui-modal-actions>
            <sui-button positive @click.native="toggle" >
            GO TO WAITING BILL
            </sui-button>
        </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script>
export default {
    name: "add-user",
    data() {
    return { open: false };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style>
    #add-user{
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: baseline;

    }
    
</style>

