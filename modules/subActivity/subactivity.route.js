const router = require("express").Router();
const Controller = require("./subactivity.controller");

//CRUD
router.get("/", async (req, res, next) => {
    try{
        const data = await Controller.list();
        res.json({ data, msg: "list of all the sub-activities" });
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

router.post("/", async(req, res, next) =>{
    try{
        const data = await Controller.create(req.body);
        res.json({data, msg:"added new sub-activity"});
    }catch(e){
        next(e);
    }
});

router.patch("/:id", async(req, res, next) =>{
    try{
        const data = await Controller.updateById(re.params.id, req.body);
        res.json({data: req.body, msg:"updating sub-activity"});
    }catch(e){
        next(e);
    }
});

router.delete("/:id", async(req, res, next) =>{
    try{
        const data = await Controller.removeById(req.params.id);
        res.json({data, msg: "deleting sub-activity"});
    }catch(e){
        next(e);
    }
});

module.exports = router;