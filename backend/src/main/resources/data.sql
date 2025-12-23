-- 테스트용 User 생성 (이미 있으면 무시)
INSERT IGNORE INTO users (user_id, name, email, created_at)
VALUES (1, '테스트 유저', 'test@editus.com', NOW());

-- 테스트용 Project 생성
INSERT IGNORE INTO project (project_id, name, description, owner_id, created_at, updated_at)
VALUES
    (1, 'Web IDE Project', 'EditUs Web IDE 개발 프로젝트', 1, NOW(), NOW()),
    (2, 'Travel', '여행 계획 프로젝트', 1, NOW(), NOW()),
    (3, 'Dream', '개인 목표 프로젝트', 1, NOW(), NOW());
