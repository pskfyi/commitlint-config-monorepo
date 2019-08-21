# commitlint-config-monorepo

An opinionated, shareable `commitlint` config based on conventional commits, tailored to monorepos. It is intended to benefit repo maintainers over external consumers.
Use with [@commitlint/cli](https://npm.im/@commitlint/cli).

## Differences from Conventional Commits

Invalid:

```sh
echo "fix: some message" # a (scope) is required
echo "docs(core): some message" # docs type removed; now is a default (scope)
echo "revert(repo): some message" # revert and perf types removed; use refactor
```

Valid:

```sh
echo "fix(docs): Sandbox re-renders as expected" # uppercase subject allowed
echo "refactor(core): now uses Typescript; provided interfaces." # period allowed
echo "config(app): added namespacing to PostCSS" # new type: config
```

## Getting started

> **note:** see [this gist](https://gist.github.com/pskfyi/497fbcc10a0625c716d30995fe336947) for setting up commitlint and husky.

```sh
npm i -D commitlint-config-monorepo
```

In `commitlint.config.js` at the root of your repo:

```js
module.exports = {
  extends: ['monorepo'],
  rules: {
    'scope-enum': [
      2, // throw error
      'always', 
      [
        // list your scopes here
        // defaults to 'docs' and 'repo'
      ]
    ]
  }
}
```

## FAQ

### Why not `@commitlint/config-conventional`?

- In all other contexts, we use capital letters at the beginnings of statements. Commits aren't special.

- Requiring scope provides consistency and discourages haphazard commits that would apply to multiple scopes

- Types 'revert' and 'perf' both are varieties of refactor, no need for additional types

- Elaborate docs, often found in monorepos, function more as a scope than a type; they can have their own feats, fixes, styles, tests, ci, and builds

- Changing config files, especially babel and webpack files, is not a 'chore' - a dedicated type is desirable

### Why not use `@commitlint/config-lerna-scopes` or a similar pattern?

- Preference for explicit scope naming

- Desire to call out non-package scopes; the config defaults to 'docs' and 'repo' scopes

- Lerna package names can sometimes be more verbose than is desirable in a commit message; '@my-org-name/projectname-packagename' is a common pattern, and `@commitlint/config-lerna-scopes` will only trim off '@my-org-name'

## Rules

The following rules will yield a non-zero exit code when not met. Consult [docs/rules](https://conventional-changelog.github.io/commitlint/#/reference-rules) for a list of available rules.


#### type-empty
- `type` cannot be empty

```sh
echo ": some message" # fails
echo "fix: some message" # passes
```

#### type-case
- `type` must be lower case

```sh
echo "FIX: some message" # fails
echo "fix: some message" # passes
```

#### type-enum
- `type` must be one of the following:

  ```js
  'build',
  'ci',
  'chore',
  'feat',
  'fix',
  'refactor',
  'style',
  'test',
  'config'
  ```

```sh
echo "foo: some message" # fails
echo "fix: some message" # passes
```

#### scope-empty
- `scope` cannot be empty

```sh
echo "fix: some message" # fails
echo "fix(core): some message" # passes
```

#### scope-case
- `scope` must be lower case

```sh
echo "fix(SCOPE): some message" # fails
echo "fix(scope): some message" # passes
```

#### scope-enum
> **note** - you should override this and provide additional scopes

- `scope` must be one of the following:

  ```js
  'repo',
  'docs'
  ```

```sh
echo "foo(bar): some message" # fails
echo "fix(docs): some message" # passes
```

#### subject-empty
* `subject` cannot be empty

```sh
echo "fix:" # fails
echo "fix: some message" # passes
```

#### header-max-length
* `header` cannot be longer than 72 characters
```sh
echo "fix: some message that is way too long and breaks the line max-length by several characters" # fails
echo "fix: some message" # passes
```
