package projects.nology.todo.task;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {
    
    @NotBlank
    private String description;

    @NotBlank
    private String category;

    private LocalDate dueDate;

    public CreateTaskDTO(@NotBlank String description, @NotBlank String category, LocalDate dueDate) {
        this.description = description;
        this.category = category;
        this.dueDate = dueDate;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }


}
