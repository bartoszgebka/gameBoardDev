package pl.gameboard.gameboarddev.util.validate;

import lombok.Getter;

@Getter
public class FormValidateException extends RuntimeException {
    private final ValidationResult validateResult;

    public FormValidateException(ValidationResult validateResult) {
        this.validateResult = validateResult;
    }
}
