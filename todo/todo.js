let todos = require(`./store`);

const addTaskToList = async (channel_id, task) => {
    try {
        if (!task.name || task.name == '') return `Please specify task name.`;
        if (!todos || !todos[channel_id] || !todos[channel_id].length) todos[channel_id] = [];
        todos[channel_id].push(task)
        return `Task added to TODO list`;
    } catch (error) {
        throw error
    }
}

const getTasksFromList = async channel_id => {
    try {
        if (!todos || !todos[channel_id] || !todos[channel_id].length) return [];
        const response = todos[channel_id].filter(element => {
            return !element.marked;
        }).map(element => {
            return {
                text: element.name
            }
        })
        return response && response.length ? response : [];
    } catch (error) {
        throw error
    }
}

const getCompletedTasks = async channel_id => {
    try {
        if (!todos || !todos[channel_id] || !todos[channel_id].length) return [];
        const response = todos[channel_id].filter(element => {
            return element.marked;
        }).map(element => {
            return {
                text: element.name
            }
        })
        return response && response.length ? response : [];
    } catch (error) {
        throw error
    }
}

const markTaskAsDone = async (channel_id, task) => {
    try {
        if (!task || task == '') return `Please specify task name.`;
        if (!todos || !todos[channel_id] || !todos[channel_id].length) return `No task found.`;
        for (let i in todos[channel_id]) {
            if (todos[channel_id][i].name == task) {
                todos[channel_id][i].marked = true;
                return `Task "${task}" marked as complete.`;
            }
        }
        return `No task found.`;
    } catch (error) {
        throw error
    }
}

const clearToDoList = async channel_id => {
    try {
        todos[channel_id] = [];
        return "TODO list cleared."
    } catch (error) {
        throw error
    }
}

module.exports = {
    addTaskToList,
    getTasksFromList,
    getCompletedTasks,
    markTaskAsDone,
    clearToDoList
}