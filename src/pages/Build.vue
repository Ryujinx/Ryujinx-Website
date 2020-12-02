<template>
  <Layout>
    <div>
      <section>
        <v-row class="my-5" align="center">
          <v-container fluid>
            <v-row align="start" justify="center">
              <v-col cols="12" md="6">
                <div class="text-center">
                  <p class="display-1">Building Ryujinx:</p>
                  <span class="subheading">
                    <v-row align="start" justify="center">
                      <v-col cols="12">
                        <p class="mt-4 title">Step one:</p>
                        <p>
                          Download NET Core
                          <a
                            href="https://dotnet.microsoft.com/download/dotnet/5.0"
                            rel="noopener"
                            target="_blank"
                          >here</a>. Then install the SDK.
                        </p>
                      </v-col>
                      <v-col cols="12" md="6">
                        <p class="mt-4 title">Step two (Variant one):</p>
                        <p>
                          After the installation of the Net Core SDK is done; go ahead and copy the Clone link from GitHub from
                          <a href="https://github.com/Ryujinx/Ryujinx" rel="noopener" target="_blank">here</a> (via Clone or Download --> Copy HTTPS Link. Or you can download the ZIP tarball.)
                          You can Git Clone the repo by using the GitBash, or you may use the second variant.
                        </p>
                      </v-col>
                      <v-col cols="12" md="6">
                        <p class="mt-4 title">Step two (Variant two):</p>
                        <p>Download the ZIP Tarball. Then extract it to a directory of your choice.</p>
                      </v-col>
                      <v-col cols="12">
                        <p class="mt-4 title">Step three:</p>
                        <p>
                          Build the App using a Command prompt in the ROOT directory. You can quickly access it by Holding shift in explorer (in the Ryujinx directory) then right clicking,
                          and typing the following command
                          <code>dotnet publish -c Release -r win10-x64</code>.
                          The build directory is "root/bin/release/etc/etc."
                        </p>
                      </v-col>
                    </v-row>
                  </span>
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
  extraPagesInfo(path: "/build") {
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
      version: "Loading ..."
    };
  }
};
</script>
