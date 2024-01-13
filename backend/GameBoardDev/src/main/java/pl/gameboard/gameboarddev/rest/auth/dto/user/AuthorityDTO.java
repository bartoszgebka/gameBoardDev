package pl.gameboard.gameboarddev.rest.auth.dto.user;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuthorityDTO {
    private String name;
}