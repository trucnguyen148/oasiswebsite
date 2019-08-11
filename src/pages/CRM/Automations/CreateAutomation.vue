<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-smal-size-100 md-size-50">
                <md-field>
                    <label>Name of automation</label>
                    <md-input 
                    v-model="automation" 
                    type="text"
                    required></md-input>
                </md-field>
            </div>
            <md-card>
                <md-card-header data-background-color="black" class="header">1 - Choose a Trigger</md-card-header>
                <md-card-content>
                    <p>To create an automated response, first choose an app.</p>
                    <sui-card-group :items-per-row="4">
                        <sui-card>
                            <sui-button v-on:click="toggleContact" >
                                <sui-image size="mini" :src="contactForm" style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"/>
                                <h4>Contact Form</h4>
                            </sui-button>
                        </sui-card>
                        <sui-card>
                            <sui-button v-on:click="toggleInvoice">
                                <sui-image size="mini" :src="invoices" style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"/>
                                <h4>Invoices</h4>
                            </sui-button>
                        </sui-card>
                        <sui-card>
                            <sui-button v-on:click="toggleWorkflows">
                                <sui-image size="mini" :src="workFlows" style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"/>
                                <h4>Workflows</h4>
                            </sui-button>
                        </sui-card>
                        <sui-card>
                            <sui-button v-on:click="toggleInbox">
                                <sui-image size="mini" :src="inbox" style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"/>
                                <h4>Inbox</h4>
                            </sui-button>
                        </sui-card>
                    </sui-card-group>
                    <sui-list>
                        <!-- Open Contact Form -->
                        <sui-list-item v-if="openContact">
                            <sui-form>
                                <sui-form-field>
                                    <label>Trigger every time:</label>
                                </sui-form-field>
                                <sui-form-field>
                                    <sui-checkbox label="Visitor submits contact form" value="..."/>
                                </sui-form-field>
                            </sui-form>
                        </sui-list-item>
                        <!-- Open Inbox -->
                        <sui-list-item v-else-if="openInbox">
                            <sui-form>
                                <sui-form-field>
                                    <label>Trigger every time:</label>
                                </sui-form-field>
                                <sui-form-field>
                                    <sui-checkbox label="Message is sent to contact" value="inbox"/>
                                </sui-form-field>
                            </sui-form>
                        </sui-list-item>
                        <!-- Open Invoice -->
                        <sui-list-item v-else-if="openInvoice">
                            <sui-form>
                                <sui-form-fields grouped>
                                    <label>Select a trigger for this app:</label>
                                    <sui-form-field>
                                        <sui-checkbox label="Invoice is overdue" value="overdue"/>
                                    </sui-form-field>
                                    <sui-form-field>
                                        <sui-checkbox label="Invoice is paid" value="paid"/>
                                    </sui-form-field>
                                    <sui-form-field>
                                        <sui-checkbox label="Invoice is sent" value="sent"/>
                                    </sui-form-field>
                                </sui-form-fields>
                            </sui-form>
                        </sui-list-item>
                        <!-- Open Workflows -->
                        <sui-list-item v-else-if="openWorkflows">
                            <sui-form>
                                <sui-form-field>
                                    <label>Trigger every time:</label>
                                </sui-form-field>
                                <sui-form-field>
                                    <sui-checkbox label="Card is added or moved" value="..."/>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>In this Workflow:</label>
                                    <sui-dropdown
                                        placeholder="Select..."
                                        selection
                                        :options="options"
                                        v-model="current"
                                    />
                                </sui-form-field>
                            </sui-form>
                        </sui-list-item>
                    </sui-list>
                </md-card-content>
            </md-card>
            <!-- Step 2 -->
            <md-card>
                <md-card-header data-background-color="black" class="header">2 - Choose an Action</md-card-header>
                <md-card-content>
                    <p>Next, decide how you want to respond to the trigger.</p>
                    <sui-card-group :items-per-row="4">
                        <sui-card>
                            <sui-button v-on:click="toggleMessage" >
                                <sui-image size="mini" :src="message" style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"/>
                                <h4>Send message</h4>
                            </sui-button>
                        </sui-card>
                        <sui-card>
                            <sui-button v-on:click="toggleEmail">
                                <sui-image size="mini" :src="email" style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"/>
                                <h4>Send email</h4>
                            </sui-button>
                        </sui-card>
                        <sui-card>
                            <sui-button v-on:click="toggleNotified">
                                <sui-image size="mini" :src="notified" style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"/>
                                <h4>Get notified on web or mobile</h4>
                            </sui-button>
                        </sui-card>
                        <sui-card>
                            <sui-button v-on:click="toggleTask">
                                <sui-image size="mini" :src="task" style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"/>
                                <h4>Create a task</h4>
                            </sui-button>
                        </sui-card>
                    </sui-card-group>
                    <sui-list>
                        <!-- Open Send Message-->
                        <sui-list-item v-if="openMessage">
                            <sui-form>
                                <sui-form-field>
                                    <label>Message</label>
                                    <textarea placeholder="Add a message to show on your site's chatbox, eg., Hi, need any help?"/>
                                </sui-form-field>
                                <sui-checkbox label="Send this message only when I'm online to chat." toggle v-model="value"/>
                            </sui-form>
                        </sui-list-item>
                        <!-- Open Send Email -->
                        <sui-list-item v-else-if="openEmail">
                            <sui-form>
                                <sui-form-field>
                                    <label>Trigger every time:</label>
                                </sui-form-field>
                                <sui-form-field>
                                    <sui-checkbox label="Message is sent to contact" value="inbox"/>
                                </sui-form-field>
                            </sui-form>
                        </sui-list-item>
                        <!-- Open Get Notified -->
                        <sui-list-item v-else-if="openNotified">
                            <sui-form>
                                <!-- Send notification to -->
                                <sui-form-field>
                                    <label>Send notification to:</label>
                                    <input placeholder="your email" />
                                </sui-form-field>
                                <!-- Email subject -->
                                <sui-form-field>
                                    <label>Email subject:</label>
                                    <input placeholder="Enter a subject line for your notification" />
                                </sui-form-field>
                                <!-- Message -->
                                <sui-form-field>
                                    <label>Email subject:</label>
                                    <textarea placeholder="Enter a subject line for your notification" />
                                </sui-form-field>
                                <sui-checkbox label="Include details of trigger in the email." toggle v-model="value"/>
                            </sui-form>
                        </sui-list-item>
                        <!-- Open Create task -->
                        <sui-list-item v-else-if="openTask">
                            <sui-form>
                                <!-- Task for you or your team -->
                                <sui-form-field>
                                    <label>Add a task for you or your team</label>
                                    <textarea placeholder="Write your task here, e.g., 'Send a coupon to the customer'" />
                                </sui-form-field>
                                <sui-form-field>
                                    <sui-checkbox label="Set a due date" toggle v-model="value"/>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Number of days to complete task</label>
                                    <sui-dropdown
                                        placeholder="...."
                                        selection
                                        :options="numberofday"
                                        v-model="current"
                                        class="md-layout-item md-size-10"
                                    />
                                </sui-form-field>
                                <sui-form-field>
                                    <label>* Tasks automatically link to the contact that triggered the action.</label>
                                </sui-form-field>
                            </sui-form>
                        </sui-list-item> 
                    </sui-list>
                </md-card-content>
            </md-card>
            <!-- Step 3 -->
            <md-card>
                <md-card-header data-background-color="black" class="header">3 - Choose a Time</md-card-header>
                <md-card-content>
                    <sui-form>
                        <sui-form-field>
                            <p>Choose a time to send this action.</p>
                            <sui-dropdown
                                fluid
                                placeholder="Select..."
                                selection
                                :options="time"
                                v-model="current"
                                style="margin-top: 2.5rem"
                            />
                        </sui-form-field>
                        <sui-form-fields inline>
                            <label>Send once per contact.</label>
                            <sui-form-field>
                                <sui-checkbox
                                label="Yes"
                                value="1"
                                v-model="value"
                                />
                            </sui-form-field>
                            <sui-form-field>
                                <sui-checkbox
                                label="No"
                                value="2"
                                v-model="value"
                                />
                            </sui-form-field>
                        </sui-form-fields>
                    </sui-form>
                </md-card-content>
            </md-card>
            <md-button style="display: block; margin-left: auto; margin-right: auto" class="md-success">
                    ACTIVE
            </md-button>
        </div> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            openAutomations: false,
            openContact: false,
            openInvoice: false,
            openInbox: false,
            openWorkflows: false,
            openMessage: false,
            openEmail: false,
            openNotified: false,
            openTask: false

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
        },
        toggleMessage() {
            this.openMessage = !this.openMessage;
        },
        toggleEmail() {
            this.openEmail = !this.openEmail;
        },
        toggleNotified() {
            this.openNotified = !this.openNotified;
        },
        toggleTask() {
            this.openTask = !this.openTask;
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
        },
        message: {
            type: String,
            default: require("@/assets/img/actions/message.png")
        },
        email: {
            type: String,
            default: require("@/assets/img/actions/email.png")
        },
        notified: {
            type: String,
            default: require("@/assets/img/actions/notified.png")
        },
        task: {
            type: String,
            default: require("@/assets/img/actions/task.png")
        }
    }
}
</script>
<style>
.header{
    font-weight: bold;
    text-transform: uppercase;
}
</style>

