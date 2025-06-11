package projects.nology.todo.category;

import jakarta.validation.constraints.NotBlank;

public class UpdateCategoryDTO {

    @NotBlank
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
