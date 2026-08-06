import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

app.listen(env.port, () => {
  console.log(`Portfolio backend listening on http://localhost:${env.port}`);
  console.log(`CORS allowed origin: ${env.corsOrigin}`);
});
