package pl.gameboard.gameboarddev.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.gameboard.gameboarddev.utils.validate.FormValidateException;
import pl.gameboard.gameboarddev.utils.validate.ValidationResult;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        log.error("Wystąpił wyjątek: ", e);
        return ResponseEntity
                .status(500)
                .body(String.format("Błąd serwera: %s", e.getMessage()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException e) {
        log.error("Wystąpił wyjątek: ", e);
        return ResponseEntity
                .status(480)
                .body("Brak uprawnień.");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException e) {
        log.error("Wystąpił wyjątek: ", e);
        return ResponseEntity
                .status(401)
                .body("Niepoprawny email lub hasło.");
    }

    @ExceptionHandler(FormValidateException.class)
    public ResponseEntity<ValidationResult> handleFormValidateException(FormValidateException e) {
        log.debug("Błąd walidacji formularza: ", e);
        return ResponseEntity
                .status(400)
                .body(e.getValidateResult());
    }
}
