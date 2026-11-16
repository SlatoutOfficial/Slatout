declare module 'shaders/react' {
  import React from 'react';

  export interface SwirlProps {
    colorA?: string;
    colorB?: string;
    detail?: number;
  }

  export interface ChromaFlowProps {
    baseColor?: string;
    downColor?: string;
    leftColor?: string;
    rightColor?: string;
    upColor?: string;
    momentum?: number;
    radius?: number;
  }

  export interface FlutedGlassProps {
    aberration?: number;
    angle?: number;
    frequency?: number;
    highlight?: number;
    highlightSoftness?: number;
    lightAngle?: number;
    refraction?: number;
    shape?: string;
    softness?: number;
    speed?: number;
  }

  export interface FilmGrainProps {
    strength?: number;
  }

  export const Swirl: React.ComponentType<SwirlProps>;
  export const ChromaFlow: React.ComponentType<ChromaFlowProps>;
  export const FlutedGlass: React.ComponentType<FlutedGlassProps>;
  export const FilmGrain: React.ComponentType<FilmGrainProps>;
}
