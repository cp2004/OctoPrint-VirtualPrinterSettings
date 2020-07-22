# coding=utf-8
from __future__ import absolute_import

### (Don't forget to remove me)
# This is a basic skeleton for your plugin's __init__.py. You probably want to adjust the class name of your plugin
# as well as the plugin mixins it's subclassing from. This is really just a basic skeleton to get you started,
# defining your plugin as a template plugin, settings and asset plugin. Feel free to add or remove mixins
# as necessary.
#
# Take a look at the documentation on what other plugin mixins are available.

import octoprint.plugin


class VirtualPrinterSettingsPlugin(octoprint.plugin.TemplatePlugin, octoprint.plugin.AssetPlugin):

	def get_template_configs(self):
		return [dict(
			type="settings",
			name="Virtual Printer",
			replaces="plugin_virtual_printer",
			template="virtual_printer2_settings.jinja2",
			custom_bindings=False
		)]

	def get_assets(self):
		return dict(
			js=["js/jquery-ui.min.js", "js/knockout-sortable.js", "js/virtual_printer_settings.js"]
		)

	##~~ Softwareupdate hook

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
__plugin_pythoncompat__ = ">=2.7,<4" # python 2 and 3

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = VirtualPrinterSettingsPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

