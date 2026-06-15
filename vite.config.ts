import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Tambahkan ini untuk memaksa Nitro menggunakan preset Vercel
  nitro: {
    preset: "vercel",
  },
});
