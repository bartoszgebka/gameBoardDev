package pl.gameboard.gameboarddev.service.post;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.gameboard.gameboarddev.model.common.AuditEntity;
import pl.gameboard.gameboarddev.model.post.CommentRepository;
import pl.gameboard.gameboarddev.model.post.PostEntity;
import pl.gameboard.gameboarddev.model.post.PostRepository;
import pl.gameboard.gameboarddev.model.user.UserEntity;
import pl.gameboard.gameboarddev.model.user.UserRepository;
import pl.gameboard.gameboarddev.rest.post.dto.PostDetailDTO;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListPostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;


    @Transactional(readOnly = true)
    public List<PostDetailDTO> getPosts(String title) {
        var pageable = PageRequest.of(0, 20);

        var posts = postRepository.findByTitleLikeIgnoreCase(title, pageable);
        var postCommentCounts = fetchComments(posts.getContent());
        var createdByLogins = extractUserLoginsForPosts(posts.getContent(), AuditEntity::getCreatedBy);
        var lastModifiedLogins = extractUserLoginsForPosts(posts.getContent(), AuditEntity::getLastModifiedBy);

        return posts.stream().map(p -> {
            var authorLogin = createdByLogins.get(p.getId());
            var lastModifiedLogin = lastModifiedLogins.get(p.getId());
            var commentCount = postCommentCounts.getOrDefault(p.getId(), 0L);

            return mapToDTO(p, authorLogin, lastModifiedLogin, commentCount);
        }).toList();
    }

    private Map<Long, Long> fetchComments(List<PostEntity> posts) {
        return commentRepository.findByPostIn(posts)
                .stream()
                .collect(Collectors.groupingBy(c -> c.getPost().getId(), Collectors.counting()));
    }

    private Map<Long, String> extractUserLoginsForPosts(List<PostEntity> posts, Function<PostEntity, UserEntity> getUser) {
        var usersId = posts.stream()
                .map(getUser)
                .map(UserEntity::getId)
                .collect(Collectors.toSet());
        var users = userRepository.findByIdIn(usersId)
                .stream()
                .collect(Collectors.toMap(UserEntity::getId, UserEntity::getLogin));

        return posts.stream()
                .collect(Collectors.toMap(PostEntity::getId, p -> users.get(p.getCreatedBy().getId())));
    }

    private PostDetailDTO mapToDTO(PostEntity post, String authorLogin, String lastModifiedLogin, Long commentNumber) {
        return PostDetailDTO.builder()
                .id(post.getId())
                .authorLogin(authorLogin)
                .createdDate(post.getCreatedDate())
                .modifiedAuthorLogin(lastModifiedLogin)
                .modifiedDate(post.getLastModifiedDate())
                .title(post.getTitle())
                .content(post.getContent())
                .commentsNumber(commentNumber)
                .build();
    }
}
