package pl.gameboard.gameboarddev.rest.auth.dto.user;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class UserDTO {
    private Long id;
    private String login;
    private String email;
    private List<AuthorityDTO> authorities;
}