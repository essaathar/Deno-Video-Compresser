export default function routeStaticFilesFrom(staticPaths) {
    return async (context, next) => {
      for (const path of staticPaths) {
        try {
          await context.send({ root: path, index: "index.html" });
          return;
        } catch {
          continue;
        }
      }
      await next();
    };
  }