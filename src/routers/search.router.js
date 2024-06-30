import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  search,
  searchByJobPosition,
} from "../controllers/search.controller.js";

const router = Router();
router.get(
  routers_interface.api + routers_interface.search.companyName,
  search
);
router.get(
  routers_interface.api + routers_interface.search.position,
  searchByJobPosition
);

export default router;
