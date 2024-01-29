package com.mohani_be.commons;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.*;

@Component
public class Utils {

    private static ResourceBundle validationsBundle;
    private static ResourceBundle errorsBundle;

    static {
        validationsBundle = ResourceBundle.getBundle("messages.validations");
        errorsBundle = ResourceBundle.getBundle("messages.errors");
    }

    public static String getMessage(String code, String bundleType) {
        bundleType = Objects.requireNonNullElse(bundleType, "validation");
        ResourceBundle bundle = bundleType.equals("error")? errorsBundle:validationsBundle;
        try {
            return bundle.getString(code);
        } catch (Exception e) {
            return null;
        }
    }

    public static Map<String, List<String>> getMessages(Errors errors) {

        Map<String, List<String>> data = new HashMap<>();
        for (FieldError error : errors.getFieldErrors()) {
            // NotBlank, NotBlank.email, NotBlank.requestJoin.email -> 문자열이 긴것부터 적용
            List<String> messages = Arrays.stream(error.getCodes()).sorted(Comparator.reverseOrder())
                    .map(c -> getMessage(c, "validation"))
                    .filter(c -> c != null)
                    .toList();

            data.put(error.getField(), messages);
        }
        return data;
    }
}
