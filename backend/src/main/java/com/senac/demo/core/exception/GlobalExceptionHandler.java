package com.senac.demo.core.exception;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ApiError> handleResourceNotFoundException(ResourceNotFoundException exception, HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                "Resource Doesn't Exist",
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<ApiError> handleMeasurementNotFoundException(UserNotFoundException exception,HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                "User Doesn't Exist",
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),

                LocalDateTime.now()
        );
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(EmailAlreadyTakenException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<ApiError> handleEmailAlreadyTakenException(EmailAlreadyTakenException exception,HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                "Email already taken",
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<ApiError> handleEmailAlreadyTakenException(EmailNotValidException exception,HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                "Email not valid",
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailOrPasswordInvalidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<ApiError> handleEmailOrPasswordInvalidException(EmailOrPasswordInvalidException exception,HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                "E-mail ou senha incorretos",
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiError> handleNoHandlerFoundException(NoHandlerFoundException exception,HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                "Endpoint not found.",
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                LocalDateTime.now()
        );
        return  new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }



    @ExceptionHandler(CurrentUserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<ApiError> handleMeasurementNotFoundException(CurrentUserNotFoundException exception,HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                "No user is logged in. Please log in to access this feature.",
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }







}
