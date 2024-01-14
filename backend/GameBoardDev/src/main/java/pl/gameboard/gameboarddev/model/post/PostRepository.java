package pl.gameboard.gameboarddev.model.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {

    @Query("SELECT p FROM PostEntity p WHERE (:title IS NULL OR :title = '') OR LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%')) ORDER BY p.createdDate DESC")
    Page<PostEntity> findByTitleLikeIgnoreCase(@Param("title") String title, Pageable pageable);
}
