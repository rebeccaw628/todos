package projects.nology.todo.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class UpdateTaskDTO {
    
    @Length(min = 3)
    @NotBlank
    private String description;

    @NotBlank
    private String category;

    private String dueDate;

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getDueDate() {
        return dueDate;
    }
}
