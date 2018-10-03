import { Matrix2 } from '../src/matrix2';
import { Vector2 } from '../src/vector2';
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { parseMatrix, relativeTest } from '../testing/test-utils';

describe('matrix2', () => {
  it('adjoint', () => {
    let input          = [];
    let expectedOutput = [];

    input
      .push(parseMatrix(`0.830828627896291   0.549723608291140
                               0.585264091152724   0.917193663829810`));

    expectedOutput
      .push(parseMatrix(` 0.917193663829810  -0.549723608291140
                               -0.585264091152724   0.830828627896291`));

    input
      .push(parseMatrix(`1    0
                               0    1`));

    expectedOutput
      .push(parseMatrix(`1    0
                               0    1`));

    expect(input.length === expectedOutput.length).toBe(true);

    for (let i = 0; i < input.length; i++) {
      let output = input[i].clone();
      (output as Matrix2).scaleAdjoint(1);
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('determinant', () => {
    let input          = [];
    let expectedOutput = [];

    input.push(parseMatrix(`0.830828627896291   0.549723608291140
                                  0.585264091152724   0.917193663829810`));
    expectedOutput.push(0.440297265243183);

    expect(input.length == expectedOutput.length);

    for (let i = 0; i < input.length; i++) {
      const output = input[i].determinant();
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('transform', () => {
    const rot   = Matrix2.rotation(Math.PI / 4);
    const input = new Vector2(0.234245234259, 0.890723489233);

    const expected = new Vector2(
      rot.entry(0, 0) * input.x + rot.entry(0, 1) * input.y,
      rot.entry(1, 0) * input.x + rot.entry(1, 1) * input.y);

    const transExpected = new Vector2(
      rot.entry(0, 0) * input.x + rot.entry(1, 0) * input.y,
      rot.entry(0, 1) * input.x + rot.entry(1, 1) * input.y);

    relativeTest(rot.transformed(input), expected);
    relativeTest(rot.transposed().transformed(input), transExpected);
  });

  it('inversion', () => {
    const m      = new Matrix2(4, 3, 3, 2);
    const result = Matrix2.zero();
    const det    = result.copyInverse(m);
    expect(det).toBe(-1.0);
    expect(result.entry(0, 0)).toBe(-2.0);
    expect(result.entry(1, 0)).toBe(3.0);
    expect(result.entry(0, 1)).toBe(3.0);
    expect(result.entry(1, 1)).toBe(-4.0);
  });

  it('dot', () => {
    const matrix = new Matrix2(1, 3, 2, 4);
    const v      = new Vector2(3, 4);

    expect(matrix.dotRow(0, v)).toBe(15);
    expect(matrix.dotRow(1, v)).toBe(22);
    expect(matrix.dotColumn(0, v)).toBe(11);
    expect(matrix.dotColumn(1, v)).toBe(25);
  });

  it('scale', () => {
    const m = parseMatrix(`1  3
                                          2  4`) as Matrix2;
    const n = m.scaled(2);

    expect(n.at(0)).toBe(2);
    expect(n.at(1)).toBe(6);
    expect(n.at(2)).toBe(4);
    expect(n.at(3)).toBe(8);
  });

  // it('solving', () => {
  //   expect(false).toBe(false)
  // })

  it('equals', () => {
      // expect(false).toMatch()
  });

});
