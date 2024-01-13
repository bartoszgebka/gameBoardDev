package pl.gameboard.gameboarddev.rest.post;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.gameboard.gameboarddev.rest.post.dto.PostDTO;
import pl.gameboard.gameboarddev.service.post.RegisterPostService;

@RestController
@RequiredArgsConstructor
@RequestMapping("post")
public class PostRest {

    private final RegisterPostService registerPostService;

    @PostMapping("/create")
    public void register(@RequestBody PostDTO postDTO) {
        registerPostService.register(postDTO);
    }

}
