const router = require("express").Router();
const Controller = require("./activity.controller");


//CRUD
router.get("/", async (req, res, next) => {
    try{
        const data = await Controller.list();
        res.json({ data, msg: "list of all the activities" });
    } catch(e){
        next(e);
    }
});

router.get("/:id", async(req, res, next) => {
  try {
    const data = await Controller.getById(req.params.id);
    res.json({ data, msg: "getting one id" });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await Controller.create(req.body);
    res.json({ data, msg: "added new activity" });
  } catch (e) {
    next(e);
  }
});

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   res.json({ data: req.body, msg: `Updating ${id} from database` });
// });

router.patch("/:id", async(req, res, next) => {
    try{
        const data = await Controller.updateById(req.params.id, req.body);
        res.json({ data: req.body, msg: "updated activity" });
    } catch (e)
{
    next(e);
}
    
});

router.delete("/:id", async(req, res, next) => {
    try{
    const data = await Controller.removeById(req.params.id);
  res.json({ data, msg:"deleted activity" });
} catch (e){
    next(e);
}
});

module.exports = router;
