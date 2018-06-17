/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

let tape = require('tape');

tape.Test.prototype.inDelta = function(actual, expected) {
  this._assert(expected - 1e-6 < actual && actual < expected + 1e-6, {
    message: 'should be in delta',
    operator: 'inDelta',
    actual,
    expected,
  });
};
