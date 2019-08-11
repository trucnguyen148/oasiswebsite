<template>
    <div > 
        <sui-card-group :items-per-row="3">
            <sui-card style="border: 2px dotted black">
                <router-link to="/createautomation">
                    <sui-card-content style="padding: 2rem">
                        <font-awesome-icon icon="plus" style="font-size: 7.2rem; display: block; margin-left: auto; margin-right: auto"/>
                        <h4>New Automations</h4>
                    </sui-card-content>
                </router-link>
            </sui-card>
            <sui-card v-for="data in myJson"
                    v-bind:key="data.name"
                    v-bind:name="data.name"
                    v-bind:status="data.status"
                    style="padding: 2.35rem">
                <sui-card-content >
                <sui-card-header>{{data.name}}</sui-card-header>
                <sui-card-description>
                    {{data.status}}
                </sui-card-description>
                </sui-card-content>
                <sui-card-content extra>
                    <sui-checkbox label="Inactive" toggle v-model="value"/>
                </sui-card-content>
            </sui-card>
        </sui-card-group>   
    </div>
</template>

<script>
import json from "./../../data/automations.json";
export default {
    name: "automations",
    data(){
        return{
            openAutomations: false,
            openContact: false,
            openInvoice: false,
            openInbox: false,
            openWorkflows: false,
            closeContact: false,
            closeInvoice: false,
            closeInbox: false,
            closeWorkflows: false,
            myJson: json
        };
        
    },
    methods: {
        toggleAutomations() {
            this.openAutomations = !this.openAutomations;
        },
        toggleContact() {
            this.openContact = !this.openContact;
            this.openInvoice = this.openInvoice;
            this.openInbox = this.openInbox;
            this.openWorkflows = this.openWorkflows;
            
        },
        
        toggleInvoice() {
            this.openInvoice = !this.openInvoice;
            this.openInbox = this.openInbox;
            this.openWorkflows = this.openWorkflows;
            this.openContact = this.openContact;
            
        },
        toggleInbox() {
            this.openInbox = !this.openInbox;
            this.openWorkflows = this.openWorkflows;
            this.openContact = this.openContact;
            this.openInvoice = this.openInvoice;
            
        },
        toggleWorkflows() {
            this.openWorkflows = !this.openWorkflows;
            this.openContact = this.openContact;
            this.openInvoice = this.openInvoice;
            this.openInbox = this.openInbox;
           
        }
    },
    props: {
        contactForm: {
            type: String,
            default: require("@/assets/img/triggers/contactForm.png")
        },
        inbox: {
            type: String,
            default: require("@/assets/img/triggers/inbox.png")
        },
        invoices: {
            type: String,
            default: require("@/assets/img/triggers/invoices.png")
        },
        workFlows: {
            type: String,
            default: require("@/assets/img/triggers/workFlows.png")
        }
    }
}
</script>
<style>
.card{
    width: 15%;
    height: 15%;
}
#icon{
    font-size: 8rem;
    display: flex;
    justify-content: center;
}
.title{
    text-align: center;
    margin-top: 2rem;
}

.icon-trigger{
    font-size: 8rem;
}
h4{
    text-align: center;
    color: black;
    
}
</style>


