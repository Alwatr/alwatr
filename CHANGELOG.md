# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.16.1](https://github.com/AliMD/alwatr/compare/v0.16.0...v0.16.1) (2022-09-10)

### Bug Fixes

- **storage:** import exitHook ([c371381](https://github.com/AliMD/alwatr/commit/c37138121f7882239d7ecd38e3496f17919845a2))
- **storage:** update AlwatrStorageProviderConfig ([bd33e36](https://github.com/AliMD/alwatr/commit/bd33e367c04cf0b7b11e803709da210a75318767))
- **traefik:** up issue ([c9272b8](https://github.com/AliMD/alwatr/commit/c9272b8430116b2ad78dfc5a0bb48f0144bb33fd))

### Features

- **nginx:** $NGINX_AUTOINDEX env ([6678435](https://github.com/AliMD/alwatr/commit/6678435bd1a6f0f1c1b804e7c500b491d6d9c863))
- **storage:** force save abd exist hook to prevent data lost ([e327d65](https://github.com/AliMD/alwatr/commit/e327d657217d2e814b007e69eeca4f5c42758979))

# [0.16.0](https://github.com/AliMD/alwatr/compare/v0.15.0...v0.16.0) (2022-09-08)

### Bug Fixes

- **.github/depbot:** syntax issue ([b87c463](https://github.com/AliMD/alwatr/commit/b87c463f1dfec0bbde3772945ad7fc390ab572a5))
- **classic-cloud:** review and fix issues ([680d55d](https://github.com/AliMD/alwatr/commit/680d55d192a8be69de53390c3ecdf50279cd8354))
- **nginx:** load server dir confs ([5ee391a](https://github.com/AliMD/alwatr/commit/5ee391ada0207fd4bbe5bd27d1ee733c844b5609))
- **nginx:** syntax issue ([2765ad8](https://github.com/AliMD/alwatr/commit/2765ad80bc44d75680ea75d219b3bea04d6fc762))
- **publish-container:** 403 error ([ff14c5c](https://github.com/AliMD/alwatr/commit/ff14c5cd1dd19c6fefcfb9cece51f6de15385419))
- **publish-container:** image metadatas ([008dbb5](https://github.com/AliMD/alwatr/commit/008dbb576a2a0c79a6a36f15df7c3a3d76c652fc))
- **storage:** Clear cached keys on new docId ([2aa648c](https://github.com/AliMD/alwatr/commit/2aa648c4543cfef016b55d8389796445a118c73f))
- **wordpress:** compose syntax issue ([4b85ac4](https://github.com/AliMD/alwatr/commit/4b85ac426c27872adbaa57e7252554f8f95ccfeb))

### Features

- **classic-cloud:** static file serve and review deploy ([dea5158](https://github.com/AliMD/alwatr/commit/dea51589cc7589d1f9fd17b1a4e5fafca1c1f8d9))
- **deploy:** rsync with symbolic links ([a540c20](https://github.com/AliMD/alwatr/commit/a540c20f9c7fb8b5b5abf105363ae1e76009de1f))
- **nginx:** base config file ([c8f96f0](https://github.com/AliMD/alwatr/commit/c8f96f03e75ecd94914893b8face1fc742cceb32))
- **nginx:** default page style ([7c007ee](https://github.com/AliMD/alwatr/commit/7c007ee3ef09065cd1763d13014ad0c1453e595a))
- **nginx:** dockerfile ([adb90eb](https://github.com/AliMD/alwatr/commit/adb90eb3f07a38ef87c10a9cc3e9240c653c6697))
- **nginx:** dynamic template generator ([9303883](https://github.com/AliMD/alwatr/commit/93038832595a0678b0162c718f3758efcf121671))
- **nginx:** entrypoint.sh ([3b714f9](https://github.com/AliMD/alwatr/commit/3b714f9d96751dd10f006978119c01394fe6892f))
- **nginx:** index page ([9ba0c06](https://github.com/AliMD/alwatr/commit/9ba0c0686a086b780dbca25e791ccbb694cf357a))
- **nginx:** new container for alwatr/nginx ([b654dbf](https://github.com/AliMD/alwatr/commit/b654dbf7022aff9565ca7ed0cf2eab8c25919042))
- **nginx:** optimize conf templates ([9791d5e](https://github.com/AliMD/alwatr/commit/9791d5e8f40aa054d2ba56bfc9ace4a8e05e37a3))
- **nginx:** refactor to using alwatr nginx ([9b63ede](https://github.com/AliMD/alwatr/commit/9b63ede987936102e0da7d0d1c45920b12317c5e))
- **nginx:** review and rearrange conf folders ([08e9b0c](https://github.com/AliMD/alwatr/commit/08e9b0cb3d201418af89dd8dff3c96a04aef040b))
- **nginx:** tune-worker-processes.sh ([4747e54](https://github.com/AliMD/alwatr/commit/4747e54045be5cfd41808b9730c41f8113f54ba5))
- **nginx:** update templates and custome err page ([a09ed2f](https://github.com/AliMD/alwatr/commit/a09ed2fdec4a984317ae65b55d1321d90bc63b19))
- **publish-container:** improve CI/CD ([0b5f38c](https://github.com/AliMD/alwatr/commit/0b5f38c204d2a411e24b1035967f1bff9aee2180))
- **storage:** forEach ([cc26999](https://github.com/AliMD/alwatr/commit/cc26999e4303c54cdd18c79c4b4515ac50480a6d))

### Performance Improvements

- **storage:** silent get ([c2cbd88](https://github.com/AliMD/alwatr/commit/c2cbd887f20031f86392aec6537bfd699a36480b))

# [0.15.0](https://github.com/AliMD/alwatr/compare/v0.14.0...v0.15.0) (2022-09-01)

### Bug Fixes

- get signal object of `request` signal ([eec4b62](https://github.com/AliMD/alwatr/commit/eec4b6201d79785aa10f4b9c777449525158a346))
- **package:** eslint command ([c74be93](https://github.com/AliMD/alwatr/commit/c74be93ebef1f78681525b8cd5a57b0f926e42ec))
- remove npm token from install dependencies ([21f01cd](https://github.com/AliMD/alwatr/commit/21f01cd328d99ac8133d51d855295e7a338ade68))
- **signal:** fix some issues of `review` ([36ceb8b](https://github.com/AliMD/alwatr/commit/36ceb8b25987621065327b4fa475a213562af8e7))
- **signal:** log performance and security issue ([dbe9483](https://github.com/AliMD/alwatr/commit/dbe9483b672099b91c18c3a103c2878435fd6508))
- **tdlib:** build issue ([861b70f](https://github.com/AliMD/alwatr/commit/861b70f1bf381cb91b2c7d06243e50f849eb0e5b))
- **tdlib:** dockerfile ([e0ac726](https://github.com/AliMD/alwatr/commit/e0ac7262b84e35e11ea8d1b1243819f958082a6b))
- **workflow/build:** name ([9710fba](https://github.com/AliMD/alwatr/commit/9710fbab011b3de5eb0c52f9f4fceabd801fab50))
- **workflow/lint:** task name ([4b191e8](https://github.com/AliMD/alwatr/commit/4b191e85694f0c861b6b2ddf29a727e834355632))
- **workflow:** run issue ([731a5b2](https://github.com/AliMD/alwatr/commit/731a5b2c2bf0fcbe7d0f44f501346b82654b16e7))
- **workflows:** add workflow_dispatch ([9fc7db7](https://github.com/AliMD/alwatr/commit/9fc7db71f0fefbdf65c7301c3ca505d85ed7fd36))
- **workflows:** change paths! ([7bca6e7](https://github.com/AliMD/alwatr/commit/7bca6e7e08c9c699b9b18b301c14e8c05761b836))
- **workflows:** custom version tags for containers ([a752b90](https://github.com/AliMD/alwatr/commit/a752b900516052ebf0883b713c040b4f43a18364))
- **workflows:** final test publish container ([ac7f361](https://github.com/AliMD/alwatr/commit/ac7f361e749f99e0b3eafc191c1917c8a6c90634))
- **workflows:** image custom versions ([ccd80e8](https://github.com/AliMD/alwatr/commit/ccd80e8933e4fbc72538f2377d3b654baa33c679))
- **workflows:** image custom versions ([1db6600](https://github.com/AliMD/alwatr/commit/1db6600d82745bcbe5ef2b8dcde646c8b0c0032a))
- **workflows:** install deps ([2598166](https://github.com/AliMD/alwatr/commit/25981664622f111c5cdb66ae7687bfdced8fdacb))
- **workflows:** name ([dd8f414](https://github.com/AliMD/alwatr/commit/dd8f414a44f265c0a45c324c353b733204ddc445))

### Features

- **classic-cloud:** child deploy script ([8d9eaef](https://github.com/AliMD/alwatr/commit/8d9eaefcc1a8f8a03da618b1599b9c03f2464320))
- **classic-cloud:** new deployment ([8059d84](https://github.com/AliMD/alwatr/commit/8059d8422aa1f8a68617cb73cb254da6d79870eb))
- **classic/deploy:** add logs and up command ([a7af093](https://github.com/AliMD/alwatr/commit/a7af09370297d4acc3efd12eb8ff2de5cda4d7b3))
- **container:** alpine with CI deploy workflow ([e63b9ef](https://github.com/AliMD/alwatr/commit/e63b9ef6ff3759f7bef333e14ec115f90efbdd30))
- **container:** tdlib! ([e407049](https://github.com/AliMD/alwatr/commit/e407049a7d529341e628f4c69ddf68f40863d72e))
- **rnnoise-model:** ffmpge rnnoise models ([e543904](https://github.com/AliMD/alwatr/commit/e543904171c77d06565c96d1d264155a5df231f0))
- update workflow ([538192f](https://github.com/AliMD/alwatr/commit/538192ffb9adf516b4df95e0f4408d72441e4c95))
- **workflow/lint:** add schedule ([faaae0e](https://github.com/AliMD/alwatr/commit/faaae0e32498b2b0c14082bf7fb6d7e48258a7ed))
- **workflows:** CodeQL Analyze ([00be21c](https://github.com/AliMD/alwatr/commit/00be21c392ad8f4ef10ba01b5cbcce826026cc18))
- **workflows:** Dependency Review ([cbb1373](https://github.com/AliMD/alwatr/commit/cbb1373df07e198ff50ce5193dfe985dda9ea1f2))
- **workflows:** new eslint workflow ([33c3a56](https://github.com/AliMD/alwatr/commit/33c3a56cde9a90833a0da17fba87f2268b62a0cb))

# [0.14.0](https://github.com/AliMD/alwatr/compare/v0.13.0...v0.14.0) (2022-08-19)

### Bug Fixes

- **classic-cloud:** docker-compose external syntax ([9c56389](https://github.com/AliMD/alwatr/commit/9c56389600a2cfce63b27de30087cf6655e86d83))
- **cloud:** review and fix deploy issues in productions ([dce9b38](https://github.com/AliMD/alwatr/commit/dce9b384a5b0f303a1eba3c8e34f6e3cda62dbcc))
- **deploy:** echo messages ([1052657](https://github.com/AliMD/alwatr/commit/1052657a87c9ad5ef8785adae215e68957f72d36))
- **mariadb:** MEMORY_LIMIT ([20adf3f](https://github.com/AliMD/alwatr/commit/20adf3fb60b7e21fad2e6816cf8addad1b15899c))
- **php:** display error off ([8a923b5](https://github.com/AliMD/alwatr/commit/8a923b5ef49ac68a43fe6e09bf931418f9a262c7))
- **traefik:** review ([bbc8ed1](https://github.com/AliMD/alwatr/commit/bbc8ed11a1ede953fb87fc57cc356d28a97baeaf))
- **wordpress/php:** refactor install script in php dockerfile ([4f33233](https://github.com/AliMD/alwatr/commit/4f33233e2fb96c0ef2ae9074ee20f39806af5aac))
- **wordpress:** image ([bfee572](https://github.com/AliMD/alwatr/commit/bfee572885782744974eb296a073c33f721760a7))
- **wordpress:** toggle cache issue ([d1ed858](https://github.com/AliMD/alwatr/commit/d1ed858e7d892c4d45ca196261bebe580e7fc994))
- **wordpress:** WORDPRESS_DB_HOST ([8149875](https://github.com/AliMD/alwatr/commit/8149875695c2824e9107fe36d713a99b6bbd429b))

### Features

- add multi .env file support to deploy script ([1937f01](https://github.com/AliMD/alwatr/commit/1937f01e92c043e30c2c94a5f5071ef2892e5448))
- add readme for package category ([9429d05](https://github.com/AliMD/alwatr/commit/9429d056213c78fa6415187d099e80b5b70f6e62))
- **adminer:** add new service ([b679ec1](https://github.com/AliMD/alwatr/commit/b679ec1b92270309f39ca16e0c67b40af2b846fa))
- **cloud/deploy:** refactor rsync and ignore dsstore files ([6795812](https://github.com/AliMD/alwatr/commit/67958128348a826e6b89f2894cf48f5e16460c44))
- **cloud:** update \_up scripts ([8d376b8](https://github.com/AliMD/alwatr/commit/8d376b8a4b11704b3852b004622b9eb39e8bb5e4))
- **cloud:** update rsync ([b29a34f](https://github.com/AliMD/alwatr/commit/b29a34f0c3983594b44d8652b1f87da52377b768))
- **cloud:** update scripts ([d6addc6](https://github.com/AliMD/alwatr/commit/d6addc6e23283477e9055825a52333feb20c08a9))
- **deploys:** refactor deploy script ([26c41d6](https://github.com/AliMD/alwatr/commit/26c41d6fd445b2fed81fa4653a4769c74c3e1638))
- **mariadb:** add new service ([55f5dab](https://github.com/AliMD/alwatr/commit/55f5dab4bb68ad434797d9b222c8beea4e90a934))
- **php-apache:** classic php with apache ([6e1536f](https://github.com/AliMD/alwatr/commit/6e1536ff8166152237ea07c67a2c3dd60fb22f4e))
- **php-apache:** dynamic build and update structure ([850486f](https://github.com/AliMD/alwatr/commit/850486f9756c90660eac7dd6ed6fa3e6aa64e51e))
- **service/wordpress:** supper fast wordpress cloud! ([4998b90](https://github.com/AliMD/alwatr/commit/4998b90632a5105d0eec590e6b1c050ed18a8b41))
- **services:** improve all docker deployment ([ba135ad](https://github.com/AliMD/alwatr/commit/ba135adfcee406e4e9078bf83f307d9a67dca611))
- **toggle-cache:** improve styles ([ca9f07e](https://github.com/AliMD/alwatr/commit/ca9f07e1eab99f8a8b8a4143e6f1558d0e40e955))
- **traefik:** add service proxy ([5c2c74a](https://github.com/AliMD/alwatr/commit/5c2c74afa8ee460c183568617776dce7f627f65d))
- **traefik:** deploy script ([44f5959](https://github.com/AliMD/alwatr/commit/44f59592f053e795a04ec1189673268865c00439))
- **traefik:** improve deployment ([1ec83db](https://github.com/AliMD/alwatr/commit/1ec83dbdc3683511026ad665be99f803dd79e3f7))
- **wordpress:** add SKIP_FIX_PERMISSIONS ([79ab5d2](https://github.com/AliMD/alwatr/commit/79ab5d21b4c92e47532acf8a42dbe2c7c9223da7))
- **wordpress:** args for install ioncube loader ([6e5fe71](https://github.com/AliMD/alwatr/commit/6e5fe711245fc3dc7ebba4917ed2edfe7a6f02e4))
- **wordpress:** improve deployment to use multi env files ([db827fe](https://github.com/AliMD/alwatr/commit/db827febc0ebc4d2c6488bab1744b38ecfe01044))
- **wp:** install Source Gaurdian loader! ([55c52ee](https://github.com/AliMD/alwatr/commit/55c52eec24cd1ac55175b007a3f05976dcd2a898))
- **xz-example:** such a wow! ([b523293](https://github.com/AliMD/alwatr/commit/b5232932f3b17a39993fbb1a102c58daeef273f7))

# [0.13.0](https://github.com/AliMD/alwatr/compare/v0.12.0...v0.13.0) (2022-08-06)

### Bug Fixes

- **nano-server:** `incomingMessage` body ([0172390](https://github.com/AliMD/alwatr/commit/01723906f657c35a7a2a329b914308c3d9f06ff8))
- **nano-server:** host log ([c0c0f97](https://github.com/AliMD/alwatr/commit/c0c0f971d0405f5731cf040962b4609c9472a2fc))
- **nano-server:** logs ([72cb160](https://github.com/AliMD/alwatr/commit/72cb160b53e7bb04be6b5d24aa04f98d6a597e11))
- **storage:** first log ([76a32d0](https://github.com/AliMD/alwatr/commit/76a32d071b22b3a5b96a880d386bb3408ebe29ad))
- **storage:** imports ([8d86a73](https://github.com/AliMD/alwatr/commit/8d86a73c85c117416e2ae0f4c9b879bfbc2d8a7c))
- **storage:** provider config ([4497dda](https://github.com/AliMD/alwatr/commit/4497ddae726fce45b9d94a600fa19a07d2d6d298))
- **storage:** review and test ([adc1d0b](https://github.com/AliMD/alwatr/commit/adc1d0b2ebd9cce4df946b21745c1a61172e66bb))
- **token:** calc benchs ([f1240cc](https://github.com/AliMD/alwatr/commit/f1240cce9247c6fb53dd63a940bd95123ba628d1))

### Features

- **api/storage:** make nanoservice ([7626710](https://github.com/AliMD/alwatr/commit/762671063f62ac150806c128495bebbfad2fdeb2))
- **nano-server:** add token to connection ([8677999](https://github.com/AliMD/alwatr/commit/867799920c917dbafe3a041a8946f7e77577552f))
- **nano-server:** refactor, add seperate config, cache all routes ([2cdd203](https://github.com/AliMD/alwatr/commit/2cdd2030474b7c1796e311740f20b8f39631bae9))
- **provider:** show mwmory usage on new data loaded ([1a24df3](https://github.com/AliMD/alwatr/commit/1a24df32d057cfdc91a1c8d47c3a0346065b9a40))
- **service/storage:** base config ([75ae7d2](https://github.com/AliMD/alwatr/commit/75ae7d27dc3d910a2f45cf92e63bbd5115cc8fca))
- **service/storage:** updateDocument route ([723c795](https://github.com/AliMD/alwatr/commit/723c795d573635653ee4246fb91dfe096a414cb2))
- **service/storage:** extract and validate token ([dd4ffc4](https://github.com/AliMD/alwatr/commit/dd4ffc44b05ba0496b530a4a69164d595b72c081))
- **service/storage:** make base types ([fb26b7a](https://github.com/AliMD/alwatr/commit/fb26b7a4f7646e17f4b1c6a5b2c4b51d666752a0))
- **service/storage:** storage privider ([9b9c07f](https://github.com/AliMD/alwatr/commit/9b9c07f53725fb7eb2a92706d4f3392675d8aad2))
- **service/storage:** test and demo ([22e8ad4](https://github.com/AliMD/alwatr/commit/22e8ad44cb39cacdb99f7535befed1a736aec773))
- **storage:** add \_createdBy and \_updatedBy ([1a70945](https://github.com/AliMD/alwatr/commit/1a70945bc61921f13d839adde25fdfe9fb37eaad))
- **storage:** docker ([a78f784](https://github.com/AliMD/alwatr/commit/a78f7845aaaf4faace6de92dae57763299ee7d10))
- **storage:** get method ([0b04f12](https://github.com/AliMD/alwatr/commit/0b04f1209d7f865e2ef0e884a293587cfcd72420))
- **storage:** improve process and add has, storagePath, keys and length ([4e323ad](https://github.com/AliMD/alwatr/commit/4e323ad10ee0630cfa02edd191167b69e14743ff))
- **storage:** provider ([92df9f3](https://github.com/AliMD/alwatr/commit/92df9f33a1c5b044d95e2efed51281eb08556c94))
- **token:** generate and verify HOTP tpkens ([d0372f8](https://github.com/AliMD/alwatr/commit/d0372f805a45d6fd6571b50821529068cec7d424))
- **token:** new package files ([fe620e0](https://github.com/AliMD/alwatr/commit/fe620e0d9f84c4e6d8e0eed47d6b398e218429ad))

# [0.12.0](https://github.com/AliMD/alwatr/compare/v0.11.0...v0.12.0) (2022-07-22)

### Bug Fixes

- all package refrences ([11b027d](https://github.com/AliMD/alwatr/commit/11b027d4cdbe142e1f5ef6c6f87c1812fbb2d94b))
- **fetch:** compatible with new ts types AbortSignal ([949655a](https://github.com/AliMD/alwatr/commit/949655a257852aaaaa311e32603ecc0819eedf51))
- **font:** sahel-vf font-weight ([bf84782](https://github.com/AliMD/alwatr/commit/bf84782347ed4898d854325415f6f43b1953f842))
- **github/workflow:** schema detect ([b3b813c](https://github.com/AliMD/alwatr/commit/b3b813c45011afdc3e38dc7215f0f4beb8dcc1dd))
- **i18n:** load resources issue ([19b9e39](https://github.com/AliMD/alwatr/commit/19b9e39d5a415e60901c117be3f8f82d09ef8444))
- **logger:** refactor behavior of force ([7d9307b](https://github.com/AliMD/alwatr/commit/7d9307bb78523f3dae17b3bd80fa2fb47c90975f))
- **nano-server:** logger scope ([73dbf02](https://github.com/AliMD/alwatr/commit/73dbf029325169d900558e2361fec9fa4303e7e4))
- **route:** remove default `200` status code ([12d9065](https://github.com/AliMD/alwatr/commit/12d9065c79ee7ca1acd458a20e9bd65b4554b8d2))
- **storage:** auto save request on set ([a1b671d](https://github.com/AliMD/alwatr/commit/a1b671d9beb8909d1fd89a1ffb7f80e1115b3cc3))
- **storage:** DocumentListStorage type issue ([f1c90b4](https://github.com/AliMD/alwatr/commit/f1c90b4b00a8696375e1a2f15d8b17378a33c7f2))
- **storage:** import ext for node ([545fe3e](https://github.com/AliMD/alwatr/commit/545fe3e7be9cc2d44e83d6f138c2ed0192dd1e24))
- **storage:** make empty storage if file not exist ([0105551](https://github.com/AliMD/alwatr/commit/010555176ea262080b774fb4c51a16acc91bccf1))
- **storage:** minify saved json ([dcd0abc](https://github.com/AliMD/alwatr/commit/dcd0abc66882c914ce57aace8fdf68e58995cda0))
- **storage:** prevent to lost old meta data ([508bd56](https://github.com/AliMD/alwatr/commit/508bd56ee179d326762ffcb0a4e749bc7f74057f))

### Features

- **demo/data-storage:** init demo ([61814cd](https://github.com/AliMD/alwatr/commit/61814cde15b68f89b6ae233fa8362bf214c3813b))
- **file-storage:** json ([55991c3](https://github.com/AliMD/alwatr/commit/55991c3ed1bf156509ec06d582d6b6e27dbe4803))
- **font:** add sahel font ([c09c152](https://github.com/AliMD/alwatr/commit/c09c152c1123703a1a9eb1062a11a9b5e86e796a))
- **font:** add sahel font ([89b769b](https://github.com/AliMD/alwatr/commit/89b769b496d3b84fb092e633067373af538a896b))
- **font:** demo for sahel ([bb087ef](https://github.com/AliMD/alwatr/commit/bb087eff880aceaedfb253494581d1f363632573))
- **jatabase:** demo ([17beb7e](https://github.com/AliMD/alwatr/commit/17beb7ecdf3e89b0ffee43f4365f3b2dc4950f99))
- **jatabase:** impeliment class ([0fdd533](https://github.com/AliMD/alwatr/commit/0fdd533446943502c187d961ebfcbf872f7c15e1))
- **logger:** compatible with node.js ([7ee8b6d](https://github.com/AliMD/alwatr/commit/7ee8b6de3143e39c300345dec6864c9c56a4aae7))
- **logger:** node coloring support ([2b4aab6](https://github.com/AliMD/alwatr/commit/2b4aab655bc0707761587a7439de98bbd4ad0e08))
- **nano-server:** make `statusCode` in `ReplySuccessContent` optional ([fe836f4](https://github.com/AliMD/alwatr/commit/fe836f452566c541d25857df34c952b413690d23))
- **nano-server:** make new package ([2148dfc](https://github.com/AliMD/alwatr/commit/2148dfc910565f917d3cb8eb001cde08f2fc694d))
- **nano-server:** new class for handle server and connections ([62e33a3](https://github.com/AliMD/alwatr/commit/62e33a383b5220820f68f74020e04a7c5b390f0f))
- **nanoservice:** base app ([f8708cc](https://github.com/AliMD/alwatr/commit/f8708ccafe60ce89d635d43540ae1c627d0d8b55))
- **nanoservice:** esnext module ([8e9bd3d](https://github.com/AliMD/alwatr/commit/8e9bd3dd4fe16cfba41930633071965b32c5e7a8))
- **nanoservice:** home route ([851324e](https://github.com/AliMD/alwatr/commit/851324e328a5719fbc6702e72026e65df282db4f))
- **nanoservice:** load .env file ([ded93cb](https://github.com/AliMD/alwatr/commit/ded93cbe21071db48fddd468a8279640502c1fbb))
- **nanoservice:** make starter kit base files ([cbc2e47](https://github.com/AliMD/alwatr/commit/cbc2e478b1ad548134d4267c40548d1bd026bb62))
- **nanoservice:** new echo route ([de12548](https://github.com/AliMD/alwatr/commit/de125484c7bdeef40527c6cda0b9a1f0d83f5930))

# [0.11.0](https://github.com/AliMD/alwatr/compare/v0.10.1...v0.11.0) (2022-04-16)

### Features

- **element:** init new package ([a9a65d9](https://github.com/AliMD/alwatr/commit/a9a65d94beb86583cb7e5e2b47b8f235994310cb))
- **element:** LoggerMixin ([e5825e1](https://github.com/AliMD/alwatr/commit/e5825e160324cde596dbf3982bf080d54ba9955f))
- prettier config ([3a26e58](https://github.com/AliMD/alwatr/commit/3a26e58d6e622d8aa5e97f33a179d7819bdb7969))

## [0.10.1](https://github.com/AliMD/alwatr/compare/v0.10.0...v0.10.1) (2022-04-02)

### Bug Fixes

- **font:** including woff2 ([6d10eb3](https://github.com/AliMD/alwatr/commit/6d10eb33dbdd0f9b6b0f3b9930e44b099d499b77))

# [0.10.0](https://github.com/AliMD/alwatr/compare/v0.9.0...v0.10.0) (2022-04-02)

### Bug Fixes

- **font:** cleanup ([cdd4ee1](https://github.com/AliMD/alwatr/commit/cdd4ee15332cb9f1ec19bf34ec02cb1f5999cad5))
- **font:** package file ([5c63a06](https://github.com/AliMD/alwatr/commit/5c63a0641d319e4b95ecc86671ce9456ab4d4be7))
- **font:** woff2-variations addres ([88e4c52](https://github.com/AliMD/alwatr/commit/88e4c5296b9efe614aefeb45241fa066e40527c5))
- **package.json:** build script ([8ad2061](https://github.com/AliMD/alwatr/commit/8ad2061dbc2bb73f01597794c12c53baa13a0d8b))
- **package:** build/lint script ([939a1cf](https://github.com/AliMD/alwatr/commit/939a1cf494c1d1275ccfa459d4ab5bd9ae41cb0d))
- try to fix typescript importer in eslint ([ceb508c](https://github.com/AliMD/alwatr/commit/ceb508c9d8152aba4f3833b1c1f4930828e2014d))

### Features

- **demo:** add font demo ([33f3825](https://github.com/AliMD/alwatr/commit/33f3825a7e23b86281d047dd3be3b2f8eb862b8d))
- **demo:** font ([8035d73](https://github.com/AliMD/alwatr/commit/8035d73dc99d4ff9c8eec0f70bec43b97b80320c))
- **font:** add vazirmatn font files ([6499d01](https://github.com/AliMD/alwatr/commit/6499d01fca69909071debefa545d6e9a9d5d85a1))
- **font:** define fonts, the wight way! ([215afb8](https://github.com/AliMD/alwatr/commit/215afb8959dbc3fd1f0e2e0ebe10a878ab2ddec8))
- **font:** init ([3bea1d9](https://github.com/AliMD/alwatr/commit/3bea1d9939c688cb9c80c87bb35c09910239b5a8))
- **font:** sahel font ([7cd8b27](https://github.com/AliMD/alwatr/commit/7cd8b2785c1146f57241a4a0df6817988726d3f3))
- **lint:** add import eslint ([7f2f1f5](https://github.com/AliMD/alwatr/commit/7f2f1f5f4b05a5940d711898606dd65cce6fc1a5))

# [0.9.0](https://github.com/AliMD/alwatr/compare/v0.8.0...v0.9.0) (2022-03-22)

### Bug Fixes

- **i18n:** access signal issue ([097b354](https://github.com/AliMD/alwatr/commit/097b354da71b5fb4ce1e15f5cbc4accbe12bb6e1))
- **router:** export RequestRouteParam type ([d07e0ea](https://github.com/AliMD/alwatr/commit/d07e0eaf7781b8c35f7f47c90fdbbbc7e229a060))
- **router:** fire first route-change signal as soon as posible ([2ae176b](https://github.com/AliMD/alwatr/commit/2ae176b91f7461258bd7432064d6c81730f6f04e))
- **router:** outlet default 404 render ([2218483](https://github.com/AliMD/alwatr/commit/22184830c6c93024e335707a60badbbf188745aa))
- **router:** router.signal type helper ([88b8e26](https://github.com/AliMD/alwatr/commit/88b8e26c83f35c52ff69356f12650e77cc6537d2))
- **router:** signal define issue ([d3921b5](https://github.com/AliMD/alwatr/commit/d3921b5d8bbe3dc4984a264801f2e992ceb1ece0))

### Features

- **router:** improve 404 template ([3af27f7](https://github.com/AliMD/alwatr/commit/3af27f71dec257e0a245605c6c333816e6e0c317))
- **signal:** ListenerInterface ([38ef029](https://github.com/AliMD/alwatr/commit/38ef0291c5ba2e3619080ad89109d805d3d600f2))

# [0.8.0](https://github.com/AliMD/alwatr/compare/v0.7.2...v0.8.0) (2022-03-14)

### Bug Fixes

- **router:** updateBrowserHistory issue ([22b16e5](https://github.com/AliMD/alwatr/commit/22b16e599089f3abe5eb9dc285563fa9510ad97e))
- **signal:** remove once listene in dispatch change imediatly the loop! ([e4d420d](https://github.com/AliMD/alwatr/commit/e4d420d3a086558dc01dcd7a9c5fe3e96677f092))

### Features

- **demo:** router outlet demo ([54576f0](https://github.com/AliMD/alwatr/commit/54576f0397df1d1471467564529a01b4e75335bf))
- **router:** improve demo for test signal! ([59a1017](https://github.com/AliMD/alwatr/commit/59a1017f3ed323fea8e9e798f612f0f54b74b399))
- **router:** make outlet ([45852a8](https://github.com/AliMD/alwatr/commit/45852a809a9f48fb09cf9a8c5ecc3f6519f106cd))
- **router:** simple demo ([884359a](https://github.com/AliMD/alwatr/commit/884359ac2c77a306c2410d6fd351382b416c36fe))

## [0.7.2](https://github.com/AliMD/alwatr/compare/v0.7.1...v0.7.2) (2022-03-12)

### Bug Fixes

- **router:** trigger-click error when tagName undefined ([c16328b](https://github.com/AliMD/alwatr/commit/c16328bb6dc96b5c330015ac560cf95920b9c7b2))
- **signal:** promise to multi requests works ([dd59f0e](https://github.com/AliMD/alwatr/commit/dd59f0e5737abec72c41895b93365199fad66fcb))

### Features

- **logger:** add debug and improve documents ([8f83d29](https://github.com/AliMD/alwatr/commit/8f83d2956e521f016fe530322f657c343f1a0b80))
- **signal:** demo as test ([fc3f9fd](https://github.com/AliMD/alwatr/commit/fc3f9fdd8c76c6bc5117f3ee894480500f81cc80))

## [0.7.1](https://github.com/AliMD/alwatr/compare/v0.7.0...v0.7.1) (2022-03-12)

### Bug Fixes

- **math:** build ([7cd8907](https://github.com/AliMD/alwatr/commit/7cd890765ddba0cca2938292eb8705995a2bfde8))

# [0.7.0](https://github.com/AliMD/alwatr/compare/v0.6.1...v0.7.0) (2022-03-12)

### Bug Fixes

- **lerna:** add ignoreChanges for all md files! ([fa35e9c](https://github.com/AliMD/alwatr/commit/fa35e9c39d4bcf646fcc05fcc95a654a7519f70e))
- **workflow:** remove duplicate tests on push and pulls ([29691fa](https://github.com/AliMD/alwatr/commit/29691fa294e8ace81c8246382bbcb42b58c3ccc5))

### Features

- **math:** add isNumber ([3c5ee2b](https://github.com/AliMD/alwatr/commit/3c5ee2bbeb12a9c78df59aef291c971405d4d5fa))
- **math:** new package for mathmatics ([7860385](https://github.com/AliMD/alwatr/commit/78603858b19693e613f6224b9c6d55d5c532e50d))
- **math:** random ([18f585c](https://github.com/AliMD/alwatr/commit/18f585c882d40599ec9ed6531bda8f128d4cb5f8))
- **math:** transformToRange ([62f334d](https://github.com/AliMD/alwatr/commit/62f334d37a625764dd9afad041a4489f1a61fa61))

## [0.6.1](https://github.com/AliMD/alwatr/compare/v0.6.0...v0.6.1) (2022-03-12)

### Bug Fixes

- **i18n:** package name in readme! ([5325e7f](https://github.com/AliMD/alwatr/commit/5325e7ff5f2b83862221544a4bcd931ed8b9f12f))
- **lerna:** include readme to publish chnages ([524c8a0](https://github.com/AliMD/alwatr/commit/524c8a01551d2b523e9a099b294a41f071fffe6f))
- **lerna:** remove ignoreChanges ([f2f20d6](https://github.com/AliMD/alwatr/commit/f2f20d61d532ec265373506a3b7629868c2ad446))

# [0.6.0](https://github.com/AliMD/alwatr/compare/v0.5.0...v0.6.0) (2022-03-11)

### Bug Fixes

- alalwatr ([898aa6e](https://github.com/AliMD/alwatr/commit/898aa6ed0888eab9265c83b96a50f1b8c216d143))
- **demo:** package ([c2b2339](https://github.com/AliMD/alwatr/commit/c2b2339f1ca08207ae0d0f8f0d7fff9c98a822ce))
- old One repo links ([1156b07](https://github.com/AliMD/alwatr/commit/1156b077e0abc4712207183e01896fe86f7a05f6))
- **packages:** duplicate alwatr keyword ([77d4aa2](https://github.com/AliMD/alwatr/commit/77d4aa2105ad47515c3eee251fd6b8c281d0d1fc))
- repo address ([eea4035](https://github.com/AliMD/alwatr/commit/eea403512f165722f561fa1944160ae6497f9edb))

# [0.5.0](https://github.com/AliMD/alwatr/compare/v0.4.0...v0.5.0) (2022-03-11)

### Bug Fixes

- **signal:** disabled getter and optional dispatch options ([28ced3d](https://github.com/AliMD/alwatr/commit/28ced3d0c4cdf44fc2aebfab98db0883fc5363fe))
- **wordflows:** tests on all branches ([5cca930](https://github.com/AliMD/alwatr/commit/5cca930f3adf88624c6ff7a1f3c551502f7a4826))

### Features

- **signal:** new SignalInterface ([221701a](https://github.com/AliMD/alwatr/commit/221701a54ea9edda4a3a935a7b098e235ec52691))
- **workflow:** add tests workflow ([7512aba](https://github.com/AliMD/alwatr/commit/7512abae92add3fe73a0578d55f9439f7d1632af))
- **workflow:** add verify workflow ([88fc40c](https://github.com/AliMD/alwatr/commit/88fc40ce9affeaf715fc8dda600f35fa7b2c84b6))
- **workflow:** rename workflow file ([e35df8f](https://github.com/AliMD/alwatr/commit/e35df8fac972b7b4dc81dfac159d97d09b0b6751))

### Performance Improvements

- **logger:** refactor making logger object ([bc38018](https://github.com/AliMD/alwatr/commit/bc38018758540130df2f46c44521aea0a867bbe8))

# [0.4.0](https://github.com/AliMD/alwatr/compare/v0.3.0...v0.4.0) (2022-03-11)

### Bug Fixes

- **fetch:** build issue [#73](https://github.com/AliMD/alwatr/issues/73) ([fb74463](https://github.com/AliMD/alwatr/commit/fb74463d367393706d16e482488a565bdfef70a1))
- **i18n:** build issue [#75](https://github.com/AliMD/alwatr/issues/75) ([fe7a108](https://github.com/AliMD/alwatr/commit/fe7a108904176e63b8aa7e388d95ee8a90c6b71f))
- **logger:** types missing ([712363d](https://github.com/AliMD/alwatr/commit/712363d3cf77a712f8c801c4dc9d06d256dfc0e6))
- **pr-template:** make it simple ([3f4253b](https://github.com/AliMD/alwatr/commit/3f4253b3a44634e5440fe714937536fa18fa9b7a))
- **router:** build issue for parameterList type [#75](https://github.com/AliMD/alwatr/issues/75) ([5fc1ecd](https://github.com/AliMD/alwatr/commit/5fc1ecd12b938936e2718f9307186493e2712e1f))
- **tsconfig:** add useDefineForClassFields ([cf11de2](https://github.com/AliMD/alwatr/commit/cf11de28d032e23aaac39b01a4a6f863b8fa13b8))

### Features

- **logger:** add logProperty, logMethodFull ([8b0317d](https://github.com/AliMD/alwatr/commit/8b0317db88ed73604a27935a3a30cd5c31cb0804))
- **logger:** complete refactor the logger with new API and fix show correct line number ([7efe8cf](https://github.com/AliMD/alwatr/commit/7efe8cf0f566e148406f38fdd60fa3d747c9bc51))

# [0.3.0](https://github.com/AliMD/alwatr/compare/v0.2.1...v0.3.0) (2022-03-06)

### Bug Fixes

- **signal:** signal provider type ([0151c57](https://github.com/AliMD/alwatr/commit/0151c57d9b6d4f7e83bb9b1847ebe0ae53cd8f89))

### Features

- **i18n:** impeliment core methods ([6449bb4](https://github.com/AliMD/alwatr/commit/6449bb42837335c2e2e5b4a75e98139528e2e7da))
- **i18n:** impeliment initialI18n ([87da5e4](https://github.com/AliMD/alwatr/commit/87da5e46943ba12a8067fcac06c1dcced1e6fb92))
- **i18n:** localize method ([544edfd](https://github.com/AliMD/alwatr/commit/544edfdd1bc52befab6afe4cbfb62ce1638aff2d))
- **i18n:** start new package for i18n/l10n ([88a6c28](https://github.com/AliMD/alwatr/commit/88a6c28ad038ed02ca45128378e669f6d9c6949d))

## [0.2.1](https://github.com/AliMD/alwatr/compare/v0.2.0...v0.2.1) (2022-03-05)

### Bug Fixes

- **logger:** alwatrRegisteredList name ([ff59133](https://github.com/AliMD/alwatr/commit/ff5913321c4eafa1ce53fdacebf8fb4f23bfe430))
- **signal:** signal value type issue ([292a4a7](https://github.com/AliMD/alwatr/commit/292a4a7d12a2fd143761e67cd1ecd2e5e40f2ee9))

### Features

- **issue-template:** bug report and feqture request form template ([77159a7](https://github.com/AliMD/alwatr/commit/77159a7076369781cfcf7167e58843e0fb25fa18))

# [0.2.0](https://github.com/AliMD/alwatr/compare/v0.1.2...v0.2.0) (2022-03-05)

### Bug Fixes

- **fetch:** error codes ([4e0be80](https://github.com/AliMD/alwatr/commit/4e0be80786b6667035ae82750f2351bd2da4f341))
- **router:** rename setSignalProvider callback detail to requestParam ([6e09f87](https://github.com/AliMD/alwatr/commit/6e09f8772d320625fb4c15ccaa0abcfa2932f992))
- **router:** rename setSignalProvider callback detail to requestParam ([070c0f6](https://github.com/AliMD/alwatr/commit/070c0f6c5e4d6994e9af19dca515acc4f7ad4c5a))
- **router:** trigger click signal name ([b4a9477](https://github.com/AliMD/alwatr/commit/b4a9477464cb05bb8fa227014de5e8af5b8dd600))
- **signal:** fix dispatchSignal value parameters ([4d34cfb](https://github.com/AliMD/alwatr/commit/4d34cfbb5281d5ce4a4f06ddaaf72218dde80cdd))
- **tsconfig:** add router ([a107e08](https://github.com/AliMD/alwatr/commit/a107e0872d59484ec208640b678e65212add53f0))
- **util:** remove package ([b337d9a](https://github.com/AliMD/alwatr/commit/b337d9a97c8f73c2a87e722b23a50718321d1648))

### Features

- **fetch:** add getData ([4a627c4](https://github.com/AliMD/alwatr/commit/4a627c43d2ad07acb340f058f02d41ce57288405))
- **fetch:** add postData and fetchJson ([b0262b8](https://github.com/AliMD/alwatr/commit/b0262b83b5b7d8b7c376dce68aae3e16bd8e2610))
- **fetch:** base fetch api ([925cdab](https://github.com/AliMD/alwatr/commit/925cdab8700ffb801e1d836ffc5d3245b66815cf))
- **fetch:** FetchOptions type ([dd2d141](https://github.com/AliMD/alwatr/commit/dd2d1418d090387e1afa8277f78ae88ace17fd17))
- **fetch:** new enhanced fetch package ([7e90472](https://github.com/AliMD/alwatr/commit/7e904720c983372317358ce107f6ad0f79c65647))
- **router:** \_updateBrowserHistory ([8933a97](https://github.com/AliMD/alwatr/commit/8933a97cde277708356fc123c7493774cf0b00ec))
- **router:** base type ([f76d34b](https://github.com/AliMD/alwatr/commit/f76d34b65fbfb9680662dd994136d90be99d496c))
- **router:** first route request ([e0ad1d4](https://github.com/AliMD/alwatr/commit/e0ad1d403f0023e2df44cb8b7a3a5710fcfbe877))
- **router:** impeliment click trigger ([39f5f07](https://github.com/AliMD/alwatr/commit/39f5f075f48ae4323ccca57467dde04ce8c9c3be))
- **router:** impeliment popstate trigger ([1613131](https://github.com/AliMD/alwatr/commit/16131312e4bc083ca3d6cf4c1458a93962946ccf))
- **router:** initialRouter with trigers options ([802405f](https://github.com/AliMD/alwatr/commit/802405fb17846be9fe51a41122c871b5aca9cf6b))
- **router:** joinParameterList, splitParameterString ([9a4232b](https://github.com/AliMD/alwatr/commit/9a4232b942f36a06cd3278e1a339639c9bcc82fa))
- **router:** make new package for routing base on sognals ([39c9ae8](https://github.com/AliMD/alwatr/commit/39c9ae8cf2d8288cfdefce0826f5fe89b2d7d550))
- **router:** makeRouteObject ([6e0e5dc](https://github.com/AliMD/alwatr/commit/6e0e5dc6fa10a6c02b1aeb198355040de6e235d2))
- **router:** parseValue all sections and params value ([9af4079](https://github.com/AliMD/alwatr/commit/9af4079f03dc2b656694f962701fcf75da23fa99))
- **router:** requestRouteHref ([9341f3f](https://github.com/AliMD/alwatr/commit/9341f3ff444bcdf26fd31f5eca71912dd70b7167))
- **router:** route base types ([769e863](https://github.com/AliMD/alwatr/commit/769e863b3a1569a01b320390b007bccaa80c3458))
- **router:** routeSignalProvider ([ad187e7](https://github.com/AliMD/alwatr/commit/ad187e706b6d62abd0668cf9bc7b64c49acab071))
- **signal:** add contributors ([64287cd](https://github.com/AliMD/alwatr/commit/64287cd8cea95665a6ed298177df60dadda7642b))
- **signal:** improve signal provider by dispatch return content ([80c2b27](https://github.com/AliMD/alwatr/commit/80c2b275bcc0521327400c5902f512c778f5eb3f))
- **signal:** improve signal provider by dispatch return content ([188f295](https://github.com/AliMD/alwatr/commit/188f2955e1663b318971e0d495bdd303a42bab56))

## [0.1.2](https://github.com/AliMD/alwatr/compare/v0.1.1...v0.1.2) (2022-03-03)

**Note:** Version bump only for package alwatr

## [0.1.1](https://github.com/AliMD/alwatr/compare/v0.1.0...v0.1.1) (2022-03-03)

### Bug Fixes

- **packages:** add publish config to public ([9cb3710](https://github.com/AliMD/alwatr/commit/9cb37106b5a35d24d5195ff54232e5769ccc034e))

# 0.1.0 (2022-03-02)

### Bug Fixes

- add lint to scripts ([18ef613](https://github.com/AliMD/alwatr/commit/18ef613bf6dfe3bfa108f801ed9ab522efa16d9b))
- add type module ([2649798](https://github.com/AliMD/alwatr/commit/2649798c752138742cbdd14ee78768daa26f5b5a))
- **bug:** fix ts list includes ([eba9b36](https://github.com/AliMD/alwatr/commit/eba9b369ac3cc4f7e01933f304c5a11bcf8608a9))
- **bug:** rootDir `src` to `.` ([4ad87ee](https://github.com/AliMD/alwatr/commit/4ad87ee4a84b80afe563db5d42671ec9624ffce3))
- change all [@one](https://github.com/one) to [@alwatr](https://github.com/alwatr) ([e0573bf](https://github.com/AliMD/alwatr/commit/e0573bf8b55c9e25bad3f7b407cc2c3d509f36d3))
- fix import module ([38dff29](https://github.com/AliMD/alwatr/commit/38dff29a99e21f75f35be31bc11fb84e1f9d4a55))
- fix port string to number ([6f5f133](https://github.com/AliMD/alwatr/commit/6f5f1332f9851f976c83148ea2e113001d1526f7))
- **logger:** fix debug scope ([be62f14](https://github.com/AliMD/alwatr/commit/be62f142cbe3fe4d328e3fd9941ea7c2d640a23f))
- **logger:** fix logger debug scope ([e734d21](https://github.com/AliMD/alwatr/commit/e734d218db888ecec33a03dc805b98dd75543efd))
- remove `src` and move all content to `root` ([3323322](https://github.com/AliMD/alwatr/commit/33233220ed576f30249aa1197105219b62c65945))
- remove `watch` scripts ([4e281b0](https://github.com/AliMD/alwatr/commit/4e281b030693c0a828f78c5e77d84e851a2dd242))
- remove license ([86a1100](https://github.com/AliMD/alwatr/commit/86a11003026fb39321fe0a432974cc2f99c5d4b1))
- remove serve script ([48bef31](https://github.com/AliMD/alwatr/commit/48bef319cbb4e9838039dbffa5671af67566ec3f))
- remove test package ([ac58dd8](https://github.com/AliMD/alwatr/commit/ac58dd89ab5bdd87b40c24d16acef09e8aa1fdf7))
- **signal:** AlwatrRequestSignals global type ([228e333](https://github.com/AliMD/alwatr/commit/228e3333326b23df51e7834872daf1349826bf09))
- tsconfig issues ([159adeb](https://github.com/AliMD/alwatr/commit/159adeb72de4626dc16f6657765605b0a2ddccb1))

### Features

- add .editorconfig file ([d05f1d3](https://github.com/AliMD/alwatr/commit/d05f1d3f9f1e81316d52831c8b2f776728fc967c))
- add eslint configuration ([1360f31](https://github.com/AliMD/alwatr/commit/1360f317c6b1031640e410549499f1510d50e862))
- add ts-lint.json ([5c592d8](https://github.com/AliMD/alwatr/commit/5c592d8e4643d2e9dc85fd0582eec054e0e02463))
- build demo ([e50b310](https://github.com/AliMD/alwatr/commit/e50b3106f428a2a11cc0d960970017d564caa017))
- build index ([93b604f](https://github.com/AliMD/alwatr/commit/93b604f44d43eedec5df1dd47ad84b96a99ed9b7))
- demo html ([de43204](https://github.com/AliMD/alwatr/commit/de432043c1b46f2c8f0d9c4f46580b31f3eee066))
- **demo:** add error and force sample ([0aa2edd](https://github.com/AliMD/alwatr/commit/0aa2edd896b417ea79a249f3332ad629e80a17fa))
- **demo:** add alwatr logger demo ([f759a06](https://github.com/AliMD/alwatr/commit/f759a06f65545d3589a136f2b9a553dfdb1f2af2))
- **demo:** alwatr logger demo ([302c6f4](https://github.com/AliMD/alwatr/commit/302c6f46fcc00796e6c030c6fe98a6c2b9f21d04))
- **logger:** debug scope ([6e4190d](https://github.com/AliMD/alwatr/commit/6e4190dc9dafc28e3a7a481aa43622a23527993c))
- **logger:** debug scope ([67dbde0](https://github.com/AliMD/alwatr/commit/67dbde00d925c2d78ae069439abe2a8a55d188b4))
- **logger:** debug scope logger package ([1a4baeb](https://github.com/AliMD/alwatr/commit/1a4baeb7a253ba66563dbcf06079242dabb9f246))
- **logger:** alwatr logger package ([711268e](https://github.com/AliMD/alwatr/commit/711268e17dea8ada9c901ef1e9d605b3212abd97))
- **logger:** alwatr meta structure ([feade73](https://github.com/AliMD/alwatr/commit/feade735a6f141db77b81d7791d8872d45c8bf7e))
- **scripts:** add watch commands ([af66f88](https://github.com/AliMD/alwatr/commit/af66f8848065750a414eda55c69f505b24c2da32))
- **server:** build index file ([930bf86](https://github.com/AliMD/alwatr/commit/930bf86c0158929c14ebdefbaeeb6ded80be4450))
- **server:** install and config web dev server ([2b42610](https://github.com/AliMD/alwatr/commit/2b4261050b855bddd2f594868993305d37086be8))
- **signal:** addSignalListener ([e7c5742](https://github.com/AliMD/alwatr/commit/e7c57427ef11e2624eb9a52a166720b1a3c5f66a))
- **signal:** getSignalObject ([b38954c](https://github.com/AliMD/alwatr/commit/b38954cf4ae1c24eaaa79ecf513995a4678814ee))
- **signal:** impeliment addSignalProvider, waitForSignal, hasSignalDispatchedBefore, expireSignal ([e0b4d78](https://github.com/AliMD/alwatr/commit/e0b4d7831764d4454591f5105c5512e1657a63e5))
- **signal:** impeliment dispatchSignal ([cb2dfbe](https://github.com/AliMD/alwatr/commit/cb2dfbe23ea751cba93cb1f6516cd2bfa2ecb18e))
- **signal:** ListenerObject, SignalObject types ([36d8a33](https://github.com/AliMD/alwatr/commit/36d8a336760bba3808cfd26a28e4d24a31c95f8f))
- **signal:** make new package for manage signals ([5bf82b3](https://github.com/AliMD/alwatr/commit/5bf82b3f05abc89102634e9b864d81b5b5af527e))
- **signal:** register to alwatr meta ([9c850e8](https://github.com/AliMD/alwatr/commit/9c850e8df787aa44d289929dc65439e921982dce))
- **signal:** removeSignalListener ([0088a52](https://github.com/AliMD/alwatr/commit/0088a5269ccce8b50a50e444695c81654fda70ff))
- **signal:** requestSignal ([111ab5a](https://github.com/AliMD/alwatr/commit/111ab5a1436bc380f5121ef8c130da7010258d90))
- **svg-icon:** init svg-icon package (ionicons) ([#14](https://github.com/AliMD/alwatr/issues/14)) ([5b3a8f6](https://github.com/AliMD/alwatr/commit/5b3a8f67f5676e0a2139cfa30b60666190c991cf))
