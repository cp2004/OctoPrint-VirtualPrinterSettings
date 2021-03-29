# -*- coding: utf-8 -*-
from __future__ import absolute_import

import octoprint.plugin

from ._version import get_versions

__version__ = get_versions()["version"]
del get_versions


class VirtualPrinterSettingsPlugin(
    octoprint.plugin.TemplatePlugin, octoprint.plugin.AssetPlugin
):
    def get_template_configs(self):
        return [
            {
                "type": "settings",
                "name": "Virtual Printer",
                "replaces": "plugin_virtual_printer",
                "template": "settings_replacement.jinja2",
                "custom_bindings": True,
            }
        ]

    def get_template_vars(self):
        return {
            "version": self._plugin_version,
        }

    def get_assets(self):
        return {
            "js": ["dist/virtual_printerconfig.js"],
        }

    # Softwareupdate hook
    def get_update_information(self):
        return {
            "virtual_printerconfig": {
                "displayName": "Virtual Printer Settings",
                "displayVersion": self._plugin_version,
                # version check: github repository
                "type": "github_release",
                "user": "cp2004",
                "repo": "OctoPrint-VirtualPrinterSettings",
                "current": self._plugin_version,
                "stable_branch": {
                    "name": "Stable",
                    "branch": "master",
                    "comittish": ["master"],
                },
                "prerelease_branches": [
                    {
                        "name": "Release Candidate",
                        "branch": "pre-release",
                        "comittish": ["pre-release", "master"],
                    }
                ],
                # update method: pip
                "pip": "https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/{target_version}.zip",
            }
        }


__plugin_name__ = "Virtual Printer Settings"
__plugin_pythoncompat__ = ">=2.7,<4"  # python 2 and 3
__plugin_version__ = __version__


def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = VirtualPrinterSettingsPlugin()

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }
