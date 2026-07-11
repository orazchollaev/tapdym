import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.orazchollaev.tapdym",
  appName: "Tapdym",
  webDir: "dist",
  backgroundColor: "#f3ead6",
  android: {
    backgroundColor: "#f3ead6",
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: "LIGHT",
      backgroundColor: "#f3ead6",
    },
    SystemBars: {
      insetsHandling: "css",
      style: "LIGHT",
      hidden: false,
      animation: "NONE",
    },
  },
}

export default config
