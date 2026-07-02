const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addMember,
} = require("../controllers/projectController");

router.get("/", auth, getProjects);
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);
router.post("/:id/members", auth, addMember);

module.exports = router;
