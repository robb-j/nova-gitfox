**Gitfox Extension** provides a command to open the current workspace's git repository in [Gitfox](https://www.gitfox.app).

## Requirements

Gitfox Extensions relies on GitFox and its Command Line Utilities being installed.
Follow these steps:

1. Open Gitfox.app
2. Navigate to **Gitfox → Preferences** via the menu bar
3. Go to the **Integration** tab
4. Under **Command Line Utility** click **Install**.
   You may be prompted for your mac's login for permission to install the binary.

## Usage

Select **Extensions → Open in Gitfox** or open the command pallet and type **Open in Gitfox**.
If you don't have Gitfox's Command Line Utilities installed, you will be prompted to do so.

## Entitlements

Gitfox Extension uses:

- `process` is used to locate and run the `gitfox` binary which lets it open repositories
- `filesystem/readonly` is used to check your current workspace is a git repository and validate custom `gitfox` paths if you set one in [configuration](#configuration).

## Configuration

You can specify a custom path for the `gitfox` binary if you like.
To do this, open up **Extensions → Extension Library...** then select Gitfox's **Preferences** tab
and enter your custom path.
Gitfox Extension will check the binary is executable for running it.
