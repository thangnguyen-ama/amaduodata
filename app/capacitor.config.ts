import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.amanotes.duodata',
  appName: 'DuoData',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
    backgroundColor: '#FFFFFF'
  }
}

export default config
