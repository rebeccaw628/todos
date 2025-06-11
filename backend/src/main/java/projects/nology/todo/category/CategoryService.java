package projects.nology.todo.category;

import java.util.Date;
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

    public Category create(CreateCategoryDTO data) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();

        if (data.getType() == null  || data.getType().isEmpty()) {
            errors.add("type", "Category type cannot be empty");
            throw new ServiceValidationException(errors);
        }

        if (this.categoryRepository.existsByTypeIgnoreCase(data.getType().trim())) {
            errors.add("type", "Category of type '" + data.getType() + "' already exists.");
            throw new ServiceValidationException(errors);
            
        }

        Category newCategory = this.modelMapper.map(data,Category.class);
        return this.categoryRepository.save(newCategory);
        
    }

    public List<Category> findAll() {
        return this.categoryRepository.findAll();
    }

    public Optional<Category> findById(Long id) {
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
        categoryFromDb.setUpdatedAt(new Date());
        this.categoryRepository.save(categoryFromDb);
        return Optional.of(categoryFromDb);

    }

    public boolean deleteById(Long id) {
        Optional<Category> foundCategory = this.findById(id);
        if (foundCategory.isEmpty()) {
            return false;
        }
        this.categoryRepository.deleteById(id);
        return true;       
    }

    public Category getByType(String category) {
        return this.categoryRepository.getByType(category);
    }

}
