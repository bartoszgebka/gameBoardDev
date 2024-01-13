package pl.gameboard.gameboarddev.rest.post.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostDTO {
    private Long id;
    private String title;
    private String content;
}