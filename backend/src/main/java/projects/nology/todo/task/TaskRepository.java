package projects.nology.todo.task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByCategory_TypeIgnoreCase(String category);
    
}
