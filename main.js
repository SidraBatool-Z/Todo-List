#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = [];
let conditions = true;
console.log(chalk.redBright.bold(`\n \tWelcome to my Todo-List Application\n`));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.magenta("Select an option:"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
//function for adding new task
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.magenta("Enter New Task:"),
        }
    ]);
    todolist.push(newTask.task);
    console.log(chalk.green(`\n ${newTask.task} Added successfully in your Todo-List.`));
};
//function to view the todo-list
let viewTask = () => {
    console.log(`\nYour Todo-list: \n`);
    todolist.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
//function for deleting a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.magenta("Enter the index no. of the task you want to delete:"),
        }
    ]);
    let deletedTask = todolist.splice(taskIndex.index - 1, 1);
    console.log(chalk.green(`\n ${taskIndex.index} This task has been deleted successfully from your Todo-List.`));
};
//function for updating a task
let updateTask = async () => {
    await viewTask();
    let updated_task = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.magenta("Enter the index no. of the task you want to update:"),
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.magenta("Enter the new task:"),
        }
    ]);
    todolist[updated_task.index - 1] = updated_task.new_task;
    console.log(chalk.green(`\n Task at index no. ${updated_task.index - 1} updated successfully. [For the updated list, check 'View Todo-List']`));
};
main();
