<template>
  <div v-if="user.login">
    <router-view></router-view>
  </div>
  <div v-else>
    <sui-modal v-model="open">
      <sui-modal-header class="form-header">Login</sui-modal-header>
      <sui-modal-content>
        <div class="md-layout">
          <!-- Name -->
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>Phone</label>
              <md-input v-model="user.phone" type="text" required></md-input>
            </md-field>
          </div>

          <!-- Address -->
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Password</label>
              <md-input v-model="user.password" type="password" required></md-input>
            </md-field>
          </div>
        </div>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button data-background-color="purple" positive @click.native="login()">Login</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { $user } from "../src/components/user_info";

const LOGIN = gql`
  query($phone: String!, $password: String!) {
    user_login(phone: $phone, password: $password) {
      id
      type
    }
  }
`;

const PERMISSION = gql`
  query($user_id: Int!) {
    permission(user_id: $user_id) {
      permission
    }
  }
`;

export default {
  data() {
    return {
      open: true,
      user: {
        login: false,
        phone: "0123345",
        password: "nam123"
      }
    };
  },
  methods: {
    login() {
      const phone = this.user.phone;
      const password = this.user.password;

      this.$apollo
        .query({
          query: LOGIN,
          variables: {
            phone: phone,
            password: password
          }
        })
        .then(data => {
          if (data.data.user_login !== null) {
            if (data.data.user_login.type === 2) {
              $user.login = data.data.user_login.id;
              this.get_permission(data.data.user_login.id);
            } else {
              alert("You dont have permission!");
            }
          } else {
            alert("Wrong phone or password!");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_permission(id) {
      this.$apollo
        .query({
          query: PERMISSION,
          variables: {
            user_id: id
          }
        })
        .then(data => {
          $user.permissions = data.data.permission.map(el => {
            return el.permission;
          });
        })
        .then(() => {
          this.user.login = true;
          $user.login = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
