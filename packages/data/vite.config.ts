import { mergeConfig } from 'vite';
import { sharedConfig } from '../../vite.base.config';
import path from 'path';

export default mergeConfig(sharedConfig, {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'data',
      fileName: (format) => `data.${format}.js`,
    },
  },
});
