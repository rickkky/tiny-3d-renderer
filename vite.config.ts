import { UserConfig, defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const config: UserConfig = {
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'TinyWebGPURenderer',
      },
    },
  };

  return config;
});
