package com.codeNimbus.backendassignment.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.codeNimbus.backendassignment.dtos.UserDto;
import com.codeNimbus.backendassignment.entites.User;
import com.codeNimbus.backendassignment.dtos.SignUpDto;

@Mapper(componentModel = "spring")
public interface UserMapper {

	UserDto toUserDto(User user);

	@Mapping(target = "password", ignore = true)
	User signUpToUser(SignUpDto signUpDto);

}
