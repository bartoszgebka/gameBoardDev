package pl.gameboard.gameboarddev.dto.user;

import lombok.*;

import java.util.List;

@Builder
@Getter
public class UserDTO {
    private Long id;
    private String login;
    private String email;
    private List<AuthorityDTO> authorities;
}
