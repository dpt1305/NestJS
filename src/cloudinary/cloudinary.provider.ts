import { v2 } from 'cloudinary';
import { CLOUDINARY, config } from './cloudinary.constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config(config);
  },
};
