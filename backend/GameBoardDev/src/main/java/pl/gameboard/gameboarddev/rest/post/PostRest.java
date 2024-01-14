package pl.gameboard.gameboarddev.rest.post;

import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.gameboard.gameboarddev.rest.post.dto.CreatePostDTO;
import pl.gameboard.gameboarddev.rest.post.dto.PostDetailDTO;
import pl.gameboard.gameboarddev.service.post.CreatePostService;
import pl.gameboard.gameboarddev.service.post.ListPostService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("posts")
public class PostRest {

    private final CreatePostService createPostService;
    private final ListPostService listPostService;

    @PostMapping
    @RolesAllowed("ADD_POST")
    public void create(@RequestBody CreatePostDTO postDTO) {
        createPostService.create(postDTO);
    }

    @GetMapping
    public List<PostDetailDTO> getPosts(@RequestParam("title") String title) {
        return listPostService.getPosts(title);
    }

}
