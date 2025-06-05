package projects.nology.todo.task;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import projects.nology.todo.category.Category;
import projects.nology.todo.category.CategoryService;
import projects.nology.todo.category.CreateCategoryDTO;

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

    public Task create(CreateTaskDTO data) {
        CreateCategoryDTO chosenCategory = new CreateCategoryDTO(data.getCategory());
        Category category = this.categoryService.createOrFind(chosenCategory);
        Task newTask = modelMapper.map(data, Task.class);
        newTask.setCategory(category);
        Task savedTask = this.taskRepository.save(newTask);
        return savedTask;
    }

    public List<Task> findAll() {
        return this.taskRepository.findAll();
    }

    public Optional<Task> findById(Long id) {
        return this.taskRepository.findById(id);
    }

    //@Transactional annotation ?
    public boolean deleteById(Long id) {
        Optional<Task> foundTask = this.findById(id);
        if (foundTask.isEmpty()) {
            return false;
        }

        Task archivedTask = foundTask.get();
        archivedTask.setisArchived(true);
        this.taskRepository.save(archivedTask);
        return true;
    }

    public Optional<Task> updateTaskById(Long id, UpdateTaskDTO data) {
        Optional<Task> foundTask = this.findById(id);

        if (foundTask.isEmpty()) {
            return foundTask;
        }

        Task taskFromDb = foundTask.get();

        this.modelMapper.map(data, taskFromDb);
        this.taskRepository.save(taskFromDb);
        return Optional.of(taskFromDb);
    }
    
    
}
