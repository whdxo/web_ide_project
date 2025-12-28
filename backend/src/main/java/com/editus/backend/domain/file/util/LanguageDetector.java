package com.editus.backend.domain.file.util;

import java.util.Locale;

public class LanguageDetector {

    private LanguageDetector() {}

    public static String detect(String fileName) {
        if (fileName == null) return "plaintext";

        int idx = fileName.lastIndexOf('.');
        if (idx < 0 || idx == fileName.length() - 1) return "plaintext";

        String ext = fileName.substring(idx + 1).toLowerCase(Locale.ROOT);

        return switch (ext) {
            case "java" -> "java";
            case "js" -> "javascript";
            case "ts" -> "typescript";
            case "jsx" -> "javascript";
            case "tsx" -> "typescript";
            case "py" -> "python";
            case "rb" -> "ruby";
            case "go" -> "go";
            case "rs" -> "rust";
            case "php" -> "php";
            case "c" -> "c";
            case "cpp", "cc", "cxx" -> "cpp";
            case "html" -> "html";
            case "css" -> "css";
            case "json" -> "json";
            case "md" -> "markdown";
            case "yml", "yaml" -> "yaml";
            case "xml" -> "xml";
            case "sql" -> "sql";
            default -> "plaintext";
        };
    }
}