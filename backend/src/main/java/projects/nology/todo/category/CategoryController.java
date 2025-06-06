package projects.nology.todo.category;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import projects.nology.todo.common.exceptions.NotFoundException;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private CategoryService categoryService;

    CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> allCategories = this.categoryService.findAll();
        return new ResponseEntity<>(allCategories, HttpStatus.OK);
    }

    @PatchMapping("{id}")
    public ResponseEntity<Category> updateById(@PathVariable Long id, @Valid @RequestBody UpdateCategoryDTO data) throws NotFoundException
        {
        Optional<Category> result = this.categoryService.updateById(id, data);
        Category updated = result.orElseThrow(
            () -> new NotFoundException("Could not update category with ID " + id + " ; it does not exists"));

        return new ResponseEntity<>(updated, HttpStatus.OK);

    }
}
