package pl.gameboard.gameboarddev.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.gameboard.gameboarddev.model.common.BasicEntity;

@Entity
@Table(schema = "auth" , name = "authorities")
@NoArgsConstructor
@Getter
@Setter
public class AuthorityEntity extends BasicEntity {

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
