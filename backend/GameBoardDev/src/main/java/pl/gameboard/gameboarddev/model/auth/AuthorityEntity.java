package pl.gameboard.gameboarddev.model.auth;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "auth" , name = "authorities")
@NoArgsConstructor
@Getter
@Setter
public class AuthorityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "main_seq_gen")
    @SequenceGenerator(name = "main_seq_gen", sequenceName = "public.main_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
