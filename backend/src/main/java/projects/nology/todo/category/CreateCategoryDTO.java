package projects.nology.todo.category;

import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {

    @NotBlank
    private String type;

    public CreateCategoryDTO() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
