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

        self.capabilities = ko.observableArray([])
        self.newCapability = ko.observable()

        self.addCapability = function () {
            self.capabilities.unshift({
                name: ko.observable(self.newCapability()),
                value: ko.observable(true)
            })
            self.newCapability("")
        }

        self.deleteCapability = function (cap) {
            self.capabilities.remove(cap)
        }

        self.onAllBound = self.onEventSettingsUpdated = self.onServerReconnect = function() {
            console.log(self.settingsViewModel.settings.plugins.virtual_printer.capabilities)
            self.capabilities([])
            for (let cap in self.settingsViewModel.settings.plugins.virtual_printer.capabilities){
                console.log(cap)
                let value = self.settingsViewModel.settings.plugins.virtual_printer.capabilities[cap]()
                self.capabilities.unshift({
                    name: ko.observable(cap),
                    value: ko.observable(value)
                })
            }
        }

        self.onSettingsBeforeSave = function () {
            var data = {}
            for (let cap in self.capabilities()){
                data[self.capabilities()[cap].name()] = self.capabilities()[cap].value
            }
            console.log(data)
            self.settingsViewModel.settings.plugins.virtual_printer.capabilities = data
        }
    }
    OCTOPRINT_VIEWMODELS.push({
        construct: Virtual_Printer_SettingsViewModel,
        dependencies: ["settingsViewModel"],
        elements: ["#settings_plugin_virtual_printerconfig"]
    });
});
