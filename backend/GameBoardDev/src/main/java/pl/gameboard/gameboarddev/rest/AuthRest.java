package pl.gameboard.gameboarddev.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.gameboard.gameboarddev.dto.user.UserDTO;
import pl.gameboard.gameboarddev.service.auth.AuthenticationService;
import pl.gameboard.gameboarddev.dto.auth.AuthenticationDTO;
import pl.gameboard.gameboarddev.dto.auth.RegisterDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthRest {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterDTO registerDTO) {
        return authenticationService.register(registerDTO);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<UserDTO> authenticate(@RequestBody AuthenticationDTO authenticationDTO) {
        return authenticationService.authenticate(authenticationDTO);
    }
}
