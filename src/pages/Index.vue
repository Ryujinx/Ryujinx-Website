<template>
  <Layout>
    <div>
      <section>
        <v-parallax :src="require('@/assets/wallp.png')" alt="Parallax wallpaper" height="600" fluid>
            <v-row align="center"
                justify="center">
                <v-col class="text-center">
                  <g-image src="~/assets/logo.png" alt="Ryujinx" class="mb-5" width="128" height="128"/>
                  <p class="display-1">A simple, experimental Nintendo Switch emulator.</p>
                </v-col>
            </v-row>
        </v-parallax>
      </section>
      <section>
        <v-row class="mt-5" align="center">
          <v-container fluid>
            <v-row align="start" justify="center">
              <v-col cols="12" md="6">
                <div class="text-center">
                  <p class="display-1">What is Ryujinx?</p>
                  <span class="subheading">
                    <small>
                      <em>(REE-YOU-JI-NX)</em>
                    </small>

                    <p
                      class="my-2"
                    >Ryujinx is an open-source Nintendo Switch emulator created by gdkchan and written in C#.</p>
                    <p
                      class="my-2"
                    >This emulator aims at providing excellent accuracy and performance, a user-friendly interface, and consistent builds.</p>
                    <p
                      class="my-2"
                    >Ryujinx is available on GitHub under the MIT license.</p>


                    <div class="text-center">
                    <v-btn
                      dark
                      class="ma-2"
                      color="ryu_blue"
                      href="https://github.com/Ryujinx/Ryujinx-Games-List/issues"
                    >
                      <v-icon class="ml-n1 mr-2">fas fa-gamepad</v-icon> Game compatibility list
                    </v-btn>
                    <v-btn dark class="ma-2" color="ryu_orange" to="/download">
                      <v-icon class="ml-n1 mr-2">fas fa-download</v-icon> Download the latest build
                    </v-btn>
                    </div>
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row align="start">
              <v-col cols="12" md="4">
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="--text text--lighten-2">fab fa-github</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="display-1 text-center">Where can I grab it?</div>
                  </v-card-title>
                  <v-card-text class="text-center">
                    You can download the latest pre-compiled build <router-link to="/download">here</router-link>, or you may build directly from the Ryujinx source code repository by following the guide <router-link to="/build">here</router-link>.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="--text text--lighten-2">fas fa-code</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="display-1 text-center">How can I contribute?</div>
                  </v-card-title>
                  <v-card-text
                    class="text-center"
                  >Please visit the contributing tab for more information.</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="--text text--lighten-2">fas fa-gamepad</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="display-1 text-center">How well does it work?</div>
                  </v-card-title>
                  <v-card-text
                    class="text-center"
                  >As of January 2022, Ryujinx has been tested on nearly 3,500 titles: ~3,200 boot past menus and into gameplay, with approximately 2,500 of those being considered playable. See the compatibility list <a href="https://github.com/Ryujinx/Ryujinx-Games-List" rel="noopener" target="_blank">here</a>.</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-parallax class="hidden-sm-and-down" :src="require('@/assets/wallp2.png')" height="200"></v-parallax>
        <v-row align="center">
          <v-container>
            <v-row align="start">
              <v-col cols="12" md="4">
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="--text text--lighten-2 mr-4">fab fa-windows</v-icon>
                    <v-icon x-large class="--text text--lighten-2 mr-4">fab fa-apple</v-icon>
                    <v-icon x-large class="--text text--lighten-2">fab fa-linux</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="display-1 text-center">Platforms</div>
                  </v-card-title>
                  <v-card-text
                    class="text-center"
                  >Ryujinx is currently available for Windows and Linux (macOS support is planned).</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="--text text--lighten-2">fab fa-discord</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="display-1 text-center">Discord</div>
                  </v-card-title>
                  <v-card-text class="text-center">
                    Join the <a href="https://discord.gg/VkQYXAZ" rel="noopener" target="_blank">Ryujinx Discord server</a>! You can get help,
                    as well as converse with fellow users and developers.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="--text text--lighten-2">fab fa-nintendo-switch</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="display-1 text-center">Why the name?</div>
                  </v-card-title>
                  <v-card-text class="text-center">
                    The name Ryujinx is based on the name "Ryujin."
                    In other words, a name for a Mythical (Sea-God) Dragon.
                    More information can be found here.
                    The name stems from Ryu (as already explained), then RyuJIT;
                    which is the codename for the JIT compiler for .NET Core.
                    The NX part of the name is from the Codename of the Switch itself.
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-parallax class="hidden-sm-and-down" :src="require('@/assets/wallp3.png')" height="200"></v-parallax>
        <v-row align="center">
          <v-container>
            <v-row align="start" justify="center">
              <v-col cols="12">
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="--text text--lighten-2">fas fa-users</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="display-1 text-center">Our Team</div>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row align="start" justify="center">
              <v-col cols="12" sm="4" md="2" v-for="member in $page.teams.edges" :key="member.node.id">
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-avatar size="72">
                      <g-image :alt="member.node.name" :src="member.node.avatar" />
                    </v-avatar>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <a
                      v-if="member.node.github"
                      :href="`https://github.com/${member.node.github}`"
                      rel="noopener"
                      target="_blank"
                      class="headline text-center"
                    >{{ member.node.name }}</a>
                    <p v-else class="headline text-center">{{ member.name }}</p>
                  </v-card-title>
                  <v-card-text class="text-center">
                    <p class="title">{{ member.node.title }}</p>
                    <em v-if="member.node.description">{{ member.node.description }}</em>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </section>
    </div>
  </Layout>
</template>

<page-query>
query {
  teams: allTeam(order: ASC) {
    edges {
      node {
        id
        name
        github
        avatar
        title
      }
    }
  }
  extraPagesInfo(path: "/") {
    path
    title
    keywords
  }
}
</page-query>

