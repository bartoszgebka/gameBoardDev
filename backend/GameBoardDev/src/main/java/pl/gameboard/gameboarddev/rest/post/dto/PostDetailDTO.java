package pl.gameboard.gameboarddev.rest.post.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class PostDetailDTO {
    private Long id;
    private String authorLogin;
    private LocalDateTime createdDate;
    private String modifiedAuthorLogin;
    private LocalDateTime modifiedDate;
    private String title;
    private String content;
    private Long commentsNumber;
}
