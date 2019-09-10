<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-size-100"
        style="display: flex; flex-direction: row; align-items: baseline"
      >
        <h3 style="margin-right: 1.5rem">Workflows:</h3>
        <sui-dropdown
          fluid
          :options="workflow_list"
          placeholder="Select workflow"
          search
          selection
          v-model="selected_workflow"
          style="margin-top: 2.5rem; width: 30%; margin-right: 1.5rem"
        />
        <sui-button @click.native="toggle('addWorkflow')" style="width: 5%">
          <font-awesome-icon icon="plus-circle" />
        </sui-button>
        <!-- Add more workflow name -->
        <sui-modal v-model="open.addWorkflow">
          <sui-modal-header>Add New Workflow</sui-modal-header>
          <sui-modal-content>
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label>Name</label>
                  <md-input v-model="name" type="text" required></md-input>
                </md-field>
              </div>
            </div>
          </sui-modal-content>
        </sui-modal>
      </div>
    </div>
    <p>Manage your sales, leads and contacts at a glance.</p>
    <!-- Workflow cards -->
    <sui-card-group :items-per-row="4">
      <sui-card style="padding: 2rem 1rem" v-for="step in step_list" v-bind:key="step.id">
        <div class="setting">
          <div>
            <h4>{{step.name}}</h4>
          </div>
          <div>
            <sui-dropdown button icon="ellipsis horizontal" floating>
              <sui-dropdown-menu>
                <sui-button>
                  <sui-dropdown-item>Rename Step</sui-dropdown-item>
                </sui-button>
                <sui-dropdown-divider />
                <sui-button>
                  <sui-dropdown-item>Delete Step</sui-dropdown-item>
                </sui-button>
              </sui-dropdown-menu>
            </sui-dropdown>
          </div>
        </div>
        <div class="space md-layout-item md-size-100">
          <sui-card style="border: 2px solid pink; margin-left: auto; margin-right: auto">
            <sui-button icon="plus" @click="toggle('addStep')">Add</sui-button>
          </sui-card>
          <sui-card
            style="margin-left: auto; margin-right: auto"
            v-for="card in card_list(step.id)"
            v-bind:key="card.id"
          >
            <sui-button
              @click.prevent="toggle('details')"
              style="display: flex; flex-direction: row; padding: 1.5rem"
            >
              <div style="margin-right: 1rem">
                <sui-image size="mini" :src="email" />
              </div>
              <div>
                <h4>{{ card.customer.name }}</h4>
                <sui-card-meta>Via Contact</sui-card-meta>
              </div>
              <div style="float: right">
                <sui-dropdown button icon="ellipsis horizontal" floating>
                  <sui-dropdown-menu>
                    <sui-button>
                      <sui-dropdown-item>Rename Card</sui-dropdown-item>
                    </sui-button>
                    <sui-dropdown-divider />

                    <sui-button>
                      <sui-dropdown-item>Send Price Quote</sui-dropdown-item>
                    </sui-button>
                    <sui-button>
                      <sui-dropdown-item>Send Invoice</sui-dropdown-item>
                    </sui-button>
                    <sui-button>
                      <sui-dropdown-item>Move to next card</sui-dropdown-item>
                    </sui-button>
                    <sui-dropdown-divider />
                    <sui-button>
                      <sui-dropdown-item>Delete Card</sui-dropdown-item>
                    </sui-button>
                  </sui-dropdown-menu>
                </sui-dropdown>
              </div>
            </sui-button>
          </sui-card>
        </div>
        <!-- Open Add step -->
        <sui-modal v-model="open.addStep">
          <sui-modal-header>Add Step</sui-modal-header>
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
            <sui-button
              data-background-color="pink"
              positive
              @click.native="toggle('addStep')"
              class="ui button size middle"
            >Add</sui-button>
          </sui-modal-actions>
        </sui-modal>
        <!-- Open details: information, tasks and reminds and chatbox -->
        <sui-modal v-model="open.details">
          <sui-modal-header style="display: flex; flex-direction: row; padding: 1.5rem">
            <div style="margin-right: 1rem">
              <sui-image size="mini" :src="email" />
            </div>
            <div>
              <h3>Name</h3>
            </div>
          </sui-modal-header>
          <sui-tab style="margin: 2rem" :menu="{ secondary: true }">
            <!-- Information -->
            <sui-tab-pane title="Information" icon="users">
              <div>
                <sui-header>Contact Info</sui-header>
                <sui-content>
                  <label>Email</label>
                  <p>Email</p>
                </sui-content>
              </div>
              <sui-divider />
              <div>
                <sui-header>Member Info</sui-header>
                <sui-content>
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
              <sui-divider />
              <div>
                <sui-header>Labels</sui-header>
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
              <sui-divider />
              <div>
                <sui-header>Attachment</sui-header>
                <sui-content>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <md-file v-model="single" accept="image/*" required />
                    </md-field>
                  </div>
                </sui-content>
                <sui-modal-actions>
                  <sui-button
                    data-background-color="pink"
                    positive
                    @click.native="toggle('details')"
                    class="ui button size middle"
                  >Add</sui-button>
                </sui-modal-actions>
              </div>
            </sui-tab-pane>
          </sui-tab>
        </sui-modal>
      </sui-card>
    </sui-card-group>
  </div>
</template>
<script>
import json from "./../../data/workflows.json";
import { Information, TasksReminders } from "@/pages";
import gql from "graphql-tag";

export default {
  name: "workflows",
  props: {
    email: {
      type: String,
      default: require("@/assets/img/actions/email.png")
    }
  },
  components: {
    Information,
    TasksReminders
  },
  data() {
    return {
      myJson: json,
      open: {
        addWorkflow: false,
        addStep: false,
        details: false
      },
      workflows: [],
      selected_workflow: ""
    };
  },
  computed: {
    workflow_list() {
      return this.workflows.map(workflow => {
        return {
          text: workflow.name,
          value: workflow.id
        };
      });
    },
    step_list() {
      if (this.selected_workflow != "") {
        let selected_workflow = this.workflows.filter(workflow => {
          return workflow.id == this.selected_workflow;
        });
        return selected_workflow[0].steps.sort((a, b) =>
          a.step > b.step ? 1 : -1
        );
      } else return [];
    }
  },
  methods: {
    toggle(value) {
      const keys = Object.keys(this.open);
      keys.forEach(key => {
        this.open[key] = false;
      });
      this.open[value] = true;
    },
    card_list(step_id) {
      let current_step = this.step_list.filter(step => {
        return step.id == step_id;
      });
      return current_step[0].cards;
    }
  },
  apollo: {
    workflows: gql`
      {
        workflows {
          id
          name
          steps {
            id
            name
            step
            cards {
              id
              customer {
                id
                name
              }
            }
          }
        }
      }
    `
  }
};
</script>

