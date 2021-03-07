<template>
  <Layout>
    <div>
      <section>
        <v-row class="my-5" align="center">
          <v-container fluid>
            <v-row align="start" justify="center">
              <v-col cols="12" md="6">
                <div class="text-center">
                  <p class="display-1">Building Ryujinx and latest downloads</p>
                  <v-container>
                    <v-row align="start" justify="center">
                      <v-img :max-height="300" :max-width="500" position="text-center" src="/public/shell.png" alt="Shell" />
                    </v-row>
                    <v-row align="start" justify="center">
                      <v-col>
                        <div class="text-h5">
                          Automatically compiled builds
                        </div>
                        <p>
                          <v-btn
                            text
                            small
                            target="_blank"
                            rel="noopener"
                            href="https://ci.appveyor.com/project/gdkchan/ryujinx?branch=master"
                          >
                            <g-image
                              width="140"
                              src="https://ci.appveyor.com/api/projects/status/ssg4jwu6ve3k594s?svg=true"
                              alt="AppVeyor Badge"
                            />
                          </v-btn>
                        </p>

                        <DownloadButton
                          color="orange"
                          platform="windows"
                          :version="version"
                          disabled="false"
                          :href="`${downloadURL}-win_x64.zip`"
                          :click="trackDownload"
                          :loading="isLoading"
                        />

                        <DownloadButton
                          color="orange"
                          platform="linux"
                          disabled="false"
                          :version="version"
                          :href="`${downloadURL}-linux_x64.tar.gz`"
                          :click="trackDownload"
                          :loading="isLoading"
                        />

                        <DownloadButton
                          color="orange"
                          platform="apple"
                          disabled="true"
                          :version="Coming soon"
                          :href="`${downloadURL}-osx_x64.zip`"
                          :click="trackDownload"
                          :loading="isLoading"
                        />
                          
                        <p class="mt-4">
                          <v-btn dark depressed small color="yellow darken-4" href="https://github.com/Ryujinx/Ryujinx/wiki/Changelog" rel="noopener" target="_blank">
                            Changelog
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
                        <p class="text-h5">Building methods</p>
                        <v-btn dark class="mx-2" color="ryu_blue" to="/build">
                          <v-icon class="ml-n1 mr-2">fas fa-code</v-icon>.NET Core
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
      downloadURL: "",
      isLoading: true,
      version: "Loading ...",
      showProfiledBuilds: false,
      jobId_profiled: ""
    };
  },

  methods: {
    async fetchDownloadURL() {
      this.isLoading = true;

      let _f = await fetch(
        "https://ci.appveyor.com/api/projects/gdkchan/ryujinx/branch/master"
      );
      let json = await _f.json();

      this.version = json.build.version;

      const jobId = json.build.jobs[0].jobId;

      this.downloadURL = `https://ci.appveyor.com/api/buildjobs/${jobId}/artifacts/ryujinx-${this.version}`;

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
