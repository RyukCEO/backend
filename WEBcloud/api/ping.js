import { Router, Response, Request } from "express";

const router = Router();

router.get("/ping"), (req: Request, res: Response) => {
	res.send("pong");
});

export default router;