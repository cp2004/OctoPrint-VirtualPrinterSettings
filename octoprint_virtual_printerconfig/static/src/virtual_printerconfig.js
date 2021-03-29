/*
 * View model for Virtual Printer Settings
 *
 * Author: Charlie
 * License: AGPLv3
 */
const $ = window.$
const ko = window.ko
const OCTOPRINT_VIEWMODELS = window.OCTOPRINT_VIEWMODELS
const observable = ko.observable

$(function () {
  function VirtualPrinterSettingsViewModel (parameters) {
    const self = this

    self.settingsViewModel = parameters[0]

    self.resend_every_n = ko.pureComputed(function () {
      if (self.settingsViewModel.settings.plugins.virtual_printer.resend_ratio() > 0) {
        return Math.floor(100 / self.settingsViewModel.settings.plugins.virtual_printer.resend_ratio())
      } else {
        return 0
      }
    })

    self.capabilities = ko.observableArray([])
    self.newCapability = observable()
    self.resetLines = ko.observableArray([])
    self.newResetLine = observable()
    self.preparedOks = ko.observableArray([])
    self.newPreparedOk = observable()

    self.addCapability = function () {
      self.capabilities.unshift({
        name: observable(self.newCapability()),
        value: observable(true)
      })
      self.newCapability('')
    }
    self.deleteCapability = function (cap) {
      self.capabilities.remove(cap)
    }

    self.addResetLine = function () {
      self.resetLines.unshift(observable(self.newResetLine()))
      self.newResetLine('')
    }
    self.deleteResetLine = function (cap) {
      self.resetLines.remove(cap)
    }

    self.addPreparedOk = function () {
      self.preparedOks.unshift(observable(self.newPreparedOk()))
      self.newPreparedOk('')
    }

    self.deletePreparedOk = function (cap) {
      self.preparedOks.remove(cap)
    }

    /*
     * This was way too confusing so I had to write it down...
     *
     * The settings data structure for CAPABILITIES
     * capabilities: {CAP: observable(true/false), CAP2: observable(true/false)}
     * turns to =>
     * capabilities: [
     *   {name: observables(CAP), capability: observable(true/false)},
     *   {name: observable(CAP2), value: observable(true/false)}
     * ]
     *
     * settings data structure for RESET LINES
     * resetLines: observable(array)
     * where the array is of format:
     * [line, line2]
     * turns to =>
     * resetLines: observableArray([observable(line), observable(line2)])
     *
     * settings data structure for PREPARED OKs
     * preparedOks: observable(array)
     * where the array is of format:
     * [ok, ok2]
     * turns to =>
     * preparedOks: observableArray([observable(ok), observable(ok2)])
     */

    self.onAllBound = self.onEventSettingsUpdated = self.onServerReconnect = function () {
      self.capabilities([])
      Object.keys(self.settingsViewModel.settings.plugins.virtual_printer.capabilities).forEach(cap => {
        self.capabilities.push({
          name: observable(cap),
          value: observable(self.settingsViewModel.settings.plugins.virtual_printer.capabilities[cap]())
        })
      })

      self.resetLines([])
      self.settingsViewModel.settings.plugins.virtual_printer.resetLines().forEach(line => {
        self.resetLines.push(observable(line))
      })

      self.preparedOks([])
      self.settingsViewModel.settings.plugins.virtual_printer.preparedOks().forEach(line => {
        self.preparedOks.push(observable(line))
      })
    }

    self.onSettingsBeforeSave = function () {
      const data = {}
      self.capabilities().forEach(cap => {
        data[cap.name()] = cap.value
      })
      self.settingsViewModel.settings.plugins.virtual_printer.capabilities = data

      const resetLines = []
      self.resetLines().forEach(line => {
        resetLines.push(line())
      })
      self.settingsViewModel.settings.plugins.virtual_printer.resetLines(resetLines)

      const preparedOks = []
      self.settingsViewModel.settings.plugins.virtual_printer.preparedOks([])
      self.preparedOks().forEach(line => {
        preparedOks.push(line())
      })
      self.settingsViewModel.settings.plugins.virtual_printer.preparedOks(preparedOks)
    }
  }
  OCTOPRINT_VIEWMODELS.push({
    construct: VirtualPrinterSettingsViewModel,
    dependencies: ['settingsViewModel'],
    elements: ['#settings_plugin_virtual_printerconfig']
  })
})
