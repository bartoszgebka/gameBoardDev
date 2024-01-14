package pl.gameboard.gameboarddev.rest.post.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreatePostDTO {
    private String title;
    private String content;
}
