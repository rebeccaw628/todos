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

    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")   
    private String dueDate;

    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")   
    // private LocalDate dueDate;

    public CreateTaskDTO(@NotBlank String description, @NotBlank String category, String dueDate) {
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

    // public LocalDate getDueDate() {
    //     return dueDate;
    // }

    public String getDueDate() {
        return dueDate;
    }



}
