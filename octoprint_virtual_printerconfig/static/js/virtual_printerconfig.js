/*
 * View model for Virtual Printer Settings
 *
 * Author: Charlie
 * License: AGPLv3
 */
$(function () {
    function Virtual_Printer_SettingsViewModel(parameters) {
        var self = this;

        self.settingsViewModel = parameters[0];

        self.resend_every_n = ko.pureComputed(function () {
            if (
                self.settingsViewModel.settings.plugins.virtual_printer.resend_ratio() >
                0
            ) {
                return Math.floor(
                    100 /
                        self.settingsViewModel.settings.plugins.virtual_printer.resend_ratio()
                );
            } else {
                return 0;
            }
        });

        self.capabilities = ko.observableArray([]);
        self.newCapability = ko.observable();
        self.resetLines = ko.observableArray([]);
        self.newResetLine = ko.observable();
        self.preparedOks = ko.observableArray([]);
        self.newPreparedOk = ko.observable();

        self.addCapability = function () {
            self.capabilities.unshift({
                name: ko.observable(self.newCapability()),
                value: ko.observable(true),
            });
            self.newCapability("");
        };
        self.deleteCapability = function (cap) {
            self.capabilities.remove(cap);
        };

        self.addResetLine = function () {
            self.resetLines.unshift(ko.observable(self.newResetLine()));
            self.newResetLine("");
        };
        self.deleteResetLine = function (cap) {
            self.resetLines.remove(cap);
        };

        self.addPreparedOk = function () {
            self.preparedOks.unshift(ko.observable(self.newPreparedOk()));
            self.newPreparedOk("");
        };

        self.deletePreparedOk = function (cap) {
            self.preparedOks.remove(cap);
        };

        self.onAllBound = self.onEventSettingsUpdated = self.onServerReconnect = function () {
            self.capabilities([]);
            for (let cap in self.settingsViewModel.settings.plugins
                .virtual_printer.capabilities) {
                let value = self.settingsViewModel.settings.plugins.virtual_printer.capabilities[
                    cap
                ]();
                self.capabilities.unshift({
                    name: ko.observable(cap),
                    value: ko.observable(value),
                });
            }
            self.resetLines([]);
            for (let line in self.settingsViewModel.settings.plugins.virtual_printer.resetLines()) {
                let value = self.settingsViewModel.settings.plugins.virtual_printer.resetLines()[
                    line
                ];
                self.resetLines.unshift(ko.observable(value));
            }
            self.preparedOks([]);
            for (let line in self.settingsViewModel.settings.plugins.virtual_printer.preparedOks()) {
                let value = self.settingsViewModel.settings.plugins.virtual_printer.preparedOks()[
                    line
                ];
                self.preparedOks.unshift(ko.observable(value));
            }
        };

        self.onSettingsBeforeSave = function () {
            var data = {};
            for (let cap in self.capabilities()) {
                data[self.capabilities()[cap].name()] = self.capabilities()[
                    cap
                ].value;
            }
            self.settingsViewModel.settings.plugins.virtual_printer.capabilities = data;

            self.settingsViewModel.settings.plugins.virtual_printer.resetLines(
                []
            );
            for (let line in self.resetLines()) {
                self.settingsViewModel.settings.plugins.virtual_printer.resetLines.push(
                    self.resetLines()[line]
                );
            }

            self.settingsViewModel.settings.plugins.virtual_printer.preparedOks(
                []
            );
            for (let line in self.preparedOks()) {
                self.settingsViewModel.settings.plugins.virtual_printer.preparedOks.push(
                    self.preparedOks()[line]
                );
            }
        };
    }
    OCTOPRINT_VIEWMODELS.push({
        construct: Virtual_Printer_SettingsViewModel,
        dependencies: ["settingsViewModel"],
        elements: ["#settings_plugin_virtual_printerconfig"],
    });
});
