package projects.nology.todo.task;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import projects.nology.todo.category.Category;
import projects.nology.todo.category.CategoryService;
import projects.nology.todo.common.ValidationErrors;
import projects.nology.todo.common.exceptions.ServiceValidationException;

@Service
public class TaskService {

    private TaskRepository taskRepository;
    private ModelMapper modelMapper;
    private CategoryService categoryService;

    TaskService(TaskRepository taskRepository, ModelMapper modelMapper, CategoryService categoryService) {
        this.taskRepository = taskRepository;
        this.modelMapper = modelMapper;
        this.categoryService = categoryService;
    }

    public Task create(CreateTaskDTO data) throws ServiceValidationException {

        Task newTask = modelMapper.map(data, Task.class);
        Optional<Category> returnedCategory = this.categoryService.createOrFind(data, newTask);
        newTask.setCategory(returnedCategory.get());
        Task savedTask = this.taskRepository.save(newTask);
        return savedTask;
    }

    public List<Task> findAll() {
        return this.taskRepository.findAll();
    }

    public Optional<Task> findById(Long id) {
        return this.taskRepository.findById(id);
    }

    public boolean deleteById(Long id) {
        Optional<Task> foundTask = this.taskRepository.findById(id);
        if (foundTask.isEmpty()) {
            return false;
        }

        Task archivedTask = foundTask.get();
        archivedTask.setisArchived(true);
        this.taskRepository.save(archivedTask);
        return true;
    }

    public Optional<Task> updateTaskById(Long id, UpdateTaskDTO data) throws ServiceValidationException {
          
        Optional<Task> foundTask = this.findById(id);

        if (foundTask.isEmpty()) {
            return foundTask;
        }

        Task taskFromDb = foundTask.get();
        this.modelMapper.map(data, taskFromDb);

        ValidationErrors validationErrors = new ValidationErrors();

        // If category field is updated, set new category
        if (data.getCategory() != null) {
            Optional<Category> existingCategory = this.categoryService.findByType(data.getCategory());
            if (existingCategory.isEmpty()) {
                validationErrors.add("category", "Must select from existing categories.");
            }
            else {
                taskFromDb.setCategory(existingCategory.get());
            }
        }

        // If due date is before current date, add error
        if (data.getDueDate() != null) {
            if (data.getDueDate().isBefore(LocalDate.now())) {
                validationErrors.add("dueDate", "Due date cannot be before today's date");
            }
        }

        if (validationErrors.hasErrors()) {
            throw new ServiceValidationException(validationErrors);
        }

        taskFromDb.setUpdatedAt(new Date());
        this.taskRepository.save(taskFromDb);
        return Optional.of(taskFromDb);
    }

    public List<Task> findByCategory(String category) {
        return taskRepository.findByCategory_TypeIgnoreCase(category);
        
    }
    
    
}
