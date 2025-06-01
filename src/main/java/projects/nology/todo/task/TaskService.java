package projects.nology.todo.task;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private TaskRepository taskRepository;
    private ModelMapper modelMapper;

    TaskService(TaskRepository taskRepository, ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.modelMapper = modelMapper;
    }

    public Task create(CreateTaskDTO data) {
        Task newTask = modelMapper.map(data, Task.class);
        Task savedTask = this.taskRepository.save(newTask);
        return savedTask;
    }
    
}
