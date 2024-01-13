package pl.gameboard.gameboarddev.config;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.gameboard.gameboarddev.model.user.UserEntity;
import pl.gameboard.gameboarddev.model.user.UserRepository;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AuditorAwareImpl implements AuditorAware<UserEntity> {

    private final UserRepository userRepository;

    public Optional<UserEntity> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        return userRepository.findByEmail(authentication.getName());
    }
}