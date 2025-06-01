package projects.nology.todo.task;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {
    
    @Column
    private String description;

    @Column
    private String dueDate;

}
