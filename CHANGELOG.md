# Changelog

This project is following [Semantic Versioning](http://semver.org)

## [Unreleased][]

## [0.3.0][] - 2018-11-14

### Added

 - show an application placeholder before the app gets a change to load

### Changed

 - upgrade dependencies

## [0.2.0][] - 2018-10-25

### Added

  - the number of linked issue is displayed in the badge count
  
### Changed

  - ux changes  


## [0.1.0][] - 2018-08-31

 - use the new apps structure
 - use @deskpro/apps-sdk@0.8.0
 - use @deskpro/apps-components@0.8.0

## [0.1.0-beta.7][] - 2018-04-27

### Added

    - admin readme

### Changed

  - oauth2 popup replaced with authentication screen
  - authentication is now using long-lived refresh tokens to avoid authenticating the user every hour

## [0.1.0-beta.6][] - 2018-04-06

### Added

    - travis ci will atttach builds to Github PR's when enabled via s3 environment variables

### Fixed

 - replaces corrupt YT icon

### Changed

    - upgrade to `@deskpro/apps-installer` version `0.4.5`
    - upgrade to `@deskpro/apps-dpat` version `0.10.4`
    - upgrade to `@deskpro/apps-sdk-react` version `0.2.13`
    - upgrade to `@deskpro/apps-sdk-core` version `^1.0.0-beta.29`
    - uses `@deskpro/redux-components`

## [0.1.0-beta.5][] - 2018-03-02

- Added support for searching for issues

## [0.1.0-beta.4][] - 2018-02-26

 - Add ability to link to existing YouTrack issue ID

## [0.1.0-beta.3][] - 2018-02-22

 - fix loading webpack manifest

## [0.1.0-beta.2][] - 2018-02-09

 - default `process.env.NODE_ENV` to `production` when packaging the app for distribution with webpack

## [0.1.0-beta.1][] - 2018-02-07

 - add support for viewing and creating Youtrack issues.

[Unreleased]: https://github.com/DeskproApps/youtrack/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/DeskproApps/youtrack/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/DeskproApps/youtrack/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/DeskproApps/youtrack/compare/v0.1.0-beta.7...v0.1.0
[0.1.0-beta.7]: https://github.com/DeskproApps/youtrack/compare/v0.1.0-beta.6...v0.1.0-beta.7
[0.1.0-beta.6]: https://github.com/DeskproApps/youtrack/compare/v0.1.0-beta.5...0.1.0-beta.6
[0.1.0-beta.5]: https://github.com/DeskproApps/youtrack/compare/v0.1.0-beta.4...v0.1.0-beta.5
[0.1.0-beta.4]: https://github.com/DeskproApps/youtrack/compare/v0.1.0-beta.3...v0.1.0-beta.4
[0.1.0-beta.3]: https://github.com/DeskproApps/youtrack/compare/v0.1.0-beta.2...v0.1.0-beta.3
[0.1.0-beta.2]: https://github.com/DeskproApps/youtrack/compare/v0.1.0-beta.1...v0.1.0-beta.2
[0.1.0-beta.1]: https://github.com/DeskproApps/youtrack/tree/v0.1.0-beta.1
