package com.codeNimbus.backendassignment.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.codeNimbus.backendassignment.dtos.UserDto;
import com.codeNimbus.backendassignment.entites.User;
import com.codeNimbus.backendassignment.exceptions.AppException;
import com.codeNimbus.backendassignment.mappers.UserMapper;
import com.codeNimbus.backendassignment.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	private final UserMapper userMapper;

	public UserDto login(CredentialsDto credentialsDto) {
		User user = userRepository.findByEmail(credentialsDto.email()).get();
		// .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		if (user == null) {
			return null;
		} else if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
			return userMapper.toUserDto(user);
		}
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}

	public UserDto register(SignUpDto userDto) {
		Optional<User> optionalUser = userRepository.findByEmail(userDto.email());

		if (optionalUser.isPresent()) {
			throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
		}

		User user = userMapper.signUpToUser(userDto);
		user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.password())));

		User savedUser = userRepository.save(user);

		return userMapper.toUserDto(savedUser);
	}

	public UserDto findByLogin(String login) {
		User user = userRepository.findByEmail(login)
				.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		return userMapper.toUserDto(user);
	}

}
