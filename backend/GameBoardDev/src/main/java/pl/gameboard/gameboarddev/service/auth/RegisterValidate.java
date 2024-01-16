package pl.gameboard.gameboarddev.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import pl.gameboard.gameboarddev.model.user.UserRepository;
import pl.gameboard.gameboarddev.rest.auth.dto.auth.RegisterDTO;
import pl.gameboard.gameboarddev.utils.validate.ErrorMessage;
import pl.gameboard.gameboarddev.utils.validate.FormValidateException;
import pl.gameboard.gameboarddev.utils.validate.ValidationResult;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class RegisterValidate {

    private final UserRepository userRepository;

    public void validate(RegisterDTO registerDTO) {
        var validationResult = new ValidationResult();

        if (ObjectUtils.isEmpty(registerDTO.getLogin())) {
            validationResult.addError(
                    ErrorMessage.builder()
                            .message("Login jest wymagany")
                            .fieldNameInput("login")
                            .build()
            );
        }

        if (!ObjectUtils.isEmpty(registerDTO.getLogin())) {
            var loginExists = this.userRepository.existsByLoginIgnoreCase(registerDTO.getLogin());

            if (loginExists) {
                validationResult.addError(
                        ErrorMessage.builder()
                                .message("Login jest zajęty.")
                                .fieldNameInput("login")
                                .build()
                );
            }
        }

        if (ObjectUtils.isEmpty(registerDTO.getEmail())) {
            validationResult.addError(
                    ErrorMessage.builder()
                            .message("Email jest wymagany")
                            .fieldNameInput("email")
                            .build()
            );
        }

        if (!ObjectUtils.isEmpty(registerDTO.getEmail())) {
            var emailExists = this.userRepository.existsByEmailIgnoreCase(registerDTO.getEmail());

            if (emailExists) {
                validationResult.addError(
                        ErrorMessage.builder()
                                .message("Email jest zajęty.")
                                .fieldNameInput("email")
                                .build()
                );
            }
        }

        if (ObjectUtils.isEmpty(registerDTO.getPassword())) {
            validationResult.addError(
                    ErrorMessage.builder()
                            .message("Hasło jest wymagane")
                            .fieldNameInput("password")
                            .build()
            );
        }

        if (isPasswordMismatch(registerDTO.getPassword(), registerDTO.getConfirmPassword())) {
            validationResult.addError(
                    ErrorMessage.builder()
                            .message("Hasła są różne")
                            .fieldNameInput("confirmPassword")
                            .build()
            );
        }

        if (validationResult.hasErrors()) {
            throw new FormValidateException(validationResult);
        }
    }

    private boolean isPasswordMismatch(String password, String confirmPassword) {
        return !Objects.equals(password, confirmPassword);
    }
}
