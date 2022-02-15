create TABLE person(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(20), 
    name VARCHAR(20),
    surname VARCHAR(20),
    password VARCHAR(20),
    UNIQUE (userName)
);

create TABLE post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(20),
    content TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person(id)
);

create TABLE role(
    user_role_id INTEGER,
    value VARCHAR(10) DEFAULT ('USER'),
    FOREIGN KEY (value) REFERENCES person(id)
);