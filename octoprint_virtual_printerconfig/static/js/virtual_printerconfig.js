/*
 * View model for Virtual Printer Settings
 *
 * Author: Charlie
 * License: AGPLv3
 */
$(function() {
    function Virtual_Printer_SettingsViewModel(parameters) {
        var self = this;

        self.settingsViewModel = parameters[0]
    }
    OCTOPRINT_VIEWMODELS.push({
        construct: Virtual_Printer_SettingsViewModel,
        dependencies: ["settingsViewModel"],
        elements: ["#settings_plugin_virtual_printerconfig"]
    });
});
