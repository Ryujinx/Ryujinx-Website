{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      wesbite_overlay = final: prev: {
        ryujinx-website = with final;
          buildNpmPackage rec {
            pname = "ryujinx-website";
            version = "3.1.0";

            src = self;

            npmBuildScript = "build";

            npmDepsHash = "sha256-uOYvvWaBdZeMbHZ6kooe8OPmaiLjns+KpXN9Y2SPVqk=";

            installPhase = ''
              cp -r dist $out/
            '';
          };
      };
    in flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ self.overlays."${system}" ];
        };
      in {
        packages = {
          default = self.packages.${system}.ryujinx-website;
          ryujinx-website = pkgs.ryujinx-website;
        };

        overlays = wesbite_overlay;

        nixosModules.ryujinx-website = { pkgs, lib, config, ... }: {
          options = let inherit (lib) mkEnableOption mkOption types;
          in {
            services.ryujinx-website = {
              enable = mkEnableOption (lib.mdDoc "Ryujinx Website Server");

              hostname = mkOption {
                type = types.str;
                default = "ryujinx.org";
                description = lib.mdDoc ''
                  The hostname to use to host Ryujinx Website.
                '';
              };

              flathubToken = mkOption {
                type = types.str;
                description = lib.mdDoc ''
                  The FlatHub token used for validation of the Ryujinx app on beta.flathub.org.
                '';
              };
            };
          };

          config = let cfg = config.services.ryujinx-website;
          in lib.mkIf cfg.enable {
            nixpkgs.overlays = [ self.overlays."${system}" ];

            services.nginx.virtualHosts."${cfg.hostname}" = let
            in {
              forceSSL = true;
              enableACME = true;

              locations."/" = {
                root = pkgs.ryujinx-website;
                index = "index.html";
                tryFiles = "$uri $uri/ /index.html";
              };

              locations."/robots.txt" = { root = pkgs.ryujinx-website; };

              locations."= /.well-known/org.flathub.VerifiedApps.txt".extraConfig =
                ''
                  add_header Content-Type application/txt;
                  add_header Access-Control-Allow-Origin *;
                  return 200 '${cfg.flathubToken}';
                '';
              locations."/faq".extraConfig =
                "return 302 https://github.com/Ryujinx/Ryujinx/wiki/FAQ-and-Troubleshooting;";
            };
          };
        };

        checks = {
          vmTest = with import (nixpkgs + "/nixos/lib/testing-python.nix") {
            inherit system;
          };
            makeTest {
              name = "ryujinx-website nixos module testing ${system}";

              nodes = {
                client = { ... }: {
                  imports = [ self.nixosModules.${system}.ryujinx-website ];

                  services.nginx.enable = true;
                  services.ryujinx-website = {
                    enable = true;
                    flathubToken = "Tea is great!";
                  };
                  security.acme = {
                    acceptTerms = true;

                    defaults = { email = "dummy@website.com"; };
                  };
                };
              };

              testScript = ''
                start_all()
                client.wait_for_unit("multi-user.target")
                client.wait_until_succeeds("curl --insecure --fail --header 'Host: ryujinx.org' https://localhost/")
              '';
            };

        };

        formatter = pkgs.nixfmt;
      });
}

