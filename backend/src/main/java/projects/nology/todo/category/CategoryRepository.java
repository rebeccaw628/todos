package projects.nology.todo.category;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByTypeIgnoreCase(String type);

    Optional<Category> findByTypeIgnoreCase(String type);

    Category getByType(String category);
    
}
