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
}