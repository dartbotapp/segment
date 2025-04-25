/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
import { calcPoints, findPolygonCenter } from './calc-points';
import { Align, Theme } from './token';

// @ts-nocheck

export interface SegmentProps {
  format: string;
}

export const render = (
  theme: Theme,
  props: SegmentProps,
  context: CanvasRenderingContext2D,
  mask: number[],
) => {
  if (context == null) {
    return;
  }
  context.save();
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);
  drawSegments(theme, props, context, mask);
  context.restore();
};

export const drawSegments = (
  theme: Theme,
  props: SegmentProps,
  context: CanvasRenderingContext2D,
  mask: number[],
) => {
  const { format } = props;
  const count = format.match(/#/g)?.length || 0;
  const { width, height } = context.canvas;
  const unit = 10;

  // Fill background
  context.fillStyle = theme.segmentBackground;
  context.fillRect(0, 0, width, height);

  const { elementPadding } = theme;

  const canvasPadding = elementPadding * unit;
  let canvasWidth = width;
  const canvasHeight = height;

  const elementSpacing = theme.elementSpacing * unit;
  const totalSpacing = elementSpacing * (count - 1);
  context.translate(canvasPadding, canvasPadding);
  context.scale(
    (canvasWidth - canvasPadding * 2) / width,
    (canvasHeight - canvasPadding * 2) / height,
  );

  context.save();
  if (theme.shear !== 0) {
    const shearAngle = theme.shear % 180;
    const shearRadians = (shearAngle * Math.PI) / 180;
    const shearAmount =
      (canvasHeight - 2 * canvasPadding) * Math.tan(shearRadians);
    const shearAdjust = shearAmount / height;
    canvasWidth -= Math.abs(shearAmount);
    context.translate(Math.max(0, shearAmount), 0);
    context.transform(1, 0, -shearAdjust, 1, 0, 0);
  }

  canvasWidth -= totalSpacing;
  const elementWidth = canvasWidth / count;
  const offset = count - mask.length;
  for (let i = 0; i < count; i++) {
    context.save();
    context.translate(i * (elementWidth + elementSpacing), 0);
    const m = (theme.align === Align.Right ? mask[i - offset] : mask[i]) ?? 0;
    drawSegment(theme, elementWidth, height, context, m);
    context.restore();
  }
  context.restore();
};

export const drawSegment = (
  theme: Theme,
  width: number,
  height: number,
  context: CanvasRenderingContext2D,
  mask: number,
) => {
  const points = calcPoints(theme, width, height);
  const {
    fillOff,
    fillOn,
    strokeOff,
    strokeOn,
    strokeWidth,
    glowInner,
    glowOuter,
  } = theme;

  for (let s = 0; s < points.length; s++) {
    context.save();
    const on = mask & (1 << s);
    const color = on ? fillOn : fillOff;
    const stroke = on ? strokeOn : strokeOff;
    context.lineWidth = strokeWidth;
    context.strokeStyle = stroke;
    context.fillStyle = color;

    context.beginPath();
    const { x, y } = points[s][0];
    context.moveTo(x, y);
    for (let p = 1; p < points[s].length; p++) {
      context.lineTo(points[s][p].x, points[s][p].y);
    }
    context.closePath();

    context.save();
    if (on && glowOuter > 0) {
      const unit = width;
      const glowWidth = glowOuter * unit;
      context.shadowColor = color;
      context.shadowBlur = glowWidth;
    }
    context.fill();
    context.restore();

    if (on && glowInner > 0) {
      context.save();
      const center = findPolygonCenter(points[s]);
      const grd = context.createRadialGradient(
        center.x,
        center.y,
        10,
        center.x,
        center.y,
        width,
      );
      grd.addColorStop(0, `rgba(255,255,255,${glowInner})`);
      grd.addColorStop(1, '#fff0');
      context.fillStyle = grd;
      context.globalCompositeOperation = 'lighter';
      context.fill();
      context.restore();
    }

    if (strokeWidth > 0) {
      context.stroke();
    }
    context.restore();
  }
};
