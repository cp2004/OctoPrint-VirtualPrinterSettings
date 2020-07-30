# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin


class VirtualPrinterSettingsPlugin(octoprint.plugin.TemplatePlugin,
                                   octoprint.plugin.RestartNeedingPlugin):

    def get_template_configs(self):
        return [dict(
            type="settings",
            name="Virtual Printer",
            replaces="plugin_virtual_printer",
            template="virtual_printer2_settings.jinja2",
            custom_bindings=False
        )]

    # Softwareupdate hook
    def get_update_information(self):
        return dict(
            virtual_printer2=dict(
                displayName="Virtual Printer Settings",
                displayVersion=self._plugin_version,

                # version check: github repository
                type="github_release",
                user="cp2004",
                repo="OctoPrint-VirtualPrinterSettings",
                current=self._plugin_version,

                # update method: pip
                pip="https://github.com/cp2004/OctoPrint-VirtualPrinterSettings/archive/{target_version}.zip"
            )
        )


__plugin_name__ = "Virtual Printer Settings"
__plugin_pythoncompat__ = ">=2.7,<4"  # python 2 and 3


def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = VirtualPrinterSettingsPlugin()

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }

