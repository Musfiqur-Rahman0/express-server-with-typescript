import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

router.post("/", profileController.createProfile);
// router.get("/", userController.getAllUser);
// router.get("/:id", userController.getSingleUser);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

export const profileRoute = router;
