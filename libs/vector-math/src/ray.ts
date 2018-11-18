/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import {Vector3} from './vector3';

export class Ray {
  public get origin() {
    return this._origin;
  }

  public get direction() {
    return this._direction;
  }

  constructor(private _origin: Vector3    = new Vector3(),
              private _direction: Vector3 = new Vector3()) {
  }

  public copyFrom(other: Ray) {
    this._origin.setFrom(other._origin);
    this._direction.setFrom(other._direction);
  }

  public at(t: number) {
    this._direction.scaled(t);
    this._direction.add(this._origin);
  }

  public copyAt(other: Vector3, t: number) {
    other
      .setFrom(this._direction)
      .scale(t)
      .add(this._origin);
  }

  public static copy(other: Ray) {
    return new Ray(
      other._origin.clone(),
      other._direction.clone()
    );
  }

  public static originDirection(origin: Vector3, direction: Vector3) {
    return new Ray(
      origin.clone(),
      direction.clone()
    );
  }
}
