/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {
  named,
  reHex3,
  reHex6,
  reHslaPercent,
  reHslPercent,
  reRgbaInteger,
  reRgbaPercent,
  reRgbInteger,
  reRgbPercent
} from './const';
import { Hsl } from './hsl';
import { Rgb } from './rgb';

/**
 * @param h
 * @param s
 * @param l
 * @param a
 *
 * @internal
 */
export function hsla(h: number, s: number, l: number, a: number) {
  if (a <= 0) {
    h = s = l = NaN;
  } else if (l <= 0 || l >= 1) {
    h = s = NaN;
  } else if (s <= 0) {
    h = NaN;
  }
  return new Hsl(h, s, l, a);
}

export function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return value.toString(16).padStart(2, '0');
}

export function create(format: string) {
  let m: any;
  format = (`${format}`).trim().toLowerCase();
  if (m = reHex3.exec(format)) {
    m = parseInt(m[1], 16);
    return new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1);
  } else if (m = reHex6.exec(format)) {
    return Rgb.rgbn(parseInt(m[1], 16));
  } else if (m = reRgbInteger.exec(format)) {
    return new Rgb(m[1], m[2], m[3], 1);
  } else if (m = reRgbPercent.exec(format)) {
    return new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1);
  } else if (m = reRgbaInteger.exec(format)) {
    return Rgb.rgba(m[1], m[2], m[3], m[4]);
  } else if (m = reRgbaPercent.exec(format)) {
    return Rgb.rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]);
  } else if (m = reHslPercent.exec(format)) {
    return hsla(+m[1], m[2] / 100, m[3] / 100, 1);
  } else if (m = reHslaPercent.exec(format)) {
    return hsla(+m[1], m[2] / 100, m[3] / 100, +m[4]);
  } else if (named.hasOwnProperty(format)) {
    return Rgb.rgbn(named[format]);
  } else if (format === 'transparent') {
    return new Rgb(NaN, NaN, NaN, 0);
  }
  return null;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function hsl2rgb(h, m1, m2) {
  return (h < 60
      ? m1 + (m2 - m1) * h / 60
      : h < 180
        ? m2
        : h < 240
          ? m1 + (m2 - m1) * (240 - h) / 60
          : m1
  ) * 255;
}

