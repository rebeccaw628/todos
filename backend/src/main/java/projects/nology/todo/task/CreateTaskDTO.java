package projects.nology.todo.task;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {
    
    @Length(min = 3)
    @NotBlank
    private String description;

    @NotBlank
    private String category;

    @JsonFormat(pattern = "yyyy-MM-dd") 
    private LocalDate dueDate;

    public CreateTaskDTO() {
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

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

}



