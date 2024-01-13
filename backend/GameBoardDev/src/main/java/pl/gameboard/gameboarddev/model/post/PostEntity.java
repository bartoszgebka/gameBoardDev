package pl.gameboard.gameboarddev.model.post;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.gameboard.gameboarddev.model.common.AuditEntity;

import java.util.List;

@Entity
@Table(schema = "public", name = "posts")
@NoArgsConstructor
@Getter
@Setter
public class PostEntity extends AuditEntity {
    @Column
    private String title;

    @Column
    private String content;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<CommentEntity> comments;
}
