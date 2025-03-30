const express = require("express");
const {
  createContest,
  getAllContests,
  getContestById,
  deleteContest,
  toggleInterestedContest,
} = require("../controllers/contestController");
const { auth, isAdmin, isStudent } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", auth, isAdmin, createContest);
router.get("/getall", getAllContests);
router.get("/:id", getContestById);
router.delete("/delete/:id", auth, isAdmin, deleteContest);
router.post("/interested", auth, isStudent, toggleInterestedContest);

module.exports = router;
