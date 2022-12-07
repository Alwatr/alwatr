export interface TransformRangeOptions {
  /**
   * The input range [min, max].
   *
   */
  in: [number, number];

  /**
   * The output (request) range [min, max].
   */
  out: [number, number];

  /**
   * If true, the output will be bounded to the output range (between min and max).
   *
   * In default behavior when x (input number) does not between input min~max range,
   * the output value will be out of output min~max range.
   *
   */
  bound?: boolean;
}
