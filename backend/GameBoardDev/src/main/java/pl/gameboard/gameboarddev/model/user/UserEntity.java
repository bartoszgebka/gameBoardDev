package pl.gameboard.gameboarddev.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.gameboard.gameboarddev.model.common.BasicEntity;

import java.util.Set;

@Entity
@Table(schema = "auth", name = "users")
@NoArgsConstructor
@Getter
@Setter
public class UserEntity extends BasicEntity {

    @Column
    private String login;

    @Column
    private String email;

    @Column
    private String password;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<AuthorityEntity> authorities;

}
