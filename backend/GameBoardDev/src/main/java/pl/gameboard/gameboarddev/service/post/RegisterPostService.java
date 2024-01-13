package pl.gameboard.gameboarddev.service.post;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.gameboard.gameboarddev.model.post.PostRepository;
import pl.gameboard.gameboarddev.rest.post.dto.PostDTO;

@Service
@RequiredArgsConstructor
public class RegisterPostService {

    private final PostRepository postRepository;

    @Transactional
    public void register(PostDTO postDTO) {
        // TODO
    }
}
