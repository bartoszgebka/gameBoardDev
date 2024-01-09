package pl.gameboard.gameboarddev.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.gameboard.gameboarddev.config.AuthenticationService;
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
    public String register(@RequestBody AuthenticationDTO authenticationDTO) {
        return authenticationService.authenticate(authenticationDTO);
    }
}
