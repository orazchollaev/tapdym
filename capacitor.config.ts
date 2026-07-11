import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.orazchollaev.tapdym",
  appName: "Tapdym",
  webDir: "dist",
  backgroundColor: "#191d24",
  android: {
    backgroundColor: "#191d24",
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: "LIGHT",
      backgroundColor: "#f3ead6",
    },
    plugins: {
      SystemBars: {
        insetsHandling: "css",
        style: "LIGHT",
        hidden: false,
        animation: "NONE",
      },
    },
  },
}

export default config
