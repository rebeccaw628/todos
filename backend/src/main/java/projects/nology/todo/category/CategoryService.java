package projects.nology.todo.category;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import projects.nology.todo.common.ValidationErrors;
import projects.nology.todo.common.exceptions.ServiceValidationException;


@Service
public class CategoryService {

    private CategoryRepository categoryRepository;
    private ModelMapper modelMapper;

    CategoryService(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    public Category create(CreateCategoryDTO data) {
        // ValidationErrors errors = new ValidationErrors();
        
        // if (this.categoryRepository.existsByTypeIgnoreCase(data.getType().trim())) {
        //     errors.add("type", "Category of type " + data.getType() + "already exists.");
        // }

        if (this.categoryRepository.existsByTypeIgnoreCase(data.getType())) {
            return null;
        }

        // if (errors.hasErrors()) {
        //     throw new ServiceValidationException(errors);
        // }

        Category newCategory = new Category();
        newCategory.setType(data.getType());
        return this.categoryRepository.save(newCategory);
        
    }

    public List<Category> findAll() {
        return this.categoryRepository.findAll();
    }

    private Optional<Category> findById(Long id) {
        return this.categoryRepository.findById(id);
    }

    public Optional<Category> findByType(String type) {
        return this.categoryRepository.findByTypeIgnoreCase(type.trim());
    }

    public Optional<Category> updateById(Long id, UpdateCategoryDTO data) {
        Optional<Category> foundCategory = this.findById(id);
        
        if(foundCategory.isEmpty()) {
            return foundCategory;
        }
        
        Category categoryFromDb = foundCategory.get();

        this.modelMapper.map(data, categoryFromDb);
        this.categoryRepository.save(categoryFromDb);
        return Optional.of(categoryFromDb);

    }

    public boolean deleteById(Long id) {
        Optional<Category> foundCategory = this.findById(id);
        if (foundCategory.isEmpty()) {
            return false;
        }
        Category categoryFromDb = foundCategory.get();
        this.categoryRepository.delete(categoryFromDb);
        return true;       
    }

}
