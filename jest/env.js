/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

"use strict";
/* global jest */
jest.autoMockOff();

const fs = require("fs");
const jscodeshift = require("jscodeshift");
const p = require("path");
var options = require("../transforms/util/options");

const read = fileName => fs.readFileSync(
    p.join(__dirname, global.baseDir, "test", fileName),
    "utf8"
);

global.test = (transformName, testFileName, testOptions, fakeOptions) => {
    let path = testFileName + ".js";
    const source = read(testFileName + ".js");
    const output = read(testFileName + ".output.js");
    const transform = require(
        p.join(global.baseDir, "/transforms/", transformName)
    );

    if (fakeOptions) {
        if (fakeOptions.path) {
            path = fakeOptions.path;
        }
    }

    options = Object.assign({}, options, testOptions);

    expect(
        (transform({path, source}, {jscodeshift}, options) || "").trim()
    ).toEqual(
        output.trim()
    );
};
