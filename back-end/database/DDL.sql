--- Table Definitions ---

-- Drop Tables
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `song_lists`;
DROP TABLE IF EXISTS `songs`;

-- Create Tables
CREATE TABLE `users` (
    `user_id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `username` (`username`)
);

CREATE TABLE `song_lists` (
    `song_list_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `user_id` int NOT NULL,
    PRIMARY KEY (`song_list_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `songs` (
    `song_id` int NOT NULL AUTO_INCREMENT,
    `song_list_id` int NOT NULL,
    `title` varchar(150) NOT NULL,
    `artist` varchar(100) NOT NULL,
    PRIMARY KEY (`song_id`),
    FOREIGN KEY (`song_list_id`) REFERENCES `song_lists` (`song_list_id`) ON DELETE CASCADE
);
