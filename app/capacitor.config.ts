import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.amanotes.duodata',
  appName: 'DuoData',
  webDir: 'dist',
  ios: {
    contentInset: 'never',
    backgroundColor: '#0B0B14',
    scrollEnabled: true
  },
  backgroundColor: '#0B0B14'
}

export default config
