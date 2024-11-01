CREATE TABLE
    IF NOT EXISTS Users (
        ID UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        Name VARCHAR(100),
        Email VARCHAR(100)
    );

CREATE TABLE
    IF NOT EXISTS UserPreferences (
        PreferenceID UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        LanguageCode VARCHAR(100),
        PreferredCommunication INT,
        UserId UUID,
        FOREIGN KEY (UserId) REFERENCES Users (ID) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS Students (
    ID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    UserID UUID,
    Departament VARCHAR(100),
    YearStudy INT,
    DateOfGraduation DATE,
    FOREIGN KEY (UserID) REFERENCES Users (ID) ON DELETE CASCADE
);

CREATE OR REPLACE PROCEDURE add_student(
    UserID UUID, 
    Departament VARCHAR(100), 
    YearStudy INT, 
    DateOfGraduation DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO students (UserID, Departament, YearStudy, DateOfGraduation) 
    VALUES (UserID, Departament, YearStudy, DateOfGraduation);
END;
$$;

-- ALTER TABLE users ADD UNIQUE (name)
-- ALTER TABLE users ALTER COLUMN name SET NOT NULL;`