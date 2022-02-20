# Gitfox.novaextension

These are my development notes on this extension.
For extension information go to [./Gitfox.novaextension](/Gitfox.novaextension).

This is a Nova extension written in [TypeScript](https://www.typescriptlang.org)
which is bundled with [esbuild](https://esbuild.github.io)
and formatted with [Prettier](https://prettier.io).

## setup

To work on the extension, you will need to have [Node.js](https://nodejs.org/en/) (version 16+)
and [Nova](https://nova.app) installed on your development machine. Then run:

```sh
# cd to/this/folder

# Install NPM development dependencies
npm install
```

## developing

Chose the **Development** task in Nova and run it.
It compiles the TypeScript and activates the extension in Nova for testing.

> It may take a few seconds before the command is registered.

When in development mode, the extension outputs extra information to the Debug Pane,
which can be shown with **View → Show Debug Pane**.

### code formatting

This repository uses [Prettier](https://prettier.io/),
[yorkie](https://www.npmjs.com/package/yorkie)
and [lint-staged](https://www.npmjs.com/package/lint-staged) to
automatically format code when staged in a git commit.
So code that is pushed to the repository is always consistently formatted.

You can manually run the formatter with the **Format** Nova task if you want.

Prettier ignores files using [.prettierignore](/.prettierignore)
or skips lines after a `// prettier-ignore` comment.

## release

- Ensure git is clean
- Ensure the `CHANGELOG.md` is up-to-date
- Generate new screenshots if needed
- Run the **Development** build
- Bump the version in extension.json
- Commit as `X.Y.Z`
- Tag the commit as `vX.Y.Z`
- Remove `Gitfox.novaextension/node_modules`
- **Extensions → Submit to the Extension Library...**
