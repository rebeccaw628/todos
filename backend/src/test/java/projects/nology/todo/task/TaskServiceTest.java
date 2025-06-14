package projects.nology.todo.task;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;

import projects.nology.todo.category.Category;
import projects.nology.todo.category.CategoryService;
import projects.nology.todo.common.exceptions.ServiceValidationException;

public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private CategoryService categoryService;

    @Mock
    private ModelMapper modelMapper;

    @Spy
    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void findAll() {
        taskService.findAll();
        verify(taskRepository).findAll();
    }

    @Test
    public void findById() {
        Long taskId = 1L;
        taskService.findById(taskId);
        verify(taskRepository).findById(taskId);
    }

    @Test
    public void createTask_SavesTaskinDb() throws ServiceValidationException {
        CreateTaskDTO testTaskDTO = new CreateTaskDTO();
        testTaskDTO.setDescription("pickup dry-cleaning");
        testTaskDTO.setCategory("chores");
        testTaskDTO.setDueDate(LocalDate.of(2025,12,7));
        Task testTask = new Task();
        Category testCategory = new Category();
        testCategory.setType("chores");
        Optional<Category> returnedCategory = Optional.of(testCategory);


        when(this.modelMapper.map(testTaskDTO, Task.class)).thenReturn(testTask);
        when(this.categoryService.createOrFind(testTaskDTO, testTask)).thenReturn(returnedCategory);
        when(this.taskRepository.save(any(Task.class))).thenReturn(testTask);

        Task result = this.taskService.create(testTaskDTO);

        verify(this.taskRepository).save(testTask);
        assertNotNull(result);
        assertEquals(testTask, result);
        assertEquals(testCategory, testTask.getCategory());
    }

    @Test
    public void deleteTaskById_Success() {
        Task testTask = mock(Task.class);
        Long id = 1L;

        when(testTask.getId()).thenReturn(id);
        when(this.taskRepository.findById(id)).thenReturn(Optional.of(testTask));

        Boolean result = taskService.deleteById(id);

        verify(this.taskRepository).save(testTask);
        verify(testTask).setisArchived(true);
        assertTrue(result);
    }

     @Test
    public void updateTaskById_Success() throws ServiceValidationException {
        Long id = 1L;
        UpdateTaskDTO testUpdateTaskDTO = new UpdateTaskDTO();
        testUpdateTaskDTO.setDescription("buy groceries");
        testUpdateTaskDTO.setCategory("chores");
        testUpdateTaskDTO.setIsArchived(true);
        testUpdateTaskDTO.setIsCompleted(true);
        Category testCategory = new Category();
        testCategory.setType("chores");
        Task existingTask = new Task();

        when(this.taskRepository.findById(id)).thenReturn(Optional.of(existingTask));
        when(this.categoryService.findByType(testUpdateTaskDTO.getCategory())).thenReturn(Optional.of(testCategory));

        doAnswer(invocation -> {
            UpdateTaskDTO dto = invocation.getArgument(0);
            Task task = invocation.getArgument(1);
            task.setDescription(dto.getDescription());
            task.setCategory(testCategory);
            task.setisArchived(dto.getIsArchived());
            task.setisCompleted(dto.getIsCompleted());
            return null;
        }).when(modelMapper).map(any(UpdateTaskDTO.class), any(Task.class));
        
        when(this.taskRepository.save(any(Task.class))).thenAnswer(invocation -> {
            Task savedTask = invocation.getArgument(0);
        return savedTask;
        });

        Optional <Task> result = this.taskService.updateTaskById(id, testUpdateTaskDTO);

        verify(this.taskRepository).save(existingTask);
        verify(this.taskRepository).findById(id);
        verify(this.modelMapper).map(testUpdateTaskDTO, existingTask);

        assertTrue(result.isPresent());
        assertEquals(existingTask, result.get());
        assertEquals("buy groceries", result.get().getDescription());
        assertEquals("chores", result.get().getCategory().getType());

    }
}
