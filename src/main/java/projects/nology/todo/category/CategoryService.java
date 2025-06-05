package projects.nology.todo.category;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
        return this.categoryRepository.findByType(data.getCategory()).orElseGet(() -> {
            Category newCategory = new Category();
            newCategory.setType(data.getCategory());
            return this.categoryRepository.save(newCategory);
        });
        
    }

}
