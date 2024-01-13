package pl.gameboard.gameboarddev.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.gameboard.gameboarddev.config.security.jwt.JwtService;
import pl.gameboard.gameboarddev.model.user.AuthorityEntity;
import pl.gameboard.gameboarddev.model.user.UserEntity;
import pl.gameboard.gameboarddev.model.user.UserRepository;
import pl.gameboard.gameboarddev.rest.auth.dto.auth.AuthenticationDTO;
import pl.gameboard.gameboarddev.rest.auth.dto.auth.RegisterDTO;
import pl.gameboard.gameboarddev.rest.auth.dto.user.AuthorityDTO;
import pl.gameboard.gameboarddev.rest.auth.dto.user.UserDTO;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RegisterValidate registerValidate;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public ResponseEntity<UserDTO> register(RegisterDTO registerDTO) {
        registerValidate.validate(registerDTO);

        var user = new UserEntity();

        user.setLogin(registerDTO.getLogin());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return ResponseEntity.ok()
                .header("Token", jwtToken)
                .body(mapUserToDTO(user));
    }

    @Transactional
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
                .authorities(
                        Optional.ofNullable(userEntity.getAuthorities())
                                .map(authorities -> authorities.stream().map(this::mapAuthorityToDTO).toList())
                                .orElse(new ArrayList<>())
                )
                .build();
    }

    private AuthorityDTO mapAuthorityToDTO(AuthorityEntity authorityEntity) {
        return AuthorityDTO.builder()
                .name(authorityEntity.getName())
                .build();
    }
}
