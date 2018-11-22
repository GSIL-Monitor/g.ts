/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { interpolateObject } from '../public-api';

function noproto(properties) {
  return Object.assign(Object.create(null), properties);
}

function expectObjectEqual(obj1, obj2) {
  const k1 = Object.keys(obj1).sort();
  const k2 = Object.keys(obj2).sort();
  expect(k1).toEqual(k2);
  for (let k of k2) {
    const type = typeof Reflect.get(k2, k);
    if (type === 'string') {
      expect(`${Reflect.get(k1, k)}`).toBe(Reflect.get(k2, k));
    } else if (type === 'number') {
      expect(+Reflect.get(k1, k)).toBe(Reflect.get(k2, k));
    } else {
      expect(Reflect.get(k1, k)).toEqual(Reflect.get(k2, k));
    }
  }

}

describe('test interpolate object', () => {
  it('interpolateObject(a, b) interpolates defined properties in a and b', () => {
    expectObjectEqual(interpolateObject({a: 2, b: 12}, {a: 4, b: 24})(0.5), {a: 3, b: 18});
  });

  it('interpolateObject(a, b) interpolates inherited properties in a and b', () => {
    function a(a) { this.a = a; }// tslint:disable-line

    a.prototype.b = 12;
    expectObjectEqual(interpolateObject(new a(2), {a: 4, b: 12})(0.5), {a: 3, b: 12});
    expectObjectEqual(interpolateObject({a: 2, b: 12}, new a(4))(0.5), {a: 3, b: 12});
    expectObjectEqual(interpolateObject(new a(4), new a(2))(0.5), {a: 3, b: 12});
  });

  it('interpolateObject(a, b) interpolates color properties as rgb', () => {
    expectObjectEqual(interpolateObject({background: 'red'}, {background: 'green'})(0.5), {background: 'rgb(128, 64, 0)'});
    expectObjectEqual(interpolateObject({fill: 'red'}, {fill: 'green'})(0.5), {fill: 'rgb(128, 64, 0)'});
    expectObjectEqual(interpolateObject({stroke: 'red'}, {stroke: 'green'})(0.5), {stroke: 'rgb(128, 64, 0)'});
    expectObjectEqual(interpolateObject({color: 'red'}, {color: 'green'})(0.5), {color: 'rgb(128, 64, 0)'});
  });

  it('interpolateObject(a, b) interpolates nested objects and arrays', () => {
    expectObjectEqual(interpolateObject({foo: [2, 12]}, {foo: [4, 24]})(0.5), {foo: [3, 18]});
    expectObjectEqual(interpolateObject({foo: {bar: [2, 12]}}, {foo: {bar: [4, 24]}})(0.5), {foo: {bar: [3, 18]}});
  });

  it('interpolateObject(a, b) ignores properties in a that are not in b', () => {
    expectObjectEqual(interpolateObject({foo: 2, bar: 12}, {foo: 4})(0.5), {foo: 3});
  });

  it('interpolateObject(a, b) uses constant properties in b that are not in a', () => {
    expectObjectEqual(interpolateObject({foo: 2}, {foo: 4, bar: 12})(0.5), {foo: 3, bar: 12});
  });

  it('interpolateObject(a, b) treats undefined as an empty object', () => {
    expectObjectEqual(interpolateObject(NaN, {foo: 2})(0.5), {foo: 2});
    expectObjectEqual(interpolateObject({foo: 2}, undefined)(0.5), {});
    expectObjectEqual(interpolateObject(undefined, {foo: 2})(0.5), {foo: 2});
    expectObjectEqual(interpolateObject({foo: 2}, null)(0.5), {});
    expectObjectEqual(interpolateObject(null, {foo: 2})(0.5), {foo: 2});
    expectObjectEqual(interpolateObject(null, NaN)(0.5), {});
  });

  it('interpolateObject(a, b) interpolates objects without prototype', () => {
    expectObjectEqual(interpolateObject(noproto({foo: 0}), noproto({foo: 2}))(0.5), {foo: 1});
  });
});
