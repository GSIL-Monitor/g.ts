/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

export {default as interpolate} from './src/value';
export {default as interpolateArray} from './src/array';
export {default as interpolateBasis} from './src/b-spline';
export {default as interpolateBasisClosed} from './src/b-spline-closed';
export {default as interpolateDate} from './src/date';
export {default as interpolateNumber} from './src/number';
export {default as interpolateObject} from './src/object';
export {default as interpolateRound} from './src/round';
export {default as interpolateString} from './src/string';
export {interpolateTransformCss, interpolateTransformSvg} from './src/transform/index';
export {default as interpolateZoom} from './src/zoom';
export {default as interpolateRgb, rgbBasis as interpolateRgbBasis, rgbBasisClosed as interpolateRgbBasisClosed} from './src/rgb';
export {default as interpolateHsl, hslLong as interpolateHslLong} from './src/hsl';
export {default as interpolateLab} from './src/lab';
export {default as interpolateHcl, hclLong as interpolateHclLong} from './src/hcl';
export {default as interpolateCubehelix, cubehelixLong as interpolateCubehelixLong} from './src/cubehelix';
export {default as piecewise} from './src/piecewise';
export {default as quantize} from './src/quantize';