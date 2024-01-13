package pl.gameboard.gameboarddev.rest.auth.dto.auth;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RegisterDTO {
    private String login;
    private String email;
    private String password;
    private String confirmPassword;
}