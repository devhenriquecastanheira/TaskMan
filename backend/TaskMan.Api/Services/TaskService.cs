using TaskMan.Api.Models;

namespace TaskMan.Api.Services;

public class TaskService
{
    private readonly List<TaskItem> _tasks =
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

    public List<TaskItem> GetAll()
    {
        return _tasks;
    }

    public TaskItem? GetById(int id)
    {
        return _tasks.FirstOrDefault(task => task.Id == id);
    }

    public TaskItem Create(TaskItem newTask)
    {
        var maiorId = _tasks.Count > 0
            ? _tasks.Max(task => task.Id)
            : 0;

        newTask.Id = maiorId + 1;

        _tasks.Add(newTask);

        return newTask;
    }

    public bool Delete(int id)
    {
        var task = GetById(id);

        if (task is null)
        {
            return false;
        }

        _tasks.Remove(task);

        return true;
    }

    public bool Update(int id, TaskItem updatedTask)
    {
        var task = GetById(id);

        if (task is null)
        {
            return false;
        }

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.Status = updatedTask.Status;

        return true;
    }
}