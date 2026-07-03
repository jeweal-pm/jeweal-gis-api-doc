import mobileAuth from './auth';
import generatedModules from './generated';

export const mobileApiData = {
  title: 'GIS Mobile API Explorer',
  subtitle: 'Mobile App API Reference',
  version: 'v1.0',
  baseUrl: 'https://api.example.com',
  platform: 'mobile',
  sections: [
    mobileAuth,
    ...generatedModules,
  ],
};
