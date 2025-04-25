/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */

import { Theme } from './token';

export interface Point {
  x: number;
  y: number;
}

const sqrt2 = Math.SQRT2;
const sqrt3 = Math.sqrt(3);
const clip = (min: number, max: number, val: number) =>
  Math.max(min, Math.min(max, val));

export const calcPoints = (theme: Theme, width: number, height: number) => {
  const unit = width / 10;

  const w = width;
  const h = height;

  const segmentWidth = theme.segmentWidth;
  const segmentInterval = theme.segmentInterval;
  const bevelWidth = clip(0, 1, theme.bevelWidth);
  // const sideBevelEnabled = theme.sideBevelEnabled;

  const sw = segmentWidth * 0.5 * unit;
  const si = segmentInterval * 0.5 * unit;
  const bw = bevelWidth * sw;

  const br = bw / sw;
  // const ib = (sideBevelEnabled)? 1 : 0;
  // const sf = sw * .8;
  // const slope = h / w;

  // Calculate Points[][] for all 7 segments
  const A = 0;
  const B = 1;
  const C = 2;
  const D = 3;
  const E = 4;
  const F = 5;
  const G = 6;
  const points: Point[][] = [];
  // Top
  points[A] = [
    { x: sw * br * 2 + si / sqrt2, y: 0 },
    { x: w - sw * br * 2 - si / sqrt2, y: 0 },
    { x: w - sw * br - si / sqrt2, y: sw * br },
    { x: w - sw - si / sqrt2, y: sw },
    { x: sw + si / sqrt2, y: sw },
    { x: sw * br + si / sqrt2, y: sw * br },
  ];

  points[B] = [
    { x: w, y: sw * br * 2 + si / sqrt2 },
    { x: w, y: h / 2 - si * 0.5 },
    { x: w - sw / 2, y: h / 2 - si * 0.5 },
    { x: w - sw, y: h / 2 - sw / 2 - si * 0.5 },
    { x: w - sw, y: sw + si / sqrt2 },
    { x: w - sw * br, y: sw * br + si / sqrt2 },
  ];

  points[G] = [
    { x: sw + (si / 2) * sqrt3, y: h / 2 - sw / 2 },
    { x: w - sw - (si / 2) * sqrt3, y: h / 2 - sw / 2 },
    { x: w - sw / 2 - (si / 2) * sqrt3, y: h / 2 },
    { x: w - sw - (si / 2) * sqrt3, y: h / 2 + sw / 2 },
    { x: sw + (si / 2) * sqrt3, y: h / 2 + sw / 2 },
    { x: sw / 2 + (si / 2) * sqrt3, y: h / 2 },
  ];

  points[C] = flipVertical(points[B], h);
  points[D] = flipVertical(points[A], h);
  points[E] = flipHorizontal(points[C], w);
  points[F] = flipHorizontal(points[B], w);
  return points;
};

// Creates a new set of points flipped vertically
const flipVertical = (points: Point[], height: number): Point[] => {
  const flipped: Point[] = [];
  for (let i = 0; i < points.length; i++) {
    flipped[i] = {
      x: points[i].x,
      y: height - points[i].y,
    };
  }
  return flipped;
};

// Creates a new set of points flipped horizontally
const flipHorizontal = (points: Point[], width: number): Point[] => {
  const flipped: Point[] = [];
  for (let i = 0; i < points.length; i++) {
    const x = width - points[i].x;
    const y = points[i].y;
    flipped[i] = { x, y };
  }
  return flipped;
};

export const findPolygonCenter = (points: Point[]): Point => {
  let xSum = 0;
  let ySum = 0;
  const numPoints = points.length;

  for (const point of points) {
    xSum += point.x;
    ySum += point.y;
  }

  return {
    x: xSum / numPoints,
    y: ySum / numPoints,
  };
};
