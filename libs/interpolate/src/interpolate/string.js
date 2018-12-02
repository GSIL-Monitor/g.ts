"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var public_api_1 = require("../../public-api");
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, 'g');
var InterpolateString = /** @class */ (function () {
    function InterpolateString() {
    }
    InterpolateString.prototype.interpolate = function (a, b) {
        var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators
        // Interpolate pairs of numbers in a & b.
        while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
            if ((bs = bm.index) > bi) { // a string precedes the next number in b
                bs = b.slice(bi, bs);
                if (s[i]) {
                    s[i] += bs;
                }
                else { // coalesce with previous string
                    s[++i] = bs;
                }
            }
            if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
                if (s[i]) {
                    s[i] += bm;
                }
                else { // coalesce with previous string
                    s[++i] = bm;
                }
            }
            else { // interpolate non-matching numbers
                s[++i] = null;
                q.push({ i: i, x: public_api_1.interpolateNumber(+am, +bm) });
            }
            bi = reB.lastIndex;
        }
        // Add remains of b.
        if (bi < b.length) {
            bs = b.slice(bi);
            if (s[i]) {
                s[i] += bs;
            }
            else { // coalesce with previous string
                s[++i] = bs;
            }
        }
        this.s = s;
        this.q = q;
        this.a = a;
        this.b = b;
        return this;
    };
    InterpolateString.prototype.getResult = function (t) {
        if (this.s.length < 2) {
            return this.q[0] ? "" + this.q[0].x(t) : this.b;
        }
        for (var _i = 0, _a = this.q; _i < _a.length; _i++) {
            var o = _a[_i];
            this.s[o.i] = o.x(t);
        }
        return this.s.join('');
    };
    return InterpolateString;
}());
exports.InterpolateString = InterpolateString;
//# sourceMappingURL=string.js.map