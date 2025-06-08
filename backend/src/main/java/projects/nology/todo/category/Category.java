package projects.nology.todo.category;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import projects.nology.todo.common.BaseEntity;
import projects.nology.todo.task.Task;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity{
    
    @OneToMany(mappedBy = "category",
                cascade = CascadeType.REMOVE,
                orphanRemoval = true)
    @JsonIgnoreProperties({"category"})
    private List<Task> tasks;

    @Column
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    
}
