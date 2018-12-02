"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rho = Math.SQRT2, rho2 = 2, rho4 = 4, epsilon2 = 1e-12;
function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
function interpolateZoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function (t) {
            return [
                ux0 + t * dx,
                uy0 + t * dy,
                w0 * Math.exp(rho * t * S),
            ];
        };
    }
    else {
        var d1_1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1_1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1_1), r0_1 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0_1) / rho;
        i = function (t) {
            var s = t * S, coshr0 = cosh(r0_1), u = w0 / (rho2 * d1_1) * (coshr0 * tanh(rho * s + r0_1) - sinh(r0_1));
            return [
                ux0 + u * dx,
                uy0 + u * dy,
                w0 * coshr0 / cosh(rho * s + r0_1),
            ];
        };
    }
    i.duration = S * 1000;
    return i;
}
exports.interpolateZoom = interpolateZoom;
//# sourceMappingURL=interpolate-zoom.js.map