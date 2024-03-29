package pl.gameboard.gameboarddev.service.post;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import pl.gameboard.gameboarddev.model.post.PostEntity;
import pl.gameboard.gameboarddev.model.post.PostRepository;
import pl.gameboard.gameboarddev.rest.post.dto.CreatePostDTO;
import pl.gameboard.gameboarddev.utils.validate.ErrorMessage;
import pl.gameboard.gameboarddev.utils.validate.FormValidateException;
import pl.gameboard.gameboarddev.utils.validate.ValidationResult;

@Service
@RequiredArgsConstructor
public class CreatePostService {

    private final PostRepository postRepository;

    @Transactional
    public void create(CreatePostDTO postDTO) {
        validate(postDTO);

        var postEntity = new PostEntity();
        postEntity.setTitle(postDTO.getTitle());
        postEntity.setContent(postDTO.getContent());
        postRepository.save(postEntity);
    }

    private void validate(CreatePostDTO postDTO) {
        var validationResult = new ValidationResult();

        if(ObjectUtils.isEmpty(postDTO.getTitle())) {
            validationResult.addError(
                    ErrorMessage.builder()
                            .message("Tytuł jest wymagany")
                            .fieldNameInput("title")
                            .build()
            );
        }

        if(ObjectUtils.isEmpty(postDTO.getContent())) {
            validationResult.addError(
                    ErrorMessage.builder()
                            .message("Treść jest wymagana")
                            .fieldNameInput("content")
                            .build()
            );
        }

        if (validationResult.hasErrors()) {
            throw new FormValidateException(validationResult);
        }
    }
}
