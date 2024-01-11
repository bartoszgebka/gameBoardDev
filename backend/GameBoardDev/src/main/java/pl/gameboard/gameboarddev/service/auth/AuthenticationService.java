package pl.gameboard.gameboarddev.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.gameboard.gameboarddev.config.jwt.JwtService;
import pl.gameboard.gameboarddev.dto.auth.AuthenticationDTO;
import pl.gameboard.gameboarddev.dto.auth.RegisterDTO;
import pl.gameboard.gameboarddev.dto.user.AuthorityDTO;
import pl.gameboard.gameboarddev.dto.user.UserDTO;
import pl.gameboard.gameboarddev.model.user.AuthorityEntity;
import pl.gameboard.gameboarddev.model.user.UserEntity;
import pl.gameboard.gameboarddev.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterDTO registerDTO) {
        var user = new UserEntity();

        user.setLogin(registerDTO.getLogin());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        userRepository.save(user);

        return jwtService.generateToken(user);
    }

    public ResponseEntity<UserDTO> authenticate(AuthenticationDTO authenticationDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword())
        );

        var user = userRepository.findByEmail(authenticationDTO.getEmail()).orElseThrow();

         var jwtToken = jwtService.generateToken(user);

         return ResponseEntity.ok()
                 .header("Token", jwtToken)
                 .body(mapUserToDTO(user));
    }

    private UserDTO mapUserToDTO(UserEntity userEntity) {
        return UserDTO.builder()
                .id(userEntity.getId())
                .login(userEntity.getLogin())
                .email(userEntity.getEmail())
                .authorities(userEntity.getAuthorities().stream().map(this::mapAuthorityToDTO).toList())
                .build();
    }

    private AuthorityDTO mapAuthorityToDTO(AuthorityEntity authorityEntity) {
        return AuthorityDTO.builder()
                .name(authorityEntity.getName())
                .build();
    }
}
