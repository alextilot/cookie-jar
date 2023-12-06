import { defineManifest } from '@crxjs/vite-plugin'
import { ICON_COOKIE_JAR_EMPTY, ICON_COOKIE_JAR_FULL } from './config/settings'

export default defineManifest({
  name: 'CookieJar',
  description: '',
  version: '0.0.0',
  manifest_version: 3,
  icons: ICON_COOKIE_JAR_EMPTY,
  action: {
    default_popup: 'popup.html',
    default_icon: ICON_COOKIE_JAR_FULL,
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      match_about_blank: true,
      js: ['src/content/index.ts'],
    },
  ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: ['img/cookiejar-full.png', 'img/cookiejar-empty.png'],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage', 'cookies', 'scripting', 'activeTab'],
})
