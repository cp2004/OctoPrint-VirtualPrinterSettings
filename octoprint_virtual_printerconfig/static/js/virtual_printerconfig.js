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

        self.resend_every_n = ko.pureComputed(function (){
            if (self.settingsViewModel.settings.plugins.virtual_printer.resend_ratio() > 0) {
                return Math.floor(100 / self.settingsViewModel.settings.plugins.virtual_printer.resend_ratio())
            } else {
                return 0
            }
        })
    }
    OCTOPRINT_VIEWMODELS.push({
        construct: Virtual_Printer_SettingsViewModel,
        dependencies: ["settingsViewModel"],
        elements: ["#settings_plugin_virtual_printerconfig"]
    });
});
