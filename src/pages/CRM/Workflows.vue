<template>
    <div class="content">
        <div class="md-layout">
<<<<<<< Updated upstream
            <div class="md-layout-item md-small-size-100" style="display: flex; flex-direction: row; align-items: baseline">
                <h3>Workflows:</h3>
                <md-field class="md-layout-item md-small-size-100 md-size-30">
                    <md-input />
                </md-field>
                <sui-button class="md-layout-item md-small-size-100 md-size-5"><font-awesome-icon icon="plus-circle"/></sui-button>
=======
            <div class="md-layout-item md-size-100" style="display: flex; flex-direction: row; align-items: baseline">
                <h3 style="margin-right: 1.5rem">Workflows:</h3>
                <sui-dropdown
                    fluid
                    :options="workflow_name"
                    placeholder="Select workflow"
                    search
                    selection
                    v-model="current"
                    style="margin-top: 2.5rem; width: 30%; margin-right: 1.5rem"
                    />
                <sui-button @click.native="toggle" style="width: 5%"><font-awesome-icon icon="plus-circle"/></sui-button>
                <!-- Add more workflow name -->
                <sui-modal v-model="open">
                    <sui-modal-header>Add New Workflow</sui-modal-header>
                    <sui-modal-content>
                        <div class="md-layout"> 
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <label>Name</label>
                                    <md-input 
                                    v-model="name" 
                                    type="text"
                                    required></md-input>
                                </md-field>
                            </div>
                        </div>
                    </sui-modal-content>
                </sui-modal>
>>>>>>> Stashed changes
            </div>
        </div>
        <p>Manage your sales, leads and contacts at a glance.</p>
        <!-- Workflow cards -->
        <sui-card-group :items-per-row="4">
            <sui-card style="padding: 2rem 1rem" v-for="data in myJson"
            v-bind:key="data.title"
            v-bind:title="data.title"
            v-bind:numberCard="data.numberCard"
            v-bind:numberAutomation="data.numberAutomation"
            v-bind:workflows="data.workflows"
            v-bind:name="data.workflows.name"
            v-bind:email="data.email">
                <div class="setting">
                    <div>
                        <h4>{{data.title}}</h4>
                        <p>{{data.numberCard}} Cards | {{data.numberAutomation}} Automation</p>
                    </div>
                    <div >
                        <sui-dropdown
                            button
                            icon="ellipsis horizontal"
                            floating
                        >
                            <sui-dropdown-menu>
                                <sui-button >
                                    <sui-dropdown-item>
                                        Rename Step
                                    </sui-dropdown-item>
                                </sui-button>
                                <sui-button>
                                    <sui-dropdown-item>
                                        Add Card
                                    </sui-dropdown-item>
                                </sui-button>
                                <sui-button>
                                    <sui-dropdown-item>
                                        Create Automation
                                    </sui-dropdown-item>
                                </sui-button>
                                <sui-button>
                                    <sui-dropdown-item>
                                        Send Email Compaign
                                    </sui-dropdown-item>
                                </sui-button>
                                <sui-dropdown-divider/>
                                <sui-button>
                                    <sui-dropdown-item>
                                        Delete Step
                                    </sui-dropdown-item>
                                </sui-button>
                            </sui-dropdown-menu>
                        </sui-dropdown>
                    </div>
                </div>
                <div class="space md-layout-item md-size-100">
                    <sui-card style="border: 2px solid pink; margin-left: auto; margin-right: auto">
                        <sui-button icon="plus" v-on:click="toggleAddWorkFlow">Add</sui-button>
                    </sui-card>
                    <sui-card style="margin-left: auto; margin-right: auto">
                        <sui-button 
                            @click.prevent="toggleDetails"
                            style="display: flex; flex-direction: row; padding: 1.5rem">
                            <div style="margin-right: 1rem">
                                <sui-image size="mini" :src="email" />
                            </div>
                            <div>
                                <h4>
                                    {{data.workflows[0].name}}
                                </h4>
                                <sui-card-meta>Via Contact</sui-card-meta>
                            </div>
                            <div style="float: right">
                                <sui-dropdown
                                    button
                                    icon="ellipsis horizontal"
                                    floating
                                >
                                    <sui-dropdown-menu>
                                        <sui-button>
                                            <sui-dropdown-item>
                                                Rename Card
                                            </sui-dropdown-item>
                                        </sui-button>
                                        <sui-button>
                                            <sui-dropdown-item>
                                                View Contact
                                            </sui-dropdown-item>
                                        </sui-button>
                                        <sui-dropdown-divider/>
                                        <sui-button>
                                            <sui-dropdown-item>
                                                Add Task
                                            </sui-dropdown-item>
                                        </sui-button>
                                        <sui-button>
                                            <sui-dropdown-item>
                                            Send Message
                                            </sui-dropdown-item>
                                        </sui-button>
                                        <sui-button>
                                            <sui-dropdown-item>
                                                Send Price Quote
                                            </sui-dropdown-item>
                                        </sui-button>
                                        <sui-button>
                                            <sui-dropdown-item>
                                                Send Invoice
                                            </sui-dropdown-item>
                                        </sui-button>
                                        <sui-button>
                                            <sui-dropdown-item>
                                                Move to next card
                                            </sui-dropdown-item>
                                        </sui-button>
                                        <sui-dropdown-divider/>
                                        <sui-button>
                                            <sui-dropdown-item>
                                                Archive Card
                                            </sui-dropdown-item>
                                        </sui-button>
                                    </sui-dropdown-menu>
                                </sui-dropdown>
                            </div>
                        </sui-button>
                    </sui-card>
                </div>
                <!-- Open Add work flow -->
                <sui-modal v-model="openWorkFlow">
                    <sui-modal-header>Add Workflows</sui-modal-header>
                    <sui-modal-content>
                        <sui-grid :columns="2">
                            <sui-grid-row>
                                <sui-grid-column :width="3">
                                    <label>Card Title (Optional)</label>
                                </sui-grid-column>
                                <sui-grid-column :width="6">
                                    <sui-input placeholder="e.g., Send Invoice" />
                                </sui-grid-column>
                            </sui-grid-row>
                            <sui-grid-row>
                                <sui-grid-column :width="3">
                                    <label>Link to contact *</label>
                                </sui-grid-column>
                                <sui-grid-column :width="6">
                                    <sui-dropdown
                                        fluid
                                        multiple
                                        :options="contacts"
                                        placeholder="Search Contacts"
                                        search
                                        selection
                                        v-model="current"
                                        required
                                    />
                                </sui-grid-column>
                            </sui-grid-row>
                        </sui-grid>
                    </sui-modal-content>
                    <sui-modal-actions>
                       <sui-button         data-background-color="pink" positive @click.native="toggleAddWorkFlow"  class="ui button size middle">Add</sui-button>
                    </sui-modal-actions>
                </sui-modal>
                <!-- Open details: information, tasks and reminds and chatbox -->
                <sui-modal v-model="openDetails">
                    <sui-modal-header style="display: flex; flex-direction: row; padding: 1.5rem">
                        <div style="margin-right: 1rem">
                            <sui-image size="mini" :src="email" />
                        </div>
                        <div>
                            <h3>
                                {{data.workflows[0].name}}
                            </h3>
                        </div>
                    </sui-modal-header>
                    <sui-tab style="margin: 2rem"  :menu="{ secondary: true }">
                        <!-- Information -->
                        <sui-tab-pane title="Information" icon="users">
                            <div>
                                <sui-header>
                                    Contact Info
                                </sui-header>
                                <sui-content>
                                    <label>Email</label>
                                    <p>{{data.email}}</p>
                                </sui-content>
                            </div>
                            <sui-divider/>
                            <div>
                                <sui-header>
                                    Member Info
                                </sui-header>
                                <sui-content >
                                    <label>Status</label>
                                    <sui-dropdown
                                        fluid
                                        selection
                                        :options="status"
                                        v-model="current"
                                        style="margin-top: 2.5rem"
                                        class="md-layout-item md-small-size-100 md-size-50"
                                    />
                                </sui-content>
                            </div>
                            <sui-divider/>
                            <div>
                                <sui-header>
                                    Labels
                                </sui-header>
                                <sui-content>
                                    <sui-dropdown
                                    fluid
                                    multiple
                                    selection
                                    :options="labels"
                                    v-model="current"
                                    style="margin-top: 2.5rem"
                                    />
                                </sui-content>
                            </div>
                            <sui-divider/>
                            <div>
                                <sui-header>Attachment</sui-header>
                                <sui-content>
                                    <div class="md-layout-item md-size-100">
                                        <md-field>
                                            <md-file v-model="single" accept="image/*" required/>
                                        </md-field>
                                    </div>
                                </sui-content>
                                <sui-modal-actions>
                                    <sui-button         data-background-color="pink" positive @click.native="toggleDetails"  class="ui button size middle">Add</sui-button>
                                </sui-modal-actions>
                            </div>
                        </sui-tab-pane>
                        <!-- Tasks and Reminders -->
                        <sui-tab-pane title="Tasks and Reminders" icon="inbox">
                            <div>
                                <sui-header>
                                    Tasks and Reminders
                                </sui-header>
                                <sui-content>
                                    <div class="setting">
                                        <p style="margin: 0 2rem 0 3rem"> Add </p>  
                                        <sui-button v-on:click="toggleAddTask"><font-awesome-icon icon="plus-circle" /></sui-button>
                                    </div>
                                    <div v-if="openAddTask">
                                        <div style="display: flex; align-items: center">
                                        <sui-checkbox value="..." style="margin-right: 1rem"/>
                                        <sui-input 
                                            v-model="name" 
                                            type="text"
                                            required>
                                        </sui-input>
                                    </div>
                                    <div class="samerow md-layout-item" style="margin-top: 1rem">
                                        <p>Assign to Contributor</p>
                                        <sui-dropdown
                                            fluid
                                            placeholder="Select staff"
                                            selection
                                            :options="staff"
                                            v-model="current"
                                            style="width: 40%; margin-left: 1rem"
                                        />
                                        </div>
                                        <sui-button         data-background-color="pink" positive @click.native="toggle"  class="ui button size middle space">Add</sui-button>
                                    </div>
                                </sui-content>
                                
                                <!-- Show after add tasks -->
                                <sui-card style="padding: 2rem" class="md-layout-item md-size-100">
                                    <div style="display: flex; align-items: center">
                                        <sui-checkbox value="..." style="margin-right: 1rem"/>
                                        <p>{{data.workflows[0].task[0].content}}</p>
                                    </div>
                                    <div>
                                    <p class="space rightfloat">Assign to Contributor: {{data.workflows[0].task[0].assigned}}</p>
                                    </div>
                                </sui-card>
                                <!-- Complete Tasks -->
                                <sui-divider/>
                                <h4>Completed Tasks</h4>
                                    <div style="display: flex; align-items: center">
                                        <sui-checkbox value="..." style="margin-right: 1rem"/>
                                        <p>{{data.workflows[0].task[0].content}} - Assign to Contributor: {{data.workflows[0].task[0].assigned}}</p>
                                    </div>
                            </div>
                            <sui-modal-actions>
                                <sui-button         data-background-color="pink" positive @click.native="toggleDetails"  class="ui button size middle space">Add</sui-button>
                            </sui-modal-actions>
                        </sui-tab-pane>
                        <!-- Chat -->
                        <sui-tab-pane title="Chat" icon="magic">
                            <chat></chat>
                        </sui-tab-pane>
                    </sui-tab>
                </sui-modal>
            </sui-card>
        </sui-card-group>
    </div>
</template>
<script>
import json from "./../../data/workflows.json";
import { Information, TasksReminders, Chat } from "@/pages";

export default {
    name: "workflows",
    data(){
        return{
            myJson: json,
            openWorkFlow: false,
            openDetails: false,
            openTasks: false,
            openAddTask: false,
            open: false
        }
    },
    methods: {
        toggle(){
            this.open = !this.open
        },
        toggleAddWorkFlow(){
            this.openWorkFlow = !this.openWorkFlow
        },
        toggleDetails(){
            this.openDetails = !this.openDetails
        },
        toggleTasks(){
            this.openTasks = !this.openTasks
        },
        toggleAddTask(){
            this.openAddTask = !this.openWorkFlow
        }
    },
    props: {
        email: {
            type: String,
            default: require("@/assets/img/actions/email.png")
        }
    },
    components: {
        Information,
        TasksReminders,
        Chat
    }
}
</script>

