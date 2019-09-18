const express = require(`express`);
const router = express.Router();
const todo = require(`../todo/todo`)

router.post(`/slack/addtodo`, async (req, res) => {
    try {
        const {
            channel_id,
            text
        } = req.body;
        let task = {
            name: text,
            timestatmp: new Date(),
            marked: false
        }
        const response = await todo.addTaskToList(channel_id, task)
        return res.json({
            response_type: `in_channel`,
            text: response,
            attachments: [{
                text
            }]
        });
    } catch (err) {
        console.log(err);
        return res.json({
            response_type: `ephemeral`,
            text: `Something blew up. We're looking into it.`
        });
    }
});
router.post(`/slack/listtodos`, async (req, res) => {
    try {
        const {
            channel_id
        } = req.body;

        const response = await todo.getTasksFromList(channel_id)
        return res.json({
            response_type: `in_channel`,
            text: ` ${ response && response.length ? 'Your TODOs -' : 'No TODOs.' }`,
            attachments: response
        });
    } catch (err) {
        console.log(err);
        return res.json({
            response_type: `ephemeral`,
            text: `Something blew up. We're looking into it.`
        });
    }
});
router.post(`/slack/listdone`, async (req, res) => {
    try {
        const {
            channel_id
        } = req.body;
        const response = await todo.getCompletedTasks(channel_id)
        return res.json({
            response_type: `in_channel`,
            text: ` ${ response && response.length ? 'Done List -' : 'You have not completed any of the tasks.' }`,
            attachments: response
        });
    } catch (err) {
        console.log(err);
        return res.json({
            response_type: `ephemeral`,
            text: `Something blew up. We're looking into it.`
        });
    }
});
router.post(`/slack/marktodo`, async (req, res) => {
    try {
        const {
            channel_id,
            text
        } = req.body;
        const response = await todo.markTaskAsDone(channel_id, text)
        return res.json({
            response_type: `in_channel`,
            text: response
        });
    } catch (err) {
        console.log(err);
        return res.json({
            response_type: `ephemeral`,
            text: `Something blew up. We're looking into it.`
        });
    }
});
router.post(`/slack/cleartodolist`, async (req, res) => {
    try {
        const {
            channel_id
        } = req.body;
        const response = await todo.clearToDoList(channel_id)
        return res.json({
            response_type: `in_channel`,
            text: response
        });
    } catch (err) {
        console.log(err);
        return res.json({
            response_type: `ephemeral`,
            text: `Something blew up. We're looking into it.`
        });
    }
});
module.exports = router;