module.exports = (controller) => {

	const express = require("express");
	let router = express.Router();

	router.get("/", controller.home);

	router.get("reset", controller.reset);

	router.get("/all", controller.getAll);

	router.get("/add", controller.getAdd);
	router.post("/add", controller.postAdd);

	router.get("/:id", controller.getOne);
	// router.post("/:id", controller.postOne);

	router.get("/:id/update", controller.getUpdate);
	router.post("/:id/update", controller.postUpdate);

	router.get("/:id/delete", controller.getDelete);
	router.post("/:id/delete", controller.postDelete);

	return router;
}
