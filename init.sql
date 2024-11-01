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

create table
    if not exists Students (
        ID UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        UserID UUID,
        foreign key (UserId) references Users (ID) on delete cascade,
        Departament varchar(100),
        YearStudy int,
        DateOfGraduation date
    );

-- ALTER TABLE users ADD UNIQUE (name)
-- ALTER TABLE users ALTER COLUMN name SET NOT NULL;`