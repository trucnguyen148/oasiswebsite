<template>
  <div class="content">
    <router-link to="crm" style="color: #EC407A">
      <sui-icon name="arrow left" />Back
    </router-link>
    <div class="md-layout">
      <div class="md-layout-item md-smal-size-100 md-size-50">
        <md-field>
          <label>Name of automation</label>
          <md-input v-model="automation" type="text" required></md-input>
        </md-field>
      </div>
      <md-card>
        <md-card-header data-background-color="black" class="header">1 - Choose a Trigger</md-card-header>
        <md-card-content>
          <p>To create an automated response, first choose an app.</p>
          <sui-card-group :items-per-row="4">
            <sui-card>
              <sui-button @click="toggleTrigger('contact')">
                <sui-image
                  size="mini"
                  :src="contactForm"
                  style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"
                />
                <h4>Contact Form</h4>
              </sui-button>
            </sui-card>
            <sui-card>
              <sui-button @click="toggleTrigger('invoice')">
                <sui-image
                  size="mini"
                  :src="invoices"
                  style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"
                />
                <h4>Invoices</h4>
              </sui-button>
            </sui-card>
            <sui-card>
              <sui-button @click="toggleTrigger('workflows')">
                <sui-image
                  size="mini"
                  :src="workFlows"
                  style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"
                />
                <h4>Workflows</h4>
              </sui-button>
            </sui-card>
          </sui-card-group>
          <sui-list>
            <!-- Open Contact Form -->
            <sui-list-item v-if="openTrigger.contact">
              <sui-form>
                <sui-form-field>
                  <label>Trigger every time:</label>
                </sui-form-field>
                <sui-form-field>
                  <sui-checkbox label="Visitor submits contact form" value="..." />
                </sui-form-field>
              </sui-form>
            </sui-list-item>
            <!-- Open Invoice -->
            <sui-list-item v-if="openTrigger.invoice">
              <sui-form>
                <sui-form-fields grouped>
                  <label>Select a trigger for this app:</label>
                  <sui-form-field>
                    <sui-checkbox label="Invoice is overdue" value="overdue" />
                  </sui-form-field>
                  <sui-form-field>
                    <sui-checkbox label="Invoice is paid" value="paid" />
                  </sui-form-field>
                  <sui-form-field>
                    <sui-checkbox label="Invoice is sent" value="sent" />
                  </sui-form-field>
                </sui-form-fields>
              </sui-form>
            </sui-list-item>
            <!-- Open Workflows -->
            <sui-list-item v-if="openTrigger.workflows">
              <sui-form>
                <sui-form-field>
                  <label>Trigger every time:</label>
                </sui-form-field>
                <sui-form-field>
                  <sui-checkbox label="Card is added or moved" value="..." />
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
              <sui-button @click="toggleAction('email')">
                <sui-image
                  size="mini"
                  :src="email"
                  style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"
                />
                <h4>Send email</h4>
              </sui-button>
            </sui-card>
            <sui-card>
              <sui-button @click="toggleAction('notified')">
                <sui-image
                  size="mini"
                  :src="notified"
                  style="background-color: transparent; display: block; margin-left: auto; margin-right: auto"
                />
                <h4>Get notified on web or mobile</h4>
              </sui-button>
            </sui-card>
          </sui-card-group>
          <sui-list>
            <!-- Open Send Email -->
            <sui-list-item v-if="openAction.email">
              <sui-form>
                <sui-form-field>
                  <label>Subject:</label>
                  <input />
                </sui-form-field>
                <sui-form-field>
                  <label>Content:</label>
                  <textarea />
                </sui-form-field>
              </sui-form>
            </sui-list-item>
            <!-- Open Get Notified -->
            <sui-list-item v-if="openAction.notified">
              <sui-form>
                <sui-form-field>
                  <label>Content</label>
                  <textarea placeholder="Content of your notificatin" />
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
              <p>How many minutes should the actions be launched? Leave blank for immediately</p>
              <md-input v-model="automation" type="number" required></md-input>
            </sui-form-field>
          </sui-form>
        </md-card-content>
      </md-card>
      <md-button
        style="display: block; margin-left: auto; margin-right: auto"
        class="md-success"
      >ACTIVE</md-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openTrigger: {
        contact: false,
        invoice: false,
        workflows: false
      },
      openAction: {
        email: false,
        notified: false
      }
    };
  },
  methods: {
    toggleTrigger(value) {
      const keys = Object.keys(this.openTrigger);
      keys.forEach(key => {
        this.openTrigger[key] = false;
      });
      this.openTrigger[value] = true;
    },
    toggleAction(value) {
      const keys = Object.keys(this.openAction);
      keys.forEach(key => {
        this.openAction[key] = false;
      });
      this.openAction[value] = true;
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
};
</script>
<style>
.header {
  font-weight: bold;
  text-transform: uppercase;
}
</style>

