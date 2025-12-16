
package com.editus.backend.domain.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String sender;
    private String content;
    private String type; // ENTER, TALK, LEAVE
}
