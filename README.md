# Virtual Printer Settings

Add easily configurable and well organised settings for OctoPrint's virtual printer.
Overrides the default template which only has an enabling checkbox.

Very useful if you are developing plugins, or even core OctoPrint. No more digging deep into config.yaml and hoping you typed the settings correctly!

### This plugin is not under _active_ development, but if you have any problems, or feature requests I would be happy to take a look & see what I can do.

## Compatibility

The lastest version of the plugin is only compatible with OctoPrint 1.5.x.
To find a version compatible with your instance, take a look in the table below

| OctoPrint version | Plugin version | Install URL                                                                    |
| ----------------- | -------------- | ------------------------------------------------------------------------------ |
| 1.5.x -1.6.x            | 1.5.x          | `https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/1.5.1.zip` |
| 1.4.1/2           | 0.1.3          | `https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/0.1.3.zip` |

Use the above URLs in OctoPrint's [Plugin Manager](https://docs.octoprint.org/en/master/bundledplugins/pluginmanager.html) >
Get More > ...from URL field.

## Setup

Install via the bundled [Plugin Manager](https://docs.octoprint.org/en/master/bundledplugins/pluginmanager.html)
or manually using this URL:

    https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/master.zip
    
## Contribution (local development for JS)

* Install: `npm install`
* Build JS assets in development mode: `npm run dev`
* Build assets in production mode: `npm run build`

If you can't build the assets locally but want to make a small change, I can build it 🙂

**Pre-commit**

* `pre-commit run --hook-stage manual --all-files` to run all of the checks

**ESLint (JS)**

* This is checked by pre-commit, but in case you want to automatically fix things run `eslint --fix`. Many IDEs have support for this built in.


## Configuration

Plugin adds settings to OctoPrint's UI that are [documented here](https://docs.octoprint.org/en/master/development/virtual_printer.html#virtual-printer-configuration-options)

It replaces the original implementation, introduced in OctoPrint 1.4.1

![screenshot](extras/settings.png)

## Sponsors

* Sponsor

## 🔨
