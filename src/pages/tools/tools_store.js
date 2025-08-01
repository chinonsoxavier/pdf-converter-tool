"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zustand_1 = require("zustand");
var useToolsStore = (0, zustand_1.create)(function (set) { return ({
    sideMenuOpen: false,
    toggleSideMenuOpen: function () {
        return set(function (state) { return ({ sideMenuOpen: !state.sideMenuOpen }); });
    },
}); });
exports.default = useToolsStore;
