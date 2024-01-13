package pl.gameboard.gameboarddev.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.gameboard.gameboarddev.model.user.AuthorityEntity;
import pl.gameboard.gameboarddev.model.user.UserRepository;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByEmail(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found for " + username);
        }
        var email = user.get().getEmail();
        var password = user.get().getPassword();
        var authorities = getAuthorities(user.get().getAuthorities());

        return new User(email, password, authorities);
    }

    private List<SimpleGrantedAuthority> getAuthorities(Set<AuthorityEntity> authorityEntitySet) {
        return authorityEntitySet.stream().map(a -> new SimpleGrantedAuthority(a.getName())).toList();
    }
}
