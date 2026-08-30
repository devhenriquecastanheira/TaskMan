using Microsoft.AspNetCore.Mvc;
using TaskMan.Api.Models;

namespace TaskMan.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
    private static readonly List<TaskItem> Tasks = 
    [
        new()
        {
            Id = 1,
            Title = "Estudar Angular",
            Description = "Aprender Angular 22",
            Status = "Pendente"
        },
        new()
        {
            Id = 2,
            Title = "Estudar C#",
            Description = "Aprender ASP.NET Core",
            Status = "Em andamento"
        }
    ];

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(Tasks);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var task = Tasks.FirstOrDefault(t => t.Id == id);

        if (task is null)
        {
            return NotFound();
        }
        
        return Ok(task);
    }

    [HttpPost]
    public IActionResult Create(TaskItem newTask)
    {
        var maiorId = Tasks.Count > 0
            ? Tasks.Max(taks => taks.Id)
            : 0;
        
        newTask.Id = maiorId + 1;
        
        Tasks.Add(newTask);
        
        return CreatedAtAction(nameof(GetById), new { id = newTask.Id }, newTask);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var task = Tasks.FirstOrDefault(task => task.Id == id);
        
        if (task is null)
        {
            return NotFound();
        }
        
        Tasks.Remove(task);
        
        return NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, TaskItem updatedTask)
    {
        var task = Tasks.FirstOrDefault(task => task.Id == id);

        if (task is null)
        {
            return NotFound();
        }

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.Status = updatedTask.Status;

        return NoContent();
    }
}