<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content fluid fill-height>
      <v-text-field
        label="EntityName"
        v-model="name"
        class="name"
        @input="onChange"
        :hide-details="true"
      ></v-text-field>
      <v-flex d-flex class="textarea-wrap">
        <v-flex md6 class="json">
          <v-text-field
            label="JSON"
            class="textarea"
            v-model="json"
            textarea
            light
            @input="onChange"
            :hide-details="true"
          ></v-text-field>
        </v-flex>
        <v-flex md6 class="entity">
          <v-text-field
            label="Entity"
            class="textarea"
            v-model="entity"
            textarea
            light
            :hide-details="true"
          ></v-text-field>
        </v-flex>
        <v-icon
          class="convert-icon"
        >arrow_forward</v-icon>
      </v-flex>
    </v-content>
  </v-app>
</template>

<script>
const template = require('../template/model.ejs');
import Generator from './Generator';
const generator = Generator(template);

export default {
  name: 'app',
  data: () => ({
    name: '',
    json: '{\n  "test": "test"\n}',
    entity: '',
    drawer: false,
  }),
  components: {
  },
  created() {
    this.onChange();
  },
  methods: {
    onChange() {
      const data = eval(`data = ${this.json};`);
      this.entity = generator.fromJson(
        this.name || 'Test',
        data,
      );
    }
  }
}
</script>

<style>
@import '../node_modules/vuetify/dist/vuetify.min.css';
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.application--wrap {
  padding: 16px 20px 20px;
  max-width: 100%;
  margin: 0 auto;
}
.content--wrap {
  position: relative;
}
.input-group {
  display: block;
  flex: 0;
}
.textarea {
  height: 100%;
}
.textarea > .input-group__input {
  height: 100%;
}
</style>
<style scoped>
.name {
  width: 80%;
  margin: 0 auto;
}
.textarea-wrap {
  position: relative;
  height: calc(100% - 50px);
}
.json {
  padding-right: 40px;
  height: 100%;
}
.entity {
  padding-left: 40px;
  height: 100%;
}
.convert-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  font-weight: bold;
}
</style>
