package projects.nology.todo.task;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {
    
    @Length(min = 3)
    @Pattern(regexp = ".*\\S.*", message = "Title cannot be empty")
    private String description;

    @Length(min = 3)
    @Pattern(regexp = ".*\\S.*", message = "Title cannot be empty")
    private String category;

    private LocalDate dueDate;

    private Boolean isArchived;

    private Boolean isCompleted;

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Boolean getIsArchived() {
        return isArchived;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

}
