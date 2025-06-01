package projects.nology.todo.category;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import projects.nology.todo.common.BaseEntity;
import projects.nology.todo.task.Task;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity{
    
    @OneToMany(mappedBy = "category")
    private List<Task> tasks;

    private String type;

    
}
