# Virtual Printer Settings

Add easily configurable and well organised settings for OctoPrint's virtual printer.
Overrides the default template which only has an enabling checkbox.

Very useful if you are developing plugins, or even core OctoPrint. No more digging deep into config.yaml and hoping you typed the settings correctly!

### This plugin is not under _active_ development, but if you have any problems, or feature requests I would be happy to take a look & see what I can do.

## Compatibility

### OctoPrint

The latest version of the plugin is only tested with OctoPrint 1.8.x.
To find a version compatible with your instance, take a look in the table below

| OctoPrint version | Plugin version | Install URL                                                                        |
|-------------------|----------------|------------------------------------------------------------------------------------|
| 1.8.x onwards     | 2022.07.04     | `https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/2022.7.04.zip` |
| 1.5.x -1.7.x      | 1.5.x          | `https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/1.5.1.zip`     |
| 1.4.x             | 0.1.3          | `https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/0.1.3.zip`     |

Use the above URLs in OctoPrint's [Plugin Manager](https://docs.octoprint.org/en/master/bundledplugins/pluginmanager.html) >
Get More > ...from URL field.

### Browser

This plugin uses some modern browser features and as a result it won't work correctly on older browsers that do not support
ES6 JS features. I've tested it on modern Chromium-based browsers, and it works fine for me, if you have issues with a particular
browser, please let me know.

## Setup

Install via the bundled [Plugin Manager](https://docs.octoprint.org/en/master/bundledplugins/pluginmanager.html)
or manually using this URL:

    https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/master.zip

## Contribution

Contributions are welcome, there is nothing too special about developing this plugin. If you can run the pre-commit
checks below after your changes are made that would be great.

**Pre-commit**

- `pre-commit run --hook-stage manual --all-files` to run all of the checks

## Configuration

Plugin adds settings to OctoPrint's UI that are [documented here](https://docs.octoprint.org/en/master/development/virtual_printer.html#virtual-printer-configuration-options)

It replaces the original implementation, introduced in OctoPrint 1.4.1

![screenshot](extras/settings.png)

## Sponsors

- [@KenLucke](https://github.com/KenLucke)
- [@iFrostizz](https://github.com/iFrostizz)
- [@CmdrCody51](https://github.com/CmdrCody51)

As well as 5 others supporting me regularly through [GitHub Sponsors](https://github.com/sponsors/cp2004)!

## Supporting my efforts

I created this project in my spare time, so if you have found it useful or enjoyed using it then please consider [supporting it's development!](https://github.com/sponsors/cp2004). You can sponsor monthly or one time, for any amount you choose.

## 🔨
