import { Router, Request, Response } from "express";
import { getIpAdress, route } from "./api";
import { getVoiceRegions } from "./api";

const router: Router = Router();

router.get("/", route({}), async (req: Request, res: Response) => {
	res.json(await getVoiceRegions(getIpAdress(req), true)); //vip true?
});

export default router;