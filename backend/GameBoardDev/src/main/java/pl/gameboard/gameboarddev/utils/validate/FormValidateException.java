package pl.gameboard.gameboarddev.utils.validate;

import lombok.Getter;

@Getter
public class FormValidateException extends RuntimeException {
    private final ValidationResult validateResult;

    public FormValidateException(ValidationResult validateResult) {
        this.validateResult = validateResult;
    }
}
