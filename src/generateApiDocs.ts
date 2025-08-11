import { app } from '.';

app
  .handle(new Request(`http://localhost/swagger/json`))
  .then((res) => res.json())
  .then((doc) => Bun.write('./api-docs.json', JSON.stringify(doc.paths)))
  .finally(() => {
    app.stop(true);
  });
