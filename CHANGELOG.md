# Changelog

All notable changes to ax-sh webpage will be documented in this file.

## [unreleased]

### 🚀 Features

- *(go.service)* Add code quality tools installation logic [`382d901`](https://github.com/ax-sh/ax-sh.github.io/commit/382d9018b6501c71f07d7e0bfc7fa12bbb9df4aa)
- *(go)* Add code quality tools installation instructions [`f5705b7`](https://github.com/ax-sh/ax-sh.github.io/commit/f5705b765240584e2414729fd2dde61ba72d76ad)
- *(go)* Add repository validation in addCodeQualityTools [`74d62bc`](https://github.com/ax-sh/ax-sh.github.io/commit/74d62bca42020b4e511e60813858109c47c94b7f)

### 🚜 Refactor

- Clean up imports and formatting in code files [`d41d101`](https://github.com/ax-sh/ax-sh.github.io/commit/d41d101cddeb8a3f79908fcac1d462b11f467f5a)

### 🧪 Testing

- *(go)* Add tests for mocked filesystem and cmd output [`115b086`](https://github.com/ax-sh/ax-sh.github.io/commit/115b086780994494812d20e20ce0dce1e1b7100c)

### ⚙️ Miscellaneous Tasks

- Format files before release [`061c52e`](https://github.com/ax-sh/ax-sh.github.io/commit/061c52e950cc0be39ffeec0ae254ec3de1977431)

## [[0.10.0] - 2025-03-21](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.10.0)


### 🚀 Features

- *(command)* Update import path and log output message [`f43bb14`](https://github.com/ax-sh/ax-sh.github.io/commit/f43bb143b9123f1b395dda920fbd7d37b8a8816a)
- *(issues)* Add issues command and service implementation [`862ab9d`](https://github.com/ax-sh/ax-sh.github.io/commit/862ab9d464320da9a124045f7e48a082d1d5ce6c)
- *(issues)* Add create issue functionality and tests [`a4313ae`](https://github.com/ax-sh/ax-sh.github.io/commit/a4313ae3ecf53bbdc95b97dd25aab77798950e0c)
- Add spacetime for issue timestamps formatting [`045e959`](https://github.com/ax-sh/ax-sh.github.io/commit/045e959e7655b793af7e84980b5956ef348829b1)
- *(git-cliff)* Update git cliff scripts with options [`0952072`](https://github.com/ax-sh/ax-sh.github.io/commit/09520724fc2f73c950c25d0aefb309352e49306c)

### 🐛 Bug Fixes

- *(issues)* Stringify output in highlight message [`fe95512`](https://github.com/ax-sh/ax-sh.github.io/commit/fe9551261d81f072c09cc96df0c4a95f59db878c)

### 🚜 Refactor

- *(issues)* Simplify command implementation [`0e3477a`](https://github.com/ax-sh/ax-sh.github.io/commit/0e3477a1c49edc609da6f5fe0c2827ccf26b12c8)

### 🎨 Styling

- *(command)* Format code for better readability [`1105c99`](https://github.com/ax-sh/ax-sh.github.io/commit/1105c99ebb19a89886a88916f53740b101bbadce)

### 🧪 Testing

- *(issues)* Update tests for issue creation functionality [`e6d99b5`](https://github.com/ax-sh/ax-sh.github.io/commit/e6d99b584ba5a064dd04813725c4db6ee89a3adf)
- *(issues)* Add tests for createIssue functionality [`b1165e6`](https://github.com/ax-sh/ax-sh.github.io/commit/b1165e6d3ec422bd949d7377ed8323e0783b525d)
- Update import for gluegun in issue tests [`283be72`](https://github.com/ax-sh/ax-sh.github.io/commit/283be720e2312aea12d94994fada748486a5b722)
- Update gluegun import and mark test as todo [`d62633e`](https://github.com/ax-sh/ax-sh.github.io/commit/d62633eb6fa51d7c5d51f3ba6a1258331151b514)

### ⚙️ Miscellaneous Tasks

- Update git cliff commands in package.json [`8ee0d40`](https://github.com/ax-sh/ax-sh.github.io/commit/8ee0d4043768ed2ec8246f8ca4890b2d815848f4)
- Format files before release [`10562f0`](https://github.com/ax-sh/ax-sh.github.io/commit/10562f027906002de6961e80957a4972ca2ea71a)
- Add CHANGELOG [`11c39e9`](https://github.com/ax-sh/ax-sh.github.io/commit/11c39e97fc00ddb535594e88300d2c6b83f86643)

## [[0.9.0] - 2025-03-21](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.9.0)


### 🚀 Features

- Add git-cliff configuration template and commands [`2fefe71`](https://github.com/ax-sh/ax-sh.github.io/commit/2fefe713c840c334f62043b7f61187265674f3b0)
- *(generate)* Add test file generation for commands [`5970c76`](https://github.com/ax-sh/ax-sh.github.io/commit/5970c76686d6351ad5821b5db67b8203003b805c)
- Update test template [`58a23ba`](https://github.com/ax-sh/ax-sh.github.io/commit/58a23ba1f0a730e9e6e0acb31ec9f4359dbf9d15)
- *(prettier)* Add configuration files for Prettier [`b52bb13`](https://github.com/ax-sh/ax-sh.github.io/commit/b52bb133e89eac3d314b8d105bdd9916a84e75a3)
- Update test template [`c2202e2`](https://github.com/ax-sh/ax-sh.github.io/commit/c2202e20fc6d493370c3879ab04f836fb4eb4ee6)
- Add addScriptToPackageJson to lib [`07c3b6a`](https://github.com/ax-sh/ax-sh.github.io/commit/07c3b6ae11e050915cc6a1624c26aefa80b38875)
- Add prettier sub command [`ae385e8`](https://github.com/ax-sh/ax-sh.github.io/commit/ae385e8c0554071516ba235d0b71199e0b81c87a)

### 🚜 Refactor

- Improve error message formatting in cli.ts [`5edd12b`](https://github.com/ax-sh/ax-sh.github.io/commit/5edd12b6adb8853269dde93f729952cc0feebea9)
- Reorder git-cliff script addition logic [`9dd24c4`](https://github.com/ax-sh/ax-sh.github.io/commit/9dd24c4302d331f8ef8911bb5454e988c0c90e95)
- Rename git-cliff service and update imports [`744c7c4`](https://github.com/ax-sh/ax-sh.github.io/commit/744c7c4dc052133f35518fbbbabd6a7d8df13c91)
- Update service and test paths in generateNewCmdPath [`94ff722`](https://github.com/ax-sh/ax-sh.github.io/commit/94ff722c4efae21c645659b1f889318d559e94a1)
- *(git)* Move git service to a subdirectory [`103fa64`](https://github.com/ax-sh/ax-sh.github.io/commit/103fa64d307805ea4df612143d6dfddfcc23fcda)
- *(cmd)* Rename getTrimmedFromCmdOutput to exeCmdWithOutput [`a0a3648`](https://github.com/ax-sh/ax-sh.github.io/commit/a0a364847f5f6071853588650a7fd6c9f4af72f2)

### 🎨 Styling

- *(eslint)* Disable toml array-bracket-newline rule [`b7f283f`](https://github.com/ax-sh/ax-sh.github.io/commit/b7f283fd7478a650834d3dbb14d2e306b57ed10f)

### 🧪 Testing

- *(lib)* Add tests for generated service paths [`24c27ee`](https://github.com/ax-sh/ax-sh.github.io/commit/24c27eeee25437778ebef2d0fbe3f199231e5f04)

### ⚙️ Miscellaneous Tasks

- Format files before release [`42f6247`](https://github.com/ax-sh/ax-sh.github.io/commit/42f6247974b9a0655d7389c9a1ce66746608066f)
- Add CHANGELOG [`8305042`](https://github.com/ax-sh/ax-sh.github.io/commit/8305042a8f34126f8a09cf12f046ff40c6e7fbab)

## [[0.8.0] - 2025-03-20](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.8.0)


### 🚀 Features

- Add gh list command [`79fc137`](https://github.com/ax-sh/ax-sh.github.io/commit/79fc137e21c357d63b7f57dad75effedf9605916)
- Add getTrimmedFromCmdOutput [`0df7528`](https://github.com/ax-sh/ax-sh.github.io/commit/0df7528df658c6a735c2c2863be62d5f8eeaea1d)
- *(gh-tag)* Add new gh-tag command implementation [`c5b63b8`](https://github.com/ax-sh/ax-sh.github.io/commit/c5b63b8c56475b530c388ebb0f97a76793960a36)
- *(gh)* Rename command to 'list' with aliases 'ls' and 'l' [`9f326ad`](https://github.com/ax-sh/ax-sh.github.io/commit/9f326ad820520e1f2b49abf7e277a27ebbdd7fb0)
- *(gh-tag)* Implement tag and release functionality [`07cd4a4`](https://github.com/ax-sh/ax-sh.github.io/commit/07cd4a4dba8eb66a318f5f46117b9f8846f78945)
- Add git-cliff command and service implementation [`a7aeff6`](https://github.com/ax-sh/ax-sh.github.io/commit/a7aeff611d67de48a515bdc49169f2940f122349)
- Add git cliff scripts with highlighted output [`70f6015`](https://github.com/ax-sh/ax-sh.github.io/commit/70f60159e8b48597696c0204bff3e56c55deb24e)
- Add cross-platform tag and release functionality [`8d5925f`](https://github.com/ax-sh/ax-sh.github.io/commit/8d5925fa69f69d5b8c27a6453fba32a40f833bf2)
- Add descriptions and aliases to commands [`cb9e91a`](https://github.com/ax-sh/ax-sh.github.io/commit/cb9e91a77af001198b2913b1c6f910b22f6f3bd5)

### 🚜 Refactor

- *(cli)* Simplify command execution with helper function [`f6bf425`](https://github.com/ax-sh/ax-sh.github.io/commit/f6bf4252fda320ed97541737fc456762ad865a42)
- *(cli)* Add return types to async functions [`0aed3d5`](https://github.com/ax-sh/ax-sh.github.io/commit/0aed3d540e091de575651af744c8a1a2c9fe8770)
- *(git-cliff)* Streamline git-cliff command logic [`ecc9919`](https://github.com/ax-sh/ax-sh.github.io/commit/ecc99192cb1301c85b0a32419ca9a2ff6e3f00f3)

### 🧪 Testing

- *(cli)* Add unit tests for CLI helper functions [`32d6222`](https://github.com/ax-sh/ax-sh.github.io/commit/32d62222121e396fc741fc0751d0e03521148a66)
- *(cli)* Improve error handling in cli tests [`5e76968`](https://github.com/ax-sh/ax-sh.github.io/commit/5e7696856900a6d8b4aaf8c407fce6bbf55b2908)

### ⚙️ Miscellaneous Tasks

- Add git cliff commands to package.json scripts [`112e731`](https://github.com/ax-sh/ax-sh.github.io/commit/112e731fb7b152c2db3b271327bff018c00acdd0)
- Format files before release [`0a055b7`](https://github.com/ax-sh/ax-sh.github.io/commit/0a055b7ba98c981ff152846848917cc702d5e4b1)
- Add CHANGELOG [`b1f425d`](https://github.com/ax-sh/ax-sh.github.io/commit/b1f425d1ee09d9bf72008be506e77a5c86287067)

## [[0.7.0] - 2025-03-18](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.7.0)


### 🎨 Styling

- Fix formatting and remove unnecessary semicolons [`da70241`](https://github.com/ax-sh/ax-sh.github.io/commit/da7024139249023bf043aa8731318f262c9d5f26)

### ⚙️ Miscellaneous Tasks

- Update ts-morph-kit dependency and test description [`78091ec`](https://github.com/ax-sh/ax-sh.github.io/commit/78091ec256d07aacae027ec5ab5d31cee18c1615)
- Update npm publish command comment for clarity [`c10cf58`](https://github.com/ax-sh/ax-sh.github.io/commit/c10cf58e0ef77aa8cbc52eb2b5afb62d96b03cca)
- Update dependencies and modify tests [`d3fc310`](https://github.com/ax-sh/ax-sh.github.io/commit/d3fc3100ce0da536c10861f2fd6e04b77e53926d)
- Update dependencies and eslint rules configuration [`666887f`](https://github.com/ax-sh/ax-sh.github.io/commit/666887f5e082120c5d6d2e79448af1e0e30ed9ea)
- Format files before release [`430d9fa`](https://github.com/ax-sh/ax-sh.github.io/commit/430d9fa6526d57cb63231b217a30857eefc1fb02)
- Add CHANGELOG [`0993b41`](https://github.com/ax-sh/ax-sh.github.io/commit/0993b41831c278c05dbd23ca9ea94d2df267e68f)

## [[0.6.0] - 2025-03-17](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.6.0)


### 🚀 Features

- *(npm)* Implement publish to GitHub private registry [`e52c14a`](https://github.com/ax-sh/ax-sh.github.io/commit/e52c14a8b5d37dc5e27aa8fc994f11e0af2659a5)

### 🚜 Refactor

- *(gh-pages)* Organize file structure and imports [`f7f7ad9`](https://github.com/ax-sh/ax-sh.github.io/commit/f7f7ad92b318e036d0095dfab74eb6e26353f87c)

### 🎨 Styling

- *(eslint)* Update no-console rule to allow more methods [`825bd13`](https://github.com/ax-sh/ax-sh.github.io/commit/825bd132d3c0a109283059c876d3f5c57f0ec598)

### 🧪 Testing

- *(gh-pages)* Add initial test for gh-pages module [`c69ef59`](https://github.com/ax-sh/ax-sh.github.io/commit/c69ef5983ee68ddacca192a082c6bf33ae503b0a)

### ⚙️ Miscellaneous Tasks

- Update knip config and package dependencies [`1f1355a`](https://github.com/ax-sh/ax-sh.github.io/commit/1f1355aee6bb5afffd45462e2a7d778f31bc1a7d)
- Update ts-morph-kit version and modify test description [`c725862`](https://github.com/ax-sh/ax-sh.github.io/commit/c725862f06dd2436f261b20878b386c0b7af37e0)
- Format files before release [`b5e979c`](https://github.com/ax-sh/ax-sh.github.io/commit/b5e979c98cf2ec76904a6dc97751386e1c3e331a)
- Add CHANGELOG [`4248c57`](https://github.com/ax-sh/ax-sh.github.io/commit/4248c57fb8e2fee5fe4c02a811834aa86a9891bc)

## [[0.5.0] - 2025-03-17](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.5.0)


### ⚙️ Miscellaneous Tasks

- Update tag command in package.json [`72a724b`](https://github.com/ax-sh/ax-sh.github.io/commit/72a724bf1a361a99b753ad9e43d6b7aa8e1d287a)
- Format files before release [`ad98d54`](https://github.com/ax-sh/ax-sh.github.io/commit/ad98d5466a86e05771859cec54f577db6b42b37c)
- Add CHANGELOG [`650e691`](https://github.com/ax-sh/ax-sh.github.io/commit/650e69135f4615c9fc972a997374fbaa254fad39)

### Build

- Add tag command to package.json scripts [`f8724ee`](https://github.com/ax-sh/ax-sh.github.io/commit/f8724eea0d4325b95b74a2fc65bf8fb18763b424)

## [[0.4.0] - 2025-03-17](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.4.0)


### 🚀 Features

- *(git)* Add tag command and bumped version service function [`5c09b51`](https://github.com/ax-sh/ax-sh.github.io/commit/5c09b514ed34ad9a09baea572c828ad023a14ccb)

### ⚙️ Miscellaneous Tasks

- Format files before release [`f8490de`](https://github.com/ax-sh/ax-sh.github.io/commit/f8490de15cfb9f59c5dc642dc9aec0980dad52d2)
- Add CHANGELOG [`3aa15ac`](https://github.com/ax-sh/ax-sh.github.io/commit/3aa15acb02b75c59e8900a052910b1e418c9f31c)

## [[0.3.0] - 2025-03-17](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.3.0)


### 🚜 Refactor

- *(gh-pages)* Simplify command parameters handling [`491532f`](https://github.com/ax-sh/ax-sh.github.io/commit/491532fae240a534535cd84e424453e867731f12)

### ⚙️ Miscellaneous Tasks

- Format files before release [`47e2e36`](https://github.com/ax-sh/ax-sh.github.io/commit/47e2e36fe9d1e5ff7b495cf28d3eac6d91c020ae)
- *(release)* Update changelog command for unreleased entries [`8b3dd85`](https://github.com/ax-sh/ax-sh.github.io/commit/8b3dd85f9e8c05d25cd5a5c36b97a29f753eb0ef)
- *(release-it)* Update changelog command in config [`7a7f0c7`](https://github.com/ax-sh/ax-sh.github.io/commit/7a7f0c7274cc6bc99719160eaa26f416878c82b0)
- Format files before release [`2b512b6`](https://github.com/ax-sh/ax-sh.github.io/commit/2b512b67dbe41fdc762fb206e4e5bd50fdda33d6)
- Add CHANGELOG [`530868b`](https://github.com/ax-sh/ax-sh.github.io/commit/530868b15a9eae9d0402a15ec6b19cf24f148612)

## [[0.2.0] - 2025-03-17](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.2.0)


### 🚀 Features

- Add release-it bumper plugin and update tests [`e81af5d`](https://github.com/ax-sh/ax-sh.github.io/commit/e81af5dbb1c1592aad8362b4ac707f18f2030ebd)

### 🧪 Testing

- Update version checks in integration tests [`eac205a`](https://github.com/ax-sh/ax-sh.github.io/commit/eac205a98253598f40b78cbb9ec264eda822a47b)

### ⚙️ Miscellaneous Tasks

- Update changelog configuration and content [`f9bd8a4`](https://github.com/ax-sh/ax-sh.github.io/commit/f9bd8a454a356b5945f501cd4ced2bf8bb96848a)
- Update eslint ignore list to include cliff.toml [`a95e301`](https://github.com/ax-sh/ax-sh.github.io/commit/a95e301073115c609439660fa5ac828b3f57a2c7)
- Format files before release [`7037183`](https://github.com/ax-sh/ax-sh.github.io/commit/70371839534db99ad8b579265f433be1efb94b3a)
- Add CHANGELOG [`2c67a75`](https://github.com/ax-sh/ax-sh.github.io/commit/2c67a752fdb464406d696746bb6bff79b7edafd0)

## [[0.1.0] - 2025-03-17](https://github.com/ax-sh/ax-sh.github.io/releases/tag/0.1.0)


### 🚀 Features

- Add extend command for opening project in WebStorm [`279d6ff`](https://github.com/ax-sh/ax-sh.github.io/commit/279d6ffb7e92a72a5902d6f55c4f94d8c09e7673)
- Add knip [`618deba`](https://github.com/ax-sh/ax-sh.github.io/commit/618debaa7ac600e8b262a24b0c577b690f503c66)
- *(git)* Add git-who and git command implementations [`0cf29db`](https://github.com/ax-sh/ax-sh.github.io/commit/0cf29db883f09899342f409cc93c73f62b134320)
- Add gh-pages and path commands with services [`7147136`](https://github.com/ax-sh/ax-sh.github.io/commit/7147136333dc3bfedf573521bf29b14e37a4602e)
- *(npm)* Add publish command and npm service function [`2e7f24c`](https://github.com/ax-sh/ax-sh.github.io/commit/2e7f24ce520470c54264c65a762acf329605a803)

### 🚜 Refactor

- Rename generate command to add and update paths [`71c9be8`](https://github.com/ax-sh/ax-sh.github.io/commit/71c9be83f4640f773c408e7a9280118392ba6e3b)
- *(command)* Update import path and change module export [`8187a21`](https://github.com/ax-sh/ax-sh.github.io/commit/8187a21638f0513504c9318219d04614f281d7a3)
- Update eslint config and improve test cases [`704c5cc`](https://github.com/ax-sh/ax-sh.github.io/commit/704c5ccb9c024f4a01075bada55639240c5caee7)
- *(commands)* Rename add command to generate [`b9a36fa`](https://github.com/ax-sh/ax-sh.github.io/commit/b9a36fa97214696ec000bc61921b6ee9d0642cce)
- Simplify git command and add execa import function [`1bfaedc`](https://github.com/ax-sh/ax-sh.github.io/commit/1bfaedc7bbf60f247a0d71da19acf2cb439a4e98)

### 📚 Documentation

- Add usage note for compiled build version [`b89db3a`](https://github.com/ax-sh/ax-sh.github.io/commit/b89db3a7068be0bd1d9e2f21dbb948dac4705727)

### 🎨 Styling

- Update print method and change function to async [`9aa6272`](https://github.com/ax-sh/ax-sh.github.io/commit/9aa62728f834bbe35c5154ad8b43a6165133b1dd)
- Fix formatting and improve code consistency [`8fabb0b`](https://github.com/ax-sh/ax-sh.github.io/commit/8fabb0b43f6fae68f81083ef6a590708a5fbe948)
- Fix formatting and add missing semi-colons [`adfe4fb`](https://github.com/ax-sh/ax-sh.github.io/commit/adfe4fb9f91d32dcda164d46014348d111d3a3b5)

### 🧪 Testing

- *(lib)* Add tests for generateNewCmdPath function [`eb33b6b`](https://github.com/ax-sh/ax-sh.github.io/commit/eb33b6bc3fdc07fb0f18602a8f5b9e4a89f4655f)

### ⚙️ Miscellaneous Tasks

- Update eslint config and add new templates [`52c0183`](https://github.com/ax-sh/ax-sh.github.io/commit/52c01833bbb9e50f5ad4ec2e1c2248592010566e)
- Update knip config and add is-ci dependency [`cefb421`](https://github.com/ax-sh/ax-sh.github.io/commit/cefb42191d246192fb39e4447a62a35ec4bea026)
- Add release-it configuration file [`b80243f`](https://github.com/ax-sh/ax-sh.github.io/commit/b80243f5865eb9234a072a954e64a35f36a8d346)
- Format files before release [`c669e97`](https://github.com/ax-sh/ax-sh.github.io/commit/c669e97e8bca89c78455050629330a322cc7d55b)
- Add CHANGELOG [`1cefe96`](https://github.com/ax-sh/ax-sh.github.io/commit/1cefe964f98627f36ee040f24e4d43f9bc30b77a)

<!-- generated by git-cliff -->
