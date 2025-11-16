package com.senac.demo.core.exception;

import java.time.LocalDateTime;

public record ApiError(
        String path,
        String message,
        int statusCode,
        String error,
        LocalDateTime timestamp
) {
}
