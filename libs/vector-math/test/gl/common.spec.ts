/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

/*
* common.js unit test
*/
import { EPSILON, equals, toRadian } from '../../src/common';

describe('matrix', () => {
  let result: any;

  describe('toRadian', () => {
    beforeEach(() => {
      result = toRadian(180);
    });
    it('should return a value of 3.141592654(Math.PI)', () => {
      expect(result).toBeCloseTo(Math.PI);
    });
  });

  describe('equals', () => {
    let r0: boolean;
    let r1: boolean;
    let r2: boolean;
    beforeEach(() => {
      r0 = equals(1.0, 0.0);
      r1 = equals(1.0, 1.0);
      r2 = equals(1.0 + EPSILON / 2, 1.0);
    });
    it('should return false for different numbers', () => {
      expect(r0).toBe(false);
    });
    it('should return true for the same number', () => {
      expect(r1).toBe(true);
    });
    it('should return true for numbers that are close', () => {
      expect(r2).toBe(true);
    });
  });
});
