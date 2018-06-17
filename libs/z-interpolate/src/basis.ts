/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

export function basis(t1, v0, v1, v2, v3) {
  let t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
    + (4 - 6 * t2 + 3 * t3) * v1
    + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
    + t3 * v3) / 6;
}

export function interpolateBasis(values) {
  let n = values.length - 1;
  return (t) => {
    let i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

export class InterpolateBasis {

  public interpolate() {

  }

  public static create() {

  }
}
