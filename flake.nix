{
  description = "Arizona Institute for Autism Astro development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];

      forAllSystems =
        function: nixpkgs.lib.genAttrs supportedSystems (system: function nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (
        pkgs:
        let
          developmentPackages = with pkgs; [
            nodejs_24
            git
            curl
            jq
            ripgrep
            fd
            python3
          ];
        in
        {
          default = pkgs.mkShell { packages = developmentPackages; };
        }
        // pkgs.lib.optionalAttrs pkgs.stdenv.hostPlatform.isLinux {
          # Keep driver and browser revisions paired through the existing lockfile.
          # Opt-in so ordinary content editing does not require browser downloads.
          browser = pkgs.mkShell {
            packages = developmentPackages ++ [ pkgs.playwright-driver ];
            PLAYWRIGHT_MODULE = "${pkgs.playwright-driver}/index.mjs";
            PLAYWRIGHT_BROWSERS_PATH = pkgs.playwright-driver.selectBrowsers {
              withFirefox = false;
              withWebkit = false;
              withFfmpeg = false;
            };
            PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
            # Nix supplies browser libraries via patched runtime paths, not apt.
            PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
            FONTCONFIG_FILE = pkgs.makeFontsConf {
              fontDirectories = with pkgs; [
                dejavu_fonts
                liberation_ttf
                noto-fonts
              ];
            };
            ASTRO_TELEMETRY_DISABLED = "1";
          };
        }
      );

      formatter = forAllSystems (pkgs: pkgs.nixfmt);
    };
}
