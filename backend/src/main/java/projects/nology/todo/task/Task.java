package projects.nology.todo.task;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import projects.nology.todo.category.Category;
import projects.nology.todo.common.BaseEntity;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {
    
    @Column
    private String description;

    @Column
    private LocalDate dueDate;

    @Column
    private boolean isCompleted;
    
    @Column
    private boolean isArchived;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category existingCategory) {
        this.category = existingCategory;
    }

    public boolean getisCompleted() {
        return isCompleted;
    }

    public void setisCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public boolean getisArchived() {
        return isArchived;
    }

    public void setisArchived(boolean isArchived) {
        this.isArchived = isArchived;
    }

    
}
