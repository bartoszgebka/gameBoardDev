package pl.gameboard.gameboarddev.util.validate;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ValidationResult {
    private List<ErrorMessage> errors = new ArrayList<>();

    public void addError(ErrorMessage errorMessage) {
        this.errors.add(errorMessage);
    }

    public boolean hasErrors() {
        return !errors.isEmpty();
    }
}