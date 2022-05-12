<template>
  <Layout>
    <div>
      <section>
        <v-row class="my-5" align="center">
          <v-container fluid>
            <v-row align="start" justify="center">
              <v-col cols="12" md="6">
                <div class="text-center">
                  <p class="text-h4">Building Ryujinx and latest downloads</p>
                  <v-container>
                    <v-row align="start" justify="center">
                      <v-img :max-height="300" :max-width="500" position="text-center" src="/public/shell.png" alt="Shell" />
                    </v-row>
                    <v-row align="start" justify="center">
                      <v-col>
                        <p class="text-h5">Automatically compiled builds</p>
                      </v-col>
                    </v-row>
                    <v-row align="start" justify="center">
                      <v-col>
                        <DownloadButton
                          color="orange"
                          platform="windows"
                          :version="version"
                          :href="`${winDownloadURL}`"
                          :click="trackDownload"
                          :loading="isLoading"
                          :disabled="false"
                        />

                        <DownloadButton
                          color="orange"
                          platform="linux"
                          :version="version"
                          :href="`${linuxDownloadURL}`"
                          :click="trackDownload"
                          :loading="isLoading"
                          :disabled="false"
                        />

                        <DownloadButton
                          color="orange"
                          platform="apple"
                          :version="macos_notice"
                          :href="`${macDownloadURL}`"
                          :click="trackDownload"
                          :loading="isLoading"
                          :disabled="true"
                        />
                          
                        <p class="mt-4">
                          <v-btn dark depressed small color="yellow darken-4" href="https://github.com/Ryujinx/Ryujinx/wiki/Changelog" rel="noopener" target="_blank">
                            Changelog
                          </v-btn>
                          <v-btn dark depressed small color="grey darken-4" href="https://github.com/Ryujinx/release-channel-master/releases" rel="noopener" target="_blank">
                            Older Builds
                          </v-btn>
                        </p>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col>
                        <p class="text-h5">Looking for the LDN build?</p>
                        <p class="text">Head over to our <a href="https://www.patreon.com/posts/introducing-ldn2-45268370" rel="noopener" target="_blank">Patreon</a> for more info & FREE download</p>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col>
                        <p class="text-h5">Need help?</p>
                        <p class="text">
                          Check out the <a href="https://github.com/Ryujinx/Ryujinx/wiki/Ryujinx-Setup-&-Configuration-Guide" rel="noopener" target="_blank">Setup Guide,</a>
                          read the <a href="https://github.com/Ryujinx/Ryujinx/wiki/Frequently-Asked-Questions" rel="noopener" target="_blank">FAQ</a>
                          or head to our <a href="https://discord.gg/VkQYXAZ" rel="noopener" target="_blank">Discord!</a>
                        </p>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col>
                        <p class="text-h5">Building methods</p>
                        <v-btn dark class="mx-2" color="ryu_blue" to="/build">
                          <v-icon class="ml-n1 mr-2">fas fa-code</v-icon>.NET
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
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
  extraPagesInfo(path: "/download") {
    path
    title
    keywords
  }
}
</page-query>

<script>
export default {
  data() {
    return {
      winDownloadURL: "",
      linuxDownloadURL: "",
      macDownloadURL: "",
      isLoading: true,
      version: "Loading ...",
      macos_notice: "Currently not supported (Support planned)",
      jobId_profiled: ""
    };
  },

  methods: {
    async fetchDownloadURL() {
      this.isLoading = true;

      let _f = await fetch(
        "https://api.github.com/repos/Ryujinx/release-channel-master/releases/latest"
      );
      let json = await _f.json();

      for (var i = 0; i < json.assets.length; i++) {
        var asset = json.assets[i];

        // Ignore SDL2 headless for now (TODO: integrate that someday)
        if (asset.name.startsWith("ryujinx-headless-sdl2"))
        {
          continue;
        }

        if (asset.name.endsWith("win_x64.zip"))
        {
          this.winDownloadURL = asset.browser_download_url;
        }
        if (asset.name.endsWith("linux_x64.tar.gz"))
        {
          this.linuxDownloadURL = asset.browser_download_url;
        }
      }

      this.version = json.name;

      this.isLoading = false;
    },

    trackDownload() {
      this.$ga.event({
        eventCategory: 'release',
        eventAction: 'download',
        eventLabel: this.version
      });
    }
  },

  mounted() {
    this.fetchDownloadURL();
  }
};
</script>
