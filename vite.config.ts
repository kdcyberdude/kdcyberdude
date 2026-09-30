import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    {
      name: "serve-pokemon-article",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (
            "url" in req &&
            (req.url === "/blogs/how-to-build-a-pokemon-tcg-agent" ||
              req.url === "/blogs/how-to-build-a-pokemon-tcg-agent/")
          ) {
            req.url = "/blogs/how-to-build-a-pokemon-tcg-agent/index.html";
          }
          next();
        });
      },
    },
    react(),
    tailwindcss(),
  ],
});
