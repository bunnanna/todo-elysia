import { Elysia } from "elysia";
import AuthController from "./controllers/AuthController";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.use(AuthController)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
