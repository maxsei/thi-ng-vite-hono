{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/release-24.05";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        fhs = pkgs.buildFHSUserEnv {
          name = "fhs-shell";
          targetPkgs = p: with p; [
            nodePackages.typescript-language-server
          ];
        };
      in { devShell = fhs.env; });
}
