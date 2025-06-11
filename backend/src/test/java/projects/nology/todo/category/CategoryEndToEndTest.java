package projects.nology.todo.category;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class CategoryEndToEndTest {

    @LocalServerPort
    private int port;

    @Autowired
    private CategoryRepository categoryRepository;

    private ArrayList<Category> categories = new ArrayList<>();

    @BeforeEach
    public void setUp() {
        RestAssured.port = this.port;

        this.categoryRepository.deleteAll();
        this.categories.clear();

        Category category1 = new Category();
        category1.setType("chores");
        this.categoryRepository.save(category1);
        this.categories.add(category1);

        Category category2 = new Category();
        category2.setType("study");
        this.categoryRepository.save(category2);
        this.categories.add(category2);
    }

    @Test
    public void getAllCategories_CategoriesInDB_ReturnsSuccess() {
        given()
                .when().get("/categories")
                .then().statusCode(HttpStatus.OK.value())
                .body("$", hasSize(2))
                .body("type",
                        hasItems("chores", "study"));
    }

    @Test
    public void getAllCategories_NoCategoriesInDB_ReturnsSuccess() {
        this.categoryRepository.deleteAll();
        given()
                .when().get("/categories")
                .then().statusCode(HttpStatus.OK.value())
                .body("$", hasSize(0));
    }

    @Test
    public void createCategory_WhenPassedValidData_Created() {
        CreateCategoryDTO data = new CreateCategoryDTO();
        data.setType("exercise");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/categories")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("type", equalTo("exercise"))
                .body("id", notNullValue());
    }

    @Test
    public void createCategory_ExistingCategory_BadRequest() {
        CreateCategoryDTO data = new CreateCategoryDTO();
        data.setType("chores");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/categories")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createCategory_emptyRequestBody_BadRequest() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .post("/categories")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createCategory_emptyString_BadRequest() {
        CreateCategoryDTO data = new CreateCategoryDTO();
        data.setType("");
        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/categories")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void deleteCategoryById_ValidId_NoContent() {
        Long idToDelete = 1L;

        given()
                .when()
                .delete("categories/" + idToDelete)
                .then()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    @Test
    public void deleteCategoryById_InValidId_BadRequest() {
        String idToDelete = "invalidId";

        given()
                .when()
                .delete("categories/" + idToDelete)
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void updateCategoryById_ValidId_Success() {
        UpdateCategoryDTO data = new UpdateCategoryDTO();
        data.setType("updated category");
        Long idToUpdate = 1L;

         given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .patch("/categories/" + idToUpdate)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("type", equalTo("updated category"));

    }
}
