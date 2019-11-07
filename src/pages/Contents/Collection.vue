<template>
  <div v-if="!$apolloData.queries.collections.loading">
    <!-- PRICE LIST -->
    <md-card>
      <md-card-header
        style="background-color: black; color: white; text-align: center; font-size: 1.5rem"
      >Collections</md-card-header>
      <md-card-content>
        <div class="setting">
          <p style="margin: 0 2rem 0 3rem">Add</p>
          <sui-button @click.native="toggle">
            <font-awesome-icon icon="plus-circle" />
          </sui-button>
          <sui-modal v-model="open">
            <sui-modal-header class="form-header">Add new collection</sui-modal-header>
            <sui-modal-content>
              <!-- Name -->
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label>Name</label>
                  <md-input v-model="addCollectionParams.name" type="text" required></md-input>
                </md-field>
              </div>
            </sui-modal-content>
            <sui-modal-actions>
              <sui-button
                data-background-color="pink"
                positive
                @click.native="addCollection"
                class="ui button size middle"
              >Add</sui-button>
            </sui-modal-actions>
          </sui-modal>
        </div>

        <!-- Show after add PRICE LIST-->
        <ul v-for="collection in collections" v-bind:key="collection.id">
          <div class="md-layout-item md-size-100">
            <md-field>
              <md-table md-card>
                <md-table-row>
                  <md-table-cell md-label="ID">{{collection.id}}</md-table-cell>
                  <md-table-cell md-label="Description">{{collection.name}}</md-table-cell>
                  <md-table-cell md-label="Pictures">{{collection.images.length | amount}}</md-table-cell>
                  <md-table-cell md-label="remove" class="edit_button">
                    <sui-button @click.native="edit(collection.id)">
                      <font-awesome-icon icon="edit" />
                    </sui-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-field>
          </div>
        </ul>

        <!-- Show after click edit button -->

        <sui-modal v-model="openEdit">
          <sui-modal-header class="form-header">Content of collection</sui-modal-header>
          <sui-modal-content image>
            <div class="md-layout">
              <!-- Photo -->
              <div class="md-layout-item md-size-100">
                <md-field>
                  <div v-if="collection.id !== null">
                    <label>Photo</label>
                    <div v-if="collection.id !== null">
                      <md-card-media
                        md-medium
                        v-for="image in collection.images"
                        v-bind:key="image.id"
                      >
                        <img :src="image.image" />
                      </md-card-media>
                    </div>
                    <div v-else>
                      <label>is Loading...</label>
                    </div>
                  </div>

                  <div
                    v-if="collection.images == null || collection.images.length == 0"
                    class="md-layout-item md-small-size-100 md-size-50"
                  >
                    <md-field>
                      <input
                        class="photoInput"
                        type="file"
                        @change="onFileSelectedUpdate($event)"
                        accept="image/*"
                        required
                        multiple
                      />
                    </md-field>
                    <sui-button positive @click.native="uploadImages(collection.id)">Upload</sui-button>
                  </div>
                </md-field>
              </div>
            </div>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button positive @click.native="edit">Close</sui-button>
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
import { URL, makeRequest } from "../../components/api";

const GET_COLLECTION = gql`
  query($id: ID!) {
    collection(id: $id) {
      id
      images {
        id
        image
      }
    }
  }
`;

const ADD_COLLECTION = gql`
  mutation($name: String!) {
    createCollection(input: { name: $name }) {
      id
    }
  }
`;

export default {
  name: "collection",
  data() {
    return {
      open: false,
      openEdit: false,
      collection: {
        id: null,
        images: null
      },
      addCollectionParams: {
        name: null
      },
      addImages: {
        images: null
      }
    };
  },
  filters: {
    amount: function(length) {
      if (length <= 1) {
        return length + " picture";
      } else {
        return length + " pictures";
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    edit(id) {
      if (id === undefined) {
        this.openEdit = !this.openEdit;
      } else {
        this.collection.id = id;
        this.get_collection(id);
        this.openEdit = !this.openEdit;
      }
    },
    onFileSelectedUpdate(event) {
      console.log(event.target.files);
      return (this.addImages.images = event.target.files);
    },
    get_collection(id) {
      // Call to the graphql mutation
      this.$apollo
        .query({
          query: GET_COLLECTION,
          variables: {
            id: id
          }
        })
        .then(data => {
          this.collection.id = data.data.collection.id;
          this.collection.images = data.data.collection.images;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addCollection() {
      const name = this.addCollectionParams.name;
      // We clear it early to give the UI a snappy feel
      this.addCollectionParams = {
        name: ""
      };
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          mutation: ADD_COLLECTION,
          variables: {
            name: name
          }
        })
        .then(data => {
          this.toggle();
          this.$apollo.queries.collections.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    async uploadImages(collection_id) {
      if (this.addImages.images === null || this.addImages.length === 0) {
        alert("Select images");
      } else {
        const images = this.addImages.images;

        for (let i = 0; i < images.length; i++) {
          let data = new FormData();
          data.append("imageFile", images[i]);
          data.append("collection_id", collection_id);
          data.append(
            "image",
            "http://oasisvn.tk:8888/uploads/collections/" + images[i].name
          );

          await makeRequest("POST", URL + "collection-images/create", data)
            .then(response => {
              console.log("Done upload pic" + i)
            })
            .catch(err => {
              console.error("There was an error in hotdeal!", err.statusText);
            });
        }
        this.edit()
        this.$apollo.queries.collections.refetch();
      }
    }
  },
  apollo: {
    collections: gql`
      {
        collections {
          id
          name
          images {
            id
            image
          }
        }
      }
    `
  }
};
</script>
<style></style>


