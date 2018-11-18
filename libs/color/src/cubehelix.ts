/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

// tslint:disable triple-equals
import { Color } from './color';
import { deg2rad, rad2deg } from './common';
import { brighter, darker } from './const';
import { Rgb } from './rgb';

const A     = -0.14861,
      B     = +1.78277,
      C     = -0.29227,
      D     = -0.90649,
      E     = +1.97294,
      ED    = E * D,
      EB    = E * B,
      BC_DA = B * C - D * A;

export class Cubehelix extends Color {
  constructor(public h, public s, public l, public opacity) {
    super();
  }

  public brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  }

  public darker(k = 1) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  }

  public rgb() {
    const h    = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
          l    = +this.l,
          a    = isNaN(this.s) ? 0 : this.s * l * (1 - l),
          cosh = Math.cos(h),
          sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }

  public static create(color) {
    if (color instanceof Cubehelix) { return new Cubehelix(color.h, color.s, color.l, color.opacity); }
    if (!(color instanceof Rgb)) { color = Rgb.create(color); }
    const r  = color.r / 255,
          g  = color.g / 255,
          b  = color.b / 255,
          l  = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
          bl = b - l,
          k  = (E * (g - l) - C * bl) / D,
          s  = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
          h  = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, color.opacity);
  }

}
