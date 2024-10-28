import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
// import { ffmpeg } from "https://deno.land/x/deno_ffmpeg@v3.1.0/mod.ts";

import routeStaticFilesFrom from "./src/utils/routeStaticFilesFrom.js";
const router = new Router();
const PORT = 8000;

router.post("/api/upload", async (context) => {
  const body = await context.request.body;
  const form = await body.formData();
  const file = form.get('file');
  const fileName = file.name;
  const fileContent = await file.arrayBuffer();
  console.log(form.get('file'));
  await Deno.writeFile(`./uploads/${fileName}`, new Uint8Array(fileContent));
  context.response.body = {message: "File uploaded!"};
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/dist`,
]));

console.log(`listening on port: ${PORT}...`);

await app.listen({ port: PORT });