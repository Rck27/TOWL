-- Insert 10 random users (5 tutors and 5 students)
WITH new_users AS (
    INSERT INTO users (user_id, user_type, email, username, password_hash, created_at)
    VALUES
    -- Insert 5 tutors
    (uuid_generate_v4(), 'tutor', 'tutor1@example.com', 'tutor1', 'hashed_password', NOW()),
    (uuid_generate_v4(), 'tutor', 'tutor2@example.com', 'tutor2', 'hashed_password', NOW()),
    (uuid_generate_v4(), 'tutor', 'tutor3@example.com', 'tutor3', 'hashed_password', NOW()),
    (uuid_generate_v4(), 'tutor', 'tutor4@example.com', 'tutor4', 'hashed_password', NOW()),
    (uuid_generate_v4(), 'tutor', 'tutor5@example.com', 'tutor5', 'hashed_password', NOW()),
    
    -- Insert 5 students
    (uuid_generate_v4(), 'student', 'student1@example.com', 'student1', 'hashed_password', NOW()),
    (uuid_generate_v4(), 'student', 'student2@example.com', 'student2', 'hashed_password', NOW()),
    (uuid_generate_v4(), 'student', 'student3@example.com', 'student3', 'hashed_password', NOW()),
    (uuid_generate_v4(), 'student', 'student4@example.com', 'student4', 'hashed_password', NOW()),
    (uuid_generate_v4(), 'student', 'student5@example.com', 'student5', 'hashed_password', NOW())
    RETURNING user_id, user_type, email, username
)

-- Insert the corresponding tutor profiles (for tutors only)
INSERT INTO tutor_profiles (user_id, nama, gender, age, contact_number, grade, availability, price_preference, latitude, longitude)
SELECT 
    user_id, 
    'Tutor ' || row_number() OVER (), 
    CASE WHEN random() > 0.5 THEN 'male' ELSE 'female' END AS gender, 
    floor(random() * (60-20+1))::int + 20 AS age, 
    '555-1234' || row_number() OVER (), 
    ARRAY['A', 'B', 'C'], 
    ARRAY['Monday', 'Wednesday', 'Friday'], 
    ARRAY[100, 150, 200],
    37.7749 + (random() - 0.5) / 10 AS latitude, -- close proximity in latitude
    -122.4194 + (random() - 0.5) / 10 AS longitude -- close proximity in longitude
FROM new_users
WHERE user_type = 'tutor';
