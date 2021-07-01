const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { LogModel } = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Practice route')
});

/*
*******************
    Create Log
*******************
*/

router.post("/create", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }

});

/*
*********************
    Get all logs
*********************
*/
router.get("/", async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
*********************
  Get Logs by user
********************* 
*/
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


/*
******************
  Delete a Log
******************
*/
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({ message: "Workout Log Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
  
router.get("/about", (req, res) => {
    res.send("About the route")
});

module.exports = router;