using Microsoft.AspNetCore.Mvc;
using TaskMan.Api.Models;
using TaskMan.Api.Services;

namespace TaskMan.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService)
    {
        _taskService = taskService;
    }
    
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_taskService.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var task = _taskService.GetById(id);

        if (task is null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public IActionResult Create(TaskItem newTask)
    {
        var createdTask = _taskService.Create(newTask);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdTask.Id },
            createdTask
        );
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var deleted = _taskService.Delete(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, TaskItem updatedTask)
    {
        var updated = _taskService.Update(id, updatedTask);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
}