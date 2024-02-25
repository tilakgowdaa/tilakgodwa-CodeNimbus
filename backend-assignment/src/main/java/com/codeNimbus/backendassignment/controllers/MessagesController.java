package com.codeNimbus.backendassignment.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MessagesController {

    @GetMapping("/messages")
    public ResponseEntity<String> messages() {
        return ResponseEntity.ok("Successfully Logged In");
    }
}
