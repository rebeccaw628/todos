package projects.nology.todo.category;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import projects.nology.todo.common.exceptions.NotFoundException;
import projects.nology.todo.common.exceptions.ServiceValidationException;

import org.springframework.web.bind.annotation.PostMapping;


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

    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody CreateCategoryDTO data) throws ServiceValidationException {
        Category newCategory = this.categoryService.create(data);
        return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Category> updateCategoryById(@PathVariable Long id, @Valid @RequestBody UpdateCategoryDTO data) throws NotFoundException
        {
        Optional<Category> result = this.categoryService.updateById(id, data);
        Category updated = result.orElseThrow(
            () -> new NotFoundException("Could not find category with ID " + id ));

        return new ResponseEntity<>(updated, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> deleteCategoryById(@PathVariable Long id) throws NotFoundException {
        boolean result = this.categoryService.deleteById(id);
        if (result == false) {
            throw new NotFoundException("Could not find category with id " + id);
        }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
