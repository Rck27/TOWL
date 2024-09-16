CREATE DATABASE TOWL;

CREATE TABLE users (
    user_id TEXT PRIMARY KEY DEFAULT generate_uid(15),
    user_type VARCHAR(10) NOT NULL,     -- 'tutor' or 'student'
    email VARCHAR(100) UNIQUE NOT NULL, -- User's email for login
    username varchar(10) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,        -- Password stored as a hash for security
    created_at TIMESTAMP DEFAULT NOW()  -- Timestamp when the account was created
);

CREATE TABLE student_profile (
    user_id INT PRIMARY KEY REFERENCES users(user_id),  -- Link to users table
    nama VARCHAR(100) NOT NULL,                         -- Student's name
    umur INT NOT NULL,                                  -- Age of the student
    bio TEXT,                                           -- Student's bio
    lokasi POINT,                                       -- Location (longitude, latitude)
    profile_picture VARCHAR(50)                         -- Profile picture URL
);

CREATE TABLE tutor_profile (
    user_id INT PRIMARY KEY REFERENCES users(user_id),  -- Link to users table
    nama VARCHAR(100) NOT NULL,                         -- Tutor's name
    umur INT NOT NULL,                                  -- Age of the tutor
    lokasi POINT,                                       -- Location (longitude, latitude)
    mapel VARCHAR(50)[],                                -- Subjects taught (array of strings)
    bio TEXT,                                           -- Tutor's bio
    profile_picture VARCHAR(50),                        -- Profile picture URL
    rating DOUBLE PRECISION,                            -- Tutor's rating
    order_count INT NOT NULL                            -- Number of sessions/orders
);

CREATE TABLE tutor_jadwal (
    user_id INT PRIMARY KEY REFERENCES users(user_id),  -- Link to users table
    availability JSONB NOT NULL                         -- Availability in JSONB format
);

CREATE TABLE booking_history (
    booking_id SERIAL PRIMARY KEY,
    tutor_id INT REFERENCES users(user_id),
    student_id INT REFERENCES users(user_id),
    session_time TIMESTAMP NOT NULL,
    duration INT,  -- Duration in minutes
    feedback TEXT, -- Feedback provided by student
    rating DOUBLE PRECISION  -- Rating for the session
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(user_id),
    tutor_id INT REFERENCES users(user_id),
    amount DECIMAL(10, 2) NOT NULL,  -- Amount paid
    payment_date TIMESTAMP DEFAULT NOW(),
    payment_method VARCHAR(50)  -- e.g., 'credit_card', 'paypal'
);


