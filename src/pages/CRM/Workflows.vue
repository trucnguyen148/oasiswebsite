<template>
  <div v-if="!$apolloData.queries.customers.loading && !$apolloData.queries.workflows.loading" class="content">
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
                  <md-input v-model="addWorkflowParams.name" type="text" required></md-input>
                </md-field>
              </div>
            </div>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button
              data-background-color="pink"
              positive
              @click.native="addWorkflow()"
              class="ui button size middle"
            >Add</sui-button>
          </sui-modal-actions>
        </sui-modal>
      </div>
    </div>
    <p>Manage your sales, leads and contacts at a glance.</p>
    <!-- Workflow cards -->
    <sui-card-group :items-per-row="4">
      <sui-card style="padding: 2rem 1rem" v-for="step in steps" v-bind:key="step.id">
        <div class="setting">
          <div>
            <h4>{{step.name}}</h4>
          </div>
          <div>
            <sui-dropdown button icon="ellipsis horizontal" floating>
              <sui-dropdown-menu>
                <sui-button @click="toggleEditStep(step)">
                  <sui-dropdown-item>Rename Step</sui-dropdown-item>
                </sui-button>
                <sui-dropdown-divider />
                <sui-button @click="deleteStep(step.id)">
                  <sui-dropdown-item>Delete Step</sui-dropdown-item>
                </sui-button>
              </sui-dropdown-menu>
            </sui-dropdown>
          </div>
        </div>
        <div class="space md-layout-item md-size-100">
          <sui-card style="border: 2px solid pink; margin-left: auto; margin-right: auto">
            <sui-button icon="plus" @click="toggle('addCard', step.id)">Add</sui-button>
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
                    <sui-dropdown-divider />
                    <sui-button @click="toggleEditCard(card)">
                      <sui-dropdown-item>Move to</sui-dropdown-item>
                    </sui-button>
                    <sui-dropdown-divider />
                    <sui-button @click="deleteCard(card.id)">
                      <sui-dropdown-item>Delete Card</sui-dropdown-item>
                    </sui-button>
                  </sui-dropdown-menu>
                </sui-dropdown>
              </div>
            </sui-button>
            <!-- Open details information-->
            <sui-modal v-model="open.details">
              <sui-modal-header style="display: flex; flex-direction: row; padding: 1.5rem">
                <div style="margin-right: 1rem">
                  <sui-image size="mini" :src="email" />
                </div>
                <div>
                  <h3>{{ card.customer.name }}</h3>
                </div>
              </sui-modal-header>
              <sui-tab style="margin: 2rem" :menu="{ secondary: true }">
                <!-- Information -->
                <sui-tab-pane title="Information" icon="users">
                  <div>
                    <sui-header>Contact Info</sui-header>
                    <div>
                      <label>
                        <b>Email</b>
                        : {{ card.customer.email }}
                      </label>
                    </div>
                    <div>
                      <label>
                        <b>Phone</b>
                        : {{ card.customer.phone }}
                      </label>
                    </div>
                    <div>
                      <label>
                        <b>Facebook</b>
                        : {{ card.customer.facebook }}
                      </label>
                    </div>
                  </div>
                  <sui-divider />
                  <div>
                    <sui-header>Recent Purchases</sui-header>
                    <div>
                      <label v-for="booking in card.customer.bookings" v-bind:key="booking.id">
                        {{ booking.date_time }}
                        <div v-for="product in booking.products" v-bind:key="product.id">
                        {{ product.name }}
                        </div>
                      </label>
                    </div>
                  </div>
                  <sui-divider />
                </sui-tab-pane>
              </sui-tab>
            </sui-modal>
          </sui-card>
        </div>
        <!-- Open Add Card -->
        <sui-modal v-model="open.addCard">
          <sui-modal-header>Add Card</sui-modal-header>
          <sui-modal-content>
            <sui-grid :columns="2">
              <sui-grid-row>
                <sui-grid-column :width="3">
                  <label>Customer</label>
                </sui-grid-column>
                <sui-grid-column :width="6">
                  <sui-dropdown
                    fluid
                    :options="customer_list"
                    placeholder="Search Contacts"
                    search
                    selection
                    v-model="selected_customer"
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
              @click.native="addCard()"
              class="ui button size middle"
            >Add card</sui-button>
          </sui-modal-actions>
        </sui-modal>
      </sui-card>
    </sui-card-group>
    <div>
      <sui-button
        data-background-color="pink"
        positive
        class="ui button size middle"
        @click.native="toggle('addStep')"
      >Add step</sui-button>
      <!-- Add more step -->
      <sui-modal v-model="open.addStep">
        <sui-modal-header>Add New Step</sui-modal-header>
        <sui-modal-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <md-field>
                <label>Name</label>
                <md-input v-model="addStepParams.name" type="text" required></md-input>
              </md-field>
            </div>
          </div>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button
            data-background-color="pink"
            positive
            @click.native="addStep()"
            class="ui button size middle"
          >Add</sui-button>
        </sui-modal-actions>
      </sui-modal>
      <!-- Edit step -->
      <sui-modal v-model="openEdit.editStep">
        <sui-modal-header>Edit Step</sui-modal-header>
        <sui-modal-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <md-field>
                <label>Name</label>
                <md-input v-model="updateStepParams.name" type="text" required></md-input>
              </md-field>
            </div>
          </div>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button
            data-background-color="pink"
            positive
            @click.native="updateStep()"
            class="ui button size middle"
          >Edit</sui-button>
        </sui-modal-actions>
      </sui-modal>
      <!-- Move card -->
      <sui-modal v-model="openEdit.editCard">
        <sui-modal-header>Move Card</sui-modal-header>
        <sui-modal-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <md-field>
                <label>Step</label>
                <sui-dropdown
                  fluid
                  :options="step_list"
                  search
                  selection
                  v-model="updateCardParams.step_id"
                  style="margin-top: 2.5rem; width: 30%; margin-right: 1.5rem"
                />
              </md-field>
            </div>
          </div>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button
            data-background-color="pink"
            positive
            @click.native="updateCard()"
            class="ui button size middle"
          >Move</sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
  </div>
  <div v-else class="content">
    <div class="md-layout"><h2>is loading...</h2></div>
  </div>
</template>
<script>
import { Information, TasksReminders } from "@/pages";
import gql from "graphql-tag";

const ADD_WORKFLOW = gql`
  mutation($name: String!) {
    createWorkflow(input: { name: $name }) {
      id
      name
    }
  }
`;
const ADD_STEP = gql`
  mutation($name: String!, $workflow_id: Int!) {
    createStep(input: { name: $name, workflow_id: $workflow_id }) {
      id
      name
    }
  }
`;
const ADD_CARD = gql`
  mutation($step_id: Int!, $customer_id: Int!) {
    createCard(input: { step_id: $step_id, customer_id: $customer_id }) {
      id
    }
  }
`;
const DELETE_STEP = gql`
  mutation($id: ID!) {
    deleteStep(id: $id) {
      id
    }
  }
`;
const DELETE_CARD = gql`
  mutation($id: ID!) {
    deleteCard(id: $id) {
      id
    }
  }
`;
const UPDATE_STEP = gql`
  mutation($id: ID!, $name: String!, $workflow_id: Int!) {
    updateStep(id: $id, input: { name: $name, workflow_id: $workflow_id }) {
      id
    }
  }
`;
const UPDATE_CARD = gql`
  mutation($id: ID!, $step_id: Int!, $customer_id: Int!) {
    updateCard(
      id: $id
      input: { step_id: $step_id, customer_id: $customer_id }
    ) {
      id
    }
  }
`;
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
      open: {
        addWorkflow: false,
        addStep: false,
        addCard: false,
        details: false
      },
      openEdit: {
        editStep: false,
        editCard: false
      },
      selected_workflow: "",
      selected_customer: "",
      selected_step: "",
      addWorkflowParams: {
        name: ""
      },
      addStepParams: {
        name: ""
      },
      updateStepParams: {
        name: ""
      },
      updateCardParams: {
        card_id: "",
        step_id: "",
        customer_id: ""
      }
    };
  },
  computed: {
    workflow_list() {
      return this.$apolloData.data.workflows.map(workflow => {
        return {
          text: workflow.name,
          value: workflow.id
        };
      });
    },
    step_list() {
      return this.steps.map(step => {
        return {
          text: step.name,
          value: step.id
        };
      });
    },
    steps() {
      if (this.selected_workflow != "") {
        let selected_workflow = this.$apolloData.data.workflows.filter(workflow => {
          return workflow.id == this.selected_workflow;
        });
        return selected_workflow[0].steps;
      } else return [];
    },
    customer_list() {
      return this.$apolloData.data.customers.map(customer => {
        return {
          text: customer.name + " - " + customer.phone,
          value: customer.id
        };
      });
    }
  },
  methods: {
    toggle(value, step_id) {
      const keys = Object.keys(this.open);
      keys.forEach(key => {
        this.open[key] = false;
      });
      this.open[value] = true;
      this.selected_step = step_id === undefined ? "" : step_id;
    },
    toggleEditStep(step) {
      this.openEdit.editStep = !this.openEdit.editStep;
      this.selected_step = step.id;
      this.updateStepParams.name = step.name;
    },
    toggleEditCard(card) {
      this.openEdit.editCard = !this.openEdit.editCard;
      this.updateCardParams.card_id = card.id;
      this.updateCardParams.step_id = card.step.id;
      this.updateCardParams.customer_id = card.customer.id;
    },
    card_list(step_id) {
      let current_step = this.steps.filter(step => {
        return step.id == step_id;
      });
      return current_step[0].cards;
    },
    addWorkflow() {
      const name = this.addWorkflowParams.name;
      // We clear it early to give the UI a snappy feel
      this.addWorkflowParams = {
        name: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: ADD_WORKFLOW,
          variables: {
            name: name
          }
        })
        .then(data => {
          console.log(data);
          this.open.addWorkflow = !this.open.addWorkflow;
          this.$apollo.queries.workflows.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    addStep() {
      const name = this.addStepParams.name;
      const workflow_id = this.selected_workflow;
      // We clear it early to give the UI a snappy feel
      this.addStepParams = {
        name: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: ADD_STEP,
          variables: {
            name: name,
            workflow_id: workflow_id
          }
        })
        .then(data => {
          console.log(data);
          this.open.addStep = !this.open.addStep;
          this.$apollo.queries.workflows.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    addCard() {
      const step_id = this.selected_step;
      const customer_id = this.selected_customer;

      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: ADD_CARD,
          variables: {
            step_id: step_id,
            customer_id: customer_id
          }
        })
        .then(data => {
          console.log(data);
          this.open.addCard = !this.open.addCard;
          this.$apollo.queries.workflows.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteStep(id) {
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: DELETE_STEP,
          variables: {
            id: id
          }
        })
        .then(data => {
          console.log(data);
          this.$apollo.queries.workflows.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteCard(id) {
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: DELETE_CARD,
          variables: {
            id: id
          }
        })
        .then(data => {
          console.log(data);
          this.$apollo.queries.workflows.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateStep() {
      const id = this.selected_step;
      const name = this.updateStepParams.name;
      const workflow_id = this.selected_workflow;
      // We clear it early to give the UI a snappy feel
      this.updateStepParams = {
        name: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: UPDATE_STEP,
          variables: {
            id: id,
            name: name,
            workflow_id: workflow_id
          }
        })
        .then(data => {
          console.log(data);
          this.openEdit.editStep = !this.openEdit.editStep;
          this.$apollo.queries.workflows.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateCard() {
      const id = this.updateCardParams.card_id;
      const step_id = this.updateCardParams.step_id;
      const customer_id = this.updateCardParams.customer_id;
      // We clear it early to give the UI a snappy feel
      this.updateCardParams = {
        card_id: "",
        step_id: "",
        customer_id: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: UPDATE_CARD,
          variables: {
            id: id,
            step_id: step_id,
            customer_id: customer_id
          }
        })
        .then(data => {
          console.log(data);
          this.openEdit.editCard = !this.openEdit.editCard;
          this.$apollo.queries.workflows.refetch();
        })
        .catch(error => {
          console.log(error);
        });
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
            cards {
              id
              step {
                id
              }
              customer {
                id
                name
                email
                phone
                facebook
                bookings {
                  id
                  date_time
                  products {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    customers: gql`
      {
        customers {
          id
          name
          phone
        }
      }
    `
  }
};
</script>

