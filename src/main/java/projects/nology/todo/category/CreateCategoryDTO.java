package projects.nology.todo.category;

import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {

    @NotBlank
    private String type;

    public CreateCategoryDTO(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    
}
