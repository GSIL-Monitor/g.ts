/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { interpolateNumber, interpolateQuantize, interpolateRgb } from '../public-api';


describe('test interpolate quantize', () => {
  it('quantize(interpolate, n) returns n uniformly-spaced samples from the specified interpolator', () => {
    expect(interpolateQuantize(5, interpolateNumber(0, 1))).toEqual([
      0 / 4,
      1 / 4,
      2 / 4,
      3 / 4,
      4 / 4]);

    expect(interpolateQuantize(5, interpolateRgb('steelblue', 'brown'))).toEqual([
      'rgb(70, 130, 180)',
      'rgb(94, 108, 146)',
      'rgb(118, 86, 111)',
      'rgb(141, 64, 77)',
      'rgb(165, 42, 42)']);
  });
});

