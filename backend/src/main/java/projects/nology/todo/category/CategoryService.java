package projects.nology.todo.category;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;
    private ModelMapper modelMapper;

    CategoryService(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    public Category createOrFind(CreateCategoryDTO data) {
        //is there already a category with the same name? - modelMapper vs setter
        return this.categoryRepository.findByType(data.getType()).orElseGet(() -> {
            Category newCategory = new Category();
            newCategory.setType(data.getType());
            return this.categoryRepository.save(newCategory);
        });
        
    }

    public List<Category> findAll() {
        return this.categoryRepository.findAll();
    }

    private Optional<Category> findById(Long id) {
        return this.categoryRepository.findById(id);
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
