/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { Matrix4 } from './matrix4';
import { Vector3 } from './vector3';

export class Triangle {
  public _point0: Vector3;
  public _point1: Vector3;
  public _point2: Vector3;

  public get point0() {
    return this._point0;
  }

  public get point1() {
    return this._point1;
  }

  public get point2() {
    return this._point2;
  }

  constructor(other?: Triangle)
  constructor(p0: Vector3, p1: Vector3, p2: Vector3);
  constructor() {
    if (arguments.length === 3) {
      this._point0 = arguments[0].clone();
      this._point1 = arguments[1].clone();
      this._point2 = arguments[2].clone();
    } else if (arguments.length === 1) {
      this._point0 = arguments[0].point0;
      this._point1 = arguments[1].point1;
      this._point2 = arguments[1].point2;
    } else {
      this._point0 = Vector3.zero();
      this._point1 = Vector3.zero();
      this._point2 = Vector3.zero();
    }
  }

  public copyNormalInto(normal: Vector3) {
    const v0: Vector3 = this._point0.clone().sub(this._point1);
    normal
      .setFrom(this._point2)
      .sub(this._point1)
      .cross(v0)
      .normalize();

    return normal;
  }

  public transform(t: Matrix4) {
    t.transform3(this._point0);
    t.transform3(this._point1);
    t.transform3(this._point2);

    return this;
  }

  public translate(offset: Vector3) {
    this._point0.add(offset);
    this._point1.add(offset);
    this._point2.add(offset);

    return this;
  }
}
