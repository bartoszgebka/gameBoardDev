package pl.gameboard.gameboarddev.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(schema = "auth", name = "users")
@NoArgsConstructor
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "main_seq_gen")
    @SequenceGenerator(name = "main_seq_gen", sequenceName = "public.main_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column
    private String login;

    @Column
    private String email;

    @Column
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<AuthorityEntity> authorities;

}
