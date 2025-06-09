package projects.nology.todo.task;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import projects.nology.todo.category.Category;
import projects.nology.todo.category.CategoryService;
import projects.nology.todo.category.CreateCategoryDTO;
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

    // public Task create(CreateTaskDTO data) throws ServiceValidationException {

    //     Task newTask = modelMapper.map(data, Task.class);
    //     Category category = categoryService.getById(data.getCategoryId());

    //     newTask.setCategory(category);
    //     Task savedTask = this.taskRepository.save(newTask);
    //     return savedTask;
    // }

       public Task create(CreateTaskDTO data) throws ServiceValidationException {

        Task newTask = modelMapper.map(data, Task.class);
        Category category = categoryService.getByType(data.getCategory());

        newTask.setCategory(category);
        Task savedTask = this.taskRepository.save(newTask);
        return savedTask;
    }
    
    

    // public Task create(CreateTaskDTO data) throws ServiceValidationException {

    //     Task newTask = modelMapper.map(data, Task.class);
    //     Optional<Category> existingCategory = this.categoryService.findByType(data.getCategory());

    //     Category category = existingCategory.orElseGet(() -> {
    //         CreateCategoryDTO chosenCategory = new CreateCategoryDTO(data.getCategory());
    //         return this.categoryService.create(chosenCategory);
    //     });

    //     newTask.setCategory(category);
    //     Task savedTask = this.taskRepository.save(newTask);
    //     return savedTask;
    // }

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

    // public Task updateTaskById(Long id, UpdateTaskDTO data) {
    //    Task foundTask = this.taskRepository.getReferenceById(id);

    //     // Task taskFromDb = foundTask.get();

    //     this.modelMapper.map(data, foundTask);
    //     this.taskRepository.save(foundTask);
    //     return foundTask;
    // }

    public Optional<Task> updateTaskById(Long id, UpdateTaskDTO data) {
        Optional<Task> foundTask = this.findById(id);

        if (foundTask.isEmpty()) {
            return Optional.empty();
        }

        Task taskFromDb = foundTask.get();
        this.modelMapper.map(data, taskFromDb);

        if (data.getCategory() != null) {
            Category category = categoryService.getByType(data.getCategory());
            taskFromDb.setCategory(category);
        }
        this.taskRepository.save(taskFromDb);
        return Optional.of(taskFromDb);
    }

    // private Task getById(Long id) {
    //     return taskRepository.getReferenceById(id);
    // }

    public List<Task> findByCategory(String category) {
        return taskRepository.findByCategory_TypeIgnoreCase(category);
        
    }
    
    
}
