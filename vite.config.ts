import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://cn.vitejs.dev/config
export default defineConfig({
  plugins: [react()],
});
