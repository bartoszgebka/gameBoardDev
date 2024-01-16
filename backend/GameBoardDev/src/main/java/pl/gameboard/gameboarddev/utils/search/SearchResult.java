package pl.gameboard.gameboarddev.utils.search;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SearchResult<T> {
    private List<T> results;
    private Long totalElements;
}
