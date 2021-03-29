/*
 * View model for Virtual Printer Settings
 *
 * Author: Charlie
 * License: AGPLv3
 */
const $ = window.$
const ko = window.ko
const OCTOPRINT_VIEWMODELS = window.ko

$(function () {
  function VirtualPrinterSettingsViewModel (parameters) {
    const self = this

    self.settingsViewModel = parameters[0]

    self.resend_every_n = ko.pureComputed(function () {
      if (
        self.settingsViewModel.settings.plugins.virtual_printer.resend_ratio() >
                0
      ) {
        return Math.floor(
          100 /
                        self.settingsViewModel.settings.plugins.virtual_printer.resend_ratio()
        )
      } else {
        return 0
      }
    })

    self.capabilities = ko.observableArray([])
    self.newCapability = ko.observable()
    self.resetLines = ko.observableArray([])
    self.newResetLine = ko.observable()
    self.preparedOks = ko.observableArray([])
    self.newPreparedOk = ko.observable()

    self.addCapability = function () {
      self.capabilities.unshift({
        name: ko.observable(self.newCapability()),
        value: ko.observable(true)
      })
      self.newCapability('')
    }
    self.deleteCapability = function (cap) {
      self.capabilities.remove(cap)
    }

    self.addResetLine = function () {
      self.resetLines.unshift(ko.observable(self.newResetLine()))
      self.newResetLine('')
    }
    self.deleteResetLine = function (cap) {
      self.resetLines.remove(cap)
    }

    self.addPreparedOk = function () {
      self.preparedOks.unshift(ko.observable(self.newPreparedOk()))
      self.newPreparedOk('')
    }

    self.deletePreparedOk = function (cap) {
      self.preparedOks.remove(cap)
    }

    self.onAllBound = self.onEventSettingsUpdated = self.onServerReconnect = function () {
      self.capabilities([])
      for (const cap in self.settingsViewModel.settings.plugins
        .virtual_printer.capabilities) {
        const value = self.settingsViewModel.settings.plugins.virtual_printer.capabilities[
          cap
        ]()
        self.capabilities.unshift({
          name: ko.observable(cap),
          value: ko.observable(value)
        })
      }
      self.resetLines([])
      for (const line in self.settingsViewModel.settings.plugins.virtual_printer.resetLines()) {
        const value = self.settingsViewModel.settings.plugins.virtual_printer.resetLines()[
          line
        ]
        self.resetLines.unshift(ko.observable(value))
      }
      self.preparedOks([])
      for (const line in self.settingsViewModel.settings.plugins.virtual_printer.preparedOks()) {
        const value = self.settingsViewModel.settings.plugins.virtual_printer.preparedOks()[
          line
        ]
        self.preparedOks.unshift(ko.observable(value))
      }
    }

    self.onSettingsBeforeSave = function () {
      const data = {}
      for (const cap in self.capabilities()) {
        data[self.capabilities()[cap].name()] = self.capabilities()[
          cap
        ].value
      }
      self.settingsViewModel.settings.plugins.virtual_printer.capabilities = data

      self.settingsViewModel.settings.plugins.virtual_printer.resetLines(
        []
      )
      for (const line in self.resetLines()) {
        self.settingsViewModel.settings.plugins.virtual_printer.resetLines.push(
          self.resetLines()[line]
        )
      }

      self.settingsViewModel.settings.plugins.virtual_printer.preparedOks(
        []
      )
      for (const line in self.preparedOks()) {
        self.settingsViewModel.settings.plugins.virtual_printer.preparedOks.push(
          self.preparedOks()[line]
        )
      }
    }
  }
  OCTOPRINT_VIEWMODELS.push({
    construct: VirtualPrinterSettingsViewModel,
    dependencies: ['settingsViewModel'],
    elements: ['#settings_plugin_virtual_printerconfig']
  })
})
