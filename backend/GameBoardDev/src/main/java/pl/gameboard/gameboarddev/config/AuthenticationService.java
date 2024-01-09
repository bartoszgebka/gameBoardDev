package pl.gameboard.gameboarddev.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.gameboard.gameboarddev.config.jwt.JwtService;
import pl.gameboard.gameboarddev.dto.auth.AuthenticationDTO;
import pl.gameboard.gameboarddev.dto.auth.RegisterDTO;
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

    public String authenticate(AuthenticationDTO authenticationDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword())
        );

        var user = userRepository.findByEmail(authenticationDTO.getEmail()).orElseThrow();

        return jwtService.generateToken(user);
    }
}
