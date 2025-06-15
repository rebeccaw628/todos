package projects.nology.todo.category;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;

import projects.nology.todo.common.exceptions.ServiceValidationException;

public class CategoryServiceTest {
    
    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ModelMapper modelMapper;

    @Spy
    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void findAll() {
        categoryService.findAll();
        verify(categoryRepository).findAll();
    }

    @Test
    public void findById() {
        Long categoryId = 1L;
        categoryService.findById(categoryId);
        verify(categoryRepository).findById(categoryId);
    }

    @Test
    public void findByType() {
        String type = "chores";
        categoryService.findByType(type);
        verify(categoryRepository).findByTypeIgnoreCase(type);
    }

    @Test
    public void createCategory_SavesCategoryinDb() throws ServiceValidationException {
        CreateCategoryDTO testCategoryDTO = new CreateCategoryDTO();
        testCategoryDTO.setType("chores");
        Category testCategory = new Category();
        testCategory.setType("chores");

        when(this.categoryRepository.existsByTypeIgnoreCase(testCategoryDTO.getType())).thenReturn(false);
        when(this.modelMapper.map(testCategoryDTO, Category.class)).thenReturn(testCategory);
        when(this.categoryRepository.save(any(Category.class))).thenReturn(testCategory);

        Category result = this.categoryService.create(testCategoryDTO);

        verify(this.categoryRepository).save(testCategory);
        assertNotNull(result);
        assertEquals(testCategory, result);
        assertEquals("chores", result.getType());
    }

    @Test
    public void createCategory_ExistingCategory_Failure() {
        CreateCategoryDTO testCategoryDTO = new CreateCategoryDTO();
        testCategoryDTO.setType("chores");

        when(this.categoryRepository.existsByTypeIgnoreCase(testCategoryDTO.getType())).thenReturn(true);

        assertThrows(ServiceValidationException.class, () -> this.categoryService.create(testCategoryDTO));
        verify(this.categoryRepository, never()).save(any());
    }

    @Test
    public void createCategory_EmptyStringCategory_Failure() {
        CreateCategoryDTO testCreateCategoryDTO = new CreateCategoryDTO();
        testCreateCategoryDTO.setType("");
        Category testCategory = new Category();
        
        when(modelMapper.map(testCreateCategoryDTO, Category.class)).thenReturn(testCategory);

        assertThrows(ServiceValidationException.class, () -> this.categoryService.create(testCreateCategoryDTO));
        verify(this.categoryRepository, never()).save(any());
    }

    @Test
    public void createCategory_NullCategory_Failure() {
        CreateCategoryDTO testCategoryDTO = new CreateCategoryDTO();
        Category testCategory = new Category();
        
        when(modelMapper.map(testCategoryDTO, Category.class)).thenReturn(testCategory);

        assertThrows(ServiceValidationException.class, () -> this.categoryService.create(testCategoryDTO));
        verify(this.categoryRepository, never()).save(any());
    }

    @Test
    public void updateCategoryById_Success() {
        UpdateCategoryDTO testUpdateCategoryDTO = new UpdateCategoryDTO();
        testUpdateCategoryDTO.setType("gardening");
        Long id = 1L;
        Category testCategory = new Category();
        testCategory.setType("gardening");
        
        when(this.categoryRepository.findById(id)).thenReturn(Optional.of(testCategory));
        when(modelMapper.map(testUpdateCategoryDTO, Category.class)).thenReturn(testCategory);
        
        Optional <Category> result = this.categoryService.updateById(id, testUpdateCategoryDTO);
        
        verify(this.categoryRepository).save(testCategory);
        assertTrue(result.isPresent());
        assertEquals(testCategory, result.get());
        assertEquals("gardening", result.get().getType());
    }


    @Test
    public void deleteCategoryById_Success() {
        Category testCategory = mock(Category.class);
        Long id = 1L;

        when(testCategory.getId()).thenReturn(id);
        when(this.categoryRepository.findById(id)).thenReturn(Optional.of(testCategory));

        categoryService.deleteById(id);

        verify(this.categoryRepository).deleteById(id);

    }

}
