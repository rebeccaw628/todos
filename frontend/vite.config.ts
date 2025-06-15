import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  base: "/todos/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./config/test-setup.js"],
  },
});
