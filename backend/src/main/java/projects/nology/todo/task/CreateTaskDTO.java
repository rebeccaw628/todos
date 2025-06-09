package projects.nology.todo.task;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// public class CreateTaskDTO {
    
//     @Length(min = 3)
//     @NotBlank
//     private String description;

//     @NotNull
//     private Long categoryId;

//     // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")   
//     private LocalDate dueDate;

//     public CreateTaskDTO(@Length(min = 3) @NotBlank String description, @NotNull Long categoryId, LocalDate dueDate) {
//         this.description = description;
//         this.categoryId = categoryId;
//         this.dueDate = dueDate;
//     }


//     public String getDescription() {
//         return description;
//     }

//     public LocalDate getDueDate() {
//         return dueDate;
//     }


//     public Long getCategoryId() {
//         return categoryId;
//     }

// }

public class CreateTaskDTO {
    
    @Length(min = 3)
    @NotBlank
    private String description;

    @NotBlank
    private String category;

    @JsonFormat(pattern = "yyyy-MM-dd") 
    private LocalDate dueDate;
 
    // private String dueDate;

    public CreateTaskDTO(@Length(min = 3) @NotBlank String description, @NotBlank String category, LocalDate dueDate) {
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



