package pl.gameboard.gameboarddev.model.post;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.gameboard.gameboarddev.model.common.AuditEntity;

@Entity
@Table(schema = "public", name = "comments")
@NoArgsConstructor
@Getter
@Setter
public class CommentEntity extends AuditEntity {

    @Column
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private PostEntity post;
}
