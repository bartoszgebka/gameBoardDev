package pl.gameboard.gameboarddev.rest.post;

import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.gameboard.gameboarddev.rest.post.dto.PostDTO;
import pl.gameboard.gameboarddev.service.post.CreatePostService;

@RestController
@RequiredArgsConstructor
@RequestMapping("post")
public class PostRest {

    private final CreatePostService createPostService;

    @PostMapping("/create")
    @RolesAllowed("ADD_POST")
    public void create (@RequestBody PostDTO postDTO) {
        createPostService.create(postDTO);
    }

}
