module.exports = {
    "up": `CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        emailAddress VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        profileImageId BIGINT UNSIGNED DEFAULT NULL,
        isAdmin TINYINT(1) NOT NULL DEFAULT 0,
        isMod TINYINT(1) NOT NULL DEFAULT 0,
        UNIQUE KEY (username),
        UNIQUE KEY (emailAddress)
    ) ENGINE=INNODB;`,

    "down": "DROP TABLE user;"
}