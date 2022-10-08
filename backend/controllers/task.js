const express = require('express')
const catchAsync = require('../utils/catchAsync')

const Task = require('../models/Task')
const Column = require('../models/Column')
const Subtask = require('../models/Subtask')

exports.getTask = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const task = await Task.findById(id)

  if (!task) return res.status(401).send(false)

  return res.json(task)
})

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({})
  res.json(tasks)
})

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, subtasks, status } = req.body

  const column = await Column.findOne({ title: status })

  const task = new Task({
    title,
    description,
    subtasks: [],
    status: column._id,
  })

  if (subtasks.length !== 0) {
    for (let subtask of subtasks) {
      const newSubtask = await Subtask.create({
        content: subtask,
        completed: false,
        parentTask: task._id,
      })
      task.subtasks.push(newSubtask.id)
    }
  }

  column.tasks.push(task.id)
  await column.save()
  await task.save()
  res.send('create tasks')
})

exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const task = await Task.findById(id)

  if (!task) return res.status(401).send(false)
})
