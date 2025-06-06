package projects.nology.todo.common.exceptions;

import projects.nology.todo.common.ValidationErrors;

public class ServiceValidationException extends Exception {

    private ValidationErrors errors;

    public ServiceValidationException(ValidationErrors errors) {
        this.errors = errors;
    }

    public ValidationErrors getErrors() {
        return this.errors;
    }
}
