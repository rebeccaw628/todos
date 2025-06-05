package projects.nology.todo.category;

import jakarta.validation.constraints.NotBlank;

public class UpdateCategoryDTO {
    
    @NotBlank
    private String category;

    public String getCategory() {
        return category;
    }
    
}
