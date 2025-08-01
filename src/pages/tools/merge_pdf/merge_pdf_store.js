"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var zustand_1 = require("zustand");
var useMergePdfStore = (0, zustand_1.create)(function (set) { return ({
    selectedFiles: [],
    fileNames: [''],
    fileSize: [],
    numPages: [],
    fileType: ["pdf"],
    setSelectedFiles: function (newFile) {
        return set(function (state) { return ({ selectedFiles: __spreadArray(__spreadArray([], state.selectedFiles, true), [newFile], false) }); });
    },
    setFileSize: function (newFileSize) {
        return set(function (state) { return ({ fileSize: __spreadArray(__spreadArray([], state.fileSize, true), [newFileSize], false) }); });
    },
    setNumPages: function (newNumPages) {
        return set(function (state) { return ({ numPages: __spreadArray(__spreadArray([], state.numPages, true), [newNumPages], false) }); });
    },
    setFileName: function (newFileName) {
        return set(function (state) { return ({ fileNames: __spreadArray(__spreadArray([], state.fileNames, true), [newFileName], false) }); });
    },
    removeSelectedFiles: function (fileToRemove) {
        return set(function (state) { return ({
            selectedFiles: state.selectedFiles.filter(function (file) { return file !== fileToRemove; }),
        }); });
    },
}); });
exports.default = useMergePdfStore;
