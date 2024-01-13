package pl.gameboard.gameboarddev.model.common;

import jakarta.persistence.*;
import lombok.Getter;

@MappedSuperclass
@Getter
public class BasicEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "main_seq_gen")
    @SequenceGenerator(name = "main_seq_gen", sequenceName = "public.main_seq", allocationSize = 1)
    @Column(name = "id")
    protected Long id;
}
