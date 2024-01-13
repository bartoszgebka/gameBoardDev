package pl.gameboard.gameboarddev.rest.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.gameboard.gameboarddev.rest.auth.dto.auth.AuthenticationDTO;
import pl.gameboard.gameboarddev.rest.auth.dto.auth.RegisterDTO;
import pl.gameboard.gameboarddev.rest.auth.dto.user.UserDTO;
import pl.gameboard.gameboarddev.service.auth.AuthenticationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthRest {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterDTO registerDTO) {
        return authenticationService.register(registerDTO);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<UserDTO> authenticate(@RequestBody AuthenticationDTO authenticationDTO) {
        return authenticationService.authenticate(authenticationDTO);
    }
}