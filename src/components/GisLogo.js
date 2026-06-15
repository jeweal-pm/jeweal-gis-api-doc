import React from 'react';
import { GIS_LOGO_WHITE, GIS_LOGO_WHITE_CDN } from '../constants/brand';

/**
 * Official GIS wordmark (white). Use on dark or brand-colored backgrounds.
 * @param {'sidebar' | 'hero' | 'sm'} variant
 */
export default function GisLogo({ variant = 'sidebar', className = '', alt = 'GIS' }) {
  return (
    <img
      src={GIS_LOGO_WHITE}
      alt={alt}
      className={`gis-logo gis-logo--${variant}${className ? ` ${className}` : ''}`}
      onError={e => {
        if (e.currentTarget.src !== GIS_LOGO_WHITE_CDN) {
          e.currentTarget.src = GIS_LOGO_WHITE_CDN;
        }
      }}
    />
  );
}
