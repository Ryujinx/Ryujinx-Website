<template>
  <v-app>
    <!-- IMPORTANT: KEEP THIS HERE-->
    <SEO/>
    <v-app-bar app>
      <v-app-bar-nav-icon class="hidden-md-and-up mr-0" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-avatar size="32px" tile class="ml-3 mr-1">
        <g-image src="~/assets/logo.png" alt="Ryujinx" width="32"/>
      </v-avatar>
      <v-toolbar-title v-text="title" class="ml-2"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down hidden-lg-and-up">
        <v-btn text exact to="/">
          <v-icon>fas fa-home</v-icon>
        </v-btn>
        <v-btn text href="https://blog.ryujinx.org/">
          <v-icon>fas fa-newspaper</v-icon>
        </v-btn>
        <v-btn text exact to="/download">
          <v-icon>fas fa-download</v-icon>
        </v-btn>
        <v-btn text exact to="/contribute">
          <v-icon>fas fa-code</v-icon>
        </v-btn>
        <v-btn text href="https://github.com/Ryujinx/Ryujinx/wiki/Ryujinx-Setup-&-Configuration-Guide">
          <v-icon>fas fa-info-circle</v-icon>
        </v-btn>
        <v-btn text href="https://github.com/Ryujinx/Ryujinx/wiki/Frequently-Asked-Questions">
          <v-icon>fas fa-question-circle</v-icon>
        </v-btn>
        <v-btn
          text
          exact
          href="https://github.com/Ryujinx/Ryujinx-Games-List/issues"
          rel="noopener"
          target="_blank"
        >
          <v-icon>fas fa-gamepad</v-icon>
        </v-btn>

        <v-btn text v-for="element in $static.socialNavbarElements.edges" :key="element.node.id" :color="element.node.color" :href="element.node.href">
          <v-icon>fab {{ element.node.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn text exact to="/">Home</v-btn>
        <v-btn text href="https://blog.ryujinx.org/">Blog</v-btn>
        <v-btn text exact to="/download">Download</v-btn>
        <v-btn text exact to="/contribute">Contribute</v-btn>
        <v-btn 
          text 
          exact 
          href="https://github.com/Ryujinx/Ryujinx/wiki/Ryujinx-Setup-&-Configuration-Guide" 
          rel="noopener" 
          target="_blank"
        >Guide</v-btn>
        <v-btn 
          text 
          exact 
          href="https://github.com/Ryujinx/Ryujinx/wiki/Frequently-Asked-Questions" 
          rel="noopener" 
          target="_blank"
        >FAQ</v-btn>
        <v-btn
          text
          exact
          href="https://github.com/Ryujinx/Ryujinx-Games-List/issues"
          rel="noopener"
          target="_blank"
        >Compatibility</v-btn>

        <v-btn text v-for="element in $static.socialNavbarElements.edges" :key="element.node.id" :color="element.node.color" :href="element.node.href">
          <v-icon>fab {{ element.node.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="ml-0 mr-2">
        <v-btn text @click.stop="toggleDarkMode()">
          <v-icon v-if="$vuetify.theme.dark">fas fa-sun</v-icon>
          <v-icon v-else>fas fa-moon</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <v-navigation-drawer temporary v-model="drawer" fixed>
      <v-list>
        <!-- Index -->
        <v-list-item exact to="/">
          <v-list-item-action>
            <v-icon>fas fa-home</v-icon>
          </v-list-item-action>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <!-- News -->
        <v-list-item href="https://blog.ryujinx.org/">
          <v-list-item-action>
            <v-icon>fas fa-newspaper</v-icon>
          </v-list-item-action>
          <v-list-item-title>Blog</v-list-item-title>
        </v-list-item>

        <!-- Download -->
        <v-list-item exact to="/download">
          <v-list-item-action>
            <v-icon>fas fa-download</v-icon>
          </v-list-item-action>
          <v-list-item-title>Download</v-list-item-title>
        </v-list-item>

        <!-- Contribute -->
        <v-list-item exact to="/contribute">
          <v-list-item-action>
            <v-icon>fas fa-code</v-icon>
          </v-list-item-action>
          <v-list-item-title>Contribute</v-list-item-title>
        </v-list-item>

        <!-- Setup Guide -->
        <v-list-item 
          exact 
          href="https://github.com/Ryujinx/Ryujinx/wiki/Ryujinx-Setup-&-Configuration-Guide"
          rel="noopener"
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>fas fa-info-circle</v-icon>
          </v-list-item-action>
          <v-list-item-title>Guide</v-list-item-title>
        </v-list-item>

        <!-- FAQ -->
        <v-list-item
          exact
          href="https://github.com/Ryujinx/Ryujinx/wiki/Frequently-Asked-Questions"
          rel="noopener"
          target="_blank">
          <v-list-item-action>
            <v-icon>fas fa-question-circle</v-icon>
          </v-list-item-action>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item>

        <!-- Game Compatibility -->
        <v-list-item
          exact
          href="https://github.com/Ryujinx/Ryujinx-Games-List/issues"
          rel="noopener"
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>fas fa-gamepad</v-icon>
          </v-list-item-action>
          <v-list-item-title>Game Compatibility</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="element in $static.socialNavbarElements.edges" :key="element.node.id" :color="element.node.color" :href="element.node.href">
          <v-list-item-action>
            <v-icon :color="element.node.color">fab {{ element.node.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>{{element.node.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer class="text-center">
      <v-col class="text-left">
      <v-card-text class="py-2 text-center">
        Website designed by
        <a rel="noopener" target="_blank" href="https://twitter.com/Lordmau5">Lordmau5</a>
      </v-card-text>
      </v-col>
      <v-col class="text-right">
      <v-card-text class="py-2 text-center">
        {{this.$static.metadata.siteAuthor}} © {{ new Date().getFullYear() }}
      </v-card-text>
      </v-col>
    </v-footer>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteAuthor
  }
  socialNavbarElements: allSocialNavbarElements(order: ASC) {
    edges {
      node {
        title
        color
        href
        icon
      }
    }
  }
}
</static-query>

<style scoped>
.btn {
  min-width: 0;
}
</style>

<style>
a {
  color: #00c4e1;
}
</style>

<script>
export default {
  data() {
    return {
      title: "Ryujinx - Nintendo Switch Emulator",
      drawer: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.white_mode = !this.$vuetify.theme.dark;
    }
  },
  beforeMount() {
    this.$vuetify.theme.dark = localStorage.white_mode !== "true"
  }
};
</script>
