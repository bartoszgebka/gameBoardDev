package pl.gameboard.gameboarddev.utils.validate;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorMessage {
    private String message;
    private String fieldNameInput;
}