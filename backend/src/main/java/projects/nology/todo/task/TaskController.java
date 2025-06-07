package projects.nology.todo.task;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import projects.nology.todo.common.exceptions.NotFoundException;
import projects.nology.todo.common.exceptions.ServiceValidationException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private TaskService taskService;

    TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody CreateTaskDTO data) throws ServiceValidationException {
       Task savedTask = this.taskService.create(data);
       return new ResponseEntity<Task>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> allTasks = this.taskService.findAll();
        return new ResponseEntity<List<Task>>(allTasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskByID(@PathVariable Long id) throws NotFoundException {
        Optional<Task> foundTask = this.taskService.findById(id);
        if (foundTask.isPresent()) {
            return new ResponseEntity<>(foundTask.get(), HttpStatus.OK);
        }
        throw new NotFoundException("Task with ID: " + id + " does not exist");
    }

    @GetMapping(params = "category")
    public ResponseEntity<List<Task>> getTasksByCategory(@RequestParam String category) throws NotFoundException {
        List<Task> foundTasks = this.taskService.findByCategory(category);
            return new ResponseEntity<List<Task>>(foundTasks, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) throws NotFoundException {
        boolean deleted = this.taskService.deleteById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        throw new NotFoundException("Task with ID: " + id + " does not exist");
    }

    @PatchMapping("{id}")
    public ResponseEntity<Task> updateTaskById(@PathVariable Long id, @Valid @RequestBody UpdateTaskDTO data) throws NotFoundException {
        Optional<Task> result = this.taskService.updateTaskById(id, data);
        Task updatedTask = result.orElseThrow(() -> new NotFoundException("Task with id " + id + "does not exist"));
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

}