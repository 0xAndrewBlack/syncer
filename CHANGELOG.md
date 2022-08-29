# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.7.1](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.7.1) (2022-08-26)

- 🙏 refactor: All commands in help, sorted by name. ([d53c32](https://github.com/0xAndrewBlack/issue-bot/commit/d53c3222fe7a0323357ffba631418d96ae092f67))
- ✨ feat: Help command. ([acc036](https://github.com/0xAndrewBlack/issue-bot/commit/acc0363409ae457f00d9e3a0602868eb7c413dc8))

## [v0.7.0](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.7.0) (2022-08-25)

- 👄 feat: Stories. ([e5f793](https://github.com/0xAndrewBlack/issue-bot/commit/e5f79319341cf294481907de4c413b3bf024595c))
- ✨ feat: Thread link in issue. ([1dcca0](https://github.com/0xAndrewBlack/issue-bot/commit/1dcca0c81fa73b7fce0842945f3fe5a3c93987f8))
- ✨ feat: Stories added. ([f4d749](https://github.com/0xAndrewBlack/issue-bot/commit/f4d7496f613f11e0b32ca3040436167fcb205edb))

## [v0.6.2](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.6.2) (2022-08-25)

- 🐛 fix: Renaming. ([fc8335](https://github.com/0xAndrewBlack/issue-bot/commit/fc8335f77d844250b085ff38c72bb07629c306a2))
- 🐛 fix: Thread renaming after Done status. ([b0558c](https://github.com/0xAndrewBlack/issue-bot/commit/b0558cb108ed3a1f87b2878cc938fecd39cc83bf))
- 🔥 feat: Removed persistent Done threads. ([44340d](https://github.com/0xAndrewBlack/issue-bot/commit/44340d1cc0fe87def876443dd71ee311fc5e88d2))

## [v0.6.1](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.6.1) (2022-08-25)

- 🙏 fix: Fixed interaction errors. ([40de6b](https://github.com/0xAndrewBlack/issue-bot/commit/40de6b80019c4808a214752767464023318e07c4))
- ✨ feat: Bot with internal sharding bc of small servers. ([e6650f](https://github.com/0xAndrewBlack/issue-bot/commit/e6650f4d9c87dd34e8afbe6ab05018076a518fd2))
- 🔥 feat: Removed Sharding Manager. ([f3184a](https://github.com/0xAndrewBlack/issue-bot/commit/f3184a5a19ebcdb0076568d9250e9acff90bfed4))

## [v0.6.0](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.6.0) (2022-08-25)

- 🐛 fix: Priority fields. ([0dee77](https://github.com/0xAndrewBlack/issue-bot/commit/0dee77746550ed2ec7481b3421fe69348b841212))
- 💄 refactor: Better logging utility. ([c64b8b](https://github.com/0xAndrewBlack/issue-bot/commit/c64b8bace2fd49f3dd7308d7318546b0c3bea68a))
- ⚡️ feat: Changed error handling for different/custom error types. ([586a0f](https://github.com/0xAndrewBlack/issue-bot/commit/586a0ffbe7501703ee1278ccd861646a8187749b))

## [v0.5.1](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.5.1) (2022-08-24)

- 💄 refactor: Guard errors now logged properly. ([46a187](https://github.com/0xAndrewBlack/issue-bot/commit/46a1879b50c6b847f5fb1866f6f54e95e70aac5c))
- 🐛 fix: Fixed status errors and anomalies. ([eab4b3](https://github.com/0xAndrewBlack/issue-bot/commit/eab4b3001e9c7ed46f5d9d31b39dd281b8bbc6b5))
- 🐛 fix: Added env variables to docker-compose. ([022aa2](https://github.com/0xAndrewBlack/issue-bot/commit/022aa2a39af71f77c23740eaa367d2d583131660))

## [v0.5.0](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.5.0) (2022-08-23)

- ✨ feat: Dependabot embed cleaner. ([5d95a9](https://github.com/0xAndrewBlack/issue-bot/commit/5d95a9a9641be54e0755114c46ba3a91f01e4b53))
- ✨ feat: New commands to trash and set issues. ([44b21e](https://github.com/0xAndrewBlack/issue-bot/commit/44b21e80d2fd9eddfb9b131326e450f2aacbcf04))
- ✏️ refactor: Commands refined and fixed permission related problems. ([70860d](https://github.com/0xAndrewBlack/issue-bot/commit/70860ddf7d50258c789862db4e518990b7539091))
- ✏️ fix: Colors are now unified and removed from .env. ([5d7c68](https://github.com/0xAndrewBlack/issue-bot/commit/5d7c685efb6caaf571372579bf127b86cbd62035))
- ✨ feat: New labelling system. ([12b972](https://github.com/0xAndrewBlack/issue-bot/commit/12b9726994b737c248257dd21f89a89168c154c1))
- ✨ feat: Label appender and assignee listing added. ([b9a65d](https://github.com/0xAndrewBlack/issue-bot/commit/b9a65d4233b063b9e05bd38da1d2230f260e4b32))
- ✨ feat: New logging system and simpler bot config. ([336977](https://github.com/0xAndrewBlack/issue-bot/commit/3369777c42cfa6a9139caa70515b8ca3e596fff1))
- ⚡️ refactor: Improved logging and event/command handling. ([edcef6](https://github.com/0xAndrewBlack/issue-bot/commit/edcef649c3d1d14699d4bfbfb7a58317ba2a8af5))
- ⚡️ feat: Improved event structure. ([5b1b47](https://github.com/0xAndrewBlack/issue-bot/commit/5b1b47cd8dacf53ee13bbd61ffb79279d31d9bf9))
- 👽️ fix: Updated codebase due to API and package changes. ([60de05](https://github.com/0xAndrewBlack/issue-bot/commit/60de05c51d9c6ba328a89d7010f8277577d60f4d))
- ✨ feat: Improved Sync command and Issue Sync. ([2874cb](https://github.com/0xAndrewBlack/issue-bot/commit/2874cbacece88c0507157a9893e88be51856c846))
- ⚡️ feat: Added Guard loggers. ([bf1d9c](https://github.com/0xAndrewBlack/issue-bot/commit/bf1d9c5a67922e62f9cfab31ea2507f6cb37fe69))
- ♻️ refactor: Updated VS Code launch task. ([1c172c](https://github.com/0xAndrewBlack/issue-bot/commit/1c172cde1526e79fb1f9fad280f976c8cfaa5be3))
- 📦️ feat: New improved logger. ([0a36d5](https://github.com/0xAndrewBlack/issue-bot/commit/0a36d5d55b93f8f24b6d751e68caa777b11c481f))
- 💚 chore: Fixed typos and updated environment variables. ([b4c0ad](https://github.com/0xAndrewBlack/issue-bot/commit/b4c0ad2e09ee93623d0ee0a7d3cb260822579988))
- ⚡️ feat: Added better Guards. ([a13bae](https://github.com/0xAndrewBlack/issue-bot/commit/a13bae003ba307a2c6df18e547fe9f87a3e0c017))
- 💄 chore: Fixed environment variables. ([44820b](https://github.com/0xAndrewBlack/issue-bot/commit/44820bf1b3c731ac6a2e7f8d2e3ef7486f1cc32e))
- 🚑️ fix: Hopefully fixed fr. ([cd3b47](https://github.com/0xAndrewBlack/issue-bot/commit/cd3b47f79745019a205507be4f2b208e6b485f7a))
- 🐛 fix: Channel logging. ([08e6ed](https://github.com/0xAndrewBlack/issue-bot/commit/08e6ed365b3cccd341788e22d56fe0c78cc83e44))
- ⚡️ fix: Debugging channels. ([199c9f](https://github.com/0xAndrewBlack/issue-bot/commit/199c9f8bc7852130c5f0afde9af8e9a9fac128d4))
- 🐛 fix: Fixed Embed colors, Guards. ([5ea15b](https://github.com/0xAndrewBlack/issue-bot/commit/5ea15b02c7de87e0bfb97ec6701c21a474157bd4))
- 🐛 fix: Fixed permission issues and added Guards. ([379ba5](https://github.com/0xAndrewBlack/issue-bot/commit/379ba52bc6abd3970a417b722e058dfb9ac7a761))
- ✨ feat: Added Guards. ([20752d](https://github.com/0xAndrewBlack/issue-bot/commit/20752dc80968ffe341c4a3781b63fc980c0d60da))
- 📝 revert: Updated README. ([7f3155](https://github.com/0xAndrewBlack/issue-bot/commit/7f315509ea20c49d6cff56e93d2d10894a04cefe))
- 📝 chore: Updated README. ([e069fe](https://github.com/0xAndrewBlack/issue-bot/commit/e069fedaae508af85ec4f2344c861361e07bf408))

## [v0.4.1](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.4.1) (2022-08-17)

- 💚 fix: Added missing environment field. ([2d10dd](https://github.com/0xAndrewBlack/issue-bot/commit/2d10ddf4d17163b94d77752761298feeb20a7606))
- 📦 Deterministic building experience ([68da06](https://github.com/0xAndrewBlack/issue-bot/commit/68da06466a6237594edad469f05f2bbefc465a43))
- ⚙ CI/CD Improvements ([df5bee](https://github.com/0xAndrewBlack/issue-bot/commit/df5bee5b47660604d07820f25eb18d19c8bcff2a))

## [v0.4.0](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.4.0) (2022-08-16)

- ♻️ refactor: Code cleanup. ([6bd9ab](https://github.com/0xAndrewBlack/issue-bot/commit/6bd9ab24e2de974adbd4f54efffe7632d13fdf29))
- 💄 feat: Colored Embeds and Embed error handling. ([b0b8ca](https://github.com/0xAndrewBlack/issue-bot/commit/b0b8ca1e81818be14ce81acc28b620d48eb4c79d))
- 💄 feat: Colors. ([de2e05](https://github.com/0xAndrewBlack/issue-bot/commit/de2e05b52abe72f404c8689d30d5c1e9db34df63))
- 🚧 feat: Logger service. ([08e57c](https://github.com/0xAndrewBlack/issue-bot/commit/08e57cafbae5c0298c136c6eda4fc4996b875ac0))
- ✨ refactor: Recoded commands and events. ([b6f3d7](https://github.com/0xAndrewBlack/issue-bot/commit/b6f3d7c287f196431475e4fd6e14645a494c2081))
- ⚡️ feat: Updated BOT and its sharding script. ([e81b48](https://github.com/0xAndrewBlack/issue-bot/commit/e81b48799a41fc4e724f2a9843195ceffbf79487))
- 🔥 feat: Removed database and prisma and stuff. ([694ba6](https://github.com/0xAndrewBlack/issue-bot/commit/694ba69fd4e2503a0fb1d08d16ec6d74eb21dd90))
- ⚡️ feat: Updated GitHub service accordingly. ([5fff8a](https://github.com/0xAndrewBlack/issue-bot/commit/5fff8a8df39d9efca19d055cd2dff28731ff1d2b))
- 🎨 refactor: Moved Discord related stuff into separate folder. ([e4bcf0](https://github.com/0xAndrewBlack/issue-bot/commit/e4bcf0934181f653b0e4f36a5239365e94d71755))
- ✨ feat: Auto thread archiving. ([6335db](https://github.com/0xAndrewBlack/issue-bot/commit/6335dbdfb0c69e141e992f382ecb50410ad2f65b))
- 🔥 feat: Stripping removed + commands rethinked. ([6cef13](https://github.com/0xAndrewBlack/issue-bot/commit/6cef13020165df8970b829138c60bddd57337375))
- ✨ feat: Renamed commands. ([ff94c4](https://github.com/0xAndrewBlack/issue-bot/commit/ff94c4da5e48e39706d987bb6a3a915bbe747b95))

## [v0.3.0](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.3.0) (2022-08-11)

- 🚑️ fix: Fantastic DJX error. ([c7d929](https://github.com/0xAndrewBlack/issue-bot/commit/c7d929991d0cb9f117a11057d06f44c6178b0a12))
- 💚 fix: Docker issues. ([a797a0](https://github.com/0xAndrewBlack/issue-bot/commit/a797a0bc394f1b5c62470f0144d6dab3e77837d2))
- 🩹 fix: Fixed commands and service related minor issues. ([58803d](https://github.com/0xAndrewBlack/issue-bot/commit/58803d3a561b70448b49f3af68eba1a7c17822ba))
- 💚 feat: Added Docker init script. ([671669](https://github.com/0xAndrewBlack/issue-bot/commit/671669a023b3d14407bb089827267839939e23fc))
- 🚑️ fix: Fixed minor command and event issues. ([090dc5](https://github.com/0xAndrewBlack/issue-bot/commit/090dc5d6f6ee0b8f9a0e5294ce856cb0c400216c))
- ⚡️ feat: Added new utility scripts. ([8dd693](https://github.com/0xAndrewBlack/issue-bot/commit/8dd693943b47958ffb227ab1d5fa92fc11efa9a4))
- 🐛 fix: Fixed thread handling. ([c41e07](https://github.com/0xAndrewBlack/issue-bot/commit/c41e07824c544e3f2429f9af6bc7a444f1988638))
- ✨ feat: New commands and events. ([3d6cc0](https://github.com/0xAndrewBlack/issue-bot/commit/3d6cc0ed1b761793fffe07faf8851598d0c40579))
- ⚡️ refactor: Improved service with new functions. ([b9e6c6](https://github.com/0xAndrewBlack/issue-bot/commit/b9e6c63a759e9e5d071c4aea2c82caa81daf0c83))
- ⚡️ refactor: Fixed small issues with sharding. ([020bd7](https://github.com/0xAndrewBlack/issue-bot/commit/020bd78906063d42e33433caba7a1f0a5fbdc36c))
- 🐛 fix: Fixed string stripping. ([b3d1b1](https://github.com/0xAndrewBlack/issue-bot/commit/b3d1b1aafdcd56e960770fa10a192dc5075a9060))
- ✨ feat: Added new commands. ([03614d](https://github.com/0xAndrewBlack/issue-bot/commit/03614de7ed6526c8c95e6135e37760cf07ca14ce))

## [v0.2.0](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.2.0) (2022-08-09)

- 🔧 fix: Updated environment example. ([240b0c](https://github.com/0xAndrewBlack/issue-bot/commit/240b0cb912f2008ac3208bfeea93de6c00abe0af))
- ⚡️ refactor: Improved GitHub service. ([54d956](https://github.com/0xAndrewBlack/issue-bot/commit/54d956051fc81ef868606538162f2a1ec121f11f))
- ⚡️ feat: Updated commands and db functions + utility stuff. ([e26934](https://github.com/0xAndrewBlack/issue-bot/commit/e26934a41634ced341107a9fa30f732777c12098))
- ♻️ refactor: Entry bot intents and local dev wo/sharding. ([8ab7fa](https://github.com/0xAndrewBlack/issue-bot/commit/8ab7fa8a6d0f568bd85a4ebdd3cd2cde6cae580e))
- 🗃️ fix: New database schema. ([1c466c](https://github.com/0xAndrewBlack/issue-bot/commit/1c466cf2892a1903e23bdf0e0113707150cf32d7))
- ⚡️ feat: Moved events to single files. ([73e240](https://github.com/0xAndrewBlack/issue-bot/commit/73e240601cd74d7bb62894e794260cfd91bfd411))

## [v0.1.4](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.1.4) (2022-08-03)

- 🔥 docs: Removed TOC. ([e53e68](https://github.com/0xAndrewBlack/issue-bot/commit/e53e68694a2be7cf47b922fa8af221e78c14b6ea))
- 📝 docs: Added README with simple docs and a nice logo. ([b33822](https://github.com/0xAndrewBlack/issue-bot/commit/b338227eab1dd0332129d9008992211780c2d361))
- 📄 feat: Added license. ([e39003](https://github.com/0xAndrewBlack/issue-bot/commit/e3900333bead8c9684925e01c369fa5d28f01ce2))

## [v0.1.3](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.1.3) (2022-08-02)

- ✨ feat: Introduced sharding. ([f09e86](https://github.com/0xAndrewBlack/issue-bot/commit/f09e86b24aaed691dd5782dbea95a14d739b10c4))
- ♻️ chore: Prerequistes for sharding. ([1acee3](https://github.com/0xAndrewBlack/issue-bot/commit/1acee36415b6bf18ddbb6e2b3badb50a4f746125))

## [v0.1.2](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.1.2) (2022-08-02)

- 🔥 fix: Removed unnecessary lock file. ([b81abd](https://github.com/0xAndrewBlack/issue-bot/commit/b81abdd5e6569b3a12f5a5ef185b411199098f12))
- Merge branch 'master' of github.com:0xAndrewBlack/github-discord-sync into feature/7-developer-update ([8fbe64](https://github.com/0xAndrewBlack/issue-bot/commit/8fbe64698c3adb3afdccf6d3de6db554f4436148))
- 🚨 chore: New editor and linter settings. ([68d2ea](https://github.com/0xAndrewBlack/issue-bot/commit/68d2ea512b3f8a6850dd74d104137956a8c5994a))
- ⚡️ feat: VS Code launch task. ([ec0ea6](https://github.com/0xAndrewBlack/issue-bot/commit/ec0ea676229597fedd5e465e4bf0637d44026b4e))

## [v0.1.1](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.1.1) (2022-08-02)

- 🚨 chore: Linter and package stuff updated. ([65aa29](https://github.com/0xAndrewBlack/issue-bot/commit/65aa29a072b5ca93b95abf2542c4db88843c7371))
- 🎨 feat: Discord event and command update. ([47c316](https://github.com/0xAndrewBlack/issue-bot/commit/47c316e06b7d68303aa050858e497fb9c91cb9ea))
- ⚗️ refactor: Reinvented the service and it's state. ([d1fe01](https://github.com/0xAndrewBlack/issue-bot/commit/d1fe0188388c257834860c4832d9906bc9de1c13))
- 🗃️ feat: Database stuff. ([e17ce4](https://github.com/0xAndrewBlack/issue-bot/commit/e17ce45225da977304b824e55eb80056126fd94f))
- 💚 fix: Postgres data. ([021859](https://github.com/0xAndrewBlack/issue-bot/commit/021859c032813c25612bc9525d58d321ef37976a))
- 🗃️ feat: Docker with necessary services. ([f0ba52](https://github.com/0xAndrewBlack/issue-bot/commit/f0ba5255e18400d1ae19d6c54e486184b2725b7a))
- ⚰️ refactor: Removed dead code. ([0790a8](https://github.com/0xAndrewBlack/issue-bot/commit/0790a8802201eb6f4215fa97e0a7a567873523ac))
- 🐛 fix: Fixed link in embed. ([bf9972](https://github.com/0xAndrewBlack/issue-bot/commit/bf997226b0dcc9c42cc6e86b0250ce806f95f72c))
- 🚧 feat: Project card syncing. ([c1f9bd](https://github.com/0xAndrewBlack/issue-bot/commit/c1f9bd534e1ca37bc3ca81ae6ad978875492a613))
- ⚡️ refactor: Close and Lock feature. ([0d9b6c](https://github.com/0xAndrewBlack/issue-bot/commit/0d9b6cbce39ff9cb24ad3a91afaa0b794eb45598))
- 🐛 fix: Export bot for easier use. ([ee7219](https://github.com/0xAndrewBlack/issue-bot/commit/ee7219eae0beef62a640cffb5a05f0ded8fb5986))
- ♻️ refactor: New slash commands and events. ([cb9054](https://github.com/0xAndrewBlack/issue-bot/commit/cb9054392bc96fc7123bf692a78ffdd39ae6254a))
- ✨ feat: GitHub sync service. ([3f4bf5](https://github.com/0xAndrewBlack/issue-bot/commit/3f4bf5b15398fe84b507bd22acdf2ad8a2fe6439))
- ✨ feat: GitHub starter service. ([6f71b2](https://github.com/0xAndrewBlack/issue-bot/commit/6f71b22e16cb095bd8bb1922a5188b2469275871))

## [v0.1.0](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.1.0) (2022-07-21)

- 📝 docs: Updated readme. ([9c1dba](https://github.com/0xAndrewBlack/issue-bot/commit/9c1dba0f9257a74bd2245439b1df8a11cc6d4789))
- 🔧 chore: Updated config files. ([a74abc](https://github.com/0xAndrewBlack/issue-bot/commit/a74abc21470d07f7dd3cc682b67fe7f3d4d115b2))
- ✅ feat: Better bot structure. ([63df95](https://github.com/0xAndrewBlack/issue-bot/commit/63df95b4370463a3f35219746d3ee233fee4bcb8))
- 🔥 revert: Removed prev. init bot files. ([87dd9e](https://github.com/0xAndrewBlack/issue-bot/commit/87dd9ef6e1f56dd6a63a11f8084205ee4eb690dd))
- ⚡️ refactor: Added watch script. ([fd338f](https://github.com/0xAndrewBlack/issue-bot/commit/fd338fbcb1fafd3d9b335f6a091498d0cebb545d))
- ✨ feat: Discord Thread events. ([0d08dc](https://github.com/0xAndrewBlack/issue-bot/commit/0d08dc5aa1cbcb5cebf7b785d93be4404f67303c))

## [v0.0.1](https://github.com/0xAndrewBlack/issue-bot/releases/tag/v0.0.1) (2022-07-20)

- 🎉 feat: Init bot. ([996fe8](https://github.com/0xAndrewBlack/issue-bot/commit/996fe8643b415b0956868c67c8ee03cecb5a1864))
