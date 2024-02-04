import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run elastic-profiler:serve:development',
        production: 'nx run elastic-profiler:serve:production',
      },
      ciWebServerCommand: 'nx run elastic-profiler:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
