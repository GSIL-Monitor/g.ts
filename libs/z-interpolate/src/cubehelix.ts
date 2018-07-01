/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {ColorCubehelix} from '@gradii/z-math/z-color';
import {InterpolateColor, InterpolateHue} from './color';

export class InterpolateCubehelix {
  public h: any;
  public s: any;
  public l: any;
  public opacity: any;

  constructor(public gamma = 1) {
  }

  public interpolate(start: string, end: string) {
    const _start = ColorCubehelix.create(start);
    const _end = ColorCubehelix.create(end);

    this.h = new InterpolateHue().interpolate(_start.h, _end.h);
    this.s = new InterpolateColor().interpolate(_start.s, _end.s);
    this.l = new InterpolateColor().interpolate(_start.l, _end.l);
    this.opacity = new InterpolateColor().interpolate(_start.opacity, _end.opacity);
  }

  public getResult(t) {
    return new ColorCubehelix(
      this.h.getResult(t),
      this.s.getResult(t),
      this.l.getResult(Math.pow(t, this.gamma)),
      this.opacity.getResult(t)
    );
  }
}

export class InterpolateCubehelixLong extends InterpolateCubehelix {
  constructor(gamma) {
    super(gamma);
  }

  public interpolate(start: string, end: string) {
    const _start = ColorCubehelix.create(start);
    const _end = ColorCubehelix.create(end);

    this.h = new InterpolateColor().interpolate(_start.h, _end.h);
    this.s = new InterpolateColor().interpolate(_start.s, _end.s);
    this.l = new InterpolateColor().interpolate(_start.l, _end.l);
    this.opacity = new InterpolateColor().interpolate(_start.opacity, _end.opacity);
    return this;
  }

}
